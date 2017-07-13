import React from 'react';
import LocationMap from './LocationMap.jsx';


class LocationEditor extends React.Component {
	state = {
			id: false,
			name: '',
			address: '',
			lat: '',
			lng: '',
			categorie: ''
	};
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedLocation) {
			
			this.setState(nextProps.selectedLocation);
		}
	}

	render () {
		const {id, name, address, categorie, lat, lng} = this.state;
		const {categories} = this.props;
		const disabled = !name || !address || !lat || !lng || !categorie;
		
		return(
			<div className='location-editor'>
				<div className='action-buttons'>
					<button disabled={disabled || id} className='editor-input' onClick={() => this.addLocation()}>Add</button>
					<button disabled={disabled || !id} className='editor-input' onClick={() => this.updateLocation()}>Update</button>
					<button disabled={disabled || !id} className='editor-input' onClick={() => this.cancel()}>Cancel</button>
					<button disabled={!id} className='editor-input' onClick={() => this.delete()}>Delete</button>

				</div>
				<div className='editor-inputs-and-map'>
					<div className='editor'>
						<label>Location name</label>
						<input className='editor-input' value={name}  onChange={e => this.setState({name: e.target.value})}/>
						<label>Location address</label>
						<input className='editor-input' value={address} onChange={e => this.setState({address: e.target.value})}/>
						<label>Latitude</label>
						<input className='editor-input' value={lat}  onChange={e => this.setState({lat: e.target.value})}/>
						<label>Longitude</label>
						<input className='editor-input' value={lng}  onChange={e => this.setState({lng: e.target.value})}/>								
						<label>Categorie</label>
						<select className='editor-input' value={categorie} onChange={e => this.setState({categorie: e.target.value})}>
							<option>select categorie...</option>
							{categories.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}					
						</select>						
					</div>
					<div className='map'>
					{<LocationMap onClick={(mapLocation) => this.getLocationFromMap(mapLocation)} selectedLocation={{lat, lng, name}}/>}	
					</div>
				</div>

				

			</div>
		);
	}

	addLocation() {
		let {name, address, lat,lng, categorie} = this.state;
		this.props.onAdd({name, address, lat, lng, categorie});
		this.clearState();
	}

	updateLocation() {
		let {name, address, lat, lng, categorie, id} = this.state;		
		this.cancel();
		this.props.onUpdate({name, address, lat, lng, categorie, id});	
	}

	cancel() {
		this.clearState();
		this.props.onCancel();
	}

	delete() {
		this.props.onDelete(this.state);
		this.cancel();
	}

	clearState() {
		this.setState({
			id: false,
			name: '',
			address: '',
			lat: '',
			lng: '',
			categorie: ''
		});		
	}

	getLocationFromMap(location) {		
		this.setState({			
				lat: location.lat,
				lng: location.lng			
		});
	}
}

export default LocationEditor;