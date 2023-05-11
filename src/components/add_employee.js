import React, { Component } from "react";
import EmployeeDataService from "../services/employee.service";

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.newEmployee= this.newEmployee.bind(this);

    this.state = {
      id: null,
      first_name: "",
      last_name: "",
      department: "", 
      invalidDep: false,
      submitted: false,
      invalidFirstName: false,
      invalidLastName: false
    };
  }

  onChangeLastName(e) {
    this.setState({
      last_name: e.target.value,
      invalidLastName: e.target.value.length === 0 || !e.target.value.match(/[a-zA-Z]/)
    });
  }
  onChangeFirstName(e) {
    this.setState({
      first_name: e.target.value,
      invalidFirstName: e.target.value.length === 0 || !e.target.value.match(/[a-zA-Z]/)
    });
  }

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value,
      invalidDep: e.target.value.length === 0 || !e.target.value.match(/[a-zA-Z]/)
    });
  }

  saveEmployee() {
    if (this.state.invalidFirstName || this.state.invalidLastName|| this.state.invalidDep) { // don't save if name is invalid
      return;
    }

    var data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      department: this.state.department
    };

    EmployeeDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          department: response.data.department,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newEmployee() {
    this.setState({
      id: null,
      first_name: "",
      last_name: "",
      department: "",
      invalidDep: false,
      submitted: false,
      invalidName: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Added!</h4>
            <button className="btn btn-success" onClick={this.newEmployee}>
              Back
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                required
                value={this.state.first_name}
                onChange={this.onChangeFirstName}
                name="first_name"
              />
              {this.state.invalidFirstName && <div className="invalid-first-name">Please enter a valid first name</div>}
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                required
                value={this.state.last_name}
                onChange={this.onChangeLastName}
                name="last_name"
              />
              {this.state.invalidLastName && <div className="invalid-last-name">Please enter a valid last name</div>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Department</label>
              <input
                type="text"
                className="form-control"
                id="department"
                required
                value={this.state.department}
                onChange={this.onChangeDepartment}
                name="department"
              />
              {this.state.invalidDep && <div className="invalid-dep">Please enter a valid department </div>}
            </div>

            <button onClick={this.saveEmployee} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
