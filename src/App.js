import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import EmployeeList from "./components/all_employees";
import AddEmployee from "./components/add_employee";
import EditEmployee from "./components/edit_employee";

import TaskList from "./components/all_tasks";
import AddTask from "./components/add_task";
import EditTask from "./components/edit_task";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/employees"} className="navbar-brand">
           Group 7
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/employees"} className="nav-link">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add_employee"} className="nav-link">
                Add Employee
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/tasks"} className="nav-link">
                Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add_task"} className="nav-link">
                Add Task
              </Link>
            </li>
            
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<EmployeeList/>} />
            <Route path="/employees" element={<EmployeeList/>} />
            <Route path="/add_employee" element={<AddEmployee/>} />
            <Route path="/employees/:id" element={<EditEmployee/>} />
            <Route path="/tasks" element={<TaskList/>} />
            <Route path="/add_task" element={<AddTask/>} />
            <Route path="/tasks/:id" element={<EditTask/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
