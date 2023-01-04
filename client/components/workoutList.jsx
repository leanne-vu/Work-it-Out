import React from 'react';

function Item(props) {
  return (
    <li>
      <h3>{props.workouts.Date}</h3>
    </li>
  );
}

function WorkoutList(props) {
  return (
    <ul>
      {
        Item.map(workouts => {
          return <Item key={props.workouts.WorkoutID}/>;
        })
      }
    </ul>
  );
}

export default WorkoutList;
