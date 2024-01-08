import { TaskGrouped } from "../types/kanbanTypes";
import Footer from "../../../components/Footer";
import s from "./KanbanFooter.module.css";

type KanbanFooterProps = {
	groupedTasks: TaskGrouped;
};

export const KanbanFooter = (props: KanbanFooterProps) => {
	const dt = new Date();
	const { groupedTasks } = props;

	if (groupedTasks) {
		return (
			<Footer>
				<div className={s.footer}>
					<div className={s.footerTasks}>
						<div>
							Active tasks:{" "}
							{groupedTasks["backlog"] ? groupedTasks["backlog"].length : 0}
						</div>
						<div>
							Finished tasks:{" "}
							{groupedTasks["finished"] ? groupedTasks["finished"].length : 0}
						</div>
					</div>
					<div>Kanban board by Giorgio Kartokhin, {dt.getFullYear()}</div>
				</div>
			</Footer>
		);
	}

	return <></>;
};
