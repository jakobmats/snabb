import m from 'mithril';

export const Menu = {
	oninit(vnode) {
		vnode.state.items = [
			{
				'route': '/',
				'text': 'Home'
			},
			{
				'route': '/contact',
				'text': 'Contact me'
			}
		];
	},
	view(vnode) {
		return m('.pure-menu.pure-menu-horizontal.top-menu', m('ul.pure-menu-list',
			vnode.state.items.map(item => {
				return m('li.pure-menu-item', m('a.pure-menu-link', {href: item.route, oncreate: m.route.link}, item.text));
			})
		));
	}
};