import { ComponentProps } from "react";
import s from "./Footer.module.css";

type FooterProps = ComponentProps<"footer">;
const Footer = (props: FooterProps) => {
	return (
		<footer className={`${s.footer} ${props.className ?? ""}`}>
			{props.children}
		</footer>
	);
};

export default Footer;
