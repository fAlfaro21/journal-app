import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
//Me permite fingir las rutas y trabajar como si estuviera en el navegador web
import { MemoryRouter} from 'react-router-dom'

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

//Vamos a fingir la accion startGoogleLogin y startLoginEmailPassword. 
//Aplicaremos un mock que me permita saber si se llamo o no
jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

//Simulamos nuestro store
let store = mockStore( initState );
//Para simular los dispatch: asi reemplazamos la fucnion del store por una funcion jest que podre evaluar
store.dispatch = jest.fn();

//Necesitamos proveer el react-redux context, para lo que podemos utilizar Provider
//por tanto hay que crearlo, y asi, habilitar el acceso al store para que nuestros
//componentes lo puedan ver:

const wrapper = mount( 

    <Provider store={   store }>
        <MemoryRouter>
            <LoginScreen/> 
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <LoginScreen />', () => {

    beforeEach( () => {
        //Inicializa el store en el caso de que tenga varias pruebas
        store = mockStore( initState );
        //Es buena practica limpiar nuestros mocks
        jest.clearAllMocks();
    });
      
    test('Debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });    
    
    test('Debe de disparar la accion de startGoogleLogin', () => {
        
        //Simulamos el click al boton que dispara startGoogleLogin
        wrapper.find('.google-btn').prop('onClick')();

        expect( startGoogleLogin ).toHaveBeenCalled();

    });

    test('Debe de disparar la accion de startLoginEmailPassword con los respectivos argumentos', () => {
        
        //Simulamos el click al boton que dispara startGoogleLogin
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });
        
        expect( startLoginEmailPassword ).toHaveBeenLastCalledWith( '', '' );

    });
    
})
