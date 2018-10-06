import m from 'mithril';

export const Index = {
	oninit(vnode) {
		vnode.state.boxes = [
			{
				question: 'What is Snabb?',
				answer: 'Snabb offers an easy way to create QR code labels from your Colnect collection.'
			},
			{
				question: 'What is a QR code?',
				answer: 'It\'s a two-dimensional kind of barcode that originated in Japan and is now widely used to label different things.'
			},
			{
				question: 'I want to use it now!',
				answer: m('a[href="/go"].go-link', { oncreate: m.route.link }, 'Click here ', m('i.fas.fa-heart.heart'))
			}
		];
	},
	view(vnode) {
		return [
			m('.pure-g.welcome-banner',
				m('.pure-u-1',
					m('h1', ['Welcome to Snabb!', m('i.fas.fa-rocket.rocket')]))),
			m('.pure-g', vnode.state.boxes.map(box => {
				return m(`.pure-u-1-${vnode.state.boxes.length}.info-box`, m('p.info-box-question', box.question), m('p', box.answer));
			}))
		];
	}
};