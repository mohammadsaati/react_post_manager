import React , { useContext }  from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const alertContext = useContext(AlertContext);
    return (
        alertContext.alerts.length > 0 && 
        
            alertContext.alerts.map(alert =>(
                
               <div className="container">
                   <br/>
                    <div key={alert.id} className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                        {alert.msg}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
               </div>
            ))
      
        
    )
}

export default Alert
