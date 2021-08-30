import { types } from '../types/types';

//Los reducers reciben dos cosas: un state y un action.
//Inicializamos el state con un objeto vacio
//El state va a guardar el estado de la autenticacion, con lo que:
//  Si el usuario esta autenticado, tendra los siguientes valores:
//      {
//          uid: 'jajdfja3653947498989898',
//          name: 'Fernando'
//      }
//  Si no esta autenticado el state estara vacio

export const authReducer = ( state = {}, action ) => {
    
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName    
            }         
            
        case types.logout:
            return { }
    
        default:
            return state;
    }
}
