import {actionTypes} from './CategoriesConstants.js';

export default (state = [], action) => {
	switch (action.type) {
		case actionTypes.CATEGORIES_LOADED:
			return action.result;
		default: 
			return state;				
	}	
}