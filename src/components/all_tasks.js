import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import EmployeeDataService from "../services/employee.service";
import { Link } from "react-router-dom";
//import TaskService from "../services/task.service";

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.getTask = this.getTask.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);


    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,

      employees: [],

    };
  }

  componentDidMount() {
    this.getTask();
    this.getEmployee();
  }

  onChangeSearchDescription(e) {
    const searchDescription = e.target.value;

    this.setState({
      searchDescription: searchDescription
    });
  }

  getTask() {
    TaskDataService.getAll()
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getEmployee() {
    EmployeeDataService.getAll()
      .then(response => {
        this.setState({
          employees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.getTask();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        const updatedTasks = this.state.tasks.filter(
          task => task.id !== this.state.currentTask.id
        );
        this.setState({
          tasks: updatedTasks,
          currentTask: null,
          currentIndex: -1
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  removeAllTasks() {
    TaskDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }



  render() {
    const { tasks, currentTask, currentIndex, employees } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Tasks List</h4>

          <ul className="list-group">
            {tasks && tasks.length > 0 ? tasks.map((task, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  
                  {task.description}
                  <button className="m-3 btn btn-sm btn-danger"
                  onClick={this.deleteTask}>
                    Delete
                  </button>
                </li>
              ))
              :
              <li className="list-group-item">
              <div><p>{"No data to display"}</p></div>
              </li>
            }
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTasks}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTask ? (
            <div>
              <h4>Task</h4>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTask.description}
              </div>
              <div>
                <label>
                  <strong>Priority Level:</strong>
                </label>{" "}
                {currentTask.priority_level}
              </div>
              <div>
                <label>
                  <strong>Assigned to: </strong>
                </label>
                { employees.filter(employee => employee.id === currentTask.employeeId).map((employee, index) => (
                      <li
                        //className={
                         // "list-group-item " +
                         // (index === currentIndex ? "active" : "")
                        //}
                       // onClick={() => this.setActiveTask(task, index)}
                       // key={index}
                      >
                        
                        {employee.first_name + " " + employee.last_name}
                      </li>
                    ))} 
                    {currentTask.employeeId ? (" ") : (<div><p>{"Unassigned"}</p></div>)}
              </div>


              <div>
                <label>
                  <strong>Completiton Status: </strong>
                </label>
                {currentTask.completition_stat ? " Completed" : " Not Completed"}
              </div>


              <Link
                to={"/tasks/" + currentTask.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>No Tasks </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
