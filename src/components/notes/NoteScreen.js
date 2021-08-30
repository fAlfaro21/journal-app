import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    //Hago un renombre a  note puesto que active no me resulta lo suficientemente claro
    const { active: note } = useSelector( state => state.notes );   
    const [ values, handleInputChange, reset ] = useForm( note );
    const { body, title, id } = values;

    //Voy a guardar el id de la  nota seleccionada actualmente
    const activeId = useRef( note.id );

    //Necesitamos el useEffect para que se actualice la nota cada vez que seleccionamos una distinta
    //Con esto evitamos un bucle infinito
    useEffect(() => {
        //Con current obtengo la instancia actual
        if( note.id !== activeId.current ){
            reset( note );
            activeId.current = note.id;
        }    
    }, [ note, reset ])

    useEffect(() => {
        dispatch( activeNote( values.id, { ...values }) );
    }, [ values, dispatch ])

    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    placeholder="Some awsome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />
                <textarea
                    name="body"
                    placeholder="What happened today?"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange }
                >
                </textarea>
                {
                    //Si existe la nota, la muestra
                    ( note.url ) &&
                    <div className="notes__image">
                        <img 
                            src={ note.url }
                            alt="imagen"
                        />
                    </div>
                }
            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
