import React, { Component } from 'react';
import LineChart from './components/LineChart.js'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setTimer();
  }
  
  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  setTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.updatePrice.bind(this), 60000);
  }

  updatePrice() {
    this.setState(this.getPrice, this.setTimer);
  }

  getPrice() {

    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then(response => response.json())
    .then(data => {
      let price = data.bpi.USD.rate_float;
      return parseFloat(price.toFixed(2));
    })
    .catch(error => {
      console.log(error);
    });
    
  }

  createDummyData() {
    const data = [];

    for (let x = 0; x <= 30; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x, y});
    }

    return data;
  }

  render() {
    return (
      <div className="App">
        <div className="header"></div>
        <div>test</div>
        {/* <LineChart data={price} /> */}
      </div>
    );
  }
}

export default App;
