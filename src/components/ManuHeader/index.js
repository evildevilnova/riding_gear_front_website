import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { getAllCategory } from '../../actions'
const ManuHeader = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {
                        // category.parentId ? <a 
                        //   href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                        //   {category.name}
                        // </a> : 
                        // <span>{category.name}</span>
                        <a className="text-decoration-none"
                          href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                          {category.name}
                        </a>
                        
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories;
    }

    return (
        <div className="manuHeader shadow rounded">
            <ul>
                <li className="text-primary py-2 font-weight-bolder">CATEGORY</li>
                { category.categories.length > 0 ? renderCategories(category.categories) : null}
            </ul>
        </div>
    )
}

export default ManuHeader
