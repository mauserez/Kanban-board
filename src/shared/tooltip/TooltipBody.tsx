import {
	useLayoutEffect,
	useState,
	useCallback,
	ReactNode,
	useRef,
} from "react";

type TooltipBodyProps = {
	children: ReactNode;
	targetRect: DOMRect;
};

export const TooltipBody = (props: TooltipBodyProps) => {
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [tooltipRect, setTooltipRect] = useState({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
	} as DOMRect);

	const { children, targetRect } = props;

	if (tooltipRect.top < 0) {
		// It doesn't fit above, so place below.
		setTooltipRect({ ...tooltipRect, ...{ top: targetRect.bottom } });
	}

	const [bodyStyle, setBodyStyle] = useState({});

	useLayoutEffect(() => {
		setBodyStyle({
			position: "absolute",
			transform: `translate3d(${tooltipRect.left}px, ${tooltipRect.top}px, 0) `,
		});
	}, [tooltipRect]);

	const updateTooltipRect = useCallback(() => {
		if (tooltipRef.current) {
			const rect = tooltipRef.current.getBoundingClientRect();
			const tooltipLeft = targetRect.left - rect.width / 2;
			const tooltipTop = targetRect.bottom + 11 / 2;

			const tooltipRect = {
				...rect,
				...{ left: tooltipLeft < 0 ? 8 : tooltipLeft, top: tooltipTop },
			};

			setTooltipRect(tooltipRect);
		}
	}, [targetRect]);

	useLayoutEffect(() => {
		updateTooltipRect();
	}, [updateTooltipRect]);

	return (
		<div style={bodyStyle} ref={tooltipRef} className="portal-tooltip">
			<div className="portal-tooltip__body">{children}</div>
		</div>
	);
};
