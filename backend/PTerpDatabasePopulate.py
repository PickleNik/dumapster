import requests
import psycopg
import os

class DatabasePopulator:

  def __init__(self, table_name, API_URL):
    self.API_URL = API_URL
    self.table_name = table_name
    self.count = 0

    self.conn = psycopg.connect(os.environ["DATABASE_URL"])
    
    ## auto commit changes
    self.conn.autocommit = True

  # clears or creates the database, populating with planet terp data
  def refresh_database(self):
    self._init_database()
    self._get_all_courses()
  
  def _init_database(self):
    with self.conn.cursor() as cur:
      ## create table if it doesn't exist
      try:
        cur.execute(f"""
            CREATE TABLE {self.table_name} (
                id serial PRIMARY KEY,
                department text,
                cid text,
                description text,
                reviews text[]
                )
            """)
    ## otherwise clear the table
      except:
        cur.execute(f"truncate {self.table_name};")

  def _process_json(self, data):
    with self.conn.cursor() as cur:
      for klass in data:
        self.count += 1
        if self.count % 30 == 0:
          print(f'TRANS #: {self.count}')
        cur.execute(
          f"INSERT INTO {self.table_name} (department, cid, description, reviews) VALUES (%s,%s,%s,%s)",
          (klass["department"], klass["course_number"], klass["description"],
           [item["review"] for item in klass["reviews"]]))

  def _get_all_courses(self):
    offset = 0
    per_trans = 100
    while 1 == 1:
      r = requests.get(
        f'{self.API_URL}courses?offset={offset}&limit={per_trans}&reviews=true'
      ).json()
      self._process_json(r)
      offset += per_trans
      if len(r) < per_trans:
        break

  def view_database(self):
    with self.conn.cursor() as cur:
      cur.execute(f"SELECT department,cid FROM {self.table_name};")
      rows = cur.fetchall()
      print(len(rows))
      for row in rows:
        print(row)


if __name__ == "__main__":
  d = DatabasePopulator("NLP", "https://planetterp.com/api/v1/")
  #d._init_database()
  #d._get_all_courses()
  d.view_database()
