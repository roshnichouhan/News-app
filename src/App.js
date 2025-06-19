
import './App.css';
import React, { Component } from 'react';
import NavBar from './component/NavBar';
import News from './component/News';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export class App extends Component {
apiKey = process.env.REACT_APP_NEWS_API_KEY;
  state ={
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    });
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
          color ="#f11946"
          progress={this.state.progress}
          height={3}
          
          />
            <Routes>
              <Route path="/" element={<News setProgress={this.setProgress}   key="general" pageSize={6} country="us" category="general" />} />
              <Route path="/business" element={<News setProgress={this.setProgress}   key="business" pageSize={6} country="us" category="business" />} />
              <Route path="/entertainment" element={<News setProgress={this.setProgress}   key="entertainment" pageSize={6} country="us" category="entertainment" />} />
              <Route path="/general" element={<News setProgress={this.setProgress}   key="general" pageSize={6} country="us" category="general" />} />
              <Route path="/health" element={<News setProgress={this.setProgress}   key="health" pageSize={6} country="us" category="health" />} />
              <Route path="/science" element={<News setProgress={this.setProgress}   key="science" pageSize={6} country="us" category="science" />} />
              <Route path="/sports" element={<News setProgress={this.setProgress}   key="sports" pageSize={6} country="us" category="sports" />} />
              <Route path="/technology" element={<News setProgress={this.setProgress}   key="technology" pageSize={6} country="us" category="technology" />} />
            </Routes>
        </Router>
      </div>
    );
  }
}


export default App;