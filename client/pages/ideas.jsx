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
    this.diff = this.diff.bind(this);
    this.same = this.same.bind(this);
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
    fetch('/api/ideas')
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ saved: data }))
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
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exercise)
    })
      .then(res => res.json())
      .catch(err => console.error(err));
    fetch('/api/ideas')
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ saved: data }))
      .catch(err => console.error(err));

  }

  diff() {

    const difference = this.state.ideas.filter(x => {
      const hello = this.state.saved.map(x => x.ExerciseName);
      return !hello.includes(x.name);
    });
    return difference;
  }

  same() {
    const same = this.state.ideas.filter(x => {
      const hello = this.state.saved.map(x => x.ExerciseName);
      return hello.includes(x.name);
    });
    return same;
  }

  render() {

    if (this.state.isLoading) {
      return;
    }
    return (
      <div>
        <div className="muscle-ideas">
          <button className="generate" onClick={this.handleClickItem}>Generate Ideas!</button>
          <a href="#bookmarks" className="bookmark-but">View Bookmarks</a>
        </div>
        <div className="idea-list">
          <ul className="idea-ul">
            {/* {this.state.ideas.map(x => { */}
            {this.diff().map(x => {
              return (
                <li className="workout-ideas" key={x.name}>
                  <div>
                    <h1 className="name-ideas">{x.name} <i onClick={e => this.exercisePick(this.state.ideas.find(item => item.name === x.name))}className="not-used-star fa-sharp fa-solid fa-star" />
                    </h1>
                    <h3 className="muscle-name-ideas">Muscle: {x.muscle}</h3>
                    <h3 className="equipment-ideas">Equipment: {x.equipment}</h3>
                    <h3 className="instructions-ideas">Instructions: {x.instructions}</h3>
                  </div>
                </li>
              );
            }) }
            {this.same().map(x => {
              return (
                <li className="workout-ideas" key={x.name}>
                  <div>
                    <h1 className="name-ideas">{x.name} <i /* onClick={e => this.exercisePick(this.state.ideas.find(item => item.name === x.name))} */ className="used-star fa-sharp fa-solid fa-star" />
                    </h1>
                    <h3 className="muscle-name-ideas">Muscle: {x.muscle}</h3>
                    <h3 className="equipment-ideas">Equipment: {x.equipment}</h3>
                    <h3 className="instructions-ideas">Instructions: {x.instructions}</h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

}
