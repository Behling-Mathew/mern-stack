import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        // each method is bound so it is defined below
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State is essentially how to create variables in React
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

        onChangeUsername(e) {
            this.setState({
                username: e.target.value
            });
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

        onSubmit(e) {
            e.preventDefault();
        
            const user = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
                //currentUserTOken: myToken;
            }
        
            console.log(user);

            axios.post('/users/add', user)
              .then(res => console.log(res.data));

           
            this.setState({
                username: '',
                email: '',
                password: ''
            })   
            
            alert(this.state.username + " created.")
            
            window.location = '/user/signin';
        }
       
    
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        />
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
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create New User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
