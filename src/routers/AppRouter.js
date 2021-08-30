//ESTE VA A SER EL SISTEMA DE RUTAS PRINCIPAL de la aplicacion
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom';
//import { AuthContext } from "../auth/AuthContext";
import { useDispatch } from "react-redux";

import { firebase } from "../firebase/firebaseConfig";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import { JournalScreen } from "../components/journal/JournalScreen";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {

    const dispatch = useDispatch();

    //Esto hace de bandera (checking), mientras sea true no mostrara nada de la aplicacion 
    //(no autenticado = true = prohibicion activada). 
    //Cambiara su estado cuando tenga una respuesta de la autenticacion (despues del if dentro del useEffect)
    //(autenticado = false = prohibicion desactivada)
    const [ checking, setChecking ] = useState( true );
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    //Estas lineas permiten mantener el estado de la autenticacion al recargar
    useEffect(() => {
        //Esto va a crear un observable, el cual es un tipo de objeto especial que se puede disparar mas de una vez
        //Se dispara cada vez que se hace un logeo de un usuario
        firebase.auth().onAuthStateChanged( async(user) => {
            //Si el user existe, es decir tiene algo, entonces mira si existe el uid. Si no existe user, no entra en el if.
            if (user?.uid){
                dispatch( login( user.uid, user.displayName ) );
                //si esta autenticado lo pone en true
                setIsLoggedIn( true );
                //Manda a cargar las notas del usuario
                dispatch( startLoadingNotes( user.uid ) );
            } else {
                setIsLoggedIn( false );
            }
            //se desactiva la prohibicion
            setChecking(false);
        });  
    }, [ dispatch, setChecking, setIsLoggedIn ])

    if( checking ){
        //Aqui se podria poner algun icono chulo que de vueltas, por ejemplo
        return (
            <h1>Please wait...</h1>
        )
    }

    //user deberia tener "logged: true" o "logged: false"
    //const { user } = useContext( AuthContext );

    return (
        <Router>
            <div>          
                <Switch>
                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter } 
                        isAuthenticated={ isLoggedIn }
                    />
                    <PrivateRoute 
                        exact
                        path="/" 
                        component={ JournalScreen } 
                        isAuthenticated={ isLoggedIn }
                    />

                    {/* Si no encuentra ninguna de las rutas anteriores, llamara a /auth/login */}
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}