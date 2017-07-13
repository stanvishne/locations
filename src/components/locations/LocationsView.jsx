import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Title from '../Title.jsx';
import LocationEditor from './LocationEditor.jsx';
import LocationMap from './LocationMap.jsx';
import Fa from 'react-fontawesome';

const DEFAULT_STATE = {
	id: false,
	name: '',
	address: '',
	coordinates: '',
	categorie: ''
}

const LocationsList = ({locations, onSelect, onDelete}) => {
	return (
		<div className='locations-list'>		
			{locations.map(item => <LocationItem onDelete={onDelete} key={item.id} location={item} onSelect={onSelect} onDelete={onDelete}/>)}
		</div>
	); 
}

const LocationItem = ({location, onSelect, onDelete}) => (
	<div className='location-item'>
		<div className='item-name' onClick={() => onSelect(location)}>{location.name}</div>
		<div className='item-delete' onClick={() => onDelete(location)}>x</div>	
	</div>
);

LocationItem.PropTypes = {
	location: PropTypes.object,
	onSelect: PropTypes.func,
	onDelete: PropTypes.func
}

class LocationsView extends React.Component {
	
	componentWillMount() {
		this.props.getList();
	}

	state = {
		selectedLocation: false,
		category: 'select categorie...',
		locationFilter: ''
	}

	render() {
		const {locations = [], categories = [], onAdd, onDelete, onUpdate} = this.props;
		const {categorie, selectedLocation, locationFilter} = this.state;
		let filteredLocations = [...locations.sort((item1, item2) => item1.name >= item2.name).filter(item => item.name && item.name.match(locationFilter) )];		
		if (categorie !=='select categorie...' && categorie) {
			filteredLocations = filteredLocations.filter(item => item.categorie === categorie);	
		} 
		
		return(
			<div className='locations'>
				<Title title='Locations editor'/>				
				
				<div className='locations-container'>

					<div className='locations-list-wrapper'>
						<div className='location-filter'>
							<span>Locations filter </span>
							<select className='category-filter' value={categorie} onChange={e => this.setState({categorie: e.target.value})}>
								<option>select categorie...</option>
								{categories.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}					
							</select>
							<input placeholder='location name' value={locationFilter}  onChange={e => this.setState({locationFilter: e.target.value})}/>
						</div>
						<LocationsList onSelect={(location) => this.setState({selectedLocation: location})} onDelete={onDelete} locations={filteredLocations}/>
					</div>
					
					<LocationEditor onDelete={onDelete} onCancel={() => this.setState({selectedLocation: false})} onAdd={onAdd} onUpdate={(location) => this.onUpdate(location)} selectedLocation={selectedLocation} categories={categories} />					
				</div>	
				<Fa name='microchip'/>
				<Link className='nav-link' to='/'>Back</Link>
				<Link className='nav-link' to='/categories'>Categories</Link>
			</div>
		);
	}
	
	onUpdate(location) {
	
		this.setState({
			selectedLocation: false
		});
		this.props.onUpdate(location);	
	}
}

LocationsView.propTypes = {
  locations: PropTypes.array,
  categories: PropTypes.array,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func
};

export default LocationsView;