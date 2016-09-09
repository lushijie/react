import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link, IndexLink} from 'react-router';

export default class extends Component {
	render(){
		return (
			<div>
		        <h1>App</h1>
		        <ul>
		        	<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
		          	<li><Link to="/about" activeClassName="active">About</Link></li>
		         	<li><Link to="/inbox" activeClassName="active">Inbox</Link></li>
		         	<li style={{marginLeft: '20px'}}><Link to="/inbox/messages/123" activeClassName="active">Message</Link></li>
		        </ul>
		        {this.props.children}
		    </div>
		)
	}
}