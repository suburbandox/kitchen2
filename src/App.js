import colorData from "./color_srgb.csv";
import React from "react";
import Papa from 'papaparse';
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, lightOrDark: '' };
  }

  async componentDidMount() {
    const response = await fetch(colorData);
    const csvText = await response.text();

    const parsedData = Papa.parse(csvText).data.slice(1);

    this.setState({ data: parsedData });
  }

  render() {
      const { data, lightOrDark } = this.state;

      if (data === null) {
          return 'loading...'
      }

      function filterColor(lightOrDark, color) {
          if (lightOrDark === 'dark') {
              return color[3] === 'dull'
          } else if (lightOrDark === 'light') {
              return color[3] === 'bright'
          } else {
              return true
          }
      }

      const colors = data.filter(
          color => filterColor(lightOrDark, color)
      ).map(color => {
          return <div
          className={color[3]}
          style={{
              backgroundColor: color[1],
              width: '100px',
              margin: '10px',
              padding: '5px'
          }}>{color[0]}</div>
      })

      return (
          <div>
              <label for="options">Choose an option</label>
              <select onChange={(event) => {
                  this.setState({lightOrDark: event.target.value})
              }}>
                <option value="all">Show all</option>
                <option value="dark">Dark Only</option>
                <option value="light">Light Only</option>
              </select>
            <div className="App" style={{
                  display: 'flex',
                  width: '80%',
                  margin: '10px auto',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
              }} >
            {colors}
          </div>
        </div>
    );
  }
}

export default App;
