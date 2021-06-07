import React, { Component } from 'react'
// import axios from 'axios'
export default class JoinComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             code:''
        }
        this.handleInput=this.handleInput.bind(this)
    }
    handleInput=(event)=>{
        this.setState({
            code:event.target.value
        })
    }
    jj=(e)=>{
      e.preventDefault();
      
    
        // let data ;
  
        // fetch('http://localhost:8000/1853/')
        // .then(res => {
        //     window.location.replace('http://localhost:8000/'+this.state.code)
        //     data = res.data;
        //     this.setState({
        //         detail : data    
        //     },()=>{console.log(this.state.detail)});

        // })
        // .catch(err => {})
    }
    
    render() {
        return (
           
            <div >
            <form className="box"  action="api/join-room/"  method="post">
                <div><label>Enter the Code</label>
                <input type="number" value={this.state.code} onChange={this.handleInput} ref={this.setcbref} name="code"  className="form-control col-sm-2" required />
                
                  </div>
<div>
                     <button  type="submit" className="btn btn-warning">Join</button>
                     </div>
            </form>
            </div>
        )
    }
}
