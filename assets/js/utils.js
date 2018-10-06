import m from 'mithril';

/**
 * Create a component composed of other components
 * Mostly used for routing
 * @param {object} component
 * @param {Array} children
 */
export const composeFrom = (component, children) => {
	return {
		view() {
			return m(component, children.map(m));
		}
	};
};