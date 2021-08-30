import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

//Vamos a fingir la accion startLogout. 
//Aplicaremos un mock que me permita saber si se llamo o no
jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}))

//Vamos a fingir la accion startNewNote. 
//Aplicaremos un mock que me permita saber si se llamo o no
jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
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
        active: {
            id: 1234,
            title: 'Hola',
            body: 'Mundo',
            date: 0
        },
        notes: []
    }
};

//Simulamos nuestro store
let store = mockStore( initState );
//Para simular los dispatch: asi reemplazamos la fucnion del store por una funcion jest que podre evaluar
store.dispatch = jest.fn();

const wrapper = mount( 

    <Provider store={ store }>
        <NoteScreen/> 
    </Provider>
);


describe('Pruebas en <NoteScreen />', () => {
    
    test('Debe de mostrarse correctamente', () => {
        expect (wrapper).toMatchSnapshot();
    });

    test('Debe de disparar el activeNote', () => {
        
        //Vamos a simular una modificacion al titulo para que genere un cambio en el state y
        //dispare el activeNote
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name: 'title',
                value: 'Hola de nuevo'
            }
        });

        expect( activeNote ).toHaveBeenCalledWith(
            1234,
            {
                id: 1234,
                title: 'Hola de nuevo',
                body: 'Mundo',
                date: 0
            }
        );

    });

})
