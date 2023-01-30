import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
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
    // console.log(this.state.workouts);

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
        <div className="tracker">
          <div className="bar-chart">
            <Pie
              data={{
                labels: ['hello', 'bye'],
                datasets: [
                  {
                    label: '# of muscle group workouts',
                    data: [1, 5, 39, 4],
                    backgroundColor: [
                      'rgb(255, 99, 132)',
                      'rgb(54, 162, 235)',
                      'rgb(255, 205, 86)']
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
      </div>
    );
  }
}
