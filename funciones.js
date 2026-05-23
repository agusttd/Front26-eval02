// Primeras funciones de validacion especifica

// Validación de RUT Chileno (Módulo 11)
function validarRut(rut) {
    
    let valor = rut.replace(/\./g, '').replace(/-/g, '').trim().toUpperCase();
    if (valor.length < 8) return false;

    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1);

    if (!/^[0-9]+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplo = 2;

    for (let i = 1; i <= cuerpo.length; i++) {
        let index = multiplo * valor.charAt(cuerpo.length - i);
        suma = suma + index;
        if (multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }
    
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = (dvEsperado === 11) ? "0" : (dvEsperado === 10) ? "K" : dvEsperado.toString();

    return dv === dvEsperado;
}

// Validación de Email
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
}

// Validación de Fecha de tipo (dd/MM/yyyy)
function validarFecha(fecha) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;
    return regex.test(fecha);
}

// Validación de Contraseña (8-12 chars, 1 mayúscula, 1 minuscula, 1 número, 1 especial)
function validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,12}$/;
    return regex.test(password);
}

// Validación de archivo CV (.docx, .pdf)
function validarArchivoCV(archivoPath) {
    if (!archivoPath) return true; // Como no es requerido si esta vacio es valido
    const extension = archivoPath.split('.').pop().toLowerCase();
    return extension === 'pdf' || extension === 'docx';
}

// Las funciones de interfaz

// Función utilitaria para aplicar las clases de Bootstrap según validez
function setEstadoCampo(id, esValido) {
    const elemento = document.getElementById(id);
    if (esValido) {
        elemento.classList.remove('is-invalid');
        elemento.classList.add('is-valid');
    } else {
        elemento.classList.remove('is-valid');
        elemento.classList.add('is-invalid');
    }
}

// Acción del botón Cancelar
function limpiarFormulario() {
    document.getElementById('registroForm').reset(); // Limpia los valores de todos los inputs

    // Elimina las clases visuales de validación de Bootstrap
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
    });
}

// Acción del botón Guardar
function enviarFormulario() {
    let formValido = true;

    // Nombre Completo 
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre === '') {
        setEstadoCampo('nombre', false);
        formValido = false;
    } else {
        setEstadoCampo('nombre', true);
    }

    //Rut 
    const rut = document.getElementById('rut').value;
    if (!validarRut(rut)) {
        setEstadoCampo('rut', false);
        formValido = false;
    } else {
        setEstadoCampo('rut', true);
    }

    // Curriculum Vitae para verificar formato
    const cv = document.getElementById('cv').value;
    if (cv !== '' && !validarArchivoCV(cv)) {
        setEstadoCampo('cv', false);
        formValido = false;
    } else {
        if (cv !== '') setEstadoCampo('cv', true);
        else document.getElementById('cv').classList.remove('is-invalid', 'is-valid');
    }

    // Fecha de Nacimiento 
    const fechaNac = document.getElementById('fechaNacimiento').value.trim();
    if (fechaNac !== '' && !validarFecha(fechaNac)) {
        setEstadoCampo('fechaNacimiento', false);
        formValido = false;
    } else {
        if (fechaNac !== '') setEstadoCampo('fechaNacimiento', true);
        else document.getElementById('fechaNacimiento').classList.remove('is-invalid', 'is-valid');
    }

    //  Email 
    const email = document.getElementById('email').value.trim();
    if (!validarEmail(email) || email === '') {
        setEstadoCampo('email', false);
        formValido = false;
    } else {
        setEstadoCampo('email', true);
    }

    // Contraseña 
    const password = document.getElementById('password').value;
    if (!validarPassword(password)) {
        setEstadoCampo('password', false);
        formValido = false;
    } else {
        setEstadoCampo('password', true);
    }

    //  Repetir Contraseña 
    const repetirPassword = document.getElementById('repetirPassword').value;
    if (repetirPassword === '' || repetirPassword !== password) {
        setEstadoCampo('repetirPassword', false);
        formValido = false;
    } else {
        setEstadoCampo('repetirPassword', true);
    }

    // alerta de exito
    if (formValido) {
        alert('¡Envío exitoso! Todos los datos ingresados son correctos.');
        
    }
}