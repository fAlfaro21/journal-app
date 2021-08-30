//ESTE COMPONENTE permite a todos LOS USUARIOS PUEDAN ACCEDER A LA APP
import React  from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    //Renombramos la propiedad para que sea un componente
    component: Component,
    //Aqui va el resto de argumentos: el path, el exact, etc....para pasarselos al componente
    ...rest
}) => {

    return(
        <Route { ...rest }
            // Con esta forma de llamada(callback) tendremos el history, location y params
            component={ (props) => (
                ( isAuthenticated )
                    ? ( <Redirect to="/" /> )
                    : ( <Component { ...props } /> )
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}