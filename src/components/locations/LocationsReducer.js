import {actionTypes} from './LocationsConstants.js';

export default (state = [], action) => {
	switch (action.type) {
		case actionTypes.LOCATIONS_LOADED:
			return action.result;
		default: 
			return state;				
	}	
}