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
      date:'',
      days:[
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thurs',
        'Fri',
        'Sat',
      ],
      fiveDayTemps:{
        0:'',
        1:{temp:''},
        2:{temp:''},
        3:{temp:''},
        4:{temp:''},
        5:{temp:''},
    },

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
          date: new Date(),
          data:response.data,
          icon:'https://openweathermap.org/img/wn/' + response.data.current.weather[0].icon + '@2x.png',
          temp: Math.floor(response.data.current.temp) + '°',
          precip:response.data.current.weather[0].description,
          feel: Math.floor(response.data.current.feels_like) + '°',
          wind: Math.floor(response.data.current.wind_speed) + ' mph',
          lat: response.data.lat,
          lon: response.data.lon,

          // Five day Temps
          uvIndex:response.data.current.uvi,
          fiveDayTemps:response.data.daily
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
        />
      </div>
        <Weather
          city={this.state.data.name}
          icon={this.state.icon}
          temp={this.state.temp}
          precip={this.state.precip}
          feel={this.state.feel}
          wind={this.state.wind}
          uvIndex={this.state.uvIndex}
        />
        <div className='week-ctnr'>
          <Card weekDay={this.state.days[(new Date().getDay()+1)%7]} dayTemp={this.state.fiveDayTemps[1].temp.max}/>
          <Card weekDay={this.state.days[(new Date().getDay()+2)%7]} dayTemp={this.state.fiveDayTemps[2].temp.max}/>
          <Card weekDay={this.state.days[(new Date().getDay()+3)%7]} dayTemp={this.state.fiveDayTemps[3].temp.max}/>
          <Card weekDay={this.state.days[(new Date().getDay()+4)%7]} dayTemp={this.state.fiveDayTemps[4].temp.max}/>
          <Card weekDay={this.state.days[(new Date().getDay()+5)%7]} dayTemp={this.state.fiveDayTemps[5].temp.max}/>
        </div>
      </div>
  )}
}


export default App;
