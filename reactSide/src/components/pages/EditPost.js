import React , { useEffect  , useContext } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import EditForm from '../layout/EditPostForm';
import Alert from '../../context/alert/alertContext';


const EditPost = (props) => {
    const { post_id } = props.match.params;

    const userData = cookies.getJSON('user_data');

    const alertContext = useContext(Alert);
    const { setAlert } = alertContext;


    const getPostById = async () => {
        const oldPostRes = await axios.get(`http://localhost/react_cms/api/posts/specialPost.php?post_id=${post_id}`);

        localStorage.setItem('currentPost' , JSON.stringify(oldPostRes.data));
    }

    useEffect(()=> {
        getPostById();
    }, []);

    
    const onUpdatting = async(updatedPost) => {
       const updatePostRes = await axios.get(`http://localhost/react_cms/api/posts/updatePost.php?
       user_id=${userData.user_id}&
       post_id=${post_id}&
       cat_id=${updatedPost.update_cat_id}&
       title=${updatedPost.update_title}&
       discription=${updatedPost.update_discription}&
       status=${updatedPost.update_status}
        `);

       if(updatePostRes.data.message==='It was successful.') {
           setAlert('Good it was suucessful' , 'success');
           window.location.href='/panel';
       }
    }


    return (
        <div className="container">
          <EditForm onSaving={onUpdatting}/>
        </div>
    )
}

export default EditPost
