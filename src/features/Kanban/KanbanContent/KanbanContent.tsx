import { ComponentProps } from "react";
import s from "./KanbanContent.module.css";

type KanbanContentProps = ComponentProps<"main">;
export const KanbanContent = (props: KanbanContentProps) => {
	const { children, ...sectionProps } = props;
	return (
		<main {...sectionProps} className={s.content}>
			{children}
		</main>
	);
};
