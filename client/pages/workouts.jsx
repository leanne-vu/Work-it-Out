import React from 'react';
import Dropdown from '../components/dropdown';
import WorkoutList from '../components/workoutList';
export default class Workouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      workouts: []
    };
    this.handleClickItem = this.handleClickItem.bind(this);
    this.monthPick = this.monthPick.bind(this);

  }

  handleClickItem(event) {
    this.setState({ month: event.target.value });
  }

  componentDidMount() {

    fetch('/api/workouts')
      .then(response => response.json())
      .then(data => this.setState({ workouts: data }))
      .catch(err => console.error(err));

  }

  monthPick() {
    const correctMonth = this.state.month;
    return (
      this.state.workouts.filter(x => x.Date.split('-')[1] === correctMonth)
    );
  }

  render() {

    return (
      <div>
        <Dropdown handleClickItem={this.handleClickItem} />  {/* Sets state month to desired montht i.e. january  */}
        <WorkoutList workouts={this.monthPick} />
      </div>
    );

  }
}
