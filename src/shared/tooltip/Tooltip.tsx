import {
	useLayoutEffect,
	useState,
	RefObject,
	useEffect,
	useCallback,
} from "react";
import { createPortal } from "react-dom";
import { TooltipArrow } from "./TooltipArrow";
import { TooltipBody } from "./TooltipBody";

type TooltipProps = {
	children: React.ReactNode;
	targetRef: RefObject<HTMLElement>;
};

export const Tooltip = ({ children, targetRef }: TooltipProps) => {
	const [targetRect, setTargetRect] = useState({
		left: 0,
		top: 0,
		width: 0,
	} as DOMRect);

	const updateTargetRect = useCallback(() => {
		if (targetRef.current) {
			const targetBounding = targetRef.current.getBoundingClientRect();
			setTargetRect(targetBounding);
		}
	}, [targetRef]);

	useLayoutEffect(() => {
		updateTargetRect();
	}, [updateTargetRect]);

	useEffect(() => {
		window.addEventListener("resize", updateTargetRect);
		return () => window.removeEventListener("resize", updateTargetRect);
	}, [updateTargetRect]);

	const rootModal = document.getElementById("root-modal");

	return createPortal(
		<>
			<TooltipArrow targetRect={targetRect} />
			<TooltipBody targetRect={targetRect}>{children}</TooltipBody>
		</>,
		rootModal ? rootModal : document.body
	);
};
