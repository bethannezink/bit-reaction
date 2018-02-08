import React, { Component } from 'react';
import LineChart from './components/LineChart.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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

  componentDidMount() {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then(response => response.json())
    .then(data => {
      let price = data.bpi.USD.rate_float;
      console.log(data);
      console.log(price);
      this.setState({data});
    });

  }

  render() {
    return (
      <div className="App">
        <div className="header"></div>
        <LineChart data={this.createDummyData()} />
      </div>
    );
  }
}

export default App;
