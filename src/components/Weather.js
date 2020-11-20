import React from 'react'

 function Weather(props) {
   if(props.icon){
     return (
       <div className='weather-ctnr'>
        <div className="weather-left" >
          <h4 id='city-name'>{props.city}</h4>
          <h1>{(props.temp)}</h1>
          <h4>{(props.precip)}</h4>
        </div>
        <div className= 'weather-right'>
          <img src= {props.icon} alt={props.precip}/>
          <div className='secondary-info'>
            <div className='small-icon' id='feel-icon'></div>
            <p>{props.feel}</p>
            <div className='small-icon' id='wind-icon'></div>
            <p>{props.wind}</p>
            <div className='small-icon' id='uv-icon' ></div>
            <p>{props.uvIndex}</p>
          </div>

        </div>
      </div>
    )
  }else{
    return(null)
  }

}
export default Weather
