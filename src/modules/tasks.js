import dom from "./dom";
import projects from "./projects";

const tasks = (() => {
  class CreateTask {
    constructor(title, description, date, priority) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.priority = priority;
      this.checked = false;
    }
  }

  function addTask(title, description, date, priority, projectIndex) {
    const newTask = new CreateTask(title, description, date, priority);
    projects.projectsList[projectIndex].tasks.push(newTask);
    dom.renderTasks(document.querySelector("#todolist").dataset.projectindex);
  }

  function removeTask(projectIndex, taskIndex) {
    projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
    dom.renderTasks(document.querySelector("#todolist").dataset.projectindex);
  }

  return {
    addTask,
    removeTask,
  };
})();

export default tasks;
