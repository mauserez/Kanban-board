import s from "./KanbanTask.module.css";
import { Link, useParams } from "react-router-dom";
import { getTask, saveTask } from "../../../api/localStorageKanbanTasks";
import { TaskType } from "../types/kanbanTypes";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { autoGrow } from "../../../utils/textAreaHelper";
import { useDebounce } from "../../../hooks/useDebounce";
import { useEffect } from "react";

export const KanbanTask = () => {
	const { id } = useParams();
	const [task, setTask] = useState({} as TaskType);
	const editedTask = useDebounce<TaskType>(task, 400);

	useLayoutEffect(() => {
		if (id) {
			const idParsed = parseFloat(id);
			const taskLocal = getTask(idParsed);
			setTask(taskLocal);
		}
	}, [id]);

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setTask({ ...task, description: e.target.value });
	};

	// Fetch API (optional)
	useEffect(() => {
		saveTask(editedTask);
	}, [editedTask]);

	return (
		<>
			{task ? (
				<div className={s.task}>
					<div className={s.taskTitle}>
						{task.name}
						<Link to={"/"}>
							<img src="/close.svg" />
						</Link>
					</div>
					<div className={s.taskDescription}>
						<textarea
							value={task.description}
							className={s.taskDescriptionArea}
							placeholder="Опишите задачу..."
							onInput={(e) => {
								autoGrow(e.currentTarget);
							}}
							onChange={handleChange}
						/>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};
