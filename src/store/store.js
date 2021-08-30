import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
//El thunk es un middleware que nos va a permitir trabajar con acciones asincronas
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducers';
import { notesReducer } from '../reducers/notesReducer';

//Esta constante nos va a permitir utilizar varios middlewares (en este caso, las devtools y el thunk), ya que
//el createStore solo nos permite utilizar uno al tiempo
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//Esto me ayudara a poder tener mas de 1 reducer
//Aqui se define la estructura del Store
const reducers = combineReducers({
    //el authReducer es el reducer que nosotros nos hemos creado para la App
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

//createStore unicamente acepta un reducer, por eso hemos creado antes un combineReducer
//createStore unicamente acepta un middleware, por eso hemos creado antes un composeEnhancers, asi podemos utilizar el
//middleware de las devtools + el thunk
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);