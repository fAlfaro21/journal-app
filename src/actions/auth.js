import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPassword = ( email, password ) => {
    return (dispatch) => {

        dispatch( startLoading() );
        
        return firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({ user }) => {

                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );

            })
            .catch( e => {
                console.log(e);
                dispatch( finishLoading() );
                //El mensaje viene de SweetAlert2
                Swal.fire('Error', e.message, 'error');
            })        
    }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
    //Como es una tarea asincrona necesitamos regresar un callback
    //Gracias al Thunk podemos hacer uso del dispatch
    return( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async({ user }) => {

                await user.updateProfile({ displayName: name });

                dispatch(
                    login( user.uid, user.displayName )
                )
            })
            .catch( e => {
                console.log(e);
                //El mensaje viene de SweetAlert2
                Swal.fire('Error', e.message, 'error');
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                    login( user.uid, user.displayName )
                )
            });
    }
}

//Esta accion regresara un objeto con una accion y un payload,
//por ello el parentesis que envuelve a las llaves
export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }   
})

//Hace el signOut de firebase
export const startLogout = () => {
    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch( noteLogout() );
        
    }
}
//Hace el borrado del uid y del displayName
export const logout = () => (   {
    type: types.logout  
})