import React from 'react'

export default class Submit extends React.Component{
  constructor(props){
    super(props)

    this.state ={

    }
  }
  render(){
    return(
      <button
      onClick={this.props.onClick}
      lat = {this.props.lat}
      lon = {this.props.lon}
      >Submit</button>
    )
  }
}
