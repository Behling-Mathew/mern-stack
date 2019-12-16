import React, { Component } from 'react';
import axios from 'axios';
import UserProfile from '../utils/UserProfile';

import {
    getFromStorage,
    setInStorage,
  } from '../utils/storage';

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        // each method is bound so it is defined below
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State is essentially how to create variables in React
        this.state = {
            email: '',
            password: '',
            message: 'InValid sign in',
            username: '',
            badCredentials: false 

        }
    }

        onChangeEmail(e) {
            this.setState({
                email: e.target.value
            });
        }
        onChangePassword(e) {
            this.setState({
                password: e.target.value
            });
        }
        onChangeSuccess(e) {
            this.setState({
                success: e.target.value
            });
        }

       

        onSubmit(e) {
            e.preventDefault();
        
            const credentials = {
                email: this.state.email,
                password: this.state.password
            }
        
            console.log(credentials);

            
            axios.post('http://localhost:5000/users/signin', credentials)
              .then(res => {
                this.setState({
                    success: res.data.success,
                    username: res.data.username 
                })
            }) 
                
            console.log(this.state.success)
              if(this.state.success === true)
              {
                  console.log("Valid sign in, it is true.")
              }
              if(this.state.success !== true)
              {
                  this.setState({badCredentials: true})
                  console.log("Invalid sign in, tis false")
              }
              //.then(res => userToken = res.data.token console.log(res.data));
              console.log("Username is: " + this.state.username)
           
             this.setState({
                email: '',
                password: ''
            })   
            //window.location.reload();
            console.log(this.state.password)
            console.log(this.state.message)

        } 
        
        /* onSubmit(e) {
            e.preventDefault();
        
            const credentials = {
                email: this.state.email,
                password: this.state.password
            }
        

            axios.post('http://localhost:5000/users/signin', credentials, {
                headers: headers
            })
              .then(res => console.log(res.data));
              
              if(json.success) {
                setInStorage('the_main_app', { token: json.token });
                this.setState({
                    email: '',
                    password: '',
                    isLoading: false,
                    token: json.token,
                    signInError: json.message,
                });  
                } else {
                    this.setState({
                    signInError: json.message,
                    isLoading: false,
                    });
                }
             } */

    render() {

        
        //User has successfully signed in, set to local storage
        if(this.state.success == true)
        {
            UserProfile.setName(true);
            localStorage.setItem('username', this.state.username)
            window.location = '/chat';
        } else if (this.state.success !== true) {
            //this.setState({badCredentials: true})    

        }
        return (
            <div>
                <h3>Sign In</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                        <label>Password: </label>
                        <input type="password"
                        required
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        />
                        <input type="hidden" value={this.state.success} onChange={this.ChangeSuccess}></input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Sign In" className="btn btn-primary" />
                    </div>
                    {this.state.badCredentials &&<p className="badSignIn">Sign in failed.</p>}
                </form>
            </div>
        )
    }
}
