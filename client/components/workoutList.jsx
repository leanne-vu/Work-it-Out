import React from 'react';

function WorkoutList(props) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return (
    <ul>
      { props.workouts.map(x => {
        const workoutDates = new Date(x.Date).toLocaleDateString('en-US', options);
        return (
          <li className="workout-dates" key={x.workoutID}>
            <h3 className="slash-dates">{workoutDates}</h3>
          </li>
        );
      }) }

    </ul>
  );
}
export default WorkoutList;
