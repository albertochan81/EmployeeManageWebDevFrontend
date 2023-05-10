
import http from "../http-common";

class TaskDataService {
  getAll() {
    return http.get("/tasks");
  }

  get(id) {
    return http.get(`/tasks/${id}`);
  }

  create(data) {
    return http.post("/tasks", data);
  }

  update(id, data) {
    return http.put(`/tasks/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tasks/${id}`);
  }

  deleteAll() {
    return http.delete(`/tasks`);
  }

  findByDescription(description) {
    return http.get(`/tasks?description{
      =${description}`);
  }
  findByEmployeeId(employeeId) {
    return http.get(`/tasks?employeeId=${employeeId}`);
  }
}

export default new TaskDataService();