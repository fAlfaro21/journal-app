/*
ESTE REDUCER TENDRA LA SIGUIENTE ESTRUCTURA:
    {
        notes: [],                  -> Sera un array que contendra todas las NOTAS del usuario
        active: null,               -> Si active es == null, entonces quiere decir que no hay ninguna nota seleccionada
                                        y se mostrara la pantalla morada unicamente
        active: {                   -> Si existe una nota activa (abierta):
            id: 'OIUKJHDTOIUKJNBE'  -> id que da Firebase,
            title: '',              -> Es el titulo de la nota (string)
            body: '',               -> Es el cuerpo de la nota (string)
            imageUrl: '',           -> Es la imagen de la nota (string)
            date: 1284756
        }
    }
*/

import { types } from "../types/types";

const initialState ={
    notes: [],
    active: null
}

export const notesReducer = ( state = initialState, action) => {

    switch (action.type) {
        
        case types.notesActive:
            return {
                ...state,
                //Colocamos la nota activa
                active: {
                    ...action.payload
                }
            }

        //Para hacer aparecer una nueva nota en la barra izq, una vez que hagamos clic en anadir
        case types.notesAddNew:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }
        
        case types.notesLoad:
            //console.log(action.payload);  //->  nos dice que estamos recibiendo una promesa
            return {
                ...state,
                //Cargamos las notas
                notes: [ ...action.payload ]
            }

        case types.notesUpdated:
            return{
                ...state,
                //Aqui mandamos la modificacion de la nota
                notes: state.notes.map(
                    //Si son iguales, se trata de la nota que necesito actualizar (asi evito actualizar toda la lista de notas)
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note
                )
            }

        case types.notesDelete:
            return{
                ...state,
                active: null,
                //Devuelvo todas las notas cuyo id es distinto al que quiero borrar 
                notes: state.notes.filter( note => note.id !== action.payload )
            }
        
        case types.notesLogoutCleaning:
            return{
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
}