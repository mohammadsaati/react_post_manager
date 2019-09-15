import React, { useReducer , useState } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import userReducer from './userReducer';

import {
  REGISTER_USER , 
  LOGIN ,
  LOGIN_PROCESS
} from '../type';


const UserState = props => {
  const initialState = {
    firstName : '',
    lastName : '',
    email : '',
    role : '',
    userName : '',
    password : '' , 
    message : '' , 
    singleUser : null,
    isAuthenticated : false
  };

  const [userSingle , setUserSingle] = useState(null);

  const [state, dispatch] = useReducer(userReducer, initialState);

  //Register user
const registerUser = async userData =>{

   console.log(userData);
    const response  = await axios.get(

        `http://localhost/react_cms/api/users/register.php?firstName=${userData.firstName}&
        lastName=${userData.lastName}&
        userName=${userData.userName}&
        password=${userData.password}&
        email=${userData.email}`
        );


    dispatch({
      type : REGISTER_USER , 
      payload : response.data
    
    });
    
}

//LogIn user
const userLogIn = async (loginData) => {

 

    const logInresponse = await axios.get(`http://localhost/react_cms/api/users/login.php?userName=${loginData.userName}
    &password=${loginData.password}`);

    
    if(logInresponse.data.isAuthenticated) {
      localStorage.setItem('userName' , logInresponse.data.userName);
      localStorage.setItem('password' , logInresponse.data.password);
    } else {
      localStorage.removeItem('userName');
      localStorage.removeItem('password');
    }

    dispatch({type:LOGIN , payload : logInresponse.data});
    
    console.log(logInresponse.data);

    setUserSingle(logInresponse.data);
  
}

return (
    <UserContext.Provider 
    value={{
        firstName : state.firstName,
        lastName : state.lastName,
        email : state.email,
        userName : state.userName , 
        password : state.password,
        message : state.message,
        role : state.role,
        isAuthenticated : state.isAuthenticated,
        singleUser : state.singleUser,
        registerUser,
        userSingle ,
        userLogIn
    }}>
    {props.children}
    </UserContext.Provider>
);

 
}

export default UserState;






