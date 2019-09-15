import React , { useEffect , useContext } from 'react';
import cookies from 'js-cookie';
import UserContext from '../../context/user/userContext';


const UserInfo = (props) => {
    const userContext = useContext(UserContext);
    const { userLogIn } = userContext;

    if(cookies.get('userName')==null) {
        window.location.href="/logIn";
    }

    useEffect(()=>{
        if(cookies.get('userName')==null) {
            props.history.push('/logIn');
        } else {
            userLogIn({
                userName:cookies.get('userName'),
                password:cookies.get('password')
            });
           
        }
        // eslint-disable-next-line
    },[props.history]);
    
    const userData = cookies.getJSON('user_data');

    const logOut = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('password');
        cookies.remove('userName');
        cookies.remove('password');
        cookies.remove('user_data');
        window.location.href="/logIn";
    }

    const changePassword = () => {
        window.location.href=`/change password/${userData.userName}`
    }

    return (
        <div className="card col-12 mt-4 box">
            <h4>You'r information : </h4><br/>
            <p>
                Full name : { userData.firstName+' '+userData.lastName }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                userName : { userData.userName }&nbsp;&nbsp;&nbsp;
                email : { userData.email }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn btn-outline-danger"><i class="far fa-address-card"></i>update</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={logOut} className="btn btn-outline-warning"><i className="fas fa-sign-out-alt"></i>LogOut</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={changePassword} className="btn btn-success"><i class="fas fa-key"></i>change password</button>
            </p>
        </div>
    )
}

export default UserInfo
