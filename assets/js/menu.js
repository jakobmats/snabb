import m from "mithril";

export const Menu = {
	view({attrs}) {
		return m("nav.sn-top-bar", m("ul.sn-menu",
			attrs.items.map(item => {
				return m("li", [m(`i.${item.icon}`), m(`a[href=${item.route}]`, item.text)])
			})
		));
	}
};