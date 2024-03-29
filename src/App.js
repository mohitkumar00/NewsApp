import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
         <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<News key='general' pageSize={12} country='in' category='general' />}></Route>
            <Route path='/business' element={<News key='bininess' pageSize={12} country='in' category='business' />}></Route>
            <Route path='/entertainment' element={<News key='entertainment' pageSize={12} country='in' category='entertainment' />}></Route>
            <Route path='/health' element={<News key='health' pageSize={12} country='in' category='health' />}></Route>
            <Route path='/science' element={<News key='science' pageSize={12} country='in' category='science' />}></Route>
            <Route path='/sports' element={<News key='sports' pageSize={12} country='in' category='sports' />}></Route>
            <Route path='/technology' element={<News key='technology' pageSize={12} country='in' category='technology' />}></Route>
          </Routes>
        </Router>
      </div>  
    )
  }
}



