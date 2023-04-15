import "./style.css";
import { createHtmlElement } from "./modules/functions";
import projects from "./modules/projects";
import tasks from "./modules/tasks";
import dom from "./modules/dom";

dom.renderProjects();
dom.renderTasks(1);

document.querySelector("#submitTodo").addEventListener("click", () => {
	let inputTaskName = document.querySelector("#inputTaskName").value;
	let inputDescription = document.querySelector("#inputDescription").value;
	let inputDate = document.querySelector("#inputDate").value;
	let inputPriority = document.querySelector("#inputPriority").value;

	const projectIndex = document.querySelector("#todolist").dataset.projectindex;

	tasks.addTask(
		inputTaskName,
		inputDescription,
		inputDate,
		inputPriority,
		projectIndex
	);
});
