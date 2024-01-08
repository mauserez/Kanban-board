import s from "./KanbanBoard.module.css";

import { TaskType, TaskGrouped, StatusFlowType } from "../types/kanbanTypes";
import { useRef } from "react";
import { editAssocArray, filterAssocArray } from "../../../utils/arrayHelper";
import { ButtonBack, ButtonDelete } from "./KanbanButtons";
import { KanbanBacklogButtons } from "./KanbanBacklogButtons";
import { KanbanStatusButtons } from "./KanbanStatusButtons";
import { Link } from "react-router-dom";

export type KanbanCardProps = {
	label: string;
	status: string;
	statusTasks: TaskType[];
	groupedTasks: TaskGrouped;
	allTasks: TaskType[];
	statusFlow: StatusFlowType;
	setTasks: (tasks: TaskType[]) => void;
};

export const KanbanCard = (props: KanbanCardProps) => {
	const taskListRef = useRef(null);

	const {
		allTasks,
		statusTasks,
		groupedTasks,
		label,
		status,
		setTasks,
		statusFlow,
	} = props;

	const handleTaskToPreviousStatus = (task: TaskType) => {
		const taskEdited = { ...task, status: statusFlow.from };
		const newTasks = editAssocArray(allTasks, taskEdited, "id") as TaskType[];
		setTasks(newTasks);
	};

	const handleDeleteTask = (task: TaskType) => {
		const newTasks = filterAssocArray(allTasks, task, "id") as TaskType[];
		setTasks(newTasks);
	};

	return (
		<div className={s.card}>
			<div className={s.cardTitle}>{label}</div>
			{statusTasks && (
				<div ref={taskListRef} className={s.cardBody}>
					{statusTasks.map((task) => (
						<div key={task.id} className={s.cardBodyItem}>
							<div className={s.cardTaskName}>
								{task.status !== "backlog" && (
									<ButtonBack
										onClick={() => {
											handleTaskToPreviousStatus(task);
										}}
									/>
								)}
								<Link to={`/tasks/${task.id}`}>
									<div>{task.name}</div>
								</Link>
							</div>
							<div className={s.deleteTaskButton}>
								<ButtonDelete
									onClick={() => {
										handleDeleteTask(task);
									}}
								/>
							</div>
						</div>
					))}
				</div>
			)}
			<>
				{status === "backlog" ? (
					<KanbanBacklogButtons
						taskListRef={taskListRef}
						addNewTask={(task: TaskType) => {
							setTasks([...allTasks, task]);
						}}
					/>
				) : (
					<KanbanStatusButtons
						taskListRef={taskListRef}
						onNextTaskStatus={(task) => {
							const newTasks = editAssocArray(
								allTasks,
								task,
								"id"
							) as TaskType[];
							setTasks(newTasks);
						}}
						statusFlow={statusFlow}
						tasksFromPrevStatus={groupedTasks[statusFlow.from]}
					/>
				)}
			</>
		</div>
	);
};
