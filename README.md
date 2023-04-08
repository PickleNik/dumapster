\
frontend
```bash
cd frontend;

npm install;

npm run dev;
```

\
\
backend (https://www.cockroachlabs.com/docs/stable/build-a-nodejs-app-with-cockroachdb.html?)
```bash
cd backend-example-node-postrges;

export DATABASE_URL="{connection-string}";

cat dbinit.sql | cockroach sql --url $DATABASE_URL;

npm install;

node app.js;
