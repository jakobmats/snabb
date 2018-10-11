import m from 'mithril';
import { Category } from '../models/Category';

export const LeftPanel = {
	oninit() {

		// Load category list first

		Category.loadList();

		this.handleChange = (value) => {
			this.memberName = value;
		};

		this.handleListChange = (event) => {
			const list = event.target;
			this[list.id] = list.value;
		};

		this.submit = (event) => {
			event.preventDefault();

			m.request({
				
			});
		};
	},
	view(vnode) {
		return m('form.pure-form.pure-form-aligned',
			m('fieldset',
				m('legend', 'Basic data'),
				m('.pure-control-group',
					m('label[for="memberName]', 'Member name on Colnect'),
					m('input[type="text"][required]#memberName', { oninput: m.withAttr('value', vnode.state.handleChange) })),
					m('span.pure-form-message-inline')),
			m('fieldset',
				m('legend', 'List options'),
				m('.pure-control-group',
					m('label[for="listType"]', 'List type'),
					m('select#listType', { onchange: vnode.state.handleListChange },
						m('option[disabled][selected][value]', 'Select list type'),
						m('option[value="collection"]', 'Collection'),
						m('option[value="wish"]', 'Wish'),
						m('option[value="swap"]', 'Swap')),
					m('span.pure-form-message-inline')),
				m('.pure-control-group',
					m('label[for="category"]', 'Category'),
					m('select#category', { onchange: vnode.state.handleListChange }, [
						m('option[disabled][selected][value]', 'Select category'),
						...Object.entries(Category.list).map(category => {
							return m('option', { value: category[0] }, category[1]);
					})]),
					m('.pure-form-message-inline'))),
			m('fieldset',
				m('.pure-control-group',
					m('button.pure-button.pure-button-primary', { onclick: vnode.state.submit }, 'Submit'))));
	}
};