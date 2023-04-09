import requests
import psycopg
import os

#
# database name format 
# {day}_{s_time}
#

class IODatabasePopulator:

  def __init__(self, table_name, API_URL="https://api.umd.io/v1/"):
    self.API_URL = API_URL
    self.table_name = table_name
    self.count = 0
    
    self.conn = psycopg.connect(os.environ["DATABASE_URL"])
    
    ## auto commit changes
    self.conn.autocommit = True
 
  def _init_database(self):
    with self.conn.cursor() as cur:
      ## create table if it doesn't exist
      try:
        cur.execute(f"""
            CREATE TABLE {self.table_name} (
                id serial PRIMARY KEY,
                time_id text,
                course text,
                sid text,
                seats text,
                meetings text[],
                open_seats text,
                waitlist text,
                instructors text[]
                )
            """)
    ## otherwise clear the table
      except:
        cur.execute(f"truncate {self.table_name};")

  def _name(self, d, s):
    return f'{d}_{s}'

  def _add(self, data):


    with self.conn.cursor() as cur:
      for section in data:
        day = section["meetings"][0]["days"]
        s_time = section["meetings"][0]["start_time"]
        n = self._name(day, s_time) 
        cur.execute(
          f"INSERT INTO {self.table_name} (time_id, course, sid, seats, meetings, open_seats, waitlist, instructors) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
          (n, section["course"], section["section_id"], section["seats"], [i for i in section["meetings"][0].values()], section["open_seats"], section["waitlist"], section["instructors"]))



  def all_sections(self):
    page_num = 1
    per_trans = 100

    while 1 == 1:
      print(page_num)
      r = requests.get(
        f'{self.API_URL}courses/sections?page={page_num}&per_page={per_trans}'
      ).json()
      self._add(r)
      page_num += 1
      if len(r) < per_trans:
        break

  def try_table(self, table_name):
    pass

if __name__ == "__main__":
  d = IODatabasePopulator("curr_classes2")
  d._init_database()
  d.all_sections()