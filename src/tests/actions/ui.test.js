import { setError, removeError, startLoading, finishLoading } from "../../actions/ui"
import { types } from "../../types/types";

describe('Pruebas en la accion ui', () => {
    
    test('Todas las acciones sincronas deben de funcionar', () => {

        //Vamos a evaluar lo que regresa esta funcion setError: recibe un argumento y devuelve un objeto.
        const action = setError( 'Help!!!' );

        expect( action ).toEqual({ 
            type: types.uiSetError,
            payload: 'Help!!!'
        });

        const removeErrorAction = removeError();
        const startLoadingAction = startLoading();
        const finishLoadingActino = finishLoading();

        expect( removeErrorAction ).toEqual({
            type: types.uiRemoveError
        });

        expect( startLoadingAction ).toEqual({
            type: types.uiStartLoading        
        });

        expect( finishLoadingActino ).toEqual({
            type: types.uiFinishLoading
        });

    });
})
