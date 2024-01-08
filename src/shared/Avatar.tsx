import { ComponentProps } from "react";

type AvatarProps = ComponentProps<"img">;

export const Avatar = (props: AvatarProps) => {
	return <img src={props.src ?? "/vite.svg"} {...props} />;
};
