import React from 'react';
import Dropdown from '../components/dropdown';

export default class Workouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { month: '' };
    this.handleClickItem = this.handleClickItem.bind(this);

  }

  handleClickItem(event) {
    this.setState({ month: event.target.value });
  }

  render() {
    const { month } = this.state;

    if (month === '') {
      return (
        <div>
          <Dropdown handleClickItem={this.handleClickItem} />
        </div>
      );
    }
    if (month === 'january') {
      return (
        <div className="form-container">
          <Dropdown handleClickItem={this.handleClickItem} />
          <p>hello1</p>
        </div>
      );
    } if (month === 'february') {
      return (
        <div className="form-container">
          <Dropdown handleClickItem={this.handleClickItem} />
          <p>hello2</p>
        </div>
      );
    }
  }
}
//   fetch('/api/exercises', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newExercise)
//   })
//     .then(res => res.json())
//     .catch(err => console.error(err));
//   this.setState({ date: '', workoutName: '', muscleGroup: '', reps: '', sets: '', notes: '' }
//   );
// }
