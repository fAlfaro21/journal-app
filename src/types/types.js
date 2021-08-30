//ESTE FICHERO/OBJETO VA A TENER TODOS LOS TYPES DE MI APLICACION

export const types = {

    //estas acciones reacciona al reducer Auth
    login:  '[Auth] login',
    logout: '[Auth] logout',

    //estas acciones reacciona al reducer UI
    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start Loading',
    uiFinishLoading: '[UI] Finish Loading',

    //estas acciones reacciona al reducer NOTES
    notesAddNew: '[Notes] New note',
    notesActive: '[Notes] Set active note',
    notesLoad: '[Notes] Load notes',
    notesUpdated: '[Notes] Updated notes',
    notesFileUrl: '[Notes] Updated image url',
    notesDelete: '[Notes] Delete note',
    notesLogoutCleaning: '[Notes] Logout Cleaning',
}