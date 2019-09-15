import React , { useEffect , useState } from 'react';
import OwnItems from './Ownitem';
import axios from 'axios';
import cookies from 'js-cookie';

const Ownposts = (props) => {

    const [ownPosts , setOwnPosts] = useState([{
        'post_id' : 0,
        'post_title' : 'You dont have any post',
        'post_discription' : '',
        'post_status' : ''
    }]);

    const userData = cookies.getJSON('user_data');

    const mypost = async () => {
        const ownRes = await axios.get(`http://localhost/react_cms/api/posts/usersPost.php?
                user_id=${userData.user_id}`);
                
            setOwnPosts(ownRes.data);
    
    }

    useEffect(()=>{
        mypost();
    } , [props]);

    return (
        <div className="row ownPost">
            {
                ownPosts.map(ownPost=>(
                   <OwnItems key={ownPost.id} ownPost={ownPost}/>
                ))
            }
        </div>
    )
}

export default Ownposts
