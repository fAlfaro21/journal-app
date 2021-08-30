import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
//Me permite fingir las rutas y trabajar como si estuviera en el navegador web
import { MemoryRouter} from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { RegisterScreen } from '../../components/auth/RegisterScreen';
import { types } from '../../types/types';

//Vamos a fingir la accion startGoogleLogin y startLoginEmailPassword. 
//Aplicaremos un mock que me permita saber si se llamo o no
// jest.mock('../../../actions/auth', () => ({
//     startGoogleLogin: jest.fn(),
//     startLoginEmailPassword: jest.fn()
// }))

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

const wrapper = mount( 

    <Provider store={   store }>
        <MemoryRouter>
            <RegisterScreen/> 
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <RegisterScreen />', () => {
    
    test('Debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('Debe de hacer el dispatch de la accion respectiva', () => {

        //Vamos a simular que cambiamos el email y lo vamos a poner vacio, luego evaluaremos 
        //el formulario (que sale un mensaje de error)

        //Hacemos la referencia al email: Cogemos el valor del campo email por el name.
        const emailField = wrapper.find('input[name="email"]');

        //console.log(emailField.exists()); //True

        //Simulo el vaciado el campo email:
        //Cuando simulo el cambio(change) estamos trabajando con el custom Hook useForm,
        //por tanto, hay que enviar el target y el name
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });

        //Disparo el submit del formulario para obtener el error (por tener el campo email vacio)
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        //console.log(actions); //[ { type: '[UI] Set Error', payload: 'Email is not valid' } ]

        //Verificamos que el error se esta lanzando
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });
        
    });

    test('Debe de mostrar la caja de alerta con el error', () => {
        //Vamos a probar que si tenemos un error en el store, este se muestre
        //para ello precargaremos el state con un error:

        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email is not valid'
            }
        };
        
        //Simulamos nuestro store
        const store = mockStore( initState );
        
        const wrapper = mount( 
        
            <Provider store={   store }>
                <MemoryRouter>
                    <RegisterScreen/> 
                </MemoryRouter>
            </Provider>
        );
        //Comprobamos que el error existe
        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true);
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe(initState.ui.msgError);
    })
    
    
    

})
