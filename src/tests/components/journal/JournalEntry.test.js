import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

//Simulamos nuestro store
let store = mockStore( initState );
//Para simular los dispatch: asi reemplazamos la fucnion del store por una funcion jest que podre evaluar
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://algunlugar.com/foto.jpg'
};

const wrapper = mount( 

    <Provider store={ store }>
        <JournalEntry { ...note }/> 
    </Provider>
);

describe('Pruebas en <JournalEntry />', () => {
    
    test('Debe de mostrarses correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('Debe de activar la nota', () => {
        
        wrapper.find('.journal__entry').prop('onClick')();  

        //Como defini el store mas arriba, puedo saber cuando se ha llamado y con que argumentos y que valor
        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( note.id, { ...note } )
        );

    })
    
    
});


