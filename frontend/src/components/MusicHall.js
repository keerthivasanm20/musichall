import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Fchildcomponent from './Fchildcomponent';
import HomeComponent from './HomeComponent';
import JoinComponent from './JoinComponent';

import Logincomponent from './Logincomponent';
import Roomcomponent from './Roomcomponent';
import SongComponent from './SongComponent';

export default class MusicHall extends Component {
    constructor(props) {
        super(props)
       
        this.state = {
             detail:[],
            
        }
       
       
    }
    // componentDidMount() {
  
    //     let data ;
    //     axios.get('http://localhost:8000/wel/')
    //     .then(res => {
    //         data = res.data;
    //         this.setState({
    //             detail : data    
    //         },()=>{console.log(this.state.detail)});

    //     })
    //     .catch(err => {})
    // }
    render() {
        return(
          <div>
<Router>          
<div  >  
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
<a className="navbar-brand" href="#"><h1 className="web">Musiq Hall<span className="glyphicon glyphicon-music"></span></h1></a>
<div className="collapse navbar-collapse"  id="navbarSupportedContent">
<ul className="navbar-nav ">
      <li className="nav-item active">
      <Link to="/" class="nav-link" ><h3 className="home">Home</h3></Link>
        
      </li>
      <li class="nav-item">
      <Link to="/" class="nav-link" ><h3 className="home">about</h3></Link>
      </li>
    
      <li class="nav-item">
        <Link to="/" class="nav-link" ><h3 className="home">Contact</h3></Link>
      </li>
      <li class="nav-item" >
      <Link to="/join" class="nav-link"  ><h3 className="home">Join<span  className="glyphicon glyphicon-plus"></span></h3></Link>
     
      </li>
    
      <li class="nav-item" >
      <Link to="/demo" class="nav-link"  ><h3 className="home">Host<span  className="glyphicon glyphicon-plus"></span></h3></Link>
     
      </li>
      <li class="nav-item">
        <Link to="/login" class="nav-link" ><h3 className="home">Login<span  className="glyphicon glyphicon-user"></span></h3></Link>
      </li>
     
    
      </ul>
      </div>
          </nav>
          </div>
          <div className="content">
          <switch>       

 <Route path="/demo" component={Fchildcomponent}>
</Route>
<Route path="/join" component={JoinComponent}>
</Route>
<Route path="/login" component={Logincomponent}>
</Route>


<Route exact path="/" component={HomeComponent}></Route>
<Route path="/room/:room" component={SongComponent}>
</Route> 
<Route path="/getroom/:room" component={Roomcomponent}>
</Route> 
       
</switch> 
</div>
          </Router>
     
          </div>
        )
     

     
}
    }

