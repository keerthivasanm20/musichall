
import React, { Component } from 'react'
import CSRFToken from './csrftoken'

export default class SongComponent extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            //  Name:'keert',
            //  host:'yes',
              token:"",
              count:0,
              img:'',

             song:{},
        }
        this.roomCode =this.props.match.params.room;
        this.action="/getroom/"+this.roomCode
        this.getcurrentsong=this.getcurrentsong.bind(this)
        this.getcurrentsong();
        
    }
    componentDidMount()
    {
        this.interval=setInterval(this.getcurrentsong,1000)
    

    }
    componentWillUnmount()
    {
        clearInterval(this.interval);
    }
   
    handleScriptLoad = () => {
        var token =this.state.token;
        console.log(token)
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // Playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
        }
    getcurrentsong()
    {
        fetch('/currentsong'+'?code='+this.roomCode)
        .then((response) =>{
            if(!response.ok){
                   return {};
            }
            else{
               return response.json();
            }
        }).then((data)=>{
            this.setState({
                song:data,
                img:data['image_url'],
                token:data['access_token'],
                 count:this.state.count+1,
            });
            
          this.handleScriptLoad()
         
      
            console.log(data);
        });
         
     
  
    }
    pauseSong()
    {
        
        const requestoptions={
            method:'PUT',
            headers:{"Content-Type":"application/json"},
        }
        fetch("/api/pause",requestoptions).then((response)=>{
            if(!response.ok){
                console.log("error")
                alert("Needs Premium Login");
                return {};
         }
         else{
         
            return response.json();
         }
        })
        
        }
    
    playSong()
    {
       
        const requestoptions={
            method:'PUT',
            headers:{"Content-Type":"application/json"},
        };
        fetch("/api/play",requestoptions)
        .then((response)=>{
            if(!response.ok){
                alert("Needs Premium Login");
                return {};
         }
         else{
           
            return response.json();
         }
        })
       

        }
    
   
    
    render() {
    const songProgress =(this.state.song.time / this.state.song.duration) * 100;

      

        return (
      
            <div id="hey" >
           
                   <h3>Code:{this.roomCode}</h3>
         
              <img className="col-sm-4" id="Music" src={this.state.img}></img>
              <div id="details">
              <h4>{this.state.song.title}</h4>
              <h4>{this.state.song.artist}</h4>
              </div>
              <div>
                  {this.state.song.is_playing  ? <h4><span><button onClick={()=>this.pauseSong()} className="glyphicon glyphicon-pause"></button></span></h4>: <h4><span><button onClick={()=>this.playSong()} className="glyphicon glyphicon-play"></button></span></h4>}
                  <form action="/api/skip" method="POST">
                     <CSRFToken/>
                    <button type="submit" ><h4><span className=" glyphicon glyphicon-step-forward"></span></h4></button>
                    </form>
                </div>
                 
                  
                 <div class="progress" id="pro">
                 <div class="progress-bar progress-bar-striped progress-bar-animated " role="progressbar"  style={{width:songProgress}} aria-valuenow={songProgress} aria-valuemin="0" aria-valuemax="100"></div>
               </div>

                  
                      <form action="/api/leaveroom" method="post" >
                       <CSRFToken/>
                       <button name="code"  value={this.roomCode} className="btn btn-warning" type="submit">Leave Room</button>
                       </form>
                       <form action={this.action} method="get" >
                       
                       <button className="btn btn-primary" type="submit">settings</button>
                       </form>
                      

                 
                 </div>
        )
    }
}
