import React, { Component } from 'react'
import a from './yoyo.png'
import '../../static/css/index.css';
//import b from '../../static/images/singer2.png'
//import c from '../../static/images/headset.png'
//import d from '../../static/images/singer.png'
import e from '../../static/images/swag.png'
import f  from '../../static/images/girl.png'
import g  from '../../static/images/group.png'
import h  from '../../static/images/crowd.png'
//import i  from '../../static/images/singer3.png'
import j  from '../../static/images/music3.png'
//import k  from '../music4.png'
//import music from'../../static/images/sat.mp3'
export default class HomeComponent extends Component {
    render() {
        return (
            <div >
            <div className="audi" >
                
          
            {/* <audio autoplay muted >
  <source src={music} type="audio/ogg"/>
  <source src={music} type="audio/mpeg"/>

</audio> */}
            </div>
     
                <img src={a} className="col-sm-12" id="col"></img>
                
                <span className="col-sm-4"><h2>Enjoy your day with lots of fun</h2> </span>
                 <span className="col-sm-4"><h2>Create a Room with Your friends and party</h2></span>
                 <span className="col-sm-4"><h2>Invite Friends and Have Fun</h2></span>
              
                <div>
                 <img src={j} className="col-sm-6"  ></img>
               
                 <img src={e} className="col-sm-6" ></img>
                 <span className="col-sm-4"><h3 className="h3">MAKE IT LARGE</h3></span>
                 <span className="col-sm-8"><h3 className="h90">ZING ZAP IT</h3></span>
                 <span className="col-sm-12"><center><h3>CRACKER NEEDS ITS FUEL</h3></center></span>
                 <span className="col-sm-12"><center><h3>PEOPLE NEED MUSIC</h3></center></span>
                 <img src={h} id="colu"className="col-sm-4"  ></img>

                 <img src={f} id="colu2"className="col-sm-4" ></img>
                  <img src={g} id="colu3" className="col-sm-4" ></img>
                 </div>
                



             
            </div>
        )
    }
}
