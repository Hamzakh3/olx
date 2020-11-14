// import './App.css';
import React from 'react'


// import Navbar from './components/Navbar';
// import Chat from './containers/Chat';
// import Home from './containers/Home';
// import Login from './containers/Login';
// import MyAds from './containers/MyAds';
// import Setting from './containers/Setting';
// import Post from './containers/Post';
// import Product from './containers/Product';
// import { BrowserRouter as Route, Router, Switch } from 'react-router-dom';
import AppRouter from './assets/config/Router'
// import { Provider } from 'react-redux';



class App extends React.Component {

  render() {
    return (
        <div className="App">
          <AppRouter />
        </div>
    )
  }
}

export default App;
