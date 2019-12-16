import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logout from "./logout.user.component"


function UserGreeting(props) {
return <h4 className="userGreeting">Welcome back, {localStorage.getItem('username')}!</h4>;
}

function GuestGreeting(props) {
  return <h4 className="userGreeting">Please log in or sign up to continue.</h4>;
}

function Greeting(props) {
  //const li = this.state.token;
  //let li = "Douglas"
  const li = localStorage.getItem('isLoggedIn');
  console.log("in Gretting function token is: "+li)
  if( li === 'true') {
      return <UserGreeting />;
  } else return <GuestGreeting />;
}




export default class Navbar extends Component {

  constructor (props) {
    super(props)
    this.state = {isLoggedIn: ''}
  }

 
//{localStorage.getItem('isLoggedIn') === 'true' && <Logout></Logout>}


/* {localStorage.getItem('isLoggedIn') === 'true' ? (
  <Logout></Logout>
  ) : (
  <li className="navbar-item">
  <Link to="/user/signin" className="nav-link">Login</Link>
  
  </li>
  )} */

render() {
    return (
        <nav className="navbar navbar-expand-lg">
          
            <Link to="/tips" className="navbar-brand">Exercise Tracker</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1"> 
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbar1">
            {localStorage.getItem('isLoggedIn') === 'true' && <ul className="navbar-nav">
                <li className="navbar-item">
                <Link to="/" className="nav-link">Exercises</Link>
                </li>
                <li className="navbar-item">
                <Link to="/create" className="nav-link">Create Exercise Log</Link>
                </li>
                <li className="navbar-item">
                <Link to="/chat" className="nav-link">Trainer Chat</Link>
                </li>
              </ul>}
              <ul className="signUp-Out">
              <li className="navbar-item">
                <Link to="/user" className="nav-link">Sign Up</Link>
                </li>
                {console.log(localStorage.getItem('isLoggedIn'))}
                {localStorage.getItem('isLoggedIn') === 'true' && <Logout></Logout>}
                {localStorage.getItem('isLoggedIn') !== 'true' && <li className="navbar-item">
                <Link to="/user/signin" className="nav-link">Login</Link>
              </li>}
              </ul>
            </div>
            <Greeting></Greeting>
        </nav>
        
    );
  }
}