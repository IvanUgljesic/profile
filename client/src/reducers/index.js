import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import theme from './themeSwitcher';
import qanda from './qanda';
import email from './sendEmail';

export default combineReducers({posts, auth, theme, qanda, email});