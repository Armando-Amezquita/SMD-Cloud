const Role = require('../models/Role');

const createRoles = async() => {
    try {
        const count = await Role.estimatedDocumentCount(); // metodo para contar si existen documentos.
        if(count > 0)return;
        else{
            const values = await Promise.all([
                new Role({name: "admin"}).save(),
                new Role({name: "seller"}).save(),
            ]);
            console.log(values); 
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createRoles
}