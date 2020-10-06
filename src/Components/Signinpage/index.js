import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import './signinpage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Signinpage extends Component{
    constructor() {
        super();
        localStorage.removeItem("profileimg");
        const num=Math.floor((Math.random() * 100));
        this.state = {
         email:'',
         password:'',
         username:'',
         field_active_email:false,
         field_active_password:false,
         field_active_username:false,
         error:{
             email:'',
             password:'',
             username:''
         },
         num:num,
         loggedin:false
        }
    }

    activateField = (e) =>{
        this.setState({
         [e.target.id]:true,
        })
    }

    disableFocus = (e) =>{
        if (e.target.value === "") {
                this.setState({
                    [e.target.id]:false,
            })
        }
    }

    updateInputValue = (e) =>{
        const validEmailRegex = RegExp(
            /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          );
        const {name,value}=e.target;
        const {error}=this.state;
        
        switch(name){
            case "username":
                if(value!==""){
                    if(typeof(value) !== "undefined"){
                        if(!value.match(/^[a-zA-Z ]+$/)){
                        error.username= "****Invalid name****";
                        }  
                        else{
                            error.username=""; 
                        }      
                    }
                }
                else{
                    error.username=""; 
                }
                break;
            case "email":
                if(value!==""){
                    if(!validEmailRegex.test(value)){
                        error.email="****Email is not valid****";
                    }
                    else{
                        error.email="";
                    }
                }
                else{
                    error.email=""; 
                }
                break;
            default:
                break;
        }

        this.setState({
         [e.target.name]:e.target.value,
         error
        });
        this.activateField(e);
        e.preventDefault();
    }

    
    componentDidMount(){
        const url="https://picsum.photos/id/"+this.state.num+"/info";
        axios.get(url)
            .then((res) => {
                localStorage.setItem("profileimg",res.data.download_url);
            })
            .catch((err) =>{
                console.log(err);
            })
    }

    submitHandler = (e) =>{
        e.preventDefault();
        var {error,loggedin}=this.state;
        if(error.email === ""){
            localStorage.setItem("EmailId",this.state.email);
            localStorage.setItem("Password",this.state.password);
            const tasks=[[{title:"Add Task",details:"",date:"",completed:false}]];
            localStorage.setItem("tasks",JSON.stringify(tasks));
            localStorage.setItem("logged_in",true);
            loggedin=true;
        }
        this.setState({error,loggedin})
    }
      
    
    render(){
        const loggedin=localStorage.getItem("logged_in");
        if(!this.state.loggedin){
        return(
            <div>
                <div className="container-fluid signinpage">
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <h1 className="heading">Sign in!</h1>
                            <form className="login-form" autoComplete="off" onSubmit={(e)=>{this.submitHandler(e)}}>
                            <div className="field-group">
                                    <label className={this.state.field_active_username ? "field_active_username" : ""}>
                                        Username
                                    </label>
                                    <input className="floating-label" 
                                        type="text" id="field_active_username" 
                                        name="username" value={this.state.username}
                                        onFocus={(e)=>{this.activateField(e)}} 
                                        onBlur={(e)=>{this.disableFocus(e)}}
                                        onChange={(e) =>{this.updateInputValue(e)}}
                                        required
                                    />
                                    <p>{this.state.error.username}</p>
                                </div>
                                <div className="field-group">
                                    <label className={this.state.field_active_email ? "field_active_email" : ""}>
                                        Email&nbsp;Id
                                    </label>
                                    <input className="floating-label" 
                                        type="text" id="field_active_email" 
                                        name="email" value={this.state.email}
                                        onFocus={(e)=>{this.activateField(e)}} 
                                        onBlur={(e)=>{this.disableFocus(e)}}
                                        onChange={(e) =>{this.updateInputValue(e)}}
                                        required
                                    />
                                    <p>{this.state.error.email}</p>
                                </div>
                                <div className="field-group">
                                    <label className={this.state.field_active_password ? "field_active_password" : ""}>
                                        Password
                                    </label>
                                    <input className="floating-label" 
                                        id="field_active_password" name="password" 
                                        type="password" value={this.state.password}
                                        onFocus={(e)=>{this.activateField(e)}} 
                                        onBlur={(e)=>{this.disableFocus(e)}}
                                        onChange={(e) =>{this.updateInputValue(e)}}
                                        required
                                    />
                                </div>
                                <input type="checkbox" 
                                    id="remenber_me" value="remember_me" />
                                    &nbsp;Remember me
                                <br />
                                <div className="loginbutton-field">
                                    <button className="loginbutton"
                                        onClick={(e)=>{this.submitHandler(e)}}>
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                        <Link to="/login">
                            <button className="switchingbutton">Log in</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
        }
        else{
            return(<Redirect to="/taskboard" />)
        }
    }
}

export default Signinpage;