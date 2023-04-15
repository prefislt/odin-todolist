import "./style.css";
import { createHtmlElement } from "./modules/functions";
import projects from "./modules/projects";
import tasks from "./modules/tasks";
import dom from "./modules/dom";

document.querySelector("#submitTodo").addEventListener("click", () => {
	let inputTaskName = document.querySelector("#inputTaskName").value;
	let inputDescription = document.querySelector("#inputDescription").value;
	let inputDate = document.querySelector("#inputDate").value;
	let inputPriority = document.querySelector("#inputPriority").value;

	tasks.addTask(inputTaskName, inputDescription, inputDate, inputPriority);
});

dom.renderProjects();
dom.renderTodos(-1);
