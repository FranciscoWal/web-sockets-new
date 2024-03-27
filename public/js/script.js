const socket = io();
var formNuevoUsuario = document.getElementById("formNuevoUsuario");
var btnchange = document.getElementById("change");
const formU = document.getElementById("formNuevoUsuario");
const formP = document.getElementById("formNuevoProd");
formP.style.display = 'none';
formU.style.display = 'block';
document.getElementById("tableP").style.display = 'none';
document.getElementById("tableU").style.display = 'block';


//Esconder Formusuarios


btnchange.addEventListener('click', (e) => {
    e.preventDefault();
    if (formU.style.display === 'block') {
        formP.style.display = 'block';
        formU.style.display = 'none';
        document.getElementById("tituloFormulario").innerHTML = "Nuevo Producto";
        document.getElementById("change").innerHTML = "Cambiar a Usuario";
        document.getElementById("tableP").style.display = 'block';
        document.getElementById("tableU").style.display = 'none';
    } else {
        formP.style.display = 'none';
        formU.style.display = 'block';
        document.getElementById("tituloFormulario").innerHTML = "Nuevo Usuario";
        document.getElementById("change").innerHTML = "Cambiar a Producto";
        document.getElementById("tableP").style.display = 'none';
        document.getElementById("tableU").style.display = 'block';

    }
});

//MOSTRAR USUARIOS
socket.on("servidorEnviarUsuarios", (usuarios) => {
    var tr = "";
    //<td>${usuario._id}</td>
    usuarios.forEach((usuario, idLocal) => {
        tr = tr + `
            <tr>
                <td>${(idLocal + 1) * 100}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.password}</td>
                <td>
                    <a href="#" onclick="editarUsuario('${usuario._id}')">Editar</a> /
                    <a href="#" onclick="borrarUsuario('${usuario._id}')">Borrar</a>
                </td>
            </tr>
        `;
    });
    document.getElementById("datos").innerHTML = tr;
});
//FIN MOSTRAR USUARIOS
//Mostar Productos
socket.on("servidorEnviarProductos", (productos) => {
    var tr = "";
    //<td>${usuario._id}</td>
    productos.forEach((prod, idLocal) => {
        tr = tr + `
            <tr>
                <td>${(idLocal + 1) * 100}</td>
                <td>${prod.nameProd}</td>
                <td>${prod.precProd}</td>
                <td>${prod.descProd}</td>
                <td>
                    <a href="#" onclick="editarProducto('${prod._id}')">Editar</a>  /
                    <a href="#" onclick="borrarProducto('${prod._id}')">Borrar</a>
                </td>
            </tr>
        `;
    });
    document.getElementById("datosP").innerHTML = tr;
});
//Fin Mostrar Productos
//Guardar Producto
var mensajesP = document.getElementById("mensajesP");
formP.addEventListener("submit", (e) => {
    e.preventDefault();
    var producto = {
        id: document.getElementById("idP").value,
        nameProd: document.getElementById("nameProd").value,
        precProd: document.getElementById("precProd").value,
        descProd: document.getElementById("descProd").value
    }
    socket.emit("clienteGuardarProducto",producto);
    socket.on("servidorProductoGuardado",(mensaje)=>{
        console.log("Producto Guardado");
        mensajesP.innerHTML = mensaje;
        document.getElementById("nameProd").value = "";
        document.getElementById("precProd").value = "";
        document.getElementById("descProd").value = "";
        document.getElementById("nameProd").focus();
        setTimeout(() => { mensajesP.innerHTML = "" }, 3000);

    })


});
//Fin Guardar Producto
//GUARDAR USUARIO
var formNuevoUsuario = document.getElementById("formNuevoUsuario");
var datos = document.getElementById("datos");
var mensajes = document.getElementById("mensajes");
formNuevoUsuario.addEventListener("submit", (e) => {
    e.preventDefault();
    var usuario = {
        id: document.getElementById("id").value,
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value
    }
    socket.emit("clienteGuardarUsuario", usuario);
    socket.on("servidorUsuarioGuardado", (mensaje) => {
        console.log("Usuario guardado");
        mensajes.innerHTML = mensaje;
        document.getElementById("nombre").value = "";
        document.getElementById("usuario").value = "";
        document.getElementById("password").value = "";
        document.getElementById("nombre").focus();
        setTimeout(() => { mensajes.innerHTML = "" }, 3000);
    });
});
//FIN GUARDAR USUARIO
//EDITAR USUARIO PARTE1
function editarUsuario(id) {
    console.log("Estas en editar usuario " + id);
    socket.emit("clienteObtenerUsuarioId", id);
    socket.on("servidorObtenerUsuarioId", (usuario) => {
        document.getElementById("tituloFormulario").innerHTML = "Editar usuario";
        document.getElementById("textBoton").innerHTML = "Editar";
        document.getElementById("id").value = usuario._id;
        document.getElementById("nombre").value = usuario.nombre;
        document.getElementById("usuario").value = usuario.usuario;
        document.getElementById("password").value = usuario.password;
    });
}
//FIN EDITAR USUARIO PARTE1
//Editar Producto
function editarProducto(id){
    socket.emit("clienteObtenerProductoId", id);
    socket.on("servidorObtenerProductoId", (producto) =>{
        document.getElementById("tituloFormulario").innerHTML = "Editar Producto";
        document.getElementById("textBotonProd").innerHTML = "Editar";
        document.getElementById("idP").value = producto._id;
        document.getElementById("nameProd").value = producto.nameProd;
        document.getElementById("precProd").value = producto.precProd;
        document.getElementById("descProd").value = producto.descProd;
    });
}
//Borrar Producto
function borrarProducto(id){
    socket.emit("clienteBorrarProducto", id);

}

//BORRAR USUARIO
function borrarUsuario(id) {
    socket.emit("clienteBorrarUsuario", id);
}
//FIN BORRAR USUARIO