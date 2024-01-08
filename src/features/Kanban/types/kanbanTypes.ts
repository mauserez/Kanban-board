export type TaskType = {
	id: number;
	name: string;
	description: string;
	status: string;
};

export type TaskGrouped = {
	[key: string]: TaskType[];
};

export type StatusFlowType = {
	from: string;
	to: string;
};
