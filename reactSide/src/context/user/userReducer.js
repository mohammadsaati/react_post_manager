import { REGISTER_USER , LOGIN } from '../type';
import cookies from 'js-cookie';

export default (state , action) =>{
    switch(action.type) {
        case REGISTER_USER :
            return {
                ...state,
                message : action.payload.message ,
                isAuthenticated : true
            };
         case LOGIN : 
            localStorage.setItem('userName' , action.payload.userName);
            localStorage.setItem('password' , action.payload.password);
            if(localStorage.getItem('userName') != 'undefined')
            {
                cookies.set('userName' , localStorage.getItem('userName') , {expires:5});
                cookies.set('password' , localStorage.getItem('password') , {expires:5});
                cookies.set('user_data' , action.payload , {expires:5});
            }
            return {
                ...state,
                singleUser : action.payload , 
               isAuthenticated : true,
               
            };
        default : 
            return state;
    }
}