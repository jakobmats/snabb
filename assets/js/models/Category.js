import m from 'mithril';

export const Category = {
	list: [],
	loadList() {
		m.request({
			method: 'GET',
			url: '/api/category_names'
		}).then(result => {
			Category.list = result;
		});
	}
};