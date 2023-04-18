import dom from "./dom";

const projects = (() => {
  let projectsList = [];

  if (localStorage.getItem("projects") === null) {
    projectsList = [
      {
        title: "Example project one",
        tasks: [
          {
            title: "Example task one",
            description: "description example about task one",
            date: "2023-04-23",
            priority: "Low",
            checked: false,
          },
          {
            title: "Example task two",
            description: "description example about task two",
            date: "2023-04-24",
            priority: "High",
            checked: false,
          },
        ],
      },
      {
        title: "Example project two",
        tasks: [
          {
            title: "Project two task one",
            description: "description example about task one of project two",
            date: "2023-04-23",
            priority: "Medium",
            checked: false,
          },
          {
            title: "Project two task two",
            description: "description example about task two of project two",
            date: "2023-04-24",
            priority: "Low",
            checked: false,
          },
        ],
      },
    ];
  } else {
    const projectsFromStorage = JSON.parse(localStorage.getItem("projects"));
    projectsList = projectsFromStorage;
  }

  class Project {
    constructor(title) {
      this.title = title;
      this.tasks = [];
    }
  }

  function saveProjects() {
    const projectsStringify = JSON.stringify(projectsList);
    localStorage.setItem("projects", projectsStringify);
  }

  function addProject(title) {
    const project = new Project(title);
    projectsList.push(project);
    projects.saveProjects();
    dom.renderProjects();
  }

  function removeProject(projectIndex) {
    projects.projectsList.splice(projectIndex, 1);
    dom.renderTasks(projectIndex - 1);
    projects.saveProjects();
    dom.renderProjects();
  }

  function editProjectName(projectIndex, name) {
    projectsList[projectIndex].title = name;
    projects.saveProjects();
  }

  return {
    projectsList,
    addProject,
    removeProject,
    saveProjects,
    editProjectName,
  };
})();

export default projects;
