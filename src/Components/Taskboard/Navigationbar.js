import React,{Component} from 'react';
import logo from './campusbuild.png'
import Profile from './Profile';

class Navigationbar extends Component{
    render(){
        return(
            <div>
                <div className="navigation_bar">
                    <img src={logo} width="100px" height="100px" />  
                    <p className="navigation_bar_content">TasksBoard</p>
                    <Profile logout={this.props.logout}/>
                </div>
            </div>
        );
    }
}
export default Navigationbar;