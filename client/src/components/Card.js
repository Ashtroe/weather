import React from 'react'


function Card(props){
  let days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thurs',
    'Fri',
    'Sat',
  ]
  if(props.dayTemp){
    return(
        <div className='week-card'>
          <h2 id='week-day'>{days[props.weekDay]}</h2>
          <h2 id='day-temp'>{Math.floor(props.dayTemp)+'°'}</h2>
        </div>
    )
  }else{
    return('')
  }

}

export default Card
