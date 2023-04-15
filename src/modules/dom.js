import { createHtmlElement } from "./functions";
import projects from "./projects";
import tasks from "./tasks";

const dom = (() => {
	const body = document.querySelector("body");

	document.querySelector("html").setAttribute("data-theme", "halloween");
	const boilerplate = createHtmlElement(/*html*/ `
        <div id="content" class="flex flex-col justify-center items-center">
            <div id="header" class="flex justify-center items-center font-bold text-4xl my-4">To-Do List</div>
            <div id="addTodo" class="flex flex-col justify-center items-center my-2 max-w-lg">
                <input class="input input-bordered w-full" id="inputTaskName" type="text" placeholder="Name">
                <input class="input input-bordered w-full" id="inputDescription" type="text" placeholder="Description">
                <input class="input input-bordered w-full" id="inputDate" type="date" placeholder="Select date">
                <select class="select select-bordered w-full" id="inputPriority">
                    <option disabled selected>Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <button class="btn btn-primary" id="submitTodo">OK</button>
            </div>
            <div id="projectsarea" class="flex justify-center items-center">
                <div id="projectsDom" class="flex flex-row justify-start gap-2 p-2"></div>
            </div>
            <div id="todos" class="flex flex-row justify-center w-full">
                <div id="todolist" class="flex flex-col gap-2 p-2 w-full max-w-xl"></div>
            </div>
        </div>

    `);

	body.append(boilerplate);

	console.log(projects.projectsList[0].tasks);

	function renderProjects() {
		document.querySelector("#projectsDom").innerHTML = ""; // clear projects list

		document.querySelector("#projectsDom").innerHTML += /*html*/ `
          <button id="projectButton" class="btn btn-outline font-bold" data-index="-1">ALL</button>
        `;

		for (let i = 0; i < projects.projectsList.length; i++) {
			document.querySelector("#projectsDom").innerHTML += /*html*/ `
                <button id="projectButton" class="btn btn-outline font-bold" data-index="${i}">${projects.projectsList[i].title}</button>
            `;
		}
	}

	function renderTodos(index) {
		document.querySelector("#todolist").innerHTML = ""; // clear todo list

		if (index < 0) {
			for (let i = 0; i < projects.projectsList.length; i++) {
				for (let l = 0; l < projects.projectsList[i].tasks.length; l++) {
					document.querySelector("#todolist").innerHTML += /*html*/ `
                            <div id="todoTask" class="flex flex-row justify-between w-full bg-primary rounded-md p-2">
                                <div class="flex justify-center items-center w-6">
                                    <input class="checkbox checkbox-md border-2 border-slate-900" type="checkbox" id="todoCheck" />
                                </div>
                                <div id="todoContent" class="flex flex-col flex-1 mx-2 text-primary-content">
                                    <span id="todoText" class="font-bold">${projects.projectsList[i].tasks[l].title}</span>
                                    <span id="todoDesc" class="text-xs">${projects.projectsList[i].tasks[l].description}</span>
                                </div>
                                <div id="actionButtons" class="flex flex-row gap-2" data-projectIndex="${i}" data-taskIndex="${l}">
                                    <button class="btn" id="todoEdit">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>
                                    </button>
                                    <button class="btn" id="todoDelete" data-projectIndex="${i}" data-taskIndex="${l}">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    </button>
                                </div>
                            </div>
                    `;
				}
			}
		} else {
			for (let i = 0; i < projects.projectsList[index].tasks.length; i++) {
				document.querySelector("#todolist").innerHTML += /*html*/ `
                        <div id="todoTask" class="flex flex-row justify-between w-full bg-primary rounded-md p-2">
                            <div class="flex justify-center items-center w-6">
                                <input class="checkbox checkbox-md border-2 border-slate-900" type="checkbox" id="todoCheck" />
                            </div>
                            <div id="todoContent" class="flex flex-col flex-1 mx-2 text-primary-content">
                                <span id="todoText" class="font-bold">${projects.projectsList[index].tasks[i].title}</span>
                                <span id="todoDesc" class="text-xs">${projects.projectsList[index].tasks[i].description}</span>
                            </div>
                            <div id="actionButtons" class="flex flex-row gap-2" data-projectIndex="${index}" data-taskIndex="${i}">
                                <button class="btn" id="todoEdit">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>
                                </button>
                                <button class="btn" id="todoDelete" data-projectIndex="${index}" data-taskIndex="${i}">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                </button>
                            </div>
                        </div>
                `;
			}
		}

		let buttons = document.querySelectorAll("#todoDelete").length;
		console.log(document.querySelectorAll("#todoDelete"));

		for (let i = 0; i < buttons; i++) {
			document
				.querySelectorAll("#todoDelete")
				[i].addEventListener("click", (e) => {
					tasks.removeTask(e.currentTarget.dataset.index);
				});
		}
	}

	return {
		renderProjects,
		renderTodos,
	};
})();

export default dom;
