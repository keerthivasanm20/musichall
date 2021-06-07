import React, { Component } from 'react'

export default class Roomcomponent extends Component {
    
    
    constructor(props) {
        super(props)
    
        this.state = {
             Name:'Keet',
             host:'yes',
             HallName:'',
             No_of_Users:'',
             
        }
        this.roomCode =this.props.match.params.room;
        this.getRoomDetails();
        console.log("th")
    }
    
    getRoomDetails()
    {
        fetch('/api/getroom' + '?code=' + this.roomCode).then((response)=>
            response.json()
   ).then((data)=>{
       this.setState({
           Name:data.Name,
           HallName:data.HallName,
           No_of_Users:data.No_of_Users,

       });
   });
    }
   
    
    render() {
        return (
            <div id="hey" >
            <h1>{this.state.HallName}</h1>
           
            <h3 >Room code :{this.roomCode}</h3>
            <h3>Number of Users:{this.state.No_of_Users}</h3>
            <h3> Host by:{this.state.Name}</h3>
            
            </div>
        )
    }
}
