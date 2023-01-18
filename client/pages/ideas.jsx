import React from 'react';
export default class Ideas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [] // details: [],
      // isClicked: false
    };
    this.handleClickItem = this.handleClickItem.bind(this);
    // this.monthPick = this.monthPick.bind(this);
    // this.datePick = this.datePick.bind(this);
    // this.details = this.details.bind(this);
    // this.exit = this.exit.bind(this);
    // this.deleteExercise = this.deleteExercise.bind(this);

  }

  handleClickItem(event) {
    fetch('/api/ideas')
      .then(response => response.json())
      .then(data => this.setState({ ideas: data }))
      .catch(err => console.error(err));
  }
  // {
  //     header: ('https://api.api-ninjas.com/v1/exercises',
  //     'Hh5CnkkdbOqNTMmwv/hdTg==M2w3lboMPCWzoTv0')
  //   }
  // fetch('https://api.api-ninjas.com/v1/exercises', {
  //   method: 'GET',
  //   headers: {
  //     'X-API-KEY': ,
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*'
  //   }
  // })
  //   .then(response => response.json())
  //   .then(data => this.setState({ ideas: data }))
  //   .catch(err => console.error(err));

  // componentDidMount() {

  //   fetch('/api/workouts')
  //     .then(response => response.json())
  //     .then(data => this.setState({ workouts: data }))
  //     .catch(err => console.error(err));

  // }

  // monthPick() {
  //   const correctMonth = this.state.month;
  //   return (
  //     this.state.workouts.filter(x => x.Date.split('-')[1] === correctMonth)
  //   );
  // }

  // datePick(event, WorkoutID) {
  //   fetch(`/api/exercises/${WorkoutID}`)
  //     .then(response => response.json())
  //     .then(data => this.setState({ details: data, isClicked: true }))
  //     .catch(err => console.error(err));
  // }

  // exit() {
  //   this.setState({ isClicked: false });
  // }

  // deleteExercise(WorkoutID) {
  //   fetch(`/api/exercises/${this.state.details[0].WorkoutID}`, {
  //     method: 'DELETE'
  //   })
  //     .then(res => res.json())
  //     .catch(err => console.error(err));
  //   this.setState({ isClicked: false });
  //   fetch('/api/workouts')
  //     .then(response => response.json())
  //     .then(data => this.setState({ workouts: data }))
  //     .catch(err => console.error(err));
  // }

  render() {
    // console.log(this.state.ideas);
    return (
      <div>
        <div className="muscle-ideas">
          <button className="generate" onClick={this.handleClickItem}>Generate Ideas!</button>
        </div>
        <div>
          <ul>
            {this.state.ideas.map(x => {
              return (
                <li className="workout-ideas" key={x.WorkoutID} />
              );
            }) }
          </ul>
        </div>
      </div>
    );
  }
}
