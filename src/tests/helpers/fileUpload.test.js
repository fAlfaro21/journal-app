import cloudinary from 'cloudinary';

import { fileUpload } from "../../helpers/fileUpload";

//Esta configuracion es para poder manipular el borrado de las imagenes en el cloudinary
cloudinary.config({ 
    cloud_name: 'dxb9epkdj', 
    api_key: '857334453667415', 
    api_secret: 'yGx29Pn2gPy_4XZsJKqCJe4fnNw'
  });

describe('Pruebas en fileUpload', () => {

    //Con el done le decimos que se espera hasta que se ejecute el done, el que esta abajo del todo
    test('Debe de cargar un archivo y retornar el URL', async() => {
        
        //Definimos el archivo a cargar
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File( [blob], 'foto.png');

        //Aqui vamos a utilizar nuestro helper "fileUpload" con el fichero que hemos creado
        const url = await fileUpload( file );

        expect( typeof url ).toBe( "string" );

        //**Esto es para borrar las imagenes que me va subiendo la prueba a cloudinary**
        //Necesito obtener el id de la imagen que ha creado para poderla borrar
        //Hago un split del url para obtener el id (lo necesito si la extension)
        const segments = url.split('/');
        //console.log(segments)
        //Ahora guarda el id sin la extension (la sustituye por un vacio)
        const imageId = segments[ segments.length - 1 ].replace('.png','');
        //console.log(imageId)

        const folderName = "FAGR";

        cloudinary.v2.api.delete_resources( `${folderName}/${imageId}`, {}, ()=> {
            //done();
        });

    })   

    test('Debe de retornar un error', async() => {
        
        //Vamos a forzar que se envie un fichero vacio para generar un error
        const file = new File( [], 'foto.png' );

        //Aqui vamos a utilizar nuestro helper "fileUpload" con el fichero que hemos creado
        const url = await fileUpload( file );

        expect( url ).toBe( null );
    })   
})



