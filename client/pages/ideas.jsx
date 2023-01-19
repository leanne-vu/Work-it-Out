import React from 'react';
export default class Ideas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
      offset: 0
    };
    this.handleClickItem = this.handleClickItem.bind(this);

  }

  handleClickItem(event) {
    fetch(`/api/ideas/${this.state.offset}`)
      .then(response => response.json())
      .then(data => this.setState({ ideas: data }))
      .catch(err => console.error(err));
    this.setState({ offset: this.state.offset + 10 });
  }
  // componentDidUpdate() {

  //     if (this.state.offset > 0) {  }

  // }

  componentDidMount() {
    <div>
      <div className="muscle-ideas">
        <button className="generate" onClick={this.handleClickItem}>Generate Ideas!</button>
      </div>
      <div>
        <ul>
          {this.state.ideas.map(x => {
            return (
              <li className="workout-ideas" key={x.name}>
                <div>
                  <h1>Exercise: {x.name}</h1>
                  <h3>Muscle: {x.muscle}</h3>
                  <h3>Equipment: {x.equipment}</h3>
                  <h3>Instructions:{x.instructions}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>;
  }

  render() {

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
                    <h1 className="name-ideas">{x.name} <i className="not-used-star fa-sharp fa-solid fa-star" />
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
