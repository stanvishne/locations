import localStorageApi from '../../utils/localStorageRest.js';
import {actionTypes} from './LocationsConstants.js';
import uuid from 'uuid/v1';

function loadLocations() {
	return localStorageApi.get('locations');
}

export default {
	loadLocations(dispatch) {
		loadLocations().then(result => {			
			dispatch({
				type: actionTypes.LOCATIONS_LOADED,
				result
			})
		});
	},

	addLocation(dispatch, location) {						
		loadLocations().then(res => {
			localStorageApi.post('locations',[
				...res,
				{...location, id: uuid()}
			]).then( () => {
				this.loadLocations(dispatch);
			});						
		});					
	},

	deleteLocation(dispatch, location) {
		loadLocations().then(res => {					
			localStorageApi.post('locations', res.filter(item => item.id !== location.id))
			.then(() => {
				this.loadLocations(dispatch);
			});
			
		})
	},

	updateLocation(dispatch, location) {
		loadLocations().then( res => {
			let newRes = res.map(item => {
				if (item.id === location.id) {					
					return location
				} else return item;
			});
			localStorageApi.post('locations', newRes)
			.then(()=> {
				this.loadLocations(dispatch);
			});
			
		})
	},


}