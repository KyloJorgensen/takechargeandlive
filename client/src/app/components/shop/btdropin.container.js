'use strict';

import { connect } from 'react-redux';
import BTDropin from '../../components/shop/btdropin.component';

var mapStateToProps = function(state, props) {
    return {
    	dropInInstance: state.braintree.dropInInstance,
    	submitButtonDisabled: state.braintree.submitButtonDisabled,
    };
};

var Container = connect(mapStateToProps)(BTDropin);

export default Container;