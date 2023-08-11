import logo from "./logo.svg";
import csvdata from "./username.csv";
import React from "react";
import Navbar from "./Navbar";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  async componentDidMount() {
    const response = await fetch(csvdata);
    const text = await response.text();

    this.setState({ data: text });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        Data is {data}
      </div>
    );
  }
}

export default App;
