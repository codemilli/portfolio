import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class Sidebar extends Component {


  constructor(props){
	super(props);
	this.eventCloseSidebar = this.eventCloseSidebar.bind(this)
  }

  eventCloseSidebar (e) {
  	this.props.toggleSidebar(!this.props.layout.sidebarOpen);
  }

  render() {

    return (

    	<div className="sidebar">

		  <nav className="sidebar-nav">
		    <Link to="/home" className="sidebar-nav-item" onClick={this.eventCloseSidebar} activeClassName="active">Home</Link>
		    <Link to="/portfolio" className="sidebar-nav-item" onClick={this.eventCloseSidebar} activeClassName="active">Career</Link>
		  </nav>

		  <div className="sidebar-item sidebar-footer">

		    <p>
				Visit <a target="blank" href="https://github.com/young-utf">My GitHub Repo</a><br/>
				Visit <a target="blank" href="https://www.facebook.com/youngmoon91">My FaceBook</a><br/>
				Visit <a target="blank" href="https://twitter.com/youngmmmoon">My Twitter</a><br/>
		    </p>

		  </div>

		</div>
    );
  }
}

export default Sidebar;