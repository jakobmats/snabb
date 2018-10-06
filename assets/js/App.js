import m from 'mithril';
import { Index } from './components/Index';
import { Menu } from './components/Menu';
import { Main } from './components/Main';

import { composeFrom } from './utils';
// Import other assets
import '../scss/app.scss';

// Main layout component
const App = {
	view(vnode) {
		return m('.main-container', vnode.children);
	}
};

// Set up basic routing
m.route(document.body, '/', {
	'/': composeFrom(App, [Menu, Index]),
	'/go': composeFrom(App, [Menu, Main])
});