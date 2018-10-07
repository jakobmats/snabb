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
		return m('form.pure-form.pure-form-stacked',
			m('fieldset',
				m('legend', 'Basic data'),
				m('label[for="memberName]', 'Member name on Colnect'),
				m('input[type="text"][required]#memberName', { oninput: m.withAttr('value', vnode.state.handleChange) })),
			m('fieldset',
				m('legend', 'List options'),
				m('label[for="listType"]', 'List type'),
				m('select#listType', { onchange: vnode.state.handleListChange },
					m('option[disabled][selected][value]'),
					m('option[value="collection"]', 'Collection'),
					m('option[value="wish"]', 'Wish'),
					m('option[value="swap"]', 'Swap')),
				m('select#category', { onchange: vnode.state.handleListChange }, Category.list.map(category => {
					return m('option', { value: category.id }, category.name)
				}))),
			m('fieldset',
				m('button.pure-button.pure-button-primary', { onclick: vnode.state.submit }, 'Submit')));
	}
};