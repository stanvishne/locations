import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title.jsx';

const Categorie = ({name, onSelect, onDelete}) => (
	<div className='categorie-item'>
		<div className='item-name' onClick={onSelect}>{name}</div>
		<div className='item-delete' onClick={() => onDelete(name)}>x</div>
	</div>
);

class Categories extends React.Component {
	state = {
		categorie: '',
		categorieId: false,
		isValid: true,
		filterString: ''
	}

	componentWillMount() {
		this.props.getList();
	}

	render() {
		const {categories = [], onAdd} = this.props;
		const {isValid, categorie, categorieId} = this.state;
		const displayCategories = categories.sort(((item1, item2) => item1.name >= item2.name)).filter(item => item.id !== categorieId && item.name.match(this.state.filterString));
		const disabled = !isValid || !categorie;
		return (
			<div className='categories'>
				<Title title='Categories editor'/>
				<div className='categories-catalog'>
					<div className='action-buttons'>
						<button disabled={disabled || categorieId} onClick={() => this.addCategorie()}>add</button>
						<button disabled={!categorieId} onClick={() => this.updateCategorie()}>update</button>
						<button disabled={!categorieId} onClick={() => this.setState({categorie: '', categorieId: false})}>cancel</button>
						<button disabled={!categorieId} onClick={() => this.deleteCategorie({id: categorieId, name: categorie})}>delete</button>
						
					</div>
					<div className='wrapper'>					
						<div className='categories-list'>					
							<input className='filter-value' value={this.state.filterString} placeholder='search' onChange={ e => this.setState({filterString: e.target.value})}/>					
							{displayCategories.map(item => <Categorie onDelete={() => this.deleteCategorie(item)} onSelect={() => this.onSelect(item)} key={item.id} name={item.name}/>)}
						</div>
						<div className='editor'>
							<input value={categorie} placeholder='Categorie name' onChange={e => this.checkCategorie(e.target.value)}/>						
							{!isValid && !categorieId && <span className='validation-error'> categorie with this name already exists</span>}
						</div>
					</div>	
				</div>
				<Link className='nav-link' to='/'>Back</Link>
				<Link className='nav-link' to='/locations'>Locations</Link>

			</div>
		);
	}

	checkCategorie (categorie) {
		if (this.props.categorieId) {
			this.setState({isValid: true});
			return;
		}	
		if (this.props.categories.find(item => item.name === categorie)) { 
			this.setState({
				isValid: false,
				categorie
			});
		} else {
			this.setState({
				isValid: true,
				categorie
			})
		}
	} 
	onSelect (categorie) {		
		this.setState({
			categorie: categorie.name,
			categorieId: categorie.id
		});
	}
	deleteCategorie(categorie) {
		this.props.onDelete(categorie);
		this.setState({
			categorie: '',
			categorieId: false
		});
	}
	addCategorie() {					
		this.props.onAdd(this.state.categorie);
		this.setState({categorie: ''});
	}

	updateCategorie() {
		const {categorie, categorieId} = this.state;
		this.props.onUpdate({name: categorie, id: categorieId});
		this.setState({
			categorie: '',
			categorieId: false
		})
	}	
}
export default Categories;