import { ComponentProps, useState, memo } from "react";
import { useRef } from "react";
import s from "./Header.module.css";
import { Tooltip } from "../shared/tooltip/Tooltip";

type HeaderTitleProps = ComponentProps<"div">;
export const HeaderTitle = (props: HeaderTitleProps) => {
	return (
		<div className={s.headerTitle} {...props}>
			{props.children}
		</div>
	);
};

export const HeaderAvatar = memo(() => {
	const [rect, setRect] = useState<null | DOMRect>(null);
	const avatarRef = useRef<HTMLImageElement>(null);

	return (
		<div
			onClick={() => {
				if (rect) {
					setRect(null);
				} else {
					if (avatarRef.current) {
						const rect = avatarRef.current.getBoundingClientRect();
						setRect(rect);
					}
				}
			}}
			className={s.headerAvatarWrap}
		>
			<img src="/avatar.svg" ref={avatarRef} className={s.headerAvatar} />
			<img className={rect ? "rotate-180" : ""} src="/arrow.svg" />

			{rect !== null && (
				<Tooltip targetRef={avatarRef}>
					<HeaderAvatarMenu />
				</Tooltip>
			)}
		</div>
	);
});

const HeaderAvatarMenu = () => {
	const links = [
		{
			name: "Profile",
			link: "",
		},
		{ name: "Log Out", link: "" },
	];

	return (
		<ul className={s.headerAvatarMenu}>
			{links.map((li) => (
				<li key={li.link}>
					{li.link ? <a href={li.link}>{li.name}</a> : <>{li.name}</>}
				</li>
			))}
		</ul>
	);
};

type HeaderProps = ComponentProps<"header">;
export const Header = (props: HeaderProps) => {
	return (
		<header className={s.header} {...props}>
			{props.children}
		</header>
	);
};
