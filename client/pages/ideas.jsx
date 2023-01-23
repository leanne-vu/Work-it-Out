import React from 'react';
export default class Ideas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      offset: 0,
      isLoading: true,
      saved: []
    };
    this.handleClickItem = this.handleClickItem.bind(this);
    this.exercisePick = this.exercisePick.bind(this);

  }

  handleClickItem(event) {
    const currentOffset = this.state.offset;
    fetch(`/api/ideas/${this.state.offset}`)
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ ideas: data, offset: currentOffset + 10 }))
      .catch(err => console.error(err));
    window.location.hash = `#ideas?results=${this.state.offset}`;
  }

  componentDidMount() {
    fetch(`/api/ideas/${this.state.offset}`)
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ ideas: data, isLoading: false }))
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps) {
    if (this.props.offset !== prevProps.offset) {
      fetch(`/api/ideas/${this.props.offset}`)
        .then(response => {
          return response.json();
        })
        .then(data => this.setState({ ideas: data }))
        .catch(err => console.error(err));
    }
  }

  exercisePick(exercise) {
    fetch('/api/ideas', {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => this.setState({ saved: data }))
      .catch(err => console.error(err));

  }

  render() {
    if (this.state.isLoading) {
      return;
    }
    return (
      <div>
        <div className="muscle-ideas">
          <button className="generate" onClick={this.handleClickItem}>Generate Ideas!</button>
        </div>
        <div className="idea-list">
          <ul className="idea-ul">
            {this.state.ideas.map(x => {
              return (
                <li className="workout-ideas" key={x.name}>
                  <div>
                    <h1 className="name-ideas">{x.name} <i onClick={this.exercisePick(this.state.ideas.find(item => item.name === x.name))}className="not-used-star fa-sharp fa-solid fa-star" />
                    </h1>
                    <h3 className="muscle-name-ideas">Muscle: {x.muscle}</h3>
                    <h3 className="equipment-ideas">Equipment: {x.equipment}</h3>
                    <h3 className="instructions-ideas">Instructions: {x.instructions}</h3>
                  </div>
                </li>
              );
            }) }
          </ul>
        </div>
      </div>
    );
  }

}
