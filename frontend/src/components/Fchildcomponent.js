import React, { Component } from 'react'
// import Formcomponent from './Formcomponent'
// import Forwardref from './Forwardref'
// import axios from 'axios'
import CSRFToken from './csrftoken';
export default class Fchildcomponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Name:'',
             host:true,
             No_of_Users:'',
             No_change_music:'',
             HallName:'',
             number:'',
             vis:"hidden",
             copySuccess: '',
             
        }
        var divstyle={
            visiblity:"hidden"
        } 
        this.inputRef = React.createRef()
       // this.handleInput=this.handleInput.bind(this)
    // call back ref
        this.cbref=null
    this.setcbref = (element) =>{
        this.cbref=element
    }
    }
      getCookie(name){
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    clickhandler=()=>{
        if(this.cbref)
        {
            this.cbref.focus()
        }
    // this.inputRef.current.focus()
    }
    // clickhandler =()=>{
    //        alert(this.inputRef.current.value)       
    // }
    textHandler=(event)=>{
         this.setState({Name:event.target.value},()=>console.log(this.state.Name))
    }
    
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    numbergenerator =() =>
    {
        this.setState({
            number: Math.floor(1000 + Math.random() * 9000),
            vis:"visible",
        },()=>{alert(`${this.state.number}`)});
        var divstyle={
            visiblity:"visible"
        } 
       
    }
    submission =(e)=>{
        e.preventDefault();
       

        // fetch('api/wel/', {
        //     credentials: 'include',
        //     method: 'POST',
        //     mode: 'same-origin',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json',
             
        //     },
        //     body: {
        //         "Name": this.state.name,
        //         "host": this.state.host,
        //         "No_of_Users":this.state.users,
        //         "No_change_music":this.state.change,
        //         "HallName":this.state.hallname,
        //         "number":this.state.number,
        //     }
        //    })
        //    .then((response)=>response.json())
        //    .then((data)=>console.log(data));
          
        const requestOptions={
            method:"POST",
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({
                Name: this.state.Name,
                host: this.state.host,
                No_of_Users:this.state.No_of_Users,
                No_change_music:this.state.No_change_music,
                HallName:this.state.HallName,
                number:this.state.number,
            }),
        };
        fetch('api/wel/',requestOptions)
        .then((response)=>response.json())
        .then((data)=>console.log(data));
        

        // .then((res) => {
              
        //             console.log("keerthi")
        //             this.setState({
    
        //                 name: "",
        //                 host: "",
        //                 users:'',
        //                 change:'',
        //                 hallname:'',
        //                 number:'',
                        
    
        //             })
               
       
       
            
                
            }
        // let url=''
        // console.log("step1")
        // axios("http://localhost:8000/wel/", {
                
            
                
        //     })
        //     .then((res) => {
              
        //         console.log("keerthi")
        //         this.setState({

        //             name: "",
        //             host: "",
        //             users:'',
        //             change:'',
        //             hallname:'',
        //             number:''
                    

        //         });
               
          
  
       
        //     })
        //     // .catch((err) => {});
    //       if(this.state.Name !==""){        
    //         alert(`${this.state.Name} Your code is generated`);
            
    //       }
    //  //to avoid page refresh 
    //       else{
    //           alert("name error");
    //           event.preventDefault()
                // }
    // console.log("keerthi")
    // e.preventDefault();
    //     }
            
    myFunction =()=> {
        /* Get the text field */
        var copyText = document.getElementById("myInput");
      
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
      
        /* Copy the text inside the text field */
        document.execCommand("copy");
      
        /* Alert the copied text */
        alert("Copied the text: " + copyText.value);
      }
    //        }
    copyToClipboard = (e) => {
        this.textArea.select();
        

        console.log(document.execCommand('copy'));
        // This is just personal preference.
        // I prefer to not show the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
      };

    render() {
        return (
            
        <div >
       
       
                       
           
             <form className="box" action="api/wel/"  method="post">
                  <CSRFToken />
                 <div><label>HallName</label>
                 <input type="text" value={this.state.HallName} onChange={this.handleInput} ref={this.setcbref} name="HallName"  className="form-control col-sm-2" required />
                 
                   </div>
 
    
                   <div><label>UserName</label>
                 <input type="text" value={this.state.Name} onChange={this.handleInput}  name="Name"  className="form-control col-sm-2" required />
                 
                   </div>
                  
                   <input type="text"  value="true"  name="host"  className="Host"  /> 
                   
                  <div>
                  <label>Total Users</label>
                  <input type="number"  min="0" value={this.state.No_of_Users} onChange={this.handleInput} name="No_of_Users"  className="form-control col-sm-2" required />
     </div><br/>
     <br/>
     <div className="Host">
     <input type="number" className="Host" name="number" className="form-control col-sm-2" value={this.state.number} id="myInput"/>
     </div>
     <div>
     <label>Users to Change Music</label>
     <input type="number"  name="No_change_music" min="0" value={this.state.No_change_music} onChange={this.handleInput} className="form-control col-sm-2" required />
     </div>
    
<div>
                      <button  type="submit" onClick={this.numbergenerator} className="btn btn-warning">Create</button>
                      </div>
             </form>


{
             document.queryCommandSupported('copy') &&
            <div className="num"  style={{visibility:`${this.state.vis}`}} >
            <div className="box"
> 
          <input type="number" name="number" className="form-control col-sm-2" value={this.state.number} id="myInput"/>

               <button className="btn btn-primary" onclick={this.copyToClipboard}>Copy!</button>
               {this.state.copySuccess}
               </div>
               </div>
             
    }
             </div>
       )
    }
}
