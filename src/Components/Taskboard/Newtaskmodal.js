/*import React,{Component} from 'react';


class Newtaskmodal extends Component{

    clickHandler = () =>{
        const taskname=document.getElementById("newtaskName").value;
        this.props.onclickAddTask(this.props.idx,taskname);
    }

    render(){
        return(
            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <input type="text" id="newtaskName" placeholder="New Task" className="newtask_modal_inputfield"/>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="close" 
                                data-dismiss="modal" onClick={()=>{this.clickHandler()}}>
                                Ok
                            </button>
                        </div>
                    </div>
                
                </div>
            </div>
        );
    }
}

export default Newtaskmodal;

*/