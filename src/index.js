import "./style.css";
import { createHtmlElement } from "./modules/functions";
import projects from "./modules/projects";
import tasks from "./modules/tasks";
import dom from "./modules/dom";

dom.renderProjects();
dom.renderTasks(1);

const taskDom = document.querySelector(
  '[data-projectindex="1"][data-taskindex="0"]'
);
