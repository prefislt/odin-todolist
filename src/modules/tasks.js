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
    projects.saveProjects();
    dom.renderTasks(document.querySelector("#todolist").dataset.projectindex);
  }

  function removeTask(projectIndex, taskIndex) {
    projects.projectsList[projectIndex].tasks.splice(taskIndex, 1);
    projects.saveProjects();
    dom.renderTasks(document.querySelector("#todolist").dataset.projectindex);
  }

  function taskCheck(projectIndex, taskIndex) {
    if (projects.projectsList[projectIndex].tasks[taskIndex].checked) {
      projects.projectsList[projectIndex].tasks[taskIndex].checked = true;
      projects.saveProjects();
      document.querySelector(`[id="taskCheck"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).setAttribute('checked', 'checked');
      document.querySelector(`[id="todoTask"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).classList.add('opacity-50', 'blur-[1px]');
    } else {
      projects.projectsList[projectIndex].tasks[taskIndex].checked = false;
      projects.saveProjects();
      document.querySelector(`[id="taskCheck"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).removeAttribute('checked', 'checked');
      document.querySelector(`[id="todoTask"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).classList.remove('opacity-50', 'blur-[1px]');
    }
  }

  function tasksSort(sortBy, tasks) {
    switch (sortBy) {
      case "none":
        break;
      case "datefromnewest":
        tasks.sort(function compare(a, b) {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);
          return dateB - dateA;
        });
        break;
      case "datefromoldest":
        tasks.sort(function compare(a, b) {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);
          return dateA - dateB;
        });
        break;
      case "priorityfromlowest":
        for (let i = 0; i < tasks.length; i++) {
          switch (tasks[i].priority) {
            case "Low":
              tasks[i].priorityId = 1;
              break;
            case "Medium":
              tasks[i].priorityId = 2;
              break;
            case "High":
              tasks[i].priorityId = 3;
              break;
          }
        }
        tasks.sort(function compare(a, b) {
          let priorityA = a.priorityId;
          let priorityB = b.priorityId;
          return priorityA - priorityB;
        });
        break;
      case "priorityfromhighest":
        for (let i = 0; i < tasks.length; i++) {
          switch (tasks[i].priority) {
            case "Low":
              tasks[i].priorityId = 1;
              break;
            case "Medium":
              tasks[i].priorityId = 2;
              break;
            case "High":
              tasks[i].priorityId = 3;
              break;
          }
        }
        tasks.sort(function compare(a, b) {
          let priorityA = a.priorityId;
          let priorityB = b.priorityId;
          return priorityB - priorityA;
        });
        break;
    }

    return tasks;
  }

  return {
    addTask,
    removeTask,
    taskCheck,
    tasksSort,
  };
})();

export default tasks;
