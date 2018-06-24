'use strict';

import React, { Component } from 'react';

class TwitchIframe extends Component {
    constructor(props) {
        super(props);
        this.state = {
			twitchIframeHeight: 'auto',
			twitchIframeWidth: 'auto',
  		};
  		this.twitchIframeLoaded = this.twitchIframeLoaded.bind(this);
    }

	componentDidMount() {
		window.addEventListener('resize', this.twitchIframeLoaded);
	}

	componentWillUnmount(){
		window.removeEventListener('resize', this.twitchIframeLoaded);
	}

	twitchIframeLoaded() {
		var maxWidth = this.refs["twitch-iframe-wrapper"].clientWidth;
		var _state = this.state;
		_state.twitchIframeHeight = maxWidth*378/620+'px';
		_state.twitchIframeWidth = maxWidth+'px';
		this.setState(_state);
	}

	render() { 
		return (
			<div className="twitch-iframe-wrapper col-md-8 p-0" ref="twitch-iframe-wrapper" >
				<iframe src="https://player.twitch.tv/?channel=pencil4life" ref="twich-iframe" onLoad={this.twitchIframeLoaded} style={{height: this.state.twitchIframeHeight, width: this.state.twitchIframeWidth}} frameBorder="0" allowFullScreen="true" scrolling="no" ></iframe>
{/*					<a href="https://www.twitch.tv/pencil4life?tt_content=text_link&tt_medium=live_embed" style="padding:2px 0px 4px; display:block; width:345px; font-weight:normal; font-size:10px; text-decoration:underline;">Watch live video from pencil4life on www.twitch.tv</a>*/}
			</div>
		);
	}
};

export default TwitchIframe;