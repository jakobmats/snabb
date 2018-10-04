// Components
import { Menu } from "./menu";
import m from "mithril";

// Import other assets
import "../images/crossword.png";
import "../scss/app.scss";

const items = [
	{
		route: "/",
		text: "Home",
		icon: "fas fa-home"
	},
	{
		route: "/about",
		text: "About",
		icon: "fas fa-info"
	},
	{
		route: "/faq",
		text: "FAQ",
		icon: "fas fa-book"
	},
	{
		route: "/contact",
		text: "Contact me",
		icon: "fas fa-comment-alt"
	}
];
m.render(document.body, m(Menu, {items}));