import React,{Component} from 'react';
import './loginpage.css'
import {  Redirect } from 'react-router'
import { Link } from 'react-router-dom';

class Loginpage extends Component{
    constructor() {
        super();
        this.state = {
         email:'',
         password:'',
         field_active_email:false,
         field_active_password:false,
         error:{
             email:'',
             password:''
         },
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

    submitHandler = (e) =>{
        e.preventDefault();
        var {error,loggedin}=this.state;
        const EmailId=localStorage.getItem("EmailId");
        const Password=localStorage.getItem("Password");
        if(this.state.email === EmailId){
            if(this.state.password===Password){
                error.email=""
                error.password="";
                loggedin=true;   
            }
            else{
                error.password="**** incorrect pasword ****";
            }
        }
        else{
            error.email="**** Email id Not found ****";
            error.password="";
        }
        this.setState({error,loggedin});
    }
      
    
    render(){
        if(!this.state.loggedin){
        return(
            <div>
                <div className="container-fluid loginpage">
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <h1 className="heading">Log in!</h1>
                            <form className="login-form" autoComplete="off">
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
                                    <p>{this.state.error.password}</p>
                                </div>
                                <input type="checkbox" 
                                    id="remenber_me" value="remember_me" />
                                    &nbsp;Remember me
                                <br />
                                <div className="loginbutton-field">
                                    <button className="loginbutton"
                                        onClick={(e)=>{this.submitHandler(e)}}>
                                        Log in
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                        <Link to="/signin">
                            <button className="switchingbutton">Sign In</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
        }
        else{
            return(<Redirect to="/taskboard"/>)
        }
    }
}

export default Loginpage;

