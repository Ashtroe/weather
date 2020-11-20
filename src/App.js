import React from 'react';
import './styles.css'
import Weather from './components/Weather.js'
import Submit from './components/Submit.js'
import Card from './components/Card.js'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state={
      data:{},
      icon:null,
      temp:null,
      feel:null,
      wind:null,
      uvIndex:null,
      fiveDayTemps:{
        current:{
          uvi:null,
        },
        daily:{
          0:{
            temp:{
              max:null
            }
          },
          1:{
            temp:{
              max:null
            }
          },
          2:{
            temp:{
              max:null
            }
          },
          3:{
            temp:{
              max:null
            }
          },
          4:{
            temp:{
              max:null
            }
          },
          5:{
            temp:{
              max:null
            }
          },
        },
      },
      weekDays:[]
    }

    this.getData = this.getData.bind(this)
  }
  getData(city){

    fetch('https:api.openweathermap.org/data/2.5/weather?q='+ city +'&units=imperial&appid=04b8e3d0941e9ffc8add608468e01320')
      .then(response=>response.json())
      .then(response=>{
        this.setState({
          data:response,
          icon:'https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png',
          temp: Math.floor(response.main.temp) + '°',
          precip:response.weather[0].description,
          feel: Math.floor(response.main.feels_like) + '°',
          wind: response.wind.speed + ' mph',
          lat: response.coord.lat,
          lon: response.coord.lon,

        })
        return (response);
      })
      .then(response=>{
        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&exclude=hourly,minutely&units=imperial&appid=04b8e3d0941e9ffc8add608468e01320')
      })
      .then(response=>response.json())
      .then(response=>{
        this.setState({
          fiveDayTemps: response
        })
      })

    }




  render(){

    return(
    <div className='app-ctnr'>
      <div className='search-ctnr'>
      <input className= 'city'
        onKeyDown={
          (e)=>{
            if(e.keyCode===13){
              this.getData(document.querySelector('.city').value)
              document.querySelector('.week-ctnr').style.display = 'flex'
            }
          }
        }
        />
        <Submit
          onClick={()=>{
            this.getData(document.querySelector('.city').value)
            document.querySelector('.week-ctnr').style.display = 'flex'
          }}
          lat= {this.state.lat}
          lon= {this.state.lon}
        />

      </div>

        <Weather
          city={this.state.data.name}
          icon={this.state.icon}
          temp={this.state.temp}
          precip={this.state.precip}
          feel={this.state.feel}
          wind={this.state.wind}
          uvIndex={this.state.fiveDayTemps.current.uvi}
        />
        <div className='week-ctnr'>
          <Card weekDay= {new Date(this.state.fiveDayTemps.daily[1].dt * 1000).getDay()} dayTemp={this.state.fiveDayTemps.daily[1].temp.max} />
          <Card weekDay= {new Date(this.state.fiveDayTemps.daily[2].dt * 1000).getDay()} dayTemp={this.state.fiveDayTemps.daily[2].temp.max} />
          <Card weekDay= {new Date(this.state.fiveDayTemps.daily[3].dt * 1000).getDay()} dayTemp={this.state.fiveDayTemps.daily[3].temp.max} />
          <Card weekDay= {new Date(this.state.fiveDayTemps.daily[4].dt * 1000).getDay()} dayTemp={this.state.fiveDayTemps.daily[4].temp.max} />
          <Card weekDay= {new Date(this.state.fiveDayTemps.daily[5].dt * 1000).getDay()} dayTemp={this.state.fiveDayTemps.daily[5].temp.max} />
        </div>
      </div>
  )}
}


export default App;
