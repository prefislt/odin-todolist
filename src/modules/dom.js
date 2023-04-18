import projects from "./projects";
import tasks from "./tasks";

const dom = (() => {
  const body = document.querySelector("body");

  document.querySelector("html").setAttribute("data-theme", "halloween");
  body.innerHTML = /*html*/ `
        <div id="content" class="flex flex-col items-center justify-between h-screen w-full">
            <header class="flex w-screen justify-center p-4 mt-2">
              <div class="navbar flex-col sm:flex-row bg-base-300 rounded-box max-w-screen-lg">
                <div class="flex-1 px-2 lg:flex-none">
                  <a class="text-lg font-bold">To-Do List</a>
                </div> 
                <div class="flex justify-end flex-1 px-2">
                  <div class="flex items-stretch">
                    <label for="popup" id="addNewTaskButton" class="btn btn-ghost rounded-btn">Add new task</label>
                    <label for="popup" id="addNewProjectButton" class="btn btn-ghost rounded-btn">Add new project</label>
                  </div>
                </div>
              </div>
            </header>
            <main class="flex flex-grow w-screen justify-center pb-4 px-4">
              <div id="projectsAndTasks" class="flex flex-col flex-grow min-w-0 max-w-screen-lg">
                <div id="projectsarea" class="overflow-auto scrollbar-hide">
                    <div id="projectsDom" class="flex flex-row gap-2 mb-4 min-w-fit"></div>
                </div>
                <div id="todos" class="flex flex-col justify-center"></div>
              </div>
            </main>
            <footer class="footer items-center p-4 bg-neutral text-neutral-content">
              <div class="items-center grid-flow-col">
                <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg> 
                <p>To-Do List 🚀 2023</p>
              </div> 
              <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a href="https://twitter.com/prefislt"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a> 
                <a href="https://github.com/prefislt">
                  <svg class="fill-base-content stroke-base-content w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.9992 5.95846C21.0087 6.565 20.9333 7.32649 20.8658 7.8807C20.8395 8.09686 20.8037 8.27676 20.7653 8.42453C21.6227 10.01 22 11.9174 22 14C22 16.4684 20.8127 18.501 18.9638 19.8871C17.1319 21.2605 14.6606 22 12 22C9.33939 22 6.86809 21.2605 5.0362 19.8871C3.18727 18.501 2 16.4684 2 14C2 11.9174 2.37732 10.01 3.23472 8.42452C3.19631 8.27676 3.16055 8.09685 3.13422 7.8807C3.06673 7.32649 2.99133 6.565 3.00081 5.95846C3.01149 5.27506 3.10082 4.5917 3.19988 3.91379C3.24569 3.60028 3.31843 3.30547 3.65883 3.11917C4.00655 2.92886 4.37274 2.99981 4.73398 3.1021C5.95247 3.44713 7.09487 3.93108 8.16803 4.51287C9.2995 4.17287 10.5783 4 12 4C13.4217 4 14.7005 4.17287 15.832 4.51287C16.9051 3.93108 18.0475 3.44713 19.266 3.1021C19.6273 2.99981 19.9935 2.92886 20.3412 3.11917C20.6816 3.30547 20.7543 3.60028 20.8001 3.91379C20.8992 4.5917 20.9885 5.27506 20.9992 5.95846ZM20 14C20 12.3128 19.6122 10 17.5 10C16.5478 10 15.6474 10.2502 14.7474 10.5004C13.8482 10.7502 12.9495 11 12 11C11.0505 11 10.1518 10.7502 9.25263 10.5004C8.35261 10.2502 7.45216 10 6.5 10C4.39379 10 4 12.3197 4 14C4 15.7636 4.82745 17.231 6.23588 18.2869C7.66135 19.3556 9.69005 20 12 20C14.3099 20 16.3386 19.3555 17.7641 18.2869C19.1726 17.231 20 15.7636 20 14ZM10 14.5C10 15.8807 9.32843 17 8.5 17C7.67157 17 7 15.8807 7 14.5C7 13.1193 7.67157 12 8.5 12C9.32843 12 10 13.1193 10 14.5ZM15.5 17C16.3284 17 17 15.8807 17 14.5C17 13.1193 16.3284 12 15.5 12C14.6716 12 14 13.1193 14 14.5C14 15.8807 14.6716 17 15.5 17Z"></path> </g></svg></a>
              </div>
            </footer>
            <div id="popupContent"></div>
        </div>
    `;

  // try horizontal scroll for project selector when it doesn't fit on screen
  const projectsarea = document.querySelector("#projectsarea");

  projectsarea.addEventListener("wheel", (event) => {
    event.preventDefault();

    projectsarea.scrollBy({
      left: event.deltaY < 0 ? -30 : 30,
    });
  });

  // If "add new task" button is pressed change popup design to this
  document.querySelector("#addNewTaskButton").addEventListener("click", (e) => {
    document.querySelector("#popupContent").innerHTML = /*html*/ `
            <input type="checkbox" id="popup" class="modal-toggle" />
                <label for="popup" class="modal cursor-pointer">
                    <label class="modal-box relative">
                        <label for="popup" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
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

      const projectIndex = document.querySelector("#todolist").dataset.projectindex;

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
                        <label for="popup" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
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
    });
  });

  function renderProjects() {
    document.querySelector("#projectsDom").innerHTML = ""; // clear projects list

    document.querySelector("#projectsDom").innerHTML += /*html*/ `
          <button id="projectButton" class="btn btn-outline font-bold no-animation" data-index="-1">ALL</button>
        `;

    for (let i = 0; i < projects.projectsList.length; i++) {
      document.querySelector("#projectsDom").innerHTML += /*html*/ `
                <button id="projectButton" class="btn btn-outline font-bold no-animation" data-index="${i}">
                  <div>${projects.projectsList[i].title}</div>
                </button>
            `;
    }


    // Add event listener to all project selection buttons
    let projectButtons = document.querySelectorAll("#projectButton").length;
    for (let i = 0; i < projectButtons; i++) {
      document.querySelectorAll("#projectButton")[i].addEventListener("click", (e) => {
        dom.renderTasks(e.currentTarget.dataset.index);
        dom.renderProjects();
        document.querySelector(`[id="projectButton"][data-index="${document.querySelector('#todolist').dataset.projectindex}"]`).classList.add('underline', 'underline-offset-4');
      });
    }
  }

  function generateTask(projectIndex, taskIndex) {
    const dom = /*html*/ `
        <div id="todoTask" class="flex flex-row justify-between w-full bg-primary rounded-md p-2" data-projectindex="${projectIndex}" data-taskindex="${taskIndex}">
          <div class="flex justify-center items-center w-6">
              <input id="taskCheck" class="checkbox checkbox-md border-2 border-slate-900" type="checkbox" data-projectindex="${projectIndex}" data-taskindex="${taskIndex}"/>
          </div>
          <div id="todoContent" class="flex flex-col flex-1 mx-2 text-primary-content" data-projectindex="${projectIndex}" data-taskindex="${taskIndex}">
              <span id="todoText" class="font-bold" data-projectindex="${projectIndex}" data-taskindex="${taskIndex}">${projects.projectsList[projectIndex].tasks[taskIndex].title}</span>
              <span id="todoDesc" class="text-xs" data-projectindex="${projectIndex}" data-taskindex="${taskIndex}">${projects.projectsList[projectIndex].tasks[taskIndex].description}</span>
              <div id="smallInfo">
                <div id="todoDate" class="badge badge-sm text-[0.7rem]" data-projectindex="${projectIndex}" data-taskindex="${taskIndex}">📆 ${projects.projectsList[projectIndex].tasks[taskIndex].date}</div>
                <div id="todoPriority" class="badge badge-sm text-[0.7rem]" data-projectindex="${projectIndex}" data-taskindex="${taskIndex}">⚠️ ${projects.projectsList[projectIndex].tasks[taskIndex].priority}</div>
              </div>
          </div>
          <div id="actionButtons" class="flex flex-row gap-2">
          <label for="popup" id="editTaskButton" class="btn" data-projectindex="${projectIndex}" data-taskindex="${taskIndex}">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>
          </label>
          <label for="popup" class="btn" id="todoDelete" data-projectindex="${projectIndex}" data-taskindex="${taskIndex}">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </label>
          </div>
        </div>
    `;
    return dom;
  }

  function noTasks(text) {
    const noTasksDOM = /*html*/`

    <div class="grid h-20 card bg-base-300 rounded-box place-items-center">${text}</div>
    
    `;

    return noTasksDOM;
  }

  function renderTasks(index) {

    if (index < 0 || isNaN(index)) {
      document.querySelector("#todos").innerHTML = /*html*/ `
                <div id="todolist" class="flex flex-col gap-2 w-full flex-grow" data-projectindex="-1"></div>
      `;

      let taskCount = 0;
      let projectsCount = 0;

      for (let i = 0; i < projects.projectsList.length; i++) {
        projectsCount++;
        for (let l = 0; l < projects.projectsList[i].tasks.length; l++) {
          taskCount++;
          document.querySelector("#todolist").innerHTML += dom.generateTask(i, l);
          tasks.taskCheck(i, l);
        }
      }

      if (taskCount === 0) {
        document.querySelector("#todolist").innerHTML = dom.noTasks("All projects are empty.");
      }

      if (projectsCount === 0) {
        document.querySelector("#todolist").innerHTML = dom.noTasks("There are no projects, please add one.");
      }

    }

    if (index >= 0) {
      document.querySelector("#todos").innerHTML = /*html*/ `
                <div id="todolist" class="flex flex-col gap-2 w-full" data-projectindex="${index}"></div>
                <div id="footerButton" class="flex flex-row mt-4 gap-2">
                  <label for="popup" id="editProjectButton" class="btn btn-outline btn-warning" data-projectindex="${index}">Edit project</label>
                  <label for="popup" id="deleteProjectButton" class="btn btn-outline btn-error" data-projectindex="${index}">Delete project</label>
                </div>
      `;

      // If "delete project" button is pressed change popup design to this
      document.querySelector("#deleteProjectButton").addEventListener("click", (e) => {
        document.querySelector("#popupContent").innerHTML = /*html*/ `
                      <input type="checkbox" id="popup" class="modal-toggle" />
                      <label for="popup" class="modal cursor-pointer">
                          <label class="modal-box relative">
                              <label for="popup" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                              <span>DELETE "<b>${projects.projectsList[e.currentTarget.dataset.projectindex].title}</b>" PROJECT WITH ALL TASKS IN IT?</span>
                              <div id="deleteProject" class="flex flex-row gap-2 justify-center items-center my-2 max-w-lg">
                                  <label for="popup" class="btn btn-success" id="deleteProjectNo">NO</label>
                                  <label for="popup" class="btn btn-error" id="deleteProjectYes" data-projectindex="${e.currentTarget.dataset.projectindex}">YES</label>
                              </div>
                          </label>
                      </label>
                  `;

        document.querySelector("#deleteProjectYes").addEventListener("click", (e) => {
          projects.removeProject(e.currentTarget.dataset.projectindex);
        });
      });

      // If "edit project" button is pressed change popup design to this
      document.querySelector("#editProjectButton").addEventListener("click", (e) => {
        document.querySelector("#popupContent").innerHTML = /*html*/ `
          <input type="checkbox" id="popup" class="modal-toggle" />
          <label for="popup" class="modal cursor-pointer">
              <label class="modal-box relative">
                  <label for="popup" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                  <span>Change project name</span>
                  <div id="addProject" class="flex flex-col gap-2 justify-center items-center my-2 max-w-lg">
                      <input class="input input-bordered w-full" id="editProjectName" type="text" placeholder="Project name" value="${projects.projectsList[e.currentTarget.dataset.projectindex].title}">
                      <button class="btn btn-primary" id="editProject" data-projectindex="${e.currentTarget.dataset.projectindex}">Confirm</button>
                  </div>
              </label>
          </label>
        `;

        document.querySelector("#editProject").addEventListener("click", (e) => {
          const editProjectName = document.querySelector("#editProjectName").value;
          const editProjectIndex = e.currentTarget.dataset.projectindex;
          projects.editProjectName(editProjectIndex, editProjectName);
          dom.renderProjects();
          document.querySelector(`[id="projectButton"][data-index="${document.querySelector('#todolist').dataset.projectindex}"]`).classList.add('underline', 'underline-offset-4');
        });
      });

      if (projects.projectsList[index].tasks.length > 0) {
        for (let i = 0; i < projects.projectsList[index].tasks.length; i++) {
          document.querySelector("#todolist").innerHTML += dom.generateTask(index, i);
          tasks.taskCheck(index, i);
        }
      } else {
        document.querySelector("#todolist").innerHTML = dom.noTasks("This project has no tasks.");
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
      document.querySelectorAll("#editTaskButton")[i].addEventListener("click", (e) => {
        const taskIndex = e.currentTarget.dataset.taskindex;
        const projectIndex = e.currentTarget.dataset.projectindex;
        dom.editTask(taskIndex, projectIndex);
      });
    }

    // Add event listener to all delete buttons on tasks
    let deleteButtons = document.querySelectorAll("#todoDelete").length;
    for (let i = 0; i < deleteButtons; i++) {
      document.querySelectorAll("#todoDelete")[i].addEventListener("click", (e) => {

        document.querySelector("#popupContent").innerHTML = /*html*/ `
                      <input type="checkbox" id="popup" class="modal-toggle" />
                      <label for="popup" class="modal cursor-pointer">
                          <label class="modal-box relative">
                              <label for="popup" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                              <span>DELETE THIS TASK?</span>
                              <div id="deleteTask" class="flex flex-row gap-2 justify-center items-center my-2 max-w-lg">
                                  <label for="popup" class="btn btn-success" id="deleteTaskNo">NO</label>
                                  <label for="popup" class="btn btn-error" id="deleteTaskYes" data-projectindex="${e.currentTarget.dataset.projectindex}" data-taskindex="${e.currentTarget.dataset.taskindex}">YES</label>
                              </div>
                          </label>
                      </label>
                  `;
        document.querySelector("#deleteTaskYes").addEventListener("click", (e) => {
          tasks.removeTask(e.currentTarget.dataset.projectindex, e.currentTarget.dataset.taskindex);
        });
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

      projects.saveProjects();
      dom.renderTasks(document.querySelector("#todolist").dataset.projectindex);
    });
  }

  return {
    renderProjects,
    renderTasks,
    editTask,
    generateTask,
    noTasks,
  };
})();

export default dom;
