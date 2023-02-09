import React from 'react';
import Home from './pages/home';
import Form from './pages/form';
import Header from './components/header';
import { parseRoute } from './lib';
import DrawerModal from './components/menu';
import Workouts from './pages/workouts';
import EditForm from './pages/editform';
import Ideas from './pages/ideas';
import Bookmarks from './pages/bookmarks';
import Tracker from './pages/tracker';
import SignIn from './pages/sign-in';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      workouts: '',
      details: '',
      token: window.localStorage.getItem('Token')
    };
    this.updateInfo = this.updateInfo.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const hello = parseRoute(window.location.hash);
      this.setState({ route: hello });

    });
    /**
     * Listen for hash change events on the window object
     * Each time the window.location.hash changes, parse
     * it with the parseRoute() function and update state
     */
  }

  updateInfo(x, y) {
    this.setState({ workouts: { x }, details: { y } });
  }

  signOut() {
    localStorage.setItem('Token', null);
    localStorage.setItem('UserID', null);
    window.location.hash = '';
    this.setState({ token: null });
  }

  renderPage() {
    const { route } = this.state;
    if (this.state.token === null) {
      return <SignIn />;
    } else {
      if (route.path === 'home') {
        return <Home />;
      }
      if (route.path === 'form') {
        return <Form/>;
      }
      if (route.path === 'workouts') {
        return <Workouts updateInfo={this.updateInfo}/>;
      }
      if (route.path === 'editform') {
        return <EditForm workouts={this.state.workouts} details={this.state.details}/>;
      }
      if (route.path === 'ideas') {
        const offset = route.params.get('results');
        return <Ideas offset={offset}/>;
      }
      if (route.path === 'bookmarks') {
        return <Bookmarks />;
      }
      if (route.path === 'tracker') {
        return <Tracker />;
      }
    }
  }

  render() {
    if (this.state.token === null) {
      return (
        <>
          <Header />
          {this.renderPage()}
        </>

      );
    } else {
      return (
        <>
          <DrawerModal/>
          <Header />
          <button onClick={this.signOut} className="sign-out-but"> Sign Out </button>
          {this.renderPage()}
        </>
      );
    }
  }
}
