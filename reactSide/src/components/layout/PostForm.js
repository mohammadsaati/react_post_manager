import React , { useState , useContext } from 'react';
import Categories from '../Categories';
import axios from 'axios';
import AlertContext from '../../context/alert/alertContext';


const PostForm = ({ user_id }) => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const [post , setPost] = useState({
        title : '',
        discription : '',
        status : '',
        cat_id : 1,
        user_id : user_id
    });

    const { title , discription , status , cat_id } = post;
    const onChange = e => setPost({...post , [e.target.name]:e.target.value});

    const onClick = e =>{
        if(e.target.classList.contains('my_items')) {
          const itemValue = e.target.parentNode.value;
          
          const getIdArray = itemValue.split('_');
          const getId = getIdArray[0];
          
          //Set category id
          setPost({...post , cat_id:getId});
        }
      }

      const saveNewPost = async () => {
        
        const postresponse = await axios.get(`http://localhost/react_cms/api/posts/addPost.php?
            user_id=${user_id}&
            cat_id=${cat_id}&
            title=${title}&
            discription=${discription}&
            status=${status}`);
      }

      const onSubmit = e => {
        e.preventDefault();
        console.log(post);
       if(title!='' &discription!='') {
            saveNewPost();
       } else {
           setAlert('WOOPS! Please fill out all the inputs' , 'warning');
       }
    }

    return (
        <div className="card" style={{padding:'15px'}}>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Post title : </label>
                    <input type="text" required className="form-control" name="title" value={ title } onChange={ onChange } />
                </div>

                <div className="form-group">
                    <label htmlFor="discription">Post discription : </label>
                    <textarea className="form-control" style={{height:'200px'}} value={ discription } onChange={ onChange } required name="discription"></textarea>
                </div>

                <div className="form-group">
                    
                    <Categories onClick={onClick} />
                </div>
                <br/>
                <div className="form-check form-check-inline">
                    <input type="radio" id="status" name="status" value='visible' 
                    onChange={onChange} className="form-chech-input" checked={status == 'visible'} />
                    <label htmlFor="status" className="form-check-label">&nbsp;visible</label>
                  
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="form-check form-check-inline">
                     <input type="radio" id="status" name="status" value='invisible'
                     onChange={onChange} className="form-chech-input" checked={ status == 'invisible' } />
                    <label htmlFor="status" className="form-check-label">&nbsp;invisible</label>
                </div>
                <br/>
                <br/>

                <input type="submit" value="Save post" className="btn btn-outline-warning" style={{width:'100%'}} />
            </form>
        </div>
    )
}

export default PostForm
 