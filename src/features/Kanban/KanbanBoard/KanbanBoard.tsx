import s from "./KanbanBoard.module.css";

import { TaskType, TaskGrouped } from "../types/kanbanTypes";
import { KanbanCard } from "./KanbanCard";

const KANBAN_STATUSES = [
	{ id: 1, label: "Backlog", status: "backlog" },
	{ id: 2, label: "Ready", status: "ready" },
	{ id: 3, label: "In progress", status: "inprogress" },
	{ id: 4, label: "Finished", status: "finished" },
];

const STATUS_FLOW = [
	{ from: "", to: "backlog" },
	{ from: "backlog", to: "ready" },
	{ from: "ready", to: "inprogress" },
	{ from: "inprogress", to: "finished" },
];

type KanbanBoardProps = {
	tasks: TaskType[];
	groupedTasks: TaskGrouped;
	handleSaveTasks: (tasks: TaskType[]) => void;
};

export const KanbanBoard = (props: KanbanBoardProps) => {
	const { tasks, groupedTasks, handleSaveTasks } = props;

	return (
		<section className={s.board}>
			{KANBAN_STATUSES.map((statusObj) => {
				return (
					<KanbanCard
						{...statusObj}
						key={statusObj.id}
						allTasks={tasks}
						groupedTasks={groupedTasks}
						statusTasks={groupedTasks[statusObj.status]}
						statusFlow={STATUS_FLOW.filter((i) => statusObj.status === i.to)[0]}
						setTasks={(tasks) => {
							handleSaveTasks(tasks);
						}}
					/>
				);
			})}
		</section>
	);
};
