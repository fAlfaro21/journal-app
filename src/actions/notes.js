import Swal from 'sweetalert2';

import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";

//Con getState podemos obtener el contenido del state, funciona similar al useSelector
export const startNewNote = () => {
    return async( dispatch, getState ) => {

        //Comprobacion del contenido del state
        // const state = getState();
        // console.log(state);

        //Obtenemos el uid
        const { uid } = getState().auth;
        //o
        //const uid = getState().auth.uid;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }  

        try {
            //Para insertar una nota en Firebase
            //Se trata de una accion asincrona, por eso utilizamos el async/await
            const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
            
            dispatch( activeNote( doc.id, newNote ));
            dispatch( addNewNote( doc.id, newNote ));

        } catch (error) {
            console.log(error);
        }

    }
}

//Voy a regresar un objeto(la nota seleccionada/activa), por eso pongo los parentesis
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        //Aqui viene toda la estructura de la nota
        ...note
    }
});

//Para hacer aparecer una nueva nota en la barra izq, una vez que hagamos clic en anadir
export const addNewNote = ( id, note) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        //Carga las notas del usuario
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {
        //Obtiene el id del usuario
        const { uid } = getState().auth;

        //Para evitar un error por url undefined, miro si tengo el url. Si no lo tengo, lo elimino de la nota.
        if( !note.url ){
            delete note.url;
        }

        //Vamos a separar toda la nota, puesto que no queremos guardar el id (el id ya lo guarda firestore)
        const noteToFirestore = { ...note };
        //Asi, eliminamos el id del objeto
        delete noteToFirestore.id;

        //Hace el guardado de la nota
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );

        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        //Obtenemos la nota activa, a la que queremos actualizar el url o imagen
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            //Esto es para mostrar el icono redondo que da vueltas
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        //Y llamamos a nuestro helper "fileUpload" para obtener la url del fichero
        const fileUrl = await fileUpload( file );

        //Actualizamos la url que acabamos de actualizar justo arriba
        activeNote.url = fileUrl;

        //Guardamos la nota activa
        dispatch( startSaveNote( activeNote ) );

        //Cierra la ventana una vez que se ha subido el fichero
        Swal.close();
    }
}

//Necesito el id de lo que necesito borrar
export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {

        const uid = getState().auth.uid;
        //Aqui lo borramos de la base de datos
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();
        //Aqui desencadeno el borrado de la nota en el store
        dispatch( deleteNote( id ) );
    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning
});