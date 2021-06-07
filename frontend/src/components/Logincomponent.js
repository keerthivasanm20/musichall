import React, { Component } from 'react'
import Roomcomponent from './Roomcomponent';
// import axios from 'axios'
export default class Logincomponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             detail:{}
        }
    }
    
    componentDidMount() {
  
        const requestOptions={
            method:"GET"
            
        };
        fetch("auth/",requestOptions)
        .then((response)=>response.json())
        
    
        .then((data)=>{window.location.replace(data.url)});
        
    }
    render() {
        return (
            <div>
                HELloBanana
              
            </div>
        )
    }
}
