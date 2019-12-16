import React from 'react';
import logo from './logo.svg';
import './App.css';
import './utils/storage'
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import Footer from "./components/footer.component";
import Home from "./components/Home";
import SignIn from "./components/signin.user.component"
import ChatRoom from "./components/chat.component"
import Tips from "./components/tips.component.js"



function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" exact component={EditExercise} />
        <Route path="/create" exact component={CreateExercise} />
        <Route path="/user" exact component={CreateUser} />
        <Route path="/user/signin" exact component={SignIn} /> 
        <Route path="/chat" exact component={ChatRoom} />
        <Route path="/tips" exact component={Tips} />
        <Footer />
      </div>
    </Router> 
    
  );
}

export default App;
