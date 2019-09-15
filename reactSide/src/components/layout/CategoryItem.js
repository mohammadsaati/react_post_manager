import React from 'react';

const CategoryItem = ({category}) => {

    const { id , title } = category;

    return (
         
         <option className="my_items" value={id+"_"+title}>{title}</option>
       
    )
}

export default CategoryItem
