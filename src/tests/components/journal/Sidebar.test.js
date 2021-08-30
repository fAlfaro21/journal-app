import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

//Vamos a fingir la accion startLogout. 
//Aplicaremos un mock que me permita saber si se llamo o no
jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}))

//Vamos a fingir la accion startNewNote. 
//Aplicaremos un mock que me permita saber si se llamo o no
jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '1',
        name: 'Fernando'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
};

//Simulamos nuestro store
let store = mockStore( initState );
//Para simular los dispatch: asi reemplazamos la fucnion del store por una funcion jest que podre evaluar
store.dispatch = jest.fn();

const wrapper = mount( 

    <Provider store={ store }>
        <Sidebar/> 
    </Provider>
);

describe('Pruebas en <Sidebar />', () => {
    
    test('Debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    })
    
    test('Debe de llamar la accion startLogout', () => {
        //Vamos a simular el clic en el boton
        wrapper.find('button').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled();
        
    })

    test('Debe de llamar la accion del startNewNote', () => {
        //Vamos a simular el clic en el boton
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();
    })
    
    

})
