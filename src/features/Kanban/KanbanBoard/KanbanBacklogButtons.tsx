import s from "./KanbanBoard.module.css";

import { useState, useRef, useLayoutEffect, RefObject } from "react";
import { TaskType } from "../types/kanbanTypes";
import { scrollDown } from "../../../utils/scrollHelper";
import { AddButton, SubmitButton, CancelButton } from "./KanbanButtons";

export type BacklogButtonsProps = {
	addNewTask: (task: TaskType) => void;
	taskListRef: RefObject<HTMLElement>;
};

export const KanbanBacklogButtons = (props: BacklogButtonsProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const { addNewTask, taskListRef } = props;
	const [addButtonType, setAddButtonType] = useState(true);
	const [taskTitle, setTaskTitle] = useState("");
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

	const taskList = taskListRef.current;

	const handleAddButton = () => {
		setAddButtonType(!addButtonType);
	};

	const handleSubmitButton = () => {
		addNewTask({
			id: Date.now(),
			name: taskTitle,
			description: "",
			status: "backlog",
		});
		setTaskTitle("");
		setAddButtonType(!addButtonType);
	};

	useLayoutEffect(() => {
		setIsSubmitDisabled(taskTitle.length > 0 ? false : true);
	}, [taskTitle.length]);

	useLayoutEffect(() => {
		if (inputRef.current) {
			scrollDown(taskList, 100);
			inputRef.current.focus();
		}
	});

	return (
		<div className={s.newTask}>
			{!addButtonType && (
				<input
					ref={inputRef}
					onKeyUp={(e) => {
						if (e.code === "Enter" && !isSubmitDisabled) {
							handleSubmitButton();
						}
					}}
					onChange={(e) => {
						setTaskTitle(e.target.value);
					}}
					value={taskTitle}
					placeholder="New task title..."
				/>
			)}

			{addButtonType ? (
				<AddButton onClick={handleAddButton} />
			) : (
				<div className="flex justify-between w-full">
					<SubmitButton
						submitDisabled={isSubmitDisabled}
						onClick={handleSubmitButton}
					/>
					<CancelButton onClick={handleAddButton} />
				</div>
			)}
		</div>
	);
};
