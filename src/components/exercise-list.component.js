import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../API/api";

// Is a functional react component --> the key difference between them are that functional component lacks the state and life cycle methods a class component
//If we need to accept props and return JSX then we can define a functional component
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    {/* substring method is used to only get the date and time */}
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="http://localhost:3000/" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)


//This is a class component
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = { exercises: [] };
  }

  componentDidMount() {
    this.getAllExercisesHandler();
  }

  getAllExercisesHandler() {
    api
      .get("/exercises/")
      .then((response) => {
        console.log(response.data.response);
        this.setState({ exercises: response.data.response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    api.delete("/exercises/" + id).then((res) => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
