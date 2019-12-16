import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../utils/storage'
import '../utils/UserProfile'
import UserProfile from '../utils/UserProfile';
const state = require('../utils/storage')

 
function UserGreeting(props) {
    let uN = localStorage.getItem('username')
    return <h1 className="congrats">Way to go, {uN}!</h1>;
  }
  
  function GuestGreeting(props) {
    return <h1>Please log in or sign up.</h1>;
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

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        // each method is bound so it is defined below
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        //if(localStorage.getItem('isLoggedIn')){
            const li = localStorage.getItem('isLoggedIn');
            //this.setState({token: li});
       // }

        // State is essentially how to create variables in React
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
            //token: li
            
        }
    }

    // this method is called right before the page is loaded
    componentDidMount() {

        //const li = localStorage.getItem('isLoggedIn');
        //this.setState({token: li});
        //console.log("in did mount function, this token contains: " + li)
       axios.get('http://localhost:5000/users/')
         .then(response => {
             if (response.data.length > 0) {
                 this.setState({
                     //data is an array and map allows to return something for every element in the array
                     users: response.data.map(user => user.username),
                     //sets the first option to the first username in the database
                     username: response.data[0].username
                 })
             }
         })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: localStorage.getItem('username'),
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise)
        axios.post('http://localhost:5000/exercises/add', exercise)
        .then(res => console.log(res.data));
        // takes people back to excersie list page after submitted
        window.location = '/';
    }

    
    

  
  
    render() {    
        console.log("this token in render contains:" + this.state.token)
        //if(this.state.token == "Douglas"){

        return (
            <div>
              <Greeting></Greeting>
              <h3>Create New Exercise Log</h3>
              {localStorage.getItem('isLoggedIn') === 'true' &&
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Username: </label>
                      <select ref="userInput"
                      required
                      className="form-control"
                      //value={this.state.username}
                      value={localStorage.getItem('username')}
                      onChange={this.onChangeUsername}>
                      <option>{localStorage.getItem('username')}</option>
                          
                      </select>
                  </div>
                  <div className="form-group">
                     <label>Description: </label> 
                     <input type="text"
                     required
                     className="form-control"
                     value={this.state.description}
                     onChange={this.onChangeDescription}
                     />
                  </div>
                  <div className="form-group">
                      <label>Duration (in minutes): </label>
                      <input 
                        type="text"
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                  </div>
                  <div className="form-group">
                      <label>Date: </label>
                      <div>
                          <DatePicker
                          selected={this.state.date}
                          onChange={this.onChangeDate}
                          />
                      </div>
                      </div>

                      <div className="form-group">
                          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                          </div>
              </form>}

            </div>
        )
    //}
         //else {
         //   window.location = '/user/signin';
       // } 
    }
}

/*  get all users for select box for an admin view
{ {
    // Will return an option for each user in the array
    this.state.users.map(function(user) {
      return <option
        key={user}
        value={user}>{user}
        </option>
  }) 
} } */
