from fastapi import FastAPI

from search.tfidf import Tfidf
import psycopg2
import os
from dotenv import load_dotenv

tf = Tfidf()
tf.load()
print("done")
app = FastAPI()
load_dotenv()
#self.conn = psycopg2.connect(os.environ["DATABASE_URL"])


@app.get("/NLP")
async def NLP(query: str):
	classes = tf.find_courses(query)
	return [c["course"] for c in classes]


'''
@app.post("/sched")
async def NLP(times: list = Body(...), price: float = Body(...)):
'''

