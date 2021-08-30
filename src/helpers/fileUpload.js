

export const fileUpload = async( file ) => {

    //Aqui hemos puesto el url de cloudinary (el que nos da como usuario), aquel que hemos probado ya en postman para la carga ejemplo
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dxb9epkdj/upload';

    const formData = new FormData();
    formData.append( 'upload_preset', 'react-journal' );
    formData.append('file', file);

    try{

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( resp.ok ){
            const cloudResp = await resp.json();
            //Si todo ha ido bien, obtengo la url segura
            return cloudResp.secure_url;
        } else {
            //En el caso de que cloudinary nos de un error
            //throw await resp.json();
            return null;
        }

    } catch ( err ){
        //En caso de un error del tipo: el url no existe
        throw err;
    }

    //return "el url de la imagen"

}