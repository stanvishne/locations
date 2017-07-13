import localStorageApi from '../../utils/localStorageRest.js';
import {actionTypes} from './CategoriesConstants.js';
import uuid from 'uuid/v1';

function loadCategories() {
	return localStorageApi.get('categories');
}

export default {
	loadCategories(dispatch) {
		loadCategories().then(result => {			
			dispatch({
				type: actionTypes.CATEGORIES_LOADED,
				result
			})
		});
	},

	addCategorie(dispatch, categorie) {						
		loadCategories().then(res => {
			localStorageApi.post('categories',[
				...res,
				{name: categorie, id: uuid()}
			]);			
			this.loadCategories(dispatch);
		});					
	},

	updateCategorie(dispatch, categorie) {
		loadCategories().then( res => {
			let newRes = res.map(item => {
				if (item.id === categorie.id) {
					return categorie
				} else return item;
			});
			localStorageApi.post('categories', newRes);
			this.loadCategories(dispatch);
		})
	},

	deleteCategorie(dispatch, categorie) {
		loadCategories().then(res => {			
			localStorageApi.post('categories', res.filter(item => item.id !== categorie.id));
			this.loadCategories(dispatch);
		})
	}
}