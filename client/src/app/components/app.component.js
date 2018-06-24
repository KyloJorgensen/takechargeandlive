'use strict';

// node modules
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import Loadable from 'react-loadable';

// actions
import userActions from '../actions/user.actions';

// components
import Header from './header/header.container.js'; 
import Footer from './footer/footer.container.js';
import NoMatch from './no-match-page.component';

// Switches
import HomePage from './home/homepage.container.js';
import EventSwitch from './event/event-switch.container.js';
import NewsSwitch from './news/news-switch.container.js';

// style
import './app.less';

const Loading = () => <div>Loading...</div>;

const ProjectSwitch = Loadable({
    loader: () => import('./project/project-switch.container.js'),
    loading: Loading,
});
const DoodlesSwitch = Loadable({
    loader: () => import('./doodles/doodles-switch.container.js'),
    loading: Loading,
});
const ComicsSwitch = Loadable({
    loader: () => import('./comics/comics-switch.container.js'),
    loading: Loading,
});
const SoundboardSwitch = Loadable({
    loader: () => import('./soundboard/soundboard-switch.container.js'),
    loading: Loading,
});
const ShopSwitch = Loadable({
    loader: () => import('./shop/shop-switch.container.js'),
    loading: Loading,
});
const CommissionSwitch = Loadable({
    loader: () => import('./commission/commission-switch.container.js'),
    loading: Loading,
});
const InfoSwitch = Loadable({
    loader: () => import('./info/info-switch.container.js'),
    loading: Loading,
});
const ContactSwitch = Loadable({
    loader: () => import('./contact/contact-switch.container.js'),
    loading: Loading,
});
const LoginPage = Loadable({
    loader: () => import('./login/login-page.container.js'),
    loading: Loading,
});
const ProfilePage = Loadable({
    loader: () => import('./profile/profile-page.container.js'),
    loading: Loading,
});
const ImageSwitch = Loadable({
    loader: () => import('./image/image-switch.container.js'),
    loading: Loading,
});



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(userActions.getUser());
    }

    render() {        
        return (
            <div className="app" ref="app">
                <div className="app-body">
                    <Header />
                    <div className="contatiner">
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/event" component={EventSwitch} />
                            <Route path="/project" component={ProjectSwitch} />
                            <Route path="/doodles" component={DoodlesSwitch} />
                            <Route path="/comics" component={ComicsSwitch} />
                            <Route path="/soundboard" component={SoundboardSwitch} />
                            <Route path="/shop" component={ShopSwitch} />
                            <Route path="/commission" component={CommissionSwitch} />
                            <Route path="/info" component={InfoSwitch} />
                            <Route path="/contact" component={ContactSwitch} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/news" component={NewsSwitch} />
                            <Route path="/profile" component={ProfilePage} />
                            <Route path="/image" component={ImageSwitch} />
                            <Route component={NoMatch}/>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
};

export default App;