import colorData from "../color_srgb.csv";
import React from "react";
import Papa from 'papaparse';
import "../App.css";

  function sortColors(sortOrder,colors){
          console.log(sortOrder)
          if(sortOrder === 'asc'){
            return colors.sort(function(a, b){return a.Name.localeCompare(b.Name)});
          }else if(sortOrder === 'des'){
            return colors.sort(function(a,b){return b.Name.localeCompare(a.Name)});
          }else if(sortOrder === '+star'){
            return colors.sort(function(a, b){return b.star - a.star});
          }else if(sortOrder === '-star'){
            return colors.sort(function(a, b){return a.star - b.star});
          }else {
            return colors.sort(o => o.Name);
          }
        }
function dateformating(){

  const date = new Date(2009, 10, 10);  // 2009-11-10
const month = date.toLocaleString('default', { month: 'long' });
console.log(month);
}
class App extends React.Component {
  constructor(props) {super(props);
    this.state = { data: null, lightOrDark: '',temp:'',sortOrder:'', };

  }
  
  async componentDidMount() {
    const response = await fetch(colorData);
    const csvText = await response.text();
    
    const parsedData = Papa.parse(csvText,{header:true}).data;

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
              return color.shininess === 'dull'
          } else if (lightOrDark === 'light') {
              return color.shininess === 'bright'
          } else {
              return true
          }
          //console.log(text); 
      }
      function filterTemp(temp, color) {
        if (temp === 'warm') {
            return color.temp === 'warm'
        } else if (temp === 'cool') {
            return color.temp === 'cool'
        } else {
            return true
        }
      
    }
      // const a =["red",(color[3])]
      const filteredColors = data.filter(
          color => filterColor(lightOrDark, color) && filterTemp(temp,color)
      )
      const sortedColors = sortColors(sortOrder,filteredColors)

      const colors = sortedColors.map(color => { 
          return <div key={color.Name}
          className={color.shininess}
          style={{
              backgroundColor: color.HEX,
              width: '100px',
              margin: '10px',
              padding: '0px',
              border: "1px solid black"
          }}>
          <img src={`imo/${color.imo}`} alt="Italian Trulli"/>
          {/* <h1>{color[0]}</h1> */}
          {/* <p>kkkk+{color[0]}</p>   */}
          <p>{green()}</p>  
          <h4>{color.Name}</h4>
          </div>
          
      })
      console.log(colors)
      dateformating()
      //colors.slice(2,8)

      return (
          <div>
              <label htmlFor="options">Choose an option</label>
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
                <option value="+star">star asc</option>
                <option value="-star">star dec</option>
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