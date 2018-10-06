import m from 'mithril';
import { LeftPanel } from './LeftPanel';
import { BarcodeGallery } from './BarcodeGallery';

export const Main = {
	view() {
		return m('.pure-g',
			m('.pure-u-2-5.left-panel-container', m(LeftPanel)),
			m('.pure-u-3-5.barcode-gallery-container', m(BarcodeGallery)));
	}
};