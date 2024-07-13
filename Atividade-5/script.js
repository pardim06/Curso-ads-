class Dispositivo {
    constructor(modelo, categoria, serial, disponivel = true) {
        this.modelo = modelo;
        this.categoria = categoria;
        this.serial = serial;
        this.disponivel = disponivel;
    }

    emprestar() {
        if (this.disponivel) {
            this.disponivel = false;
            return true;
        }
        return false;
    }

    devolver() {
        this.disponivel = true;
    }
}

class CentroDeEmpréstimos {
    constructor() {
        this.inventario = [];
    }

    adicionarDispositivo(dispositivo) {
        this.inventario.push(dispositivo);
        this.atualizarInventario();
    }

    verificarDispositivo(serial) {
        return this.inventario.find(dispositivo => dispositivo.serial === serial) || null;
    }

    emprestarDispositivo(serial) {
        const dispositivo = this.verificarDispositivo(serial);
        if (dispositivo && dispositivo.emprestar()) {
            alert("Dispositivo emprestado com sucesso.");
        } else {
            alert("Dispositivo não disponível ou não encontrado.");
        }
        this.atualizarInventario();
    }

    devolverDispositivo(serial) {
        const dispositivo = this.verificarDispositivo(serial);
        if (dispositivo) {
            dispositivo.devolver();
            alert("Dispositivo devolvido com sucesso.");
        } else {
            alert("Dispositivo não encontrado.");
        }
        this.atualizarInventario();
    }

    atualizarInventario() {
        const inventarioLista = document.getElementById('inventario');
        inventarioLista.innerHTML = '';
        this.inventario.forEach(dispositivo => {
            const item = document.createElement('li');
            item.textContent = `${dispositivo.modelo} (${dispositivo.categoria}) - Serial: ${dispositivo.serial} - ${dispositivo.disponivel ? 'Disponível' : 'Emprestado'}`;
            inventarioLista.appendChild(item);
        });
    }
}

const centro = new CentroDeEmpréstimos();

function adicionarDispositivo() {
    const modelo = document.getElementById('modelo').value;
    const categoria = document.getElementById('categoria').value;
    const serial = document.getElementById('serial').value;

    if (modelo && categoria && serial) {
        const dispositivo = new Dispositivo(modelo, categoria, serial);
        centro.adicionarDispositivo(dispositivo);
        document.getElementById('modelo').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('serial').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function emprestarDispositivo() {
    const serial = document.getElementById('serialAcao').value;
    if (serial) {
        centro.emprestarDispositivo(serial);
        document.getElementById('serialAcao').value = '';
    } else {
        alert('Por favor, insira o serial do dispositivo.');
    }
}

function devolverDispositivo() {
    const serial = document.getElementById('serialAcao').value;
    if (serial) {
        centro.devolverDispositivo(serial);
        document.getElementById('serialAcao').value = '';
    } else {
        alert('Por favor, insira o serial do dispositivo.');
    }
}
