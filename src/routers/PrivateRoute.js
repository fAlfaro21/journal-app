//ESTE COMPONENTE CONTROLARA QUE UNICAMENTE LOS USUARIOS LOGADOS PUEDAN ACCEDER A LA APP
import React  from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({
    isAuthenticated,
    //Renombramos la propiedad para que sea un componente
    component: Component,
    //Aqui va el resto de argumentos: el path, el exact, etc....para pasarselos al componente
    ...rest
}) => {

    //Con esto guardamos la ultima pagina visitada. De modo que si el usuario hace un logout, luego puede volver directamente a 
    //esta pagina
    //localStorage.setItem( 'lastPath', rest.location.pathname );

    return(
        <Route { ...rest }
            // Con esta forma de llamada(callback) tendremos el history, location y params
            component={ (props) => (
                ( isAuthenticated )
                    ? ( <Component { ...props } /> )
                    : ( <Redirect to="/auth/login" /> )
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}