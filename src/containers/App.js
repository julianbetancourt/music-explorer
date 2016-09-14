import React, { Component } from 'react';
import Hero from './Hero';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Hero />
        <main>
          <div className="container">
            {this.props.children}
          </div>          
        </main>
      </div>
    );
  }
}

export default App;
