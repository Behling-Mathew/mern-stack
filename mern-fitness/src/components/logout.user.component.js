import React from 'react'
import { Link } from 'react-router-dom';

class logout extends React.Component {

    constructor(props) {
        super(props);
        //
        //window.location = '/chat'
    }
    handleClick(){
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        window.location.reload();
        window.location = '/user/signin';
        
    }
    
render() {
    
    return(
        <li className="navbar-item">
                <Link to="/user/logout" className="nav-link" onClick={this.handleClick}>Logout</Link>
        </li>
        )
    }
    
}

export default logout

