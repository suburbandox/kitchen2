import colorData from "../color_srgb.csv";
import React from "react";
import Papa from 'papaparse';
import "../App.css";



//import text from '../tp.txt'; 

class App extends React.Component {
  constructor(props) {super(props);
    this.state = { data: null, lightOrDark: '',temp:'',shuffle:'', };

  }
  
  async componentDidMount() {
    const response = await fetch(colorData);
    const csvText = await response.text();
    
    const parsedData = Papa.parse(csvText).data.slice(1);

    this.setState({ data: parsedData });
  }

  render() {
      const { data, lightOrDark,temp,shuffle} = this.state;

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
        function sortcolor(shuffle,color){
          if(shuffle === 'asc'){
            return color.sort();
          }else if(shuffle === 'des'){
            return color.sort().reverse();
          }else if(shuffle === '+star'){
            return color.sort(function(a, b){return b[8] - a[8]});
          }else if(shuffle === '-star'){
            return color.sort(function(a, b){return a[8] - b[8]});
          }else{
            return true
          }
        }

    }
      // const a =["red",(color[3])]
      const colors = data.filter(
          color => filterColor(lightOrDark, color) && filterColor2(temp,color)
      ).map(color => {
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
          {color[0]}</div>
          
      })
      console.log(colors)
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
                  this.setState({shuffle: event.target.value})
              }}>
                <option value="all">Show all</option>
                <option value="asc">asc </option>
                <option value="des">des </option>
                <option value="+star">asc </option>
                <option value="-star">des </option>
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