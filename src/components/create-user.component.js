import React, { Component } from "react";

//import the API Class
import api from "../API/api";

export default class CreateUser extends Component {
  constructor(props) {
    //In JS Classes we need to always call super when when defining a construtor in a subclass
    super(props); //all react componenets that has a constructor should start with a super start call

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //setting initial state
    this.state = {
      //creating properties
      username: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    api.post("/users/add", user)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });


    console.log(user);

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
