import React from 'react';
import GoogleMapReact from 'google-map-react';


const MapOver = ({text}) => {
	return(
		<div className='marker-wrapper'>
			<div className='marker'/>
			<div className='arrow-left'/>
			<div className='label'>{text}</div>
		</div>
	);
}

class LocationMap extends React.Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  render() {
	const {selectedLocation: {lat, lng, name}, onClick} = this.props;
	const selectedCenter = {
		lat: lat === '' ? 32.17 : parseFloat(lat),
		lng: lng === '' ? 34.85 : parseFloat(lng)
	}
    return (
	<div className='google-map'>	
      <GoogleMapReact	
	  	onClick={(e) => this.onClick(e)}  	
        defaultCenter={this.props.center}
		center={selectedCenter}
        defaultZoom={this.props.zoom}>
			<MapOver
			lat={lat}
			lng={lng}
			text={name}
			/>
      </GoogleMapReact>
	</div>  
    );
  }

  onClick(e) {	  
	  const {lat, lng} = e;
	  window.navigator.vibrate(200);
	  this.props.onClick({lat, lng})
  }
}

export default LocationMap;