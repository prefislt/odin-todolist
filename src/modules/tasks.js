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

  function taskCheck(projectIndex, taskIndex) {
    if (projects.projectsList[projectIndex].tasks[taskIndex].checked) {
      projects.projectsList[projectIndex].tasks[taskIndex].checked = true;
      document.querySelector(`[id="taskCheck"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).setAttribute('checked', 'checked');
      document.querySelector(`[id="todoText"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).classList.add('line-through');
      document.querySelector(`[id="todoDesc"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).classList.add('line-through');
    } else {
      projects.projectsList[projectIndex].tasks[taskIndex].checked = false;
      document.querySelector(`[id="taskCheck"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).removeAttribute('checked', 'checked');
      document.querySelector(`[id="todoText"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).classList.remove('line-through');
      document.querySelector(`[id="todoDesc"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).classList.remove('line-through');
    }
  }

  return {
    addTask,
    removeTask,
    taskCheck,
  };
})();

export default tasks;
