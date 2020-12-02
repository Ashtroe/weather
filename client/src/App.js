import React from 'react';
import './styles.css'
import Weather from './components/Weather.js'
import Submit from './components/Submit.js'
import Card from './components/Card.js'
import axios from 'axios'

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
  getData(userCity){
    axios(
      {
      method:'post',
      url:'/getweather',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data:{
        'city':userCity
      }
    })
      .then(response=>{
        console.log(response);
        this.setState({
          data:response.data,
          icon:'https://openweathermap.org/img/wn/' + response.data.current.weather[0].icon + '@2x.png',
          temp: Math.floor(response.data.current.temp) + '°',
          precip:response.data.current.weather[0].description,
          feel: Math.floor(response.data.current.feels_like) + '°',
          wind: Math.floor(response.data.current.wind_speed) + ' mph',
          lat: response.data.lat,
          lon: response.data.lon,

        })
        return (response);
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
