import dom from "./dom";
import projects from "./projects";

const tasks = (() => {
	class CreateTask {
		constructor(title, description, date, priority) {
			this.title = title;
			this.description = description;
			this.date = date;
			this.priority = priority;
			this.projectId = 0;
			this.taskId = 0;
			this.checked = false;
		}
	}

	function addTask(title, description, date, priority) {
		const newTask = new CreateTask(title, description, date, priority);
		projects.projectsList[0].tasks.push(newTask);
		dom.renderTodos();
	}

	return {
		addTask,
	};
})();

export default tasks;
