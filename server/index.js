require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const db = new pg.Pool({ // eslint-disable-line
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const app = express();
app.use(express.json());
app.use(staticMiddleware);

app.get('/api/workouts', (req, res, next) => {
  const sql = `
select *
from "Workouts"
ORDER BY "Date"
`;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/exercises', (req, res, next) => {

  const { date, workoutName, muscleGroup, reps, sets, notes } = req.body;
  const sql = `
select *
from "Workouts"
where "Date" = $1
`;
  const params = [date + 'T00:00:00Z'];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length < 1) {
        res.status(201);
      } else {
        throw new ClientError(400, 'date already exists');
      }
    })
    .then(data => {
      const sql = `
  insert into "Workouts" ("Date")
  values ($1)
  returning *
  `;
      const params = [date];

      db.query(sql, params)
        .then(result => {
          const [workout] = result.rows;
          return (workout.WorkoutID);
        })
        .then(data => {
          if (muscleGroup === '') {
            throw new ClientError(404, 'muscleGroup cannot be empty');
          }
          if (!workoutName || !muscleGroup || !reps || !sets) {
            throw new ClientError(400, 'workoutName, muscleGroup, reps, sets are required fields');
          } else {
            const sql = `
        insert into "Exercises"("WorkoutID","WorkoutName", "MuscleGroup", "Sets", "Reps", "Notes" )
        values ( $1, $2, $3, $4, $5, $6)
        returning *
        `;
            const params = [data, workoutName, muscleGroup, sets, reps, notes];
            db.query(sql, params)
              .then(result => {
                const [exercise] = result.rows;
                res.status(201).json(exercise);
              })
              .catch(err => {
                next(err);
              });
            // }
          }
        }
        )
        .catch(err => {
          next(err);
        });
    }).catch(err => { next(err); });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
