import React from 'react';
import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { useSelector } from 'react-redux';

export const JournalScreen = () => {

    const { active } = useSelector( state => state.notes );

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">

            <Sidebar />

            <main>

                {
                    ( active )
                        //Si active es true (es decir, si hay notas)
                        ? ( <NoteScreen /> )
                        //Si active es false (es decir, si no hay notas)
                        : ( <NothingSelected /> )
                }
            
            </main>
        </div>
    )
}
