import s from "./KanbanBoard.module.css";

import { ComponentProps } from "react";

type AddButtonProps = ComponentProps<"button"> & {
	addDisabled?: boolean;
};
export const AddButton = (props: AddButtonProps) => {
	const { disabled, ...otherProps } = props;
	return (
		<button
			className={s.addButton}
			type="button"
			disabled={disabled}
			{...otherProps}
		>
			<img src="/addCard.svg" />
			<div>Add card</div>
		</button>
	);
};

type CancelButtonProps = ComponentProps<"button">;
export const CancelButton = (props: CancelButtonProps) => {
	return (
		<button {...props} type="button" className={s.cancelButton}>
			Cancel
		</button>
	);
};

type SubmitButtonProps = ComponentProps<"button"> & {
	submitDisabled: boolean;
};

export const SubmitButton = (props: SubmitButtonProps) => {
	const { submitDisabled, ...otherProps } = props;
	return (
		<button
			disabled={submitDisabled}
			{...otherProps}
			type="button"
			className={s.submitButton}
		>
			<div>Submit</div>
		</button>
	);
};

type ButtonBackProps = ComponentProps<"button">;
export const ButtonBack = (props: ButtonBackProps) => {
	return (
		<button {...props} className={s.backButton}>
			<i className="bi bi-arrow-left-square-fill"></i>
		</button>
	);
};

type ButtonDeleteProps = ComponentProps<"button">;
export const ButtonDelete = (props: ButtonDeleteProps) => {
	return (
		<button {...props}>
			<i className="bi bi-x-circle-fill"></i>
		</button>
	);
};
