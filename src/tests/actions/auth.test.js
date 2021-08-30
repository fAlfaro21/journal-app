import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { login, logout, startLoginEmailPassword, startLogout } from "../../actions/auth"
import { types } from "../../types/types";
import createMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

//Simulamos nuestro store
let store = mockStore( initState );

describe('Pruebas con las acciones de Auth', () => {

    beforeEach( () => {
        //Inicializa el store en el caso de que tenga varias pruebas
        store = mockStore( initState );
    })
  
    test('login y logout deben de crear la accion respectiva', () => {
        
        const uid = 'ABC';
        const displayName = 'Fernando';

        const loginAction = login( uid, displayName );
        const logoutAction = logout();

        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }   
        });

        expect( logoutAction ).toEqual({
            type: types.logout
        });
    });

    test('Debe de realizar el logout (startLogout)', async() => {
        //Como esto dispara una promesa, pongo el async/await
        await store.dispatch( startLogout() );

        const actions = store.getActions();
        //console.log(actions); //[ { type: '[Auth] logout' }, { type: '[Notes] Logout Cleaning' } ]

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });
    })
    
    test('Debe de iniciar el startLoginEmailPassword', async() => {
        await store.dispatch( startLoginEmailPassword( 'test@testing.com', '123456' ) );

        const actions = store.getActions();
        //console.log(actions); 
            //[
            //   { type: '[UI] Start Loading' },
            //   {
            //     type: '[Auth] login',
            //     payload: { uid: 'C12qqkrWTpdaUgOskLMZZ3eX1no1', displayName: null }
            //   },
            //   { type: '[UI] Finish Loading' }
            //  ]

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: 'C12qqkrWTpdaUgOskLMZZ3eX1no1',
                displayName: null
            }
        })
    })
    

})
