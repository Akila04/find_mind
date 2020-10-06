import React,{Component} from 'react';
import './taskboard.css'

class Profile extends Component{
    
    render(){
        const img=localStorage.getItem("profileimg");
        return(
            <div className="profile_image_filed dropdown">
                <a className="dropdown-toggle" type="button" data-toggle="dropdown">
                <img src={img} className="profileimg" />
                </a>
                
                <ul className="dropdown-menu dropDownmenu">
                    <li><a onClick={
                        this.props.logout
                    }>Log Out</a></li>
                </ul>
                
            </div>
        );
    }
}

export default Profile;