import React , { Fragment , useContext  , useState  , useEffect} from 'react';
import UserContext from '../../context/user/userContext';
import { Link } from'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import cookies from 'js-cookie';


const LogIn = (props) => {
 
    const userContext = useContext(UserContext);
    const {  userLogIn , singleUser } = userContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const [userData , setUserData] = useState({
        username : null,
        password : null
    });

    useEffect(()=> {
         if(cookies.get('userName')!=null) {
             props.history.push('/panel');
         }
    } , [props.history]);


    const { userName , password } = userData;

    const onChange = e => setUserData({...userData , [e.target.name]:e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        userLogIn({userName , password});

        if(!cookies.get('userName')) {
            setAlert('Woops! Your userName or password is wrong , Please check.' , 'danger');
        } else {
            setAlert('Your logedIn was successfull.' , 'success');
            window.location.href='/panel';
            console.log(userContext.singleUser);
        }

        console.log(cookies.get('userName'));
        console.log(singleUser)
    }

    return (
        <Fragment>
            <br/><br/><br/><br/>
            <div className="container">
                <div className="row">
                  
                    <div className="card col-md-4" >
                        
                        <h3 className="text-center">Login</h3>
                        <br/>
                        <form onSubmit={onSubmit}>
                            <br/><br/>
                            <div className="form-group">
                                <label for="userName">User name : </label>
                                <input type="text" name="userName" value={userName} onChange={onChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label for="password">Password : </label>
                                <input type="password" name="password" value={password} onChange={onChange} className="form-control" />
                            </div>
                            <input type="submit" value="Login" className="btn btn-success" style={{width:'100%'}} />
                            <br/><br/>
                        </form>
                        <div className="row">
                            <div className="col-6">
                                <Link to="/register"><p>register new account</p></Link>
                            </div>
                            <div className="col-6">
                                <Link to="/register"><p style={{color:'red'}}>forgot your password?</p></Link>
                            </div>
                        </div>
                        <br/>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default LogIn
