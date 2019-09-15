import React from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import { Link } from 'react-router-dom';


const Ownitem = ({ownPost}) => {
    
    const userData = cookies.getJSON('user_data');
    
     const deletePost = async () => {
         const deleteRes = await axios.get(`http://localhost/react_cms/api/posts/deletPost.php?
         user_id=${userData.user_id}&
         post_id=${ownPost.post_id}`);
        
         console.log(deleteRes.data);
        if(ownPost) {
            displayPost()
        }
     }


    const displayPost = () => {
        document.querySelector('.post-box').style.display="none";
    }     

    return (
        <div className="col-12 m-4 post-box">
            <div className="row" style={{padding:'12px'}}>
                <i id={ownPost.post_id}></i>
                <div className="col-4">{ownPost.post_title}</div>
                <p className="col-4" style={{color:'rgb(138, 135, 135)'}}>{ownPost.post_discription}</p>
                <small className="col-2" style={{color:'red'}}>Status : {ownPost.post_status}</small>
                <Link to={{
                    pathname:`/post/${ownPost.post_id}/edit`,
                    state:{
                        post_id:ownPost.post_id
                    }
                }} className="col-1">
                    <i className="fas fa-edit"></i>
                 </Link>
               <button className="col-1 btn" onClick={deletePost}><i className="fas fa-trash"></i></button>
            </div>
        </div>
    )
}

export default Ownitem
