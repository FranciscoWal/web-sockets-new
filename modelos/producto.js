const {mongoose} = require("../bd/conexion");

const productoSchema = new mongoose.Schema({
    nameProd:{
        type: String,
        require: true
    },
    precProd:{
        type: String,
        require:true 
    },
    descProd:{
        type: String,
        require: true
    },
    estatus:{
        type: Boolean,
        default: true
    },
});
module.exports = mongoose.model("producto",productoSchema);