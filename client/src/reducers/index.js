import { combineReducers } from 'redux';

import posts from './posts';
import theme from './themeSwitcher';
import qanda from './qanda';
import email from './sendEmail';

export default combineReducers({posts, theme, qanda, email});