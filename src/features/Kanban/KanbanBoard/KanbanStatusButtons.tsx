import s from "./KanbanBoard.module.css";

import { useState, RefObject, ReactNode } from "react";
import { scrollDown } from "../../../utils/scrollHelper";
import { TaskType, StatusFlowType } from "../types/kanbanTypes";
import { AddButton } from "./KanbanButtons";

export type KanbanStatusButtonsProps = {
	taskListRef: RefObject<HTMLElement>;
	tasksFromPrevStatus: TaskType[];
	statusFlow: StatusFlowType;
	onNextTaskStatus: (task: TaskType) => void;
};

export const KanbanStatusButtons = (props: KanbanStatusButtonsProps) => {
	const { tasksFromPrevStatus, onNextTaskStatus, statusFlow, taskListRef } =
		props;
	const [addDisabled, setAddDisabled] = useState(false);
	const taskList = taskListRef.current;

	const handleToggleAddDisabled = () => {
		setAddDisabled(!addDisabled);
	};

	const handleTaskToStatus = (task: TaskType) => {
		const newTaskStatus = { ...task, status: statusFlow.to };
		onNextTaskStatus(newTaskStatus);
		scrollDown(taskList);
		handleToggleAddDisabled();
	};

	return (
		<div>
			{addDisabled && (
				<DropDownTask onCloseDropDown={handleToggleAddDisabled}>
					{tasksFromPrevStatus.map((task) => (
						<div
							onClick={() => {
								handleTaskToStatus(task);
							}}
							className={s.dropDownItem}
							key={task.id}
						>
							<div className="flex justify-between">{task.name}</div>
						</div>
					))}
				</DropDownTask>
			)}
			<AddButton
				disabled={!tasksFromPrevStatus}
				onClick={handleToggleAddDisabled}
			/>
		</div>
	);
};

type DropDownTaskProps = {
	onCloseDropDown: () => void;
	children: ReactNode;
};

const DropDownTask = (props: DropDownTaskProps) => {
	const { onCloseDropDown, children } = props;
	return (
		<div className={s.dropDown}>
			<div onClick={onCloseDropDown} className={`${s.dropDownSelectItem}`}>
				<img src="/selectIcon.svg" />
			</div>
			<div className="relative">
				<div className={s.dropDownList}>{children}</div>
			</div>
		</div>
	);
};
