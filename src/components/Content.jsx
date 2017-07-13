import React from 'react';
import {connect} from 'react-redux';

import {ControlLabel, FormGroup, HelpBlock, Button, FormControl} from 'react-bootstrap';
import ActionHelper from  './ActionHelper.js';

const mapStateToProps = () => {
    return {
       
    }
};

const mapActionsToProps = (dispatch) => {
    return {
       onSubmit: () => ActionHelper.fetchData(dispatch)
    }
};



function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class Content extends React.Component {
	render() {
		return (
			<div className='Content'>
				<h1>Please choose your selection</h1>
				<form className='select-form'>
					<FormControl componentClass='select' placeholder='select size'>
						<option value=''>select</option>				
						<option value='1'>1</option>
						<option value='2'>1</option>
					</FormControl>
					<FieldGroup
					id='formControlsEmail'
					type='email'
					label='Email address'
					help='test help'
					placeholder='Enter email'
					/>
					<Button onClick={this.props.onSubmit} bsStyle='primary'>Submit</Button>			
				</form>	
			</div>	
		)
	}	
}
export default connect(mapStateToProps, mapActionsToProps)(Content);

