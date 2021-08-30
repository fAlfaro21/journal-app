//Lo comento porque voy a utilizar enzyme
//import '@testing-library/jest-dom';

//*** incluyo esto para la configuracion del enzyme:
import Enzyme from 'enzyme';

//no utilizo -> import Adapter from 'enzyme-adapter-react-16' porque tengo una version 17 de react;
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

//*** incluyo esto para la configuracion del enzyme-to-json:
//se importa para poder tener una fotografia del componente renderizado (1/2)
import {createSerializer} from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
//se importa para poder tener una fotografia del componente renderizado (2/2)
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

//Para evitar que nos arroje un error durante las pruebas al intentar llamar al scroll (finge el scroll).
const noScroll = () => {};
Object.defineProperty( window, 'scrollTo', { value: noScroll, writable: true} );

