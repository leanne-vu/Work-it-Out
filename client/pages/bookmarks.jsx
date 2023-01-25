import React from 'react';
export default class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: []
    };

  }

  componentDidMount() {
    fetch('/api/ideas')
      .then(response => {
        return response.json();
      })
      .then(data => this.setState({ saved: data }))
      .catch(err => console.error(err));

  }

  render() {
    return (
      <div>
        <div className="idea-list">
          <ul className="idea-ul">
            {this.state.saved.map(x => {
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