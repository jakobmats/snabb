import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import other assets
import '../images/crossword.png';
import '../scss/app.scss';
import 'font-awesome/css/font-awesome.css';

class Hello extends React.Component {
	render() {
		return (
			<strong>Hello World!</strong>
		);
	}
}

ReactDOM.render(<Hello/>, document.getElementById('react-container'));