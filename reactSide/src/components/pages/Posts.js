import React , {useEffect , useContext , Fragment}  from 'react';
import cookies from 'js-cookie';
import UserContext from '../../context/user/userContext';
import PostForm from '../layout/PostForm';

const Posts = (props) => {

    const userContext = useContext(UserContext);
    const { userLogIn  } = userContext;

    useEffect(()=>{
        if(cookies.get('userName')==null) {
            props.history.push('/logIn');
        } else {
            userLogIn({
                userName:cookies.get('userName'),
                password:cookies.get('password')
            });
        }
    },[props.history]);

    const userData = cookies.getJSON('user_data');

    return (
    
        <div className="container">
            <br /><br /><br /><br />
            <div className="row">
             {userData!=null ? (
               <Fragment>
                    <div className="col-6">
                        <PostForm  user_id={userData.user_id} />
                    </div>


                    <div className="col-6">
                        <h2><b>Pot your news :</b></h2>
                        <br/>
                        <p>
                            After you put your post , you can easly got to your post and set image for that.<br/>
                            Don't forget you can post in your own link every things.Also you can introduce your 
                            product and etc.<br/>
                            <b>fill out this from and then preass save. Please fill all the inputs.</b>
                            <br/><br/><br/> <br/><br/><br/>
                            <small>Thanks , Mohammad</small>
                        </p>
                    </div>
               </Fragment>
            
                    ) :(
                        <div></div>
                )}
                
            </div>
            <br/>
        </div>
   
    )
}

export default Posts
