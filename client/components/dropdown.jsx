import React from 'react';
// import Workouts from '../pages/workouts';
export default class Dropdown extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { month: '' };
  // }
  render() {
    const { handleClickItem } = this.props;
    return (
      <div className="month-menu">
        <h3>Select Month</h3>
        <select name="links" /* value={this.state.month} */ onChange={handleClickItem}>
          <option value=''>Please Select</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
    );

  }
}
// <div>
//   <h3>Select Month</h3>
//   <div className="dropdown">
//     <button className="dropbtn">Months</button>
//     <div className="dropdown-content">
//       <a href="#workouts/january">January</a>
//       <a href="#workouts/february">February</a>
//       <a href="#workouts/march">March</a>
//       <a href="#workouts/april">April</a>
//       <a href="#workouts/may">May</a>
//       <a href="#workouts/june">June</a>
//       <a href="#workouts/july">July</a>
//       <a href="#workouts/august">August</a>
//       <a href="#workouts/september">September</a>
//       <a href="#workouts/october">October</a>
//       <a href="#workouts/november">November</a>
//       <a href="#workouts/december">December</a>
//     </div>
//   </div>
// </div>
// <div>
//   <div className='dropdown'>
//     <ul className='dropdown-ul'>
//       <h3>Select Month</h3>
//       <button onClick= {this.handleClickItem}>Months</button>
//     </ul>
//   </div>
// </div>
//   if (this.state.isClicked) {
//     return (
//       <div>
//         <div className='dropdown'>
//           <ul className='dropdown-ul'>
//             <h3>Select Month</h3>
//             <button onClick={this.handleClickItem}>Months</button>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">January</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">February</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">March</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">April</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">May</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">June</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">July</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">August</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">September</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">October</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">November</a></li>
//             <li onClick={this.handleClickItem}><a className="month-but" href="#workouts">December</a></li>
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }
