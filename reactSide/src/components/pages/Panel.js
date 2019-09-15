import React , { Fragment  , useEffect , useContext , useState}  from 'react';
import cookies from 'js-cookie';
import UserContext from '../../context/user/userContext';
import UserInfo  from '../layout/UserInfo';
import axios from 'axios';
import OwnPosts from '../layout/Ownposts';

const Home = (props) => {
    const userContext = useContext(UserContext);
    const { userLogIn , singleUser} = userContext;

    

    useEffect(()=>{
        if(cookies.get('userName')==null) {
            props.history.push('/logIn');
        } else {
            userLogIn({
                userName:cookies.get('userName'),
                password:cookies.get('password')
            });
            localStorage.setItem('currentPost' , JSON.stringify({}));
           
        }
        // eslint-disable-next-line
    },[props.history]);
    

    
    
    return (
        <Fragment>
            <div className="container">
               <div className="row">
                   <div className="col-12"><UserInfo /></div>
               </div>
               <br/> <br/>
               <a href="/newpost" className="btn btn-info"><i class="fas fa-blog"></i>&nbsp;Create new post</a>
               <br/> <br/> <br/> <br/>
                 <OwnPosts  />
            </div>
        </Fragment>
    )
    
}

export default Home
