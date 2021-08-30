//EN ESTA PRUEBA HAREMOS USO DEL REDUX-MOCK-STORE (HAY QUE INSTALARLO)
//(parte de ello es la importacion y creacion de constantes especiales)

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';

//jest.setTimeout(30000);


//**Mock de una funcion */
//Necesitamos fingir la llamada a Upload
//El path es el que le corresponde al fileUpload porque es lo que queremos fingir o simular
//Regresa un objeto, por ello los parentesis que envuelven a las llaves
jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg';
        //o
        //return Promise.resolve('https://hola-mundo.com/cosa.jpg');
    })
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '2z43I7uKVjmSj1SBF5Gk',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};

//Simulamos nuestro store
let store = mockStore( initState );

describe('Pruebas con las acciones de notes', () => {

    beforeEach( () => {
        store = mockStore(initState);
    });
    
    test('Debe de crear una nueva nota startNewNote', async() => {
        
        //Con esto creamos una primer nota
        await store.dispatch( startNewNote() );

        //Esperamos que se hayan disparado activeNote y addNewNote
        const actions = store.getActions();
        //console.log(actions);
        
        expect ( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
    
        expect ( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        //Para eliminar los registros que crean mis pruebas:
        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${ docId }`).delete();
        
    });

    test('startLoadingNotes debe cargar las notas', async() => {
        
        await store.dispatch(startLoadingNotes('TESTING'));
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect( actions[0].payload[0] ).toMatchObject(expected);

    });

    test('startSaveNote debe de actualizar la nota', async() => {
        
        //Definimos la nota que quiero actualizar
        const note = {
            id: '2z43I7uKVjmSj1SBF5Gk',
            title: 'titulo',
            body: 'body'
        };

        await store.dispatch( startSaveNote( note ) );
        const actions = store.getActions();
        //console.log(actions);
        expect( actions[0].type ).toBe( types.notesUpdated );
        //Vamos a probar si el titulo que hemos enviado es el que se ha recibido,
        //para ello hay que hacer uso de la referencia al documento (usando get)
        //Se trata de una promesa, por ello lleva el await
        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect( docRef.data().title ).toBe( note.title );

    });
    
    test('startUploading debe de actualizar el url del entry/nota', async() => {
      
        //Creamos un archivo vacio
        const file = new File( [], 'foto.jpg');

        await store.dispatch( startUploading( file ) );

        const docRef = await db.doc(`/TESTING/journal/notes/2z43I7uKVjmSj1SBF5Gk`).get();

        expect( docRef.data().url).toBe( 'https://hola-mundo.com/cosa.jpg' );
    });
    
});
