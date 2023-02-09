import React from 'react';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleWorkoutChange = this.handleWorkoutChange.bind(this);
    this.handleMuscleGroupChange = this.handleMuscleGroupChange.bind(this);
    this.handleRepChange = this.handleRepChange.bind(this);
    this.handleSetChange = this.handleSetChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.state = { workoutName: '', muscleGroup: '', reps: '', sets: '', notes: '' };
  }

  componentDidMount() {
    const details = this.props.details.y[0];
    this.setState({ workoutName: details.WorkoutName, muscleGroup: details.MuscleGroup, reps: details.Reps, sets: details.Sets, notes: details.Notes });
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value });
  }

  handleWorkoutChange(event) {
    this.setState({ workoutName: event.target.value });
  }

  handleRepChange(event) {
    this.setState({ reps: event.target.value });
  }

  handleSetChange(event) {
    this.setState({ sets: event.target.value });
  }

  handleNoteChange(event) {
    this.setState({ notes: event.target.value });
  }

  handleMuscleGroupChange(event) {
    this.setState({ muscleGroup: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const Edit = {
      workoutName: this.state.workoutName,
      muscleGroup: this.state.muscleGroup,
      reps: this.state.reps,
      sets: this.state.sets,
      notes: this.state.notes
    };
    fetch(`/api/exercises/${this.props.details.y[0].WorkoutID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('Token')
      },
      body: JSON.stringify(Edit)
    })
      .then(res => res.json())
      .catch(err => console.error(err));
    this.setState({ workoutName: '', muscleGroup: '', reps: '', sets: '', notes: '' }
    );
    window.location.hash = '#workouts';
  }

  render() {
    const workouts = this.props.workouts.x;
    const details = this.props.details.y[0];
    const finalPick = workouts.find(x => x.WorkoutID === details.WorkoutID);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateString = new Date(finalPick.Date).toLocaleDateString('en-US', options);
    return (
      <div className="form-container">
        <div className="row">
          <div className="col-2" />
          <div className="col-8">
            <h1 className="form-header">{dateString}
            </h1>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="workoutname-column column-half">
              <label htmlFor="workout-name">
                Workout Name
                <input required placeholder="Workout Name" className="form-control workout-input" name="name" type="text" id="workout-name" onChange={this.handleWorkoutChange} value={this.state.workoutName} />
              </label>
            </div>
            <div className="musclegroup-column column-half">
              <label className="muscle-group-label" htmlFor="muscle-group">
                Primary Muscle Group
                <select className="muscle-group-select" name="muscle-group" required onChange={this.handleMuscleGroupChange} value={this.state.muscleGroup}>
                  <option value="">Please select</option>
                  <option value="abdominals">abdominals</option>
                  <option value="abductors">abductors</option>
                  <option value="biceps">biceps</option>
                  <option value="calves">calves</option>
                  <option value="chest">chest</option>
                  <option value="forearms">forearms</option>
                  <option value="glutes">glutes</option>
                  <option value="hamstrings">hamstrings</option>
                  <option value="lats">lats</option>
                  <option value="lower back">lower back</option>
                  <option value="middle back">middle back</option>
                  <option value="neck">neck</option>
                  <option value="quadriceps">quadriceps</option>
                  <option value="traps">traps</option>
                  <option value="triceps">triceps</option>
                  <option value="other">other</option>
                </select>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="rep-column column-half">
              <label htmlFor="reps">
                Average Reps
                <input required placeholder="# of Reps" className="form-control" name="reps" type="number" id="reps" onChange={this.handleRepChange} value={this.state.reps} />
              </label>
            </div>
            <div className="set-column column-half">
              <label className="set-label" htmlFor="sets">
                Total Sets
                <input required placeholder="# of Sets" className="form-control" name="sets" type="number" id="sets" onChange={this.handleSetChange} value={this.state.sets} />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="column-full-date">
              <label className="notes-label" htmlFor="notes">
                Details
                <input placeholder="Workout details or notes" className="notes-control form-control" name="notes" type="text" id="notes" onChange={this.handleNoteChange} value={this.state.notes} />
              </label>
            </div>
          </div>
          <button className="form-submit-but" type="submit">Edit</button>
        </form>
      </div>
    );
  }
}
