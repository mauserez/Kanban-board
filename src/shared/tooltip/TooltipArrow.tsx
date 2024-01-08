import { useState, useLayoutEffect, useEffect } from "react";

type TooltipContainerProps = {
	targetRect: DOMRect;
};

export const TooltipArrow = (props: TooltipContainerProps) => {
	const { targetRect } = props;
	const [arrowStyle, setArrowStyle] = useState({});

	const [tooltipArrowRect, setTooltipArrowRect] = useState({
		left: 0,
		top: 0,
		width: 11,
		height: 11,
	} as DOMRect);

	const arrowWidth = tooltipArrowRect.width;

	useLayoutEffect(() => {
		const width = targetRect.width;
		const left = targetRect.left + width / 2 - arrowWidth / 2;

		setTooltipArrowRect((prev) => ({
			...prev,
			...{
				top: targetRect.bottom,
				left: left,
			},
		}));
	}, [targetRect, arrowWidth]);

	useEffect(() => {
		setArrowStyle({
			position: "absolute",
			transform: `translate3d(${tooltipArrowRect.left}px, ${tooltipArrowRect.top}px, 0) rotate(45deg)`,
		});
	}, [tooltipArrowRect]);

	return (
		<div style={arrowStyle} className="portal-tooltip__arrow">
			&nbsp;
		</div>
	);
};
