import React , { Fragment , useState , useContext} from 'react';
import UserContext from '../../context/user/userContext';
import AlertContext from '../../context/alert/alertContext';

const RegisterUser = () => {

    const userContext = useContext(UserContext);
    const alertContext = useContext(AlertContext);

    const { registerUser , message } = userContext;
    const { setAlert } = alertContext;
   
    const [user , setUser] = useState({
        firstName : '',
        lastName : '',
        userName : '',
        password : '',
        password2 : '',
        email : '',
        role : 'typical'
    });

     
    const {firstName , lastName , userName , password , password2 , email , role} = user;

    const onChange = e => setUser({...user , [e.target.name] : e.target.value});

    const onSubmit = e => {
        e.preventDefault();
       registerUser(user);
       setAlert(message , 'warning');
    }

    return (
        <Fragment>
            <br /><br />
          <div className="container">
            <h3 className="align-content-center">Account Register</h3>
            <br/><br/>
            <form onSubmit={onSubmit}>
                <div className="form-row">
                    <div className = "form-group col-md-6">
                        <label for = "firstName">First name : </label>
                        <input type="text" className="form-control" name="firstName" value = {firstName} onChange = {onChange} />
                    </div>
                    <div className = "form-group col-md-6">
                        <label for = "lastName">last name : </label>
                        <input type="text" className="form-control" name="lastName" value = {lastName} onChange = {onChange} />
                    </div>
                </div>

                <div className = "form-row">
                    <div className = "form-group col-md-6">
                            <label for = "email">email : </label>
                            <input type="text" className="form-control" name="email" value = {email} onChange = {onChange} />
                    </div>
                    <div className = "form-group col-md-6">
                        <label for = "role">Role : </label>
                        <select name="roel" className="form-control">
                            <option selected value = 'typical' onChange = {onChange}>Typical</option>
                            <option  value = 'admin' onChange = {onChange} >Admin</option>
                            <option  value = 'shoper' onChange = {onChange} >Shopper</option>
                        </select>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label for="userName">User name : </label>
                        <input type="text" name="userName" className="form-control" value={userName} onChange={onChange} />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="password">Password : </label>
                        <input type="password" name="password" className="form-control" value={password} onChange={onChange} />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="password2">Confrm password : </label>
                        <input type="password" name="password2" className="form-control" value={password2} onChange={onChange} />
                    </div>
                </div>

                <input type = "submit" value = "Register" className = "btn btn-primary" />
            </form>
          </div>
        </Fragment>
    );
}

export default RegisterUser
