import React , { useState } from 'react';
import Categories from '../Categories';


const EditPostForm = ({onSaving}) => {
    
    const [oldpost , setOldPost] = useState(JSON.parse(localStorage.getItem('currentPost')));

    const [updatedPost , setUpdatedPost] = useState({
        update_title : oldpost.post_title,
        update_discription : oldpost.post_discription , 
        update_cat_id : oldpost.post_cat_id,
        update_status : oldpost.post_status
    });

    const { update_title , update_discription , update_status , update_cat_id } = updatedPost;
    
    const onChange = e => {setUpdatedPost({...updatedPost,[e.target.name]:e.target.value})};

    const onClick = e => {
        if(e.target.classList.contains('my_items')) {
            const itemValue = e.target.parentNode.value;
            
            const getIdArray = itemValue.split('_');
            const getId = getIdArray[0];
            
            //Set category id
            setUpdatedPost({...updatedPost , update_cat_id : getId});
        }
    }

    const onCancel = () => {
        localStorage.setItem('currentPost' , JSON.stringify({}));
        window.location.href="/panel";
    }

    const onUpdatePost = (e) => {
        e.preventDefault();
       onSaving(updatedPost);
       
    }

    return (
        <div className="card mt-4" style={{padding:'20px'}}>
            <form onSubmit={onUpdatePost}>

                <div className="form-group">
                    <label htmlFor="title">Post title : </label>
                    <input type="text" required className="form-control" name="update_title" value={update_title} onChange={ onChange } />
                </div>

                <div className="form-group">
                    <label htmlFor="discription">Post discription : </label>
                    <textarea className="form-control" style={{height:'200px'}} value={ update_discription } onChange={ onChange } required name="update_discription"></textarea>
                </div>

                <div className="form-group">
                   
                    <Categories onClick={onClick} />
                </div>
                <br/>
                <div className="form-check form-check-inline">
                    <input type="radio" id="status" name="update_status" value='visible' 
                    onChange={onChange} className="form-chech-input" checked={update_status == 'visible'} />
                    <label htmlFor="status" className="form-check-label">&nbsp;visible</label>
                  
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="form-check form-check-inline">
                     <input type="radio" id="status" name="update_status" value='invisible'
                     onChange={onChange} className="form-chech-input" checked={ update_status == 'invisible' } />
                    <label htmlFor="status" className="form-check-label">&nbsp;invisible</label>
                </div>
                <br/>
                <br/>

                <div className="form-group">
                            
                    <input type="submit" style={{width:'30%'}} className="m-4 col-6 btn btn-outline-success text-center" value="Update post" />
                          
                        <button className="ml-4 col-6 btn btn-warning" style={{width:'30%'}}
                                onClick={onCancel}
                                >Cancel</button>

                        </div>
            
            </form>
            
        </div>
    )
}

export default EditPostForm
