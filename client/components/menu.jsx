import React from 'react';

export default class DrawerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false };
    this.handleClickModal = this.handleClickModal.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);
  }

  handleClickModal() {
    this.setState({ isClicked: true });
  }

  handleClickItem() {
    this.setState({ isClicked: false });
  }

  render() {
    if (this.state.isClicked) {
      return (
        <div className='overlay' onClick={this.handleClickItem}>
          <div>
            <div className='menu'>
              <ul className='list'>
                <li onClick={this.handleClickItem}><a className="menu-but" href="#">Home</a></li>
                <li onClick={this.handleClickItem}><a className="menu-but" href="#workouts">Workouts</a></li>
                <li onClick={this.handleClickItem}><a className="menu-but" href="#">Ideas</a></li>
                <li onClick={this.handleClickItem}><a className="menu-but" href="#">Bookmarks</a></li>
                <li onClick={this.handleClickItem}><a className="menu-but" href="#">Tracker</a></li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else if (!this.state.isClicked) {
      return (
        <i className="fa-solid fa-bars bar" onClick={this.handleClickModal} />
      );
    }
  }
}
