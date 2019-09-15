import React , { useState  , useEffect } from 'react';
import CategoryItem from './layout/CategoryItem';
import axios from 'axios';

const Categories = ({ onClick }) => {
    const [categories , setCategories] = useState([{
        'id' :'1' ,
        'title' : 'salam',
        'discription' : 'dfdsf'
    }]);

    const getCatData = async () => {
      const catDat = await  axios.get('http://localhost/react_cms/api/categories/get.php');
      setCategories(catDat.data);
    }

    useEffect(()=>{
        getCatData();
    } , []);

    

    return (
        <select className="form-control cat_list" onClick={onClick}>
            {
                categories.map(category => (
                    <CategoryItem key={category.id} category={category} />
                    ))
            }
        </select>
    )
}

export default Categories
