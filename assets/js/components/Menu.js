import m from 'mithril';

export const Menu = {
	oninit(vnode) {
		vnode.state.items = [
			{
				'route': '/',
				'text': 'Home'
			},
			{
				'route': '/about',
				'text': 'About'
			},
			{
				'route': '/faq',
				'text': 'FAQ'
			},
			{
				'route': '/contact',
				'text': 'Contact me'
			}
		];
	},
	view(vnode) {
		return m('nav.sn-top-bar', m('ul.sn-menu',
			vnode.state.items.map(item => {
				return m('li', [m(`a[href=${item.route}]`, item.text)])
			})
		));
	}
};