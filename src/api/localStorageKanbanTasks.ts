import { TaskType, TaskGrouped } from "../features/Kanban/types/kanbanTypes";
import { editAssocArray } from "../utils/arrayHelper";

export const saveTasks = (tasks: TaskType[]) => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const getLocalTasks = () => {
	const localTasks = localStorage.getItem("tasks");

	if (typeof localTasks !== "undefined" && localTasks !== null) {
		return JSON.parse(localTasks) as TaskType[];
	}
	return [];
};

export const getTasks = () => {
	const allTasks = getLocalTasks();
	const groupedTasks = calcGroupedTask(allTasks);
	return { allTasks: allTasks, groupedTasks: groupedTasks };
};

export const calcGroupedTask = (allTasks: TaskType[]) => {
	const groupedTasks = {} as TaskGrouped;

	if (allTasks) {
		allTasks.forEach((task) => {
			if (!groupedTasks[task.status]) {
				groupedTasks[task.status] = [];
			}
			groupedTasks[task.status].push(task);
		});
	}

	return groupedTasks;
};

export const getTask = (id: number) => {
	const tasks = getLocalTasks();
	return tasks.filter((task) => task.id === id)[0];
};

export const saveTask = (task: TaskType) => {
	const tasks = getLocalTasks();
	const newTasks = editAssocArray(tasks, task, "id") as TaskType[];
	saveTasks(newTasks);
};
