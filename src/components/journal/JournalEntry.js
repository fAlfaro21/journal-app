import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {

    const dispatch = useDispatch();

    const noteDate = moment( date );

    const handleEntryClick = () => {
        dispatch( 
            activeNote( id, {
                date, title, body, url
            }) 
        );
    }

    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={ handleEntryClick }
        >

            {
                //Si existe el url lo va a mostrar en el lateral junto con la nota
                url &&
                <div 
                    className="journal__entry-picture"
                    // El style en React tiene que ir definido con un objeto con sus propiedades
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                >
                </div> 
            }      

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{ noteDate.format( 'ddd' ) }</span>
                <h4>{ noteDate.format( 'Do' ) }</h4>
            </div>

        </div>
    )
}
