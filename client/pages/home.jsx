import React from 'react';
import Header from '../components/hello-world';

export default function Home(props) {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="background-container">
        <div className="bg-img background" />
        <button className="workout-but">Add a Workout</button>
      </div>
    </div>
  );
}
