export const scrollDown = (
	el: HTMLElement | null,
	timeout: number = 0,
	behavior: ScrollBehavior = "smooth"
) => {
	if (el) {
		setTimeout(() => {
			el.scrollTo({
				top: el.scrollHeight,
				behavior: behavior,
			});
		}, timeout);
	}
};
