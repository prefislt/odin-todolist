import { createHtmlElement } from "./functions";
import projects from "./projects";
import tasks from "./tasks";

const dom = (() => {
  const body = document.querySelector("body");

  document.querySelector("html").setAttribute("data-theme", "halloween");
  body.innerHTML = /*html*/ `
        <div id="content" class="flex flex-col items-center w-full">
            <div id="header" class="flex justify-center items-center font-bold text-4xl p-8 w-full">To-Do List</div>

            <div id="popupButtons" class="flex flex-row gap-2 my-4">
                <label for="popup" id="addNewTaskButton" class="btn btn-primary">Add new task</label>
                <label for="popup" id="addNewProjectButton" class="btn btn-primary">Add new project</label>
            </div>

            <div id="projectsAndTasks" class="flex flex-col w-full max-w-screen-lg px-6">
                <div id="projectsarea" class="overflow-auto scrollbar-hide">
                    <div id="projectsDom" class="flex flex-row gap-2 mb-4"></div>
                </div>
                <div id="todos" class="flex flex-row justify-center w-full"></div>
            </div>


            <div id="popupContent">

            </div>
        </div>
    `;

  // try horizontal scroll for project selector when it doesn't fit on screen ()
  const element = document.querySelector("#projectsarea");

  element.addEventListener("wheel", (event) => {
    event.preventDefault();

    element.scrollBy({
      left: event.deltaY < 0 ? -30 : 30,
    });
  });

  // If "add new task" button is pressed change popup design to this
  document.querySelector("#addNewTaskButton").addEventListener("click", (e) => {
    document.querySelector("#popupContent").innerHTML = /*html*/ `
            <input type="checkbox" id="popup" class="modal-toggle" />
                <label for="popup" class="modal cursor-pointer">
                    <label class="modal-box relative">
                        <span>ADD NEW TASK</span>
                        <div id="addTask" class="flex flex-col gap-2 justify-center items-center p-4 max-w-lg">
                            <input class="input input-bordered w-full" id="inputTaskName" type="text" placeholder="Task name">
                            <input class="input input-bordered w-full" id="inputDescription" type="text" placeholder="Description">
                            <input class="input input-bordered w-full" id="inputDate" type="date" placeholder="Select date">
                            <select class="select select-bordered w-full" id="inputPriority">
                                <option disabled selected>Priority</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                            <button class="btn btn-primary" id="submitTask">Add task</button>
                            <div class="alert alert-error shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Error! Just example, for now it's doing nothing. So don't worry :)</span>
                                </div>
                            </div>
                        </div>
                    </label> 
                </label>
        `;

    document.querySelector("#submitTask").addEventListener("click", () => {
      const inputTaskName = document.querySelector("#inputTaskName").value;
      const inputDescription =
        document.querySelector("#inputDescription").value;
      const inputDate = document.querySelector("#inputDate").value;
      const inputPriority = document.querySelector("#inputPriority").value;

      const projectIndex =
        document.querySelector("#todolist").dataset.projectindex;

      tasks.addTask(
        inputTaskName,
        inputDescription,
        inputDate,
        inputPriority,
        projectIndex
      );
    });
  });

  // If "add new project" button is pressed change popup design to this
  document.querySelector("#addNewProjectButton").addEventListener("click", (e) => {
    document.querySelector("#popupContent").innerHTML = /*html*/ `
                <input type="checkbox" id="popup" class="modal-toggle" />
                <label for="popup" class="modal cursor-pointer">
                    <label class="modal-box relative">
                        <span>ADD NEW PROJECT</span>
                        <div id="addProject" class="flex flex-col gap-2 justify-center items-center my-2 max-w-lg">
                            <input class="input input-bordered w-full" id="inputProjectName" type="text" placeholder="Project name">
                            <button class="btn btn-primary" id="submitProject">Add project</button>
                        </div>
                    </label>
                </label>
            `;

    document.querySelector("#submitProject").addEventListener("click", () => {
      const inputProjectName =
        document.querySelector("#inputProjectName").value;
      projects.addProject(inputProjectName);
      dom.renderProjects();
    });
  });

  function renderProjects() {
    document.querySelector("#projectsDom").innerHTML = ""; // clear projects list

    document.querySelector("#projectsDom").innerHTML += /*html*/ `
          <button id="projectButton" class="btn btn-outline font-bold" data-index="-1">ALL</button>
        `;

    for (let i = 0; i < projects.projectsList.length; i++) {
      document.querySelector("#projectsDom").innerHTML += /*html*/ `
                <button id="projectButton" class="btn btn-outline font-bold" data-index="${i}">
                  <div class="">${i}</div>
                  <div class="divider divider-horizontal m-2"></div>
                  <div>${projects.projectsList[i].title}</div>
                </button>
            `;
    }

    let buttons = document.querySelectorAll("#projectButton").length;

    for (let i = 0; i < buttons; i++) {
      document
        .querySelectorAll("#projectButton")
      [i].addEventListener("click", (e) => {
        dom.renderTasks(e.currentTarget.dataset.index);
      });
    }
  }

  function renderTasks(index) {
    if (index < 0 || isNaN(index)) {
      document.querySelector("#todos").innerHTML = /*html*/ `
                <div id="todolist" class="flex flex-col gap-2 w-full" data-projectindex="-1"></div>
            `;
      for (let i = 0; i < projects.projectsList.length; i++) {
        for (let l = 0; l < projects.projectsList[i].tasks.length; l++) {
          document.querySelector("#todolist").innerHTML += /*html*/ `
                            <div id="todoTask" class="flex flex-row justify-between w-full bg-primary rounded-md p-2" data-projectindex="-1" data-taskindex="${l}">
                                <div class="flex justify-center items-center w-6">
                                    <input id="taskCheck" class="checkbox checkbox-md border-2 border-slate-900" type="checkbox" data-projectindex="${i}" data-taskindex="${l}"/>
                                </div>
                                <div id="todoContent" class="flex flex-col flex-1 mx-2 text-primary-content">
                                    <span id="todoText" class="font-bold" data-projectindex="${i}" data-taskindex="${l}">${projects.projectsList[i].tasks[l].title}</span>
                                    <span id="todoDesc" class="text-xs" data-projectindex="${i}" data-taskindex="${l}">${projects.projectsList[i].tasks[l].description}</span>
                                </div>
                                <div id="actionButtons" class="flex flex-row gap-2">
                                <label for="popup" id="editTaskButton" class="btn" data-projectindex="${i}" data-taskindex="${l}">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>
                                </label>
                                <button class="btn" id="todoDelete" data-projectindex="${i}" data-taskindex="${l}">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </button>
                                </div>
                            </div>
                    `;
          tasks.taskCheck(i, l);
        }
      }
    } else {
      document.querySelector("#todos").innerHTML = /*html*/ `
                <div id="todolist" class="flex flex-col gap-2 p-2 w-full" data-projectindex="${index}"></div>
             `;
      if (projects.projectsList[index].tasks.length > 0) {
        for (let i = 0; i < projects.projectsList[index].tasks.length; i++) {
          document.querySelector("#todolist").innerHTML += /*html*/ `
                          <div id="todoTask" class="flex flex-row justify-between w-full bg-primary rounded-md p-2" data-projectindex="${index}" data-taskindex="${i}">
                              <div class="flex justify-center items-center w-6">
                                  <input class="checkbox checkbox-md border-2 border-slate-900" type="checkbox" id="taskCheck" data-projectindex="${index}" data-taskindex="${i}"/>
                              </div>
                              <div id="todoContent" class="flex flex-col flex-1 mx-2 text-primary-content">
                                  <span id="todoText" class="font-bold" data-projectindex="${index}" data-taskindex="${i}">${projects.projectsList[index].tasks[i].title}</span>
                                  <span id="todoDesc" class="text-xs" data-projectindex="${index}" data-taskindex="${i}">${projects.projectsList[index].tasks[i].description}</span>
                              </div>
                              <div id="actionButtons" class="flex flex-row gap-2">
                                  <label for="popup" id="editTaskButton" class="btn" data-projectindex="${index}" data-taskindex="${i}">
                                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>
                                  </label>
                                  <button class="btn" id="todoDelete" data-projectindex="${index}" data-taskindex="${i}">
                                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                  </button>
                              </div>
                          </div>
                  `;
          tasks.taskCheck(index, i);
        }
      } else {
        document.querySelector("#todolist").innerHTML += /*html*/ `No tasks :/`;
      }
    }

    // Add event listener to all checkmarks on tasks
    let taskChecks = document.querySelectorAll("#taskCheck").length;
    for (let i = 0; i < taskChecks; i++) {
      document
        .querySelectorAll("#taskCheck")
      [i].addEventListener("click", (e) => {
        let checked = projects.projectsList[e.currentTarget.dataset.projectindex].tasks[e.currentTarget.dataset.taskindex].checked;
        if (checked == true) {
          projects.projectsList[e.currentTarget.dataset.projectindex].tasks[e.currentTarget.dataset.taskindex].checked = false;
        } else {
          projects.projectsList[e.currentTarget.dataset.projectindex].tasks[e.currentTarget.dataset.taskindex].checked = true;
        }
        tasks.taskCheck(e.currentTarget.dataset.projectindex, e.currentTarget.dataset.taskindex);
      });
    }

    // Add event listener to all edit buttons on tasks
    let editButtons = document.querySelectorAll("#editTaskButton").length;
    for (let i = 0; i < editButtons; i++) {
      document
        .querySelectorAll("#editTaskButton")
      [i].addEventListener("click", (e) => {
        const taskIndex = e.currentTarget.dataset.taskindex;
        const projectIndex = e.currentTarget.dataset.projectindex;
        dom.editTask(taskIndex, projectIndex);
      });
    }

    // Add event listener to all delete buttons on tasks
    let deleteButtons = document.querySelectorAll("#todoDelete").length;
    for (let i = 0; i < deleteButtons; i++) {
      document
        .querySelectorAll("#todoDelete")
      [i].addEventListener("click", (e) => {
        tasks.removeTask(
          e.currentTarget.dataset.projectindex,
          e.currentTarget.dataset.taskindex
        );
      });
    }
  }

  function editTask(taskIndex, projectIndex) {
    document.querySelector("#popupContent").innerHTML = /*html*/ `
            <input type="checkbox" id="popup" class="modal-toggle" />
                <label for="popup" class="modal cursor-pointer">
                    <label class="modal-box relative">
                        <span>EDIT TASK</span>
                        <div id="editTaskContent" class="flex flex-col gap-2 justify-center items-center p-4 max-w-lg">
                            <input class="input input-bordered w-full" id="inputTaskNameEdit" type="text" placeholder="Task name" value="${projects.projectsList[projectIndex].tasks[taskIndex].title}">
                            <input class="input input-bordered w-full" id="inputDescriptionEdit" type="text" placeholder="Description" value="${projects.projectsList[projectIndex].tasks[taskIndex].description}">
                            <input class="input input-bordered w-full" id="inputDateEdit" type="date" placeholder="Select date" value="${projects.projectsList[projectIndex].tasks[taskIndex].date}">
                            <select class="select select-bordered w-full" id="inputPriorityEdit">
                                <option disabled>Priority</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                            <button class="btn btn-primary" id="submitTaskEdit">Edit task</button>
                            <div class="alert alert-error shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Error! Just example, for now it's doing nothing. So don't worry :)</span>
                                </div>
                            </div>
                        </div>
                    </label> 
                </label>
        `;

    // Show correct priority
    switch (projects.projectsList[projectIndex].tasks[taskIndex].priority) {
      case "Low":
        document.querySelector("#inputPriorityEdit").options[1].selected = true;
        break;
      case "Medium":
        document.querySelector("#inputPriorityEdit").options[2].selected = true;
        break;
      case "High":
        document.querySelector("#inputPriorityEdit").options[3].selected = true;
        break;
    }

    // When submit (edit task) button pressed
    document.querySelector("#submitTaskEdit").addEventListener("click", () => {
      const inputTaskName = document.querySelector("#inputTaskNameEdit").value;
      const inputDescription = document.querySelector(
        "#inputDescriptionEdit"
      ).value;
      const inputDate = document.querySelector("#inputDateEdit").value;
      const inputPriority = document.querySelector("#inputPriorityEdit").value;
      const hasChecked = document.querySelector(`[id="taskCheck"][data-projectindex="${projectIndex}"][data-taskindex="${taskIndex}"]`).hasAttribute("checked");


      projects.projectsList[projectIndex].tasks[taskIndex] = {
        title: inputTaskName,
        description: inputDescription,
        date: inputDate,
        priority: inputPriority,
        checked: hasChecked,
      };

      dom.renderTasks(document.querySelector("#todolist").dataset.projectindex);
    });
  }

  return {
    renderProjects,
    renderTasks,
    editTask,
  };
})();

export default dom;
