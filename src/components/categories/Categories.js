
import {connect} from 'react-redux';
import CategoriesView from './CategoriesView.jsx';
import CategoriesActionHelper from './CategoriesActionHelper.js';

const mapStateToProps = ({categories}) => {
    
    return {
       categories
    }
};

const mapActionsToProps = (dispatch) => {
    return {
        onAdd: (categorie) => CategoriesActionHelper.addCategorie(dispatch, categorie),
        onUpdate: (categorie) => CategoriesActionHelper.updateCategorie(dispatch, categorie),
        getList:() => CategoriesActionHelper.loadCategories(dispatch),
        onDelete: categorie => CategoriesActionHelper.deleteCategorie(dispatch, categorie)
    }
};

export default connect(mapStateToProps, mapActionsToProps)(CategoriesView);
