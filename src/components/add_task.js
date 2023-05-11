import React, { Component } from "react";
import TaskDataService from "../services/task.service";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePriorityLevel = this.onChangePriorityLevel.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask= this.newTask.bind(this);

    this.state = {
      id: null,
      description: "",
      priority_level: "",
      completition_stat: false, 
      submitted: false,
      invalidDesc: false,
      invalidPriority: false
    };
  }

  onChangePriorityLevel(e) {
    this.setState({
      priority_level: e.target.value,
      invalidPriority: e.target.value.toLowerCase() != "high" && e.target.value.toLowerCase() != "medium" && e.target.value.toLowerCase() != "low"
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
      invalidDesc: e.target.value.length === 0 || !e.target.value.match(/[a-zA-z]/)
    });
  }

  saveTask() {
    if(this.state.invalidDesc || this.state.invalidPriority){
      return;
    }

    var data = {
      description: this.state.description,
      priority_level: this.state.priority_level
     };

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          description: response.data.description,
          priority_level: response.data.priority_level,
          completition_stat: response.data.completition_stat, 
          submitted: true,
         });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      id: null,
      description: "",
      priority_level: "",
      completition_stat: false,
      submitted: false,
      invalidDesc: false,
      invalidPriority: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Task Added</h4>
            <button className="btn btn-success" onClick={this.newTask}>
              Back
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
              {this.state.invalidDesc && <div className="invalid-desc">Please enter a valid description</div>}
            </div>

            <div className="form-group">
              <label htmlFor="priority_level">Priority Level</label>
              <input
                type="text"
                className="form-control"
                id="priority_level"
                required
                value={this.state.priority_level}
                onChange={this.onChangePriorityLevel}
                name="priority_level"
              />
              {this.state.invalidPriority && <div className="invalid-priority">Please enter high, medium, or low </div>}
            </div>

            <button onClick={this.saveTask} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
