import {connect} from 'react-redux';
import LocationsView from './LocationsView.jsx';
import LocationsActionHelper from './LocationsActionHelper.js';
import CategoriesActionHelper from '../categories/CategoriesActionHelper.js';

const mapStateToProps = ({categories, locations}) => {
    // locations = [
	// 	{
	// 		id: 1,
	// 		name: 'loc1',
	// 		address: 'aa',
	// 		coordinates: '3434',
	// 		categorie: 'dfdfdf'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'loc2',
	// 		address: 'aafg',
	// 		coordinates: '343dfd4',
	// 		categorie: 'dfdfddfdf'
	// 	}

	// ]
    return {
       categories,
	   locations
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        onAdd: (location) => LocationsActionHelper.addLocation(dispatch, location),
        onUpdate: (location) => LocationsActionHelper.updateLocation(dispatch, location),
        getList:() => {
			LocationsActionHelper.loadLocations(dispatch);
			CategoriesActionHelper.loadCategories(dispatch);
		},
        onDelete: location => LocationsActionHelper.deleteLocation(dispatch, location)
    }
};

export default connect(mapStateToProps, mapActionsToProps)(LocationsView);
