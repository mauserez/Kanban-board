import { useState, useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";

import s from "./Kanban.module.css";
import { TaskType, TaskGrouped } from "./types/kanbanTypes";

import {
	getTasks,
	saveTasks,
	calcGroupedTask,
} from "../../api/localStorageKanbanTasks";

import { KanbanFooter } from "./KanbanFooter/KanbanFooter";
import { KanbanHeader } from "./KanbanHeader/KanbanHeader";
import { KanbanTask } from "./KanbanTask/KanbanTask";
import { KanbanContent } from "./KanbanContent/KanbanContent";
import { KanbanBoard } from "./KanbanBoard/KanbanBoard";

export const Kanban = () => {
	const [tasks, setTasks] = useState([] as TaskType[]);
	const [groupedTasks, setGroupedTasks] = useState({} as TaskGrouped);

	useLayoutEffect(() => {
		const localStorageTasks = getTasks();
		setTasks(localStorageTasks.allTasks);
		setGroupedTasks(localStorageTasks.groupedTasks);
	}, []);

	const handleSaveTasks = (tasks: TaskType[]) => {
		setTasks(tasks);
		setGroupedTasks(calcGroupedTask(tasks));
		saveTasks(tasks);
	};

	return (
		<section className={s.kanbanSection}>
			<KanbanHeader />
			<KanbanContent>
				<Routes>
					<Route
						path="/"
						element={
							<KanbanBoard
								tasks={tasks}
								groupedTasks={groupedTasks}
								handleSaveTasks={handleSaveTasks}
							/>
						}
					/>
					<Route path="/tasks/:id" element={<KanbanTask />} />
				</Routes>
			</KanbanContent>
			<KanbanFooter groupedTasks={groupedTasks} />
		</section>
	);
};
