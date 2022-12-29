import React from 'react';
import Header from '../components/hello-world';

export default function Home(props) {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="bg-img background" />
    </div>
  );
}
