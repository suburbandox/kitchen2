import colorData from "../color_srgb.csv";
import React from "react";
import Papa from 'papaparse';
import "../App.css";

  function sortColors(sortOrder,color){
    console.log(sortOrder)
          if(sortOrder === 'asc'){
            return color.sort();
          }else if(sortOrder === 'des'){
            return color.sort().reverse();
          }else if(sortOrder === '+star'){
            debugger
            return color.sort(function(a, b){return b[7] - a[7]});
          }else if(sortOrder === '-star'){
            return color.sort(function(a, b){return a[7] - b[7]});
          }else {
            return color.sort();
          }
        }

class App extends React.Component {
  constructor(props) {super(props);
    this.state = { data: null, lightOrDark: '',temp:'',sortOrder:'', };

  }
  
  async componentDidMount() {
    const response = await fetch(colorData);
    const csvText = await response.text();
    
    const parsedData = Papa.parse(csvText).data.slice(1);

    this.setState({ data: parsedData });
  }

  render() {
      const { data, lightOrDark,temp,sortOrder} = this.state;

      if (data === null) {
          return 'loading...'
      }

      function green(){
        return "red"
      }
      function filterColor(lightOrDark, color) {
          if (lightOrDark === 'dark') {
              return color[3] === 'dull'
          } else if (lightOrDark === 'light') {
              return color[3] === 'bright'
          } else {
              return true
          }
          //console.log(text); 
      }
      function filterColor2(temp, color) {
        if (temp === 'warm') {
            return color[6] === 'warm'
        } else if (temp === 'cool') {
            return color[6] === 'cool'
        } else {
            return true
        }
      
    }
      // const a =["red",(color[3])]
      const filteredColors = data.filter(
          color => filterColor(lightOrDark, color) && filterColor2(temp,color)
      )
      const sortedColors = sortColors(sortOrder,filteredColors)

      const colors = sortedColors.map(color => {
          return <div
          className={color[3]}
          style={{
              backgroundColor: color[1],
              width: '100px',
              margin: '10px',
              padding: '0px',
              //border: "1px solid black"
          }}>
          <img src={`imo/${color[4]}`} alt="Italian Trulli"/>
          {/* <h1>{color[0]}</h1> */}
          {/* <p>kkkk+{color[0]}</p>   */}
          <p>{green()}</p>  
          <h1>{color[7]}</h1>
          {color[0]}</div>
          
      })
      //console.log(colors)
      //colors.slice(2,8)

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
              <select onChange={(event) => {
                  this.setState({temp: event.target.value})
              }}>
                <option value="all">Show all</option>
                <option value="warm">Warm Only</option>
                <option value="cool">Cool Only</option>
              </select>
              <select onChange={(event) => {
                  this.setState({sortOrder: event.target.value})
              }}>
                <option value="asc">asc </option>
                <option value="des">des </option>
                <option value="+star">+star </option>
                <option value="-star">-star </option>
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