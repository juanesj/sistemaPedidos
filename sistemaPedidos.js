class Usuario {
    constructor(nombre, username, password, email) {
        this.nombre = nombre;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    autenticar(password) {
        return this.password === password;
    }
}

class Pedido {
    constructor(id, nombreRemitente, tipoPedido, descripcion, fechaEntrega, fechaRecoleccion, cantidadArticulos, costo) {
        this.id = id;
        this.nombreRemitente = nombreRemitente;
        this.tipoPedido = tipoPedido;
        this.descripcion = descripcion;
        this.fechaEntrega = fechaEntrega;
        this.fechaRecoleccion = fechaRecoleccion;
        this.cantidadArticulos = cantidadArticulos;
        this.costo = costo;
    }
}

class SistemaPedidos {
    constructor() {
        this.usuarios = [];
        this.pedidos = [];
        this.usuarioAutenticado = null;
    }

    registrarUsuario(nombre, username, password, email) {
        // Verificar que el username no esté en uso
        if (this.usuarios.find(user => user.username === username)) {
            console.log("El nombre de usuario ya está en uso.");
            return;
        }

        // Crear y agregar el nuevo usuario
        const nuevoUsuario = new Usuario(nombre, username, password, email);
        this.usuarios.push(nuevoUsuario);
        console.log("Usuario registrado exitosamente.");
    }

    autenticarUsuario(username, password) {
        const usuario = this.usuarios.find(user => user.username === username);
        if (usuario && usuario.autenticar(password)) {
            this.usuarioAutenticado = usuario;
            console.log("Usuario autenticado exitosamente.");
            return true;
        }
        console.log("Error en la autenticación.");
        return false;
    }

    crearPedido(id, nombreRemitente, tipoPedido, descripcion, fechaEntrega, fechaRecoleccion, cantidadArticulos, costo) {
        if (this.usuarioAutenticado) {
            const nuevoPedido = new Pedido(id, nombreRemitente, tipoPedido, descripcion, fechaEntrega, fechaRecoleccion, cantidadArticulos, costo);
            this.pedidos.push(nuevoPedido);
            console.log("Pedido creado exitosamente.");
        } else {
            console.log("Debe autenticarse para realizar esta acción.");
        }
    }

    listarPedidos() {
        if (this.usuarioAutenticado) {
            return this.pedidos;
        } else {
            console.log("Debe autenticarse para realizar esta acción.");
            return [];
        }
    }

    editarPedido(id, nuevosDatos) {
        if (this.usuarioAutenticado) {
            const pedido = this.pedidos.find(pedido => pedido.id === id);
            if (pedido) {
                Object.assign(pedido, nuevosDatos);
                console.log("Pedido editado exitosamente.");
            } else {
                console.log("Pedido no encontrado.");
            }
        } else {
            console.log("Debe autenticarse para realizar esta acción.");
        }
    }

    eliminarPedido(id) {
        if (this.usuarioAutenticado) {
            const index = this.pedidos.findIndex(pedido => pedido.id === id);
            if (index !== -1) {
                this.pedidos.splice(index, 1);
                console.log("Pedido eliminado exitosamente.");
            } else {
                console.log("Pedido no encontrado.");
            }
        } else {
            console.log("Debe autenticarse para realizar esta acción.");
        }
    }
}

// Ejemplo de uso:
const sistema = new SistemaPedidos();
sistema.registrarUsuario("Juan", "juan123", "password123", "juan@example.com");
sistema.registrarUsuario("Maria", "maria123", "password456", "maria@example.com");

if (sistema.autenticarUsuario("juan123", "password123")) {
    sistema.crearPedido(1, "Cliente1", "Tipo1", "Descripción del pedido", "2024-06-01", "2024-06-03", 5, 100.0);
    console.log(sistema.listarPedidos());
} else {
    console.log("Error en la autenticación");
}
