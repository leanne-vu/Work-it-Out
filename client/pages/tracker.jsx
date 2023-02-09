import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      exercises: []
    };
    this.monthPick = this.monthPick.bind(this);
    this.musclePick = this.musclePick.bind(this);
  }

  componentDidMount() {
    const UserID = window.localStorage.getItem('UserID');

    fetch(`/api/workouts/${UserID}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('Token')
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ workouts: data }))
      .catch(err => console.error(err));
    fetch(`/api/muscleGroup/${UserID}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('Token')
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ exercises: data }))
      .catch(err => console.error(err));
  }

  monthPick() {
    return (
      [
        this.state.workouts.filter(x => x.Date.split('-')[1] === '01').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '02').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '03').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '04').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '05').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '06').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '07').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '08').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '09').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '10').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '11').length,
        this.state.workouts.filter(x => x.Date.split('-')[1] === '12').length
      ]
    );
  }

  musclePick() {
    return (
      [
        this.state.exercises.filter(x => x.MuscleGroup === 'abdominals').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'abductors').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'biceps').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'calves').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'chest').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'forearms').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'glutes').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'hamstrings').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'lats').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'lower back').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'middle back').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'neck').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'quadriceps').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'traps').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'triceps').length,
        this.state.exercises.filter(x => x.MuscleGroup === 'other').length
      ]
    );
  }

  render() {

    return (
      <div className="tracker">
        <div className="bar-chart">
          <Bar
          data={{
            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            datasets: [
              {
                label: '# of days working out per month',
                data: this.monthPick(),
                backgroundColor: '#fdd826'
              }
            ]
          }}
          height={450}
          width={600}
          options= {{
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Months'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Workouts'
                }
              }
            }
          }}
        />
        </div>
        <div>
          <h3 className="total-workouts-h3"> <span className="total-workouts-span">Total Number of Workouts: {this.state.workouts.length}</span></h3>
        </div>
        <div className="pie-chart">
          <Pie
              data={{
                labels: ['abdominals', 'abductors', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings',
                  'lats', 'lower back', 'middle back', 'neck', 'quadriceps', 'traps', 'triceps', 'other'],
                datasets: [
                  {
                    label: '# of workouts',
                    data: this.musclePick(),
                    backgroundColor: ['rgb(104,175,252)', 'rgb(232,168,176)', 'rgb(218,162,24)', 'rgb(120,40,87)', 'rgb(144,182,115)', 'rgb(106,69,194)', 'rgb(242,87,156)', 'rgb(189,155,244)', 'rgb(25,121,89)', 'rgb(42,243,133)', 'rgb(28,234,249)', 'rgb(211,100,17)', 'rgb(18,92,185)', 'rgb(226,109,248)', 'rgb(110,57,1)', 'rgb(99,92,102)']
                  }
                ]
              }}
              height={450}
              width={600}
              options={{
                maintainAspectRatio: false
              }}
            />
        </div>
      </div>
    );
  }
}
