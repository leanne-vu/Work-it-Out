import React from 'react';
export default class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: []
    };
    this.deleteIdea = this.deleteIdea.bind(this);
  }

  componentDidMount() {
    fetch('/api/bookmarks')
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ bookmarks: data }))
      .catch(err => console.error(err));

  }

  deleteIdea(exercise) {
    fetch(`/api/ideas/${exercise.ExerciseName}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .catch(err => console.error(err));
    fetch('/api/bookmarks')
      .then(response => response.json())
      .then(data => this.setState({ bookmarks: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <div className="idea-list">
          <ul className="idea-ul">
            {this.state.bookmarks.map(x => {
              return (
                <li className="workout-ideas" key={x.ExerciseName}>
                  <div>
                    <h1 className="name-ideas">{x.ExerciseName} <i onClick={e => this.deleteIdea(this.state.bookmarks.find(item => item.name === x.name))} className="used-star fa-sharp fa-solid fa-star" />
                    </h1>
                    <h3 className="muscle-name-ideas">Muscle: {x.MuscleGroup}</h3>
                    <h3 className="equipment-ideas">Equipment: {x.Equipment}</h3>
                    <h3 className="instructions-ideas">Instructions: {x.Info}</h3>
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
