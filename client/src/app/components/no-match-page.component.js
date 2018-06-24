'use strict';

import React, { Component } from 'react';

class NoMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {        
        return (
            <div className="no-match-page-wrapper" >
                <div className="container">
                    <h1>Page Not Found</h1>
                </div>
            </div>
        );
    }
};

export default NoMatch;