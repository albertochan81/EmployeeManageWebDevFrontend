import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { withRouter } from '../common/with-router';
import EmployeeDataService from "../services/employee.service";
import { Link } from "react-router-dom";

class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePriorityLevel= this.onChangePriorityLevel.bind(this);
    this.getTask = this.getTask.bind(this);
    this.getEmployee = this.getEmployee.bind(this);
    this.updateCompleted = this.updateCompleted.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.setEmployeeTask = this.setEmployeeTask.bind(this);
  

    this.state = {
      currentTask: {
        id: null,
        description: "",
        priority_level: "",
        completition_stat: false,
      },

      employees: [],
      currentEmployeeId:null,
      currentEmployeeIndex:-1,

      message: ""
    };
  }

  componentDidMount() {
    this.getTask(this.props.router.params.id);
    this.getEmployee();
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          description: description
        }
      };
    });
  }
  onChangePriorityLevel(e) {
    const priority_level = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          priority_level: priority_level
        }
      };
    });
  }
  updateCompleted(status) {
    var data = {
      id: this.state.currentTask.id,
      description: this.state.currentTask.description,
      priority_level: this.state.currentTask.priority_level,
      completition_stat: status
    };

    TaskDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            completition_stat: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  setEmployeeTask(e){
    var data = {
      employeeId: e
    };

    TaskDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            employeeId: e
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
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
  setActiveEmployee(employeeId, index) {
    this.setState({
      currentEmployeeId: employeeId,
      currentEmployeeIndex: index
    });
  }
  asignTask(e){
    var data = {
      employeeId: e
    };

    TaskDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            employeeId: e
          }
        }));
        console.log(response.data);
        this.setState({
          message: "Employee was updated successfully!"
      });
    })
      .catch(e => {
        console.log(e);
      });
  }

  unnasignTask(){
    var data = {
        employeeId: null,
      };
  
      TaskDataService.update(this.state.currentTask.id, data)
        .then(response => {
          this.setState(prevState => ({
            currentTask: {
              ...prevState.currentTask,
              employeeId: null
            }
          }));
          console.log(response.data);
          this.setState({
            message: "Task unassigned."
        });
      })
        .catch(employeeId=> {
          console.log(employeeId);
        });

  }
  

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Task updated!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/tasks');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask, employees, currentEmployeeIndex, currentEmployeeId } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="first_name">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Priority Level</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  value={currentTask.priority_level}
                  onChange={this.onChangePriorityLevel}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Assigned to :</strong>
                </label>
                </div>
                </form>

                {currentTask.employeeId ? (
                <div>
                {employees.filter(employee => employee.id===currentTask.employeeId).map((employee, index) => (
                      <li 
                      className={
                        "list-group-item " +
                        (index === currentEmployeeIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveEmployee(employee.id, index)}
                      key={employee.id}
                      >  
                        {currentTask.employeeId ?(employee.first_name + " " + employee.last_name):  (<div><p>{" Unassigned"}</p></div>)}
                      </li>
                    ))} 
                    
                    <button
                        className="badge badge-secondary mr-2"
                        onClick={() =>this.unnasignTask()}
                    >
                        Unassign
                    </button> 
                    <Link
                        to={"/employees/" + currentEmployeeId}
                        className="badge badge-outline-info"
                    >
                        Go to employee
                 </Link>   
                    </div>  
                    ):(
                <div>
                    {<p>Not assigned</p>} 
                    {<strong>Choose an employee to assign:</strong>}
                { employees.map((employee, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentEmployeeIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveEmployee(employee.id, index)}
                        key={employee.id}
                      >    
                        {(employee.first_name + " " + employee.last_name)}
                      </li>
                    ))}      
              
                 <button
                    className="badge badge-info mr-2"
                    onClick={() =>this.asignTask(currentEmployeeId)}
                    >
                    Assign
                 </button>
                 <Link
                    to={"/employees/" + currentEmployeeId}
                    className="badge badge-outline-info"
                 >
                    Go to employee
                 </Link>
              </div>) }

              <div className="form-group">
              <br></br>
                <label>
                  <strong>Completition Status:</strong>
                </label>

                {currentTask.completition_stat ? " Completed" : " Not Completed"}
                    
              </div>
            
            
            {currentTask.completition_stat ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateCompleted(false)}
              >
                Uncomplete
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateCompleted(true)}
              >
                Complete
              </button>
            )
            }
            

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTask}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Task);