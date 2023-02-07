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
    this.deleteIdea = this.deleteIdea.bind(this);
  }

  handleClickItem(event) {
    const currentOffset = this.state.offset;
    fetch(`/api/ideas/${this.state.offset}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('Token')
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ ideas: data, offset: currentOffset + 10 }))
      .catch(err => console.error(err));
    window.location.hash = `#ideas?results=${this.state.offset}`;
  }

  componentDidMount() {
    const UserID = window.localStorage.getItem('UserID');
    fetch(`/api/ideas/${this.props.offset}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('Token')
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ ideas: data, isLoading: false }))
      .catch(err => console.error(err));
    fetch(`/api/saved/${UserID}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('Token')
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ saved: data }))
      .catch(err => console.error(err));

  }

  componentDidUpdate(prevProps) {
    if (this.props.offset !== prevProps.offset) {
      fetch(`/api/ideas/${this.props.offset}`, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': window.localStorage.getItem('Token')
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => this.setState({ ideas: data }))
        .catch(err => console.error(err));
    }

  }

  exercisePick(exercise) {
    const UserID = window.localStorage.getItem('UserID');
    fetch(`/api/ideas/${UserID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('Token')
      },
      body: JSON.stringify(exercise)
    })
      .then(res => res.json())
      .catch(err => console.error(err));
    fetch(`/api/saved/${UserID}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('Token')
      }
    })
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

  deleteIdea(exercise) {
    const UserID = window.localStorage.getItem('UserID');
    fetch(`/api/ideas/${exercise.name}/${UserID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('Token')
      }
    })
      .then(res => res.json())
      .catch(err => console.error(err));
    this.setState({ isClicked: false });
    fetch(`/api/saved/${UserID}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': window.localStorage.getItem('Token')
      }
    })
      .then(response => {
        return response.json();
      })
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
          <a href="#bookmarks" className="bookmark-but">View Bookmarks</a>
        </div>
        <div className="idea-list">
          <ul className="idea-ul">
            {this.state.ideas.map(x => {
              if (this.diff().includes(x)) {
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
              } else {
                return (
                  <li className="workout-ideas" key={x.name}>
                    <div>
                      <h1 className="name-ideas">{x.name} <i onClick={e => this.deleteIdea(this.state.ideas.find(item => item.name === x.name))} className="used-star fa-sharp fa-solid fa-star" />
                      </h1>
                      <h3 className="muscle-name-ideas">Muscle: {x.muscle}</h3>
                      <h3 className="equipment-ideas">Equipment: {x.equipment}</h3>
                      <h3 className="instructions-ideas">Instructions: {x.instructions}</h3>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  }

}
