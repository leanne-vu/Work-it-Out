import React from 'react';
import Dropdown from '../components/dropdown';
import WorkoutList from '../components/workoutList';
export default class Workouts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      workouts: [],
      details: [],
      isClicked: false
    };
    this.handleClickItem = this.handleClickItem.bind(this);
    this.monthPick = this.monthPick.bind(this);
    this.datePick = this.datePick.bind(this);
    this.details = this.details.bind(this);
    this.exit = this.exit.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);

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

  datePick(event, WorkoutID) {
    fetch(`/api/exercises/${WorkoutID}`)
      .then(response => response.json())
      .then(data => this.setState({ details: data, isClicked: true }))
      .catch(err => console.error(err));
  }

  exit() {
    this.setState({ isClicked: false });
  }

  deleteExercise(WorkoutID) {
    fetch(`/api/exercises/${this.state.details[0].WorkoutID}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .catch(err => console.error(err));
    this.setState({ isClicked: false });

  }

  details() {
    const currentDetails = this.state.details[0];
    const finalPick = this.state.workouts.find(x => x.WorkoutID === currentDetails.WorkoutID);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateString = new Date(finalPick.Date).toLocaleDateString('en-US', options);
    return (
      <div className='overlay'>
        <div>
          <div className='details-menu'>
            <div className='details-title'>
              <h1 className='details-date'>{dateString}</h1>
              <i onClick={this.exit} className="fa-solid fa-person-running" />
            </div>
            <h2 className='details-name'>{currentDetails.WorkoutName}</h2>
            <h3 className='details-group'>Primary Muscle Group: {currentDetails.MuscleGroup}</h3>
            <div className="details-numbers">
              <h4 className='details-sets'>Total Sets: {currentDetails.Sets}</h4>
              <h4 className='details-reps'>Average Reps: {currentDetails.Reps}</h4>
            </div>
            <h4 className='details-notes'>Notes:</h4>
            <h4 className='real-notes'>{currentDetails.Notes}</h4>
            <i onClick={this.deleteExercise} className="fa-solid fa-trash-can" />
            <a onClick={e => this.props.updateInfo(this.state.workouts, this.state.details)} href="#editform"><i className="fa-solid fa-pen-to-square" /></a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.monthPick().length > 0 && this.state.isClicked === true) {
      return (
        <div>
          <Dropdown handleClickItem={this.handleClickItem} />
          <WorkoutList datePick= {this.datePick} workouts={this.monthPick()} />
          {this.details()}
        </div>
      );
    } if (this.monthPick().length > 0) {
      return (
        <div>
          <Dropdown handleClickItem={this.handleClickItem} />
          <WorkoutList datePick={this.datePick} workouts={this.monthPick()} />
        </div>
      );
    } else {
      return (
        <div>
          <Dropdown handleClickItem={this.handleClickItem} />
          <h2 className="no-workout">There are no workouts to display</h2>
        </div>
      );
    }
  }
}
