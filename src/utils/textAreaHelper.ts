export const autoGrow = (element: HTMLTextAreaElement) => {
	element.style.height = "5px";
	element.style.height = element.scrollHeight + "px";
};
