const mongoose = require('mongoose');
require('dotenv').config();
async function conectarMongoDB(){
    mongoose.set('strictQuery',true);
    try{
       const conexion = await mongoose.connect(process.env.mongoAtlas);
        console.log("Conecciona mongo al 100")

    }
    catch(err){{
        console.error("error al conectar monho"+err)
    }}
    
}
module.exports={
    conectarMongoDB,
    mongoose
}
