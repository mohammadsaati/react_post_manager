import React , { useState , useContext } from 'react';
import cookies from 'js-cookie';
import Alert from '../../context/alert/alertContext';
import axios from 'axios';

const ResetPassword = () => {

    if(cookies.get('userName')==null) {
        window.location.href="/logIn";
    }

    const alertContext = useContext(Alert);
    const { setAlert } = alertContext

    const userData = cookies.getJSON('user_data');

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const onChange = e => setEmail(e.target.value);

    const changePassword = e => setPassword(e.target.value);

    const onSubmit = e => {
        e.preventDefault();
        if(email===userData.email) {
            document.querySelector('.userInfo').style.display='block';
            document.querySelector('.emailInfo').style.display='none';    
        } else {
            setAlert('You\'r email is wrong.Please inter you\'r own email.' , 'warning');
        }
    }

    const passwordApi = async ($newPassword) => {
        const passwordResponse = await axios.get(`http://localhost/react_cms/api/users/reset.php?
            userName=${userData.userName}&
            password=${userData.password}&
            newPassword=${$newPassword}`);
        console.log(passwordResponse.data);    
    }

    const newPassword = e => {
        e.preventDefault();
        passwordApi(password);
        localStorage.removeItem('password');
        localStorage.removeItem('userName');
        cookies.remove('password');
        cookies.remove('userName');
        cookies.remove('user_data');
        window.location.href='/logIn';
    }


    return (
        <div className="container">

            <div className="row emailInfo">
                <div className="card col-12 mt-4" style={{padding:'30px'}}>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email : </label>
                            <input type="email" required name="email" className="form-control" value={email} onChange={onChange} />
                        </div>
                        <div className="form-group">
                            
                            <input type="submit" style={{width:'30%'}} className="m-4 col-6 btn btn-outline-success text-center" value="Check my email" />
                          
                            <button className="ml-4 col-6 btn btn-warning" style={{width:'30%'}}
                                onClick={()=>{window.location.href='/panel'}}
                                >Cancel</button>

                        </div>
                    </form>
                </div>
            </div>

            <div className="row userInfo" style={{display:'none'}}>
                <div className="card col-6 mt-4" style={{padding:'30px'}}>
                    
                    <div className="row">
                        <div className="col-6"><p className="text-left">Your old password was {userData.password}</p></div>
                        <div className="col-6">
                            <button className="btn btn-warning"
                            onClick={()=>{window.location.href='/panel'}}
                            >Cancel</button>
                        </div>
                    </div>

                    <form onSubmit={newPassword}>
                    <div className="form-group">
                         <label htmlFor="password">new Password : </label>
                         <input type="password" required name="password" className="form-control" value={password} onChange={changePassword} />
                    </div>
                        <input type="submit" style={{width:'100%'}} className="btn btn-danger text-center" value="set password" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
