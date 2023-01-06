import React from 'react';
import Home from './pages/home';
import Form from './pages/form';
import Header from './components/header';
import { parseRoute } from './lib';
import DrawerModal from './components/menu';
import Workouts from './pages/workouts';
import EditForm from './pages/editform';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
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

  renderPage() {

    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'form') {
      return <Form/>;
    }
    if (route.path === 'workouts') {
      return <Workouts/>;
    }
    if (route.path === 'editform') {
      return <EditForm/>;
    }
  }

  render() {
    return (
      <>
        <DrawerModal/>
        <Header />
        {this.renderPage()}
      </>
    );
  }
}
