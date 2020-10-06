import React, {Component} from 'react';
import './taskboard.css'
import Navigationbar from './Navigationbar';
import NewtaskBoard from './NewtaskBoard';
import { Redirect } from 'react-router-dom';

class Taskboard extends Component{
    constructor(props){
        super(props);
        const email=localStorage.getItem("EmailId");
        const password=localStorage.getItem("password");
        const tasks=JSON.parse(localStorage.getItem("tasks"));
        var loggedin;
        if(email!==null){
            loggedin=true;
        }
        else{
            loggedin=false;
        }
        this.state={
            loggedin:loggedin,
            tasks:tasks
        }
    }
    updatetasks = (idx,task) =>{
        
        var tasks=this.state.tasks;
        tasks[idx]=task;
        this.setState({tasks:tasks});
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }
    deletetask = (idx) =>{
        
        var tasks=this.state.tasks;
        delete tasks[idx];

        var filtered = tasks.filter(function(x) {
            return x !== undefined;
         });
         
        this.setState({tasks:filtered})
        localStorage.setItem("tasks",JSON.stringify(filtered))

    }
    completetask = (index,item) =>{

        var task=this.state.tasks[index];
        task[item+1].completed=!task[item+1].completed

        var tasks=this.state.tasks;
        tasks[index]=task;
        this.setState({tasks:tasks});
        localStorage.setItem("tasks",JSON.stringify(this.state.tasks))


    }

    gettasks = (tasks) =>{
        if(tasks){
        return(
            <div>
                {
                    tasks.map((task,index )=> (
                    <NewtaskBoard 
                        task={task} key={index} 
                        idx={index} updatetasks={(idx,task)=>{this.updatetasks(idx,task)}}
                        addtaskdetails={(index,details,date,item)=>{this.addtaskdetails(index,details,date,item)}}
                        deletetask={(idx)=>{this.deletetask(idx)}}
                        completetask={(index,item)=>{this.completetask(index,item)}}
                        />
                    
                    ))
                }
            </div>
        );
        }
    }

    getNewTaskBoard = () =>{
        var task=[];
        task[0]={
            title:"Add Task",
            details:"",
            date:"",
            completed:false
        }
        this.setState({tasks:[...this.state.tasks,task]});
        localStorage.setItem("tasks",JSON.stringify(this.state.tasks))
        
    }

    addtaskdetails = (index,details,date,item) =>{
            var task=this.state.tasks[index];
            task[item+1].details=details;
            task[item+1].date=date
            var tasks=this.state.tasks;
            tasks[index]=task;
            this.setState({tasks:tasks});
            localStorage.setItem("tasks",JSON.stringify(this.state.tasks))
        
    }

    logout = () =>{
        localStorage.setItem("logged_in",false)
        this.setState({loggedin:false});
        
    }


    render(){
        if(this.state.loggedin){
            return(
                <div> 
                    <Navigationbar logout={()=>{this.logout()}}/>
                    {this.gettasks(this.state.tasks)}
                    <div className="add_taskbox_button_field">
                        <button className="add_taskbox_button" onClick={()=>{this.getNewTaskBoard()}}>
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                        </button>

                    </div>
                </div>
            );
        }
        else{
            return(
            <Redirect to="/login" />
            );
        }
    }
}
export default Taskboard;

