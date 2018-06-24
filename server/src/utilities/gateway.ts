'use strict';

import { connect, Environment } from 'braintree';
import { BT_ENVIRONMENT, BT_MERCHANT_ID, BT_PRIVATE_KEY, BT_PUBLIC_KEY } from '../config/variables.express';

const environment = BT_ENVIRONMENT.charAt(0).toUpperCase() + BT_ENVIRONMENT.slice(1);

export default connect({
    environment: Environment[environment],
    merchantId: BT_MERCHANT_ID,
    publicKey: BT_PUBLIC_KEY,
    privateKey: BT_PRIVATE_KEY
});