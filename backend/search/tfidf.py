import sys
import json
import pickle
import os
import re
import psycopg2
import psycopg2.extras

from os.path import exists
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

class Tfidf:

    def __init__(self, filename="courses.json"):

        self.vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 3), sublinear_tf=True)
        self.tfidf = None
        self.course_descs = None
        self.course_names = None
        self.filename = filename

    def load(self):

        # If one pkl exists, all should
        if exists("tfidf.pkl"):
            with open("tfidf.pkl", "rb") as f:
                self.tfidf = pickle.load(f)

            with open("vectorizer.pkl", "rb") as f:
                self.vectorizer = pickle.load(f)

            with open("course_names.pkl", "rb") as f:
                self.course_names = pickle.load(f)

        else:
            # with open(self.filename) as f:
            #     course_data = json.load(f)

            load_dotenv()
            conn = psycopg2.connect(os.environ["DATABASE_URL"])

            course_data = None
            with conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor) as cur:
                cur.execute("SELECT * from NLP")
                course_data = cur.fetchall()

            course_names = []
            course_descs = []

            # Get list of course names and descriptions
            for course in course_data:
                desc = course["description"]
                if desc == None:
                    desc = ""

                review_text = ' '.join([review for review in course["reviews"]])
                name = course["department"] + course["cid"]

                course_names.append(name)
                course_descs.append(f'{desc} {review_text}')

            self.course_names = course_names
            self.course_descs = course_descs

            self.tfidf = self.vectorizer.fit_transform(self.course_descs)

            with open("tfidf.pkl", 'wb') as f:
                pickle.dump(self.tfidf, f)

            with open("vectorizer.pkl", "wb") as f:
                pickle.dump(self.vectorizer, f)

            with open("course_names.pkl", "wb") as f:
                pickle.dump(self.course_names, f)


    def find_courses(self, query, num_results=5):

        results = []

        q_tfidf = self.vectorizer.transform([query])
        cos_sim = cosine_similarity(q_tfidf, self.tfidf)[0]
        result_idx = cos_sim.argsort()[::-1][:num_results]

        # Get course name from index
        for i in result_idx:
            if cos_sim[i] > 0:
                results.append({"course": self.course_names[i], "confidence": cos_sim[i]})

        # If query contains courses, insert them to the front
        courses = []
        matches = re.findall(r'(?i)([a-z]{4})\s?(\d{3}[a-z]|\d{3})', query)
        i = 0
        for match in matches:
            name = match[0].upper() + match[1]
            if name in self.course_names:
                results.insert(i, {"course": name, "confidence": 1})

            i += 1

        return results


if __name__ == "__main__":
    tfidf = Tfidf()
    tfidf.load()
    print(tfidf.find_courses("cmsc351"))
