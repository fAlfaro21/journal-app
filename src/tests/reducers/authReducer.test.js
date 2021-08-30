import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {
    
    test('Debe de realizar el login correctamente', () => {
        
        //Vamos a simular un objeto vacio, tal y como el argumento del authReducer
        const initState = {};

        //Preparamos la accion que pide el argumento del authReducer
        const action = {
                type: types.login,
                payload: {
                    uid: 'abc',
                    name: 'Fernando'
                }
        } 

        //Hacemos la llamada al authReducer con los argumentos que solicita (y hemos definiado aqui arriba)
        const state = authReducer( initState, action );

        expect( state ).toEqual({ uid: 'abc', name: undefined });

    });

    test('Debe de realizar el logout correctamente', () => {
        
        //Vamos a simular un objeto vacio, tal y como el argumento del authReducer
        const initState = {
            uid: 'abc',
            name: 'Fernando'
        };

        //Preparamos la accion que pide el argumento del authReducer
        const action = {
                type: types.logout
        } 

        //Hacemos la llamada al authReducer con los argumentos que solicita (y hemos definiado aqui arriba)
        const state = authReducer( initState, action );

        expect( state ).toEqual({});

    });

    test('No debe de hacer cambios en el state si el type es erroneo', () => {
        
        //Vamos a simular un objeto vacio, tal y como el argumento del authReducer
        const initState = {
            uid: 'abc',
            name: 'Fernando'
        };

        //Preparamos la accion que pide el argumento del authReducer
        const action = {
                type: 'kjhkj'
        } 

        //Hacemos la llamada al authReducer con los argumentos que solicita (y hemos definiado aqui arriba)
        const state = authReducer( initState, action );

        expect( state ).toEqual( initState );

    })
    

})
