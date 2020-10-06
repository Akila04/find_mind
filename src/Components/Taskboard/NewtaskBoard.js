import React,{Component} from 'react';
import swal from '@sweetalert/with-react'


class NewtaskBoard extends Component{
    constructor(){
        super();
        this.state={
            completed:false
        }

    }
    
    onclickAddTask = (idx,taskname) =>{
        if(taskname !== null){
            var task=this.props.task;
            var newtask={
                title:taskname,
                details:"",
                date:"",
                completed:false
            }
            task.push(newtask);
            this.props.updatetasks(idx,task);
            
        }
    }

    completetask = (index,item) =>{
        this.props.completetask(index,item);
    }


    render(){
        var task=this.props.task;
        const first = task[0];
        task=task.slice(1,task.length);
        return(
            <div className="new_task_board">
                <p className="taskboard_Heading">My Task</p>
        
                <div class="dropdown menu_icon">
                <a class="dropdown-toggle" type="button" data-toggle="dropdown">
                    <i class="fa fa-ellipsis-v " aria-hidden="true"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><a onClick={()=>{
                        this.props.deletetask(this.props.idx)
                    }}>Delete</a></li>
                </ul>
                </div>
                
                
                <p className="taskboard_content"> 
                <a onClick={()=>{
                    swal("Enter Titile:", {
                        content: "input",
                      })
                      .then((value) => {
                        this.onclickAddTask(this.props.idx,value);
                      });
                }}>
                    <i class="fa fa-plus-circle taskboard_icon" aria-hidden="true"></i>
                </a>
                <p className="task_title">{first.title}</p>
                </p>
                {
                    task.map((t,index)=> (
                    <div key={index}>
                        <div className={t.completed?"taskboard_content taskboard_content_completed":"taskboard_content"}> 

                            <a onClick={(idx,item)=>{this.completetask(this.props.idx,index)}}>
                            {t.completed ? <i class="fa fa-check-circle-o taskboard_icon_completed taskboard_icon" aria-hidden="true"></i> : <i class="fa fa-circle-thin taskboard_icon" aria-hidden="true"></i>}
                            </a>
                            
                            <p className="task_title">{t.title}</p>
                            <a  onClick={()=>{
                                const content = document.createElement("div");

                                const additionalinput = document.createElement("textarea");
                                additionalinput.value=t.details;
                                additionalinput.placeholder="Enter details";
                                additionalinput.className="details_textbox"
                                content.append(additionalinput);

                                content.append(document.createElement("br"))
                                content.append(document.createElement("br"))

                                const input = document.createElement("input");
                                input.type = "date";
                                input.className="date_textbox"
                                input.value=t.date;
                                content.appendChild(input);
                                
                                

                                const validate = () =>{
                                    this.props.addtaskdetails(this.props.idx,additionalinput.value,input.value,index);
                                }
                                swal({
                                    title: t.title,
                                    content
                                  })
                                .then(
                                    validate
                                )
                                }}>
                                <i class={t.completed ? "fa fa-pencil taskboard_icon_completed edit_icon":"fa fa-pencil edit_icon"} aria-hidden="true"></i>
                            </a>
                            <p className="task_details">
                            {t.details}
                            </p>
                            <p className={t.completed ? "taskboard_date_completed task_details_date" : "task_details_date"}>
                                {t.date}
                            </p>
                        </div>
                        
                    </div>
                    ))
                }

            </div>
        );
    }
}


export default NewtaskBoard;