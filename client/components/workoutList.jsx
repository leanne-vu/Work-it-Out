import React from 'react';
function WorkoutList(props) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return (
    <ul>
      {props.workouts.map(x => {
        const workoutDates = new Date(x.Date).toLocaleDateString('en-US', options);
        return (
          <li className="workout-dates" key={x.WorkoutID}>
            <button onClick={e => /* { */ props.datePick(e, x.WorkoutID)/* ; props.details(e); } */} key={x.WorkoutID} className="slash-dates">{workoutDates}</button>
          </li>
        );
      }) }
    </ul>
  );
}
export default WorkoutList;
