import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
export default class Tracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: []
    };
    this.monthPick = this.monthPick.bind(this);
  }

  componentDidMount() {
    fetch('/api/workouts')
      .then(response => response.json())
      .then(data => this.setState({ workouts: data }))
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

  render() {
    return (
      <div>
        <Bar
          data={{
            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            datasets: [
              {
                label: '# of days working outs',
                data: this.monthPick(),
                backgroundColor: '#fdd826',
                borderColor: 'black',
                borderWidth: 1
              }
            ]
          }}
          height={400}
          width={600}
          options= {{
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: { beginatZero: true }
              }]
            }
          }}
        />
      </div>
    );
  }
}
