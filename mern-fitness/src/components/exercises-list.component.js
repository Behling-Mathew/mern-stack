import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


{document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80')";}
{document.body.style.backgroundRepeat = "no-repeat";}
{document.body.style.backgroundSize = "cover";}
// This is a funtional component w/o state
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>{localStorage.getItem('username') === props.exercise.username && <span>
            <Link to={"/edit/"+props.exercise._id} className="edit-Btn">edit</Link> | <a class="deleteBtn" href="#" onClick={() => {props.deleteExercise(props.exercise._id) }}>delete</a></span>}
        </td>
        
    </tr>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};

    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
          .then(response => {
              this.setState ({ exercises: response.data})
          })
          .catch((error) => {
              console.log(error);
          })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+id)
          .then(res => console.log(res.data));
          alert("Exercise deleted!");

          // if the id is not equal to that of the deleted, pass it back to the array
          this.setState({
              exercises: this.state.exercises.filter(el => el._id !== id)
          })
    }

exerciseList() {
    return this.state.exercises.map(currentexercise => {
        return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
}

    render() {
        return (
            
            <div>
                <h3 className="loggedExerTitle">Logged Exercises</h3>{localStorage.getItem('isLoggedIn') === 'true' &&
                <table className="table tableCustom">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Minutes</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>}
            </div>
        )
    }
}