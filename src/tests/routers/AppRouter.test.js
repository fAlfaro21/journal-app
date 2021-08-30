import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
//Me permite fingir las rutas y trabajar como si estuviera en el navegador web
import { MemoryRouter} from 'react-router-dom'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { firebase } from '../../firebase/firebaseConfig'
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from '@testing-library/react';

import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}))

//Vamos a fingir la accion login. 
//Aplicaremos un mock que me permita saber si se llamo o no
jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes:{
        active: {
            id: 'ABC'
        },
        notes: []
    }
};

//Simulamos nuestro store
let store = mockStore( initState );
//Para simular los dispatch: asi reemplazamos la funcion del store por una funcion jest que podre evaluar
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
    
    test('Debe de llamar al login si estoy autenticado', async() => {

        let user;
        
        //Lo envolvemos en un act para tenerlo mas controlado
        await act( async() => {
            //Disparamos la autenticacion de firebase
            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;

            //Necesitamos proveer el react-redux context, para lo que podemos utilizar Provider
            //por tanto hay que crearlo, y asi, habilitar el acceso al store para que nuestros
            //componentes lo puedan ver:
    
            const wrapper = mount( 
    
                <Provider store={   store }>
                    <MemoryRouter>
                        <AppRouter/> 
                    </MemoryRouter>
                </Provider>
            );
            
        });
        
        //Para obtener el uid de abajo, he lanzado esta sentencia y me ha dado un error, mostrandome el uid que esperaba:
        //expect(login).toHaveBeenCalledWith({});
        expect(login).toHaveBeenCalledWith("C12qqkrWTpdaUgOskLMZZ3eX1no1", null);

    })
    
})
