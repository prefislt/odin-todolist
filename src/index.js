import "./style.css";
import { createHtmlElement } from "./modules/functions";
import projects from "./modules/projects";
import tasks from "./modules/tasks";
import dom from "./modules/dom";

dom.renderProjects();
dom.renderTasks(1);

document.querySelector("#addTaskPopup").addEventListener("click", () => {
	document.querySelector("#submitTask").addEventListener("click", () => {
		const inputTaskName = document.querySelector("#inputTaskName").value;
		const inputDescription = document.querySelector("#inputDescription").value;
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

document.querySelector("#addProjectPopup").addEventListener("click", () => {
	document.querySelector("#submitProject").addEventListener("click", () => {
		const inputProjectName = document.querySelector("#inputProjectName").value;
		projects.addProject(inputProjectName);
		dom.renderProjects();
	});
});

const taskDom = document.querySelector(
	'[data-projectindex="1"][data-taskindex="0"]'
);
