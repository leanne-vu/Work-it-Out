require('dotenv/config');
const express = require('express');
const argon2 = require('argon2'); // eslint-disable-line
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const jwt = require('jsonwebtoken'); // eslint-disable-line
const authorizationMiddleware = require('./authorization-middleware');
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

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  const sql = `
select *
from "User"
where "Username" = $1
`;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length < 1) {
        res.status(201);
      } else {
        throw new ClientError(400, 'Username already exists.');
      }
    })
    .then(data => {
      argon2
        .hash(password)
        .then(hashedpassword => {
          const sql = `
      insert into "User" ("Username", "HashedPassword")
      values ($1, $2)
      returning "UserID"
      `;
          const params = [username, hashedpassword];
          db.query(sql, params)
            .then(result => {
              const [users] = result.rows;
              res.status(201).json(users);
            })
            .catch(err => next(err));
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql =
    `select "UserID",
  "HashedPassword"
  from "User"
  where "Username" = $1
   `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        throw new ClientError(401, 'invalid login');
      } else {
        argon2
          .verify(user.HashedPassword, password)
          .then(isMatching => {
            if (isMatching === true) {
              const payload = {
                UserID: user.UserID,
                username
              };
              const token = jwt.sign(payload, process.env.TOKEN_SECRET);
              res.status(200).json({ token: `${token}`, user: payload });
            } else { throw new ClientError(401, 'invalid login'); }
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));

});

app.use(authorizationMiddleware);

app.get('/api/exercises/:WorkoutID', (req, res, next) => {
  const WorkoutID = Number(req.params.WorkoutID);
  if (!Number.isInteger(WorkoutID) || WorkoutID < 1) {
    throw new ClientError(400, 'WorkoutID must be a positive integer');
  }
  const sql = `
  select *
  from "Exercises"
  where "WorkoutID" = $1
  `;
  const params = [req.params.WorkoutID];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => { next(err); });
});

app.get('/api/ideas/:offset', (req, res) => {
  const { offset } = req.params;
  fetch(`https://api.api-ninjas.com/v1/exercises?offset=${offset}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': process.env.TOKEN_SECRET,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(result => {
      return result.json();
    })
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.error(err);
    });

});
app.get('/api/ideas', (req, res, next) => {
  const sql = `
  select "ExerciseName"
  from "Exercise Ideas"
  `;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});
app.get('/api/bookmarks', (req, res, next) => {
  const sql = `
  select *
  from "Exercise Ideas"
  ORDER BY "IdeaID"
  `;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});
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

app.get('/api/muscleGroup', (req, res, next) => {
  const sql = `
select "MuscleGroup"
from "Exercises"
`;
  db.query(sql)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.put('/api/exercises/:WorkoutID', (req, res, next) => {
  const { workoutName, muscleGroup, reps, sets, notes } = req.body;
  const WorkoutID = Number(req.params.WorkoutID);
  if (!Number.isInteger(WorkoutID) || WorkoutID < 1) {
    throw new ClientError(400, 'WorkoutID must be a positive integer');
  }
  const sql = `
  update "Exercises"
  set "WorkoutName" = $1,
      "MuscleGroup" = $2,
      "Sets" = $3,
      "Reps" = $4,
      "Notes" = $5
  where "WorkoutID" = $6
  `;
  const params = [workoutName, muscleGroup, sets, reps, notes, req.params.WorkoutID];

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => { next(err); });
});

app.delete('/api/exercises/:WorkoutID', (req, res, next) => {

  const sql = `
  delete
  from "Exercises"
  where "WorkoutID" = $1
  `;
  const params = [req.params.WorkoutID];
  db.query(sql, params)
    .then(result => {
      res.status(201);
    })
    .then(data => {
      const sql = `
      delete
      from "Workouts"
      where "WorkoutID"= $1`;
      db.query(sql, params)
        .then(result => {
          res.status(201);
        })
        .catch(err => { next(err); });
    })
    .catch(err => { next(err); });
});

app.delete('/api/ideas/:exercise', (req, res, next) => {
  const sql = `
  delete
  from "Exercise Ideas"
  where "ExerciseName" = $1
  `;
  const params = [req.params.exercise];
  db.query(sql, params)
    .then(result => {
      res.status(201);
    })
    .catch(err => { next(err); });
});

app.post('/api/ideas', (req, res, next) => {
  const { name, muscle, equipment, instructions } = req.body;
  const sql = `
  select *
  from "Exercise Ideas"
  where "ExerciseName" = $1
  `;
  const params = [name];
  db.query(sql, params)
    .then(result => {
      if (result.rows.length === 1) {
        throw new ClientError(400, 'exercise already exists');
      }
    })
    .then(data => {
      const sql = `
   insert into "Exercise Ideas" ("ExerciseName", "MuscleGroup", "Equipment", "Info" )
   values ($1, $2, $3, $4)
   returning * `;
      const params = [name, muscle, equipment, instructions];
      db.query(sql, params)
        .then(result => {
          const [exercise] = result.rows;
          res.status(201).json(exercise);
        })
        .catch(err => {
          next(err);
        });
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/exercises', (req, res, next) => {
  const { UserID, date, workoutName, muscleGroup, reps, sets, notes } = req.body;
  const sql = `
select *
from "Workouts"
where ("Date" = $1) and ("UserID"= $2)
`;
  const params = [date + 'T00:00:00Z', UserID];
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
  insert into "Workouts" ("Date", "UserID")
  values ($1, $2)
  returning *
  `;
      const params = [date, UserID];

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
        insert into "Exercises"("WorkoutID","WorkoutName", "MuscleGroup", "Sets", "Reps", "Notes", "UserID" )
        values ( $1, $2, $3, $4, $5, $6, $7)
        returning *
        `;
            const params = [data, workoutName, muscleGroup, sets, reps, notes, UserID];
            db.query(sql, params)
              .then(result => {
                const [exercise] = result.rows;
                res.status(201).json(exercise);
              })
              .catch(err => {
                next(err);
              });
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
