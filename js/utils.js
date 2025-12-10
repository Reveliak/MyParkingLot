/**
 * utils.js - Funciones auxiliares y utilidades
 *
 * Funciones reutilizables para el prototipo MyParkingLot
 */

// ═══════════════════════════════════════════════════════════
// FORMATEO DE FECHAS Y HORAS
// ═══════════════════════════════════════════════════════════

/**
 * Obtener fecha actual en formato DD/MM/YYYY
 */
function getFechaActual() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

/**
 * Formatear fecha para input type="date" (YYYY-MM-DD)
 */
function formatearFechaParaInput(fecha) {
    const [dia, mes, anio] = fecha.split('/');
    return `${anio}-${mes}-${dia}`;
}

/**
 * Formatear fecha de input a formato display (DD/MM/YYYY)
 */
function formatearFechaParaDisplay(fechaInput) {
    const [anio, mes, dia] = fechaInput.split('-');
    return `${dia}/${mes}/${anio}`;
}

/**
 * Obtener hora actual en formato HH:MM
 */
function getHoraActual() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
}

// ═══════════════════════════════════════════════════════════
// VALIDACIONES
// ═══════════════════════════════════════════════════════════

/**
 * Validar que una fecha no sea en el pasado
 */
function validarFechaFutura(fecha) {
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fechaSeleccionada >= hoy;
}

/**
 * Validar que el horario de fin sea posterior al de inicio
 */
function validarRangoHorario(horaInicio, horaFin) {
    const [horaI, minI] = horaInicio.split(':').map(Number);
    const [horaF, minF] = horaFin.split(':').map(Number);

    const minutosInicio = horaI * 60 + minI;
    const minutosFin = horaF * 60 + minF;

    return minutosFin > minutosInicio;
}

/**
 * Calcular duración entre dos horarios (en horas)
 */
function calcularDuracion(horaInicio, horaFin) {
    const [horaI, minI] = horaInicio.split(':').map(Number);
    const [horaF, minF] = horaFin.split(':').map(Number);

    const minutosInicio = horaI * 60 + minI;
    const minutosFin = horaF * 60 + minF;

    return (minutosFin - minutosInicio) / 60;
}

// ═══════════════════════════════════════════════════════════
// ALMACENAMIENTO LOCAL (localStorage)
// ═══════════════════════════════════════════════════════════

/**
 * Guardar reserva activa del usuario
 */
function guardarReserva(reserva) {
    try {
        localStorage.setItem('reservaActual', JSON.stringify(reserva));
        console.log('✅ Reserva guardada:', reserva);
        return true;
    } catch (error) {
        console.error('❌ Error al guardar reserva:', error);
        return false;
    }
}

/**
 * Obtener reserva activa del usuario
 */
function obtenerReserva() {
    try {
        const reserva = localStorage.getItem('reservaActual');
        return reserva ? JSON.parse(reserva) : null;
    } catch (error) {
        console.error('❌ Error al obtener reserva:', error);
        return null;
    }
}

/**
 * Eliminar reserva activa
 */
function eliminarReserva() {
    try {
        localStorage.removeItem('reservaActual');
        console.log('🗑️ Reserva eliminada');
        return true;
    } catch (error) {
        console.error('❌ Error al eliminar reserva:', error);
        return false;
    }
}

/**
 * Guardar timestamp de check-in
 */
function guardarTimestampCheckin() {
    const timestamp = new Date().getTime();
    localStorage.setItem('checkinTimestamp', timestamp.toString());
    return timestamp;
}

/**
 * Obtener tiempo transcurrido desde check-in (en segundos)
 */
function getTiempoDesdeCheckin() {
    const timestamp = localStorage.getItem('checkinTimestamp');
    if (!timestamp) return null;

    const ahora = new Date().getTime();
    const diferencia = ahora - parseInt(timestamp);
    return Math.floor(diferencia / 1000); // retornar en segundos
}

// ═══════════════════════════════════════════════════════════
// FUNCIONES DE UI
// ═══════════════════════════════════════════════════════════

/**
 * Mostrar notificación toast
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notif = document.createElement('div');
    notif.className = `toast toast-${tipo}`;
    notif.textContent = mensaje;

    // Agregar al body
    document.body.appendChild(notif);

    // Mostrar con animación
    setTimeout(() => notif.classList.add('show'), 10);

    // Ocultar y remover después de 3 segundos
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => document.body.removeChild(notif), 300);
    }, 3000);
}

/**
 * Mostrar modal de confirmación
 */
function mostrarConfirmacion(mensaje, onConfirm, onCancel) {
    const resultado = confirm(mensaje);
    if (resultado && onConfirm) {
        onConfirm();
    } else if (!resultado && onCancel) {
        onCancel();
    }
    return resultado;
}

/**
 * Deshabilitar un botón temporalmente (prevenir doble click)
 */
function deshabilitarBotonTemporalmente(botonId, segundos = 2) {
    const boton = document.getElementById(botonId);
    if (!boton) return;

    const textoOriginal = boton.textContent;
    boton.disabled = true;
    boton.textContent = 'Procesando...';

    setTimeout(() => {
        boton.disabled = false;
        boton.textContent = textoOriginal;
    }, segundos * 1000);
}

// ═══════════════════════════════════════════════════════════
// CONTADOR REGRESIVO (para check-in de 10 minutos)
// ═══════════════════════════════════════════════════════════

/**
 * Iniciar countdown de 10 minutos
 * @param elementoId - ID del elemento HTML donde mostrar el countdown
 * @param onComplete - Función callback cuando llega a 0
 */
function iniciarCountdown(elementoId, duracionSegundos = 600, onComplete) {
    let segundosRestantes = duracionSegundos;
    const elemento = document.getElementById(elementoId);

    if (!elemento) {
        console.error(`Elemento ${elementoId} no encontrado`);
        return null;
    }

    function actualizarDisplay() {
        const minutos = Math.floor(segundosRestantes / 60);
        const segundos = segundosRestantes % 60;
        elemento.textContent = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }

    actualizarDisplay();

    const intervalo = setInterval(() => {
        segundosRestantes--;
        actualizarDisplay();

        // Cambiar color cuando quedan menos de 2 minutos
        if (segundosRestantes <= 120) {
            elemento.classList.add('countdown-warning');
        }

        // Cuando llega a 0
        if (segundosRestantes <= 0) {
            clearInterval(intervalo);
            elemento.classList.add('countdown-expired');
            if (onComplete) onComplete();
        }
    }, 1000);

    return intervalo;
}

// ═══════════════════════════════════════════════════════════
// EXPORTAR FUNCIONES GLOBALMENTE
// ═══════════════════════════════════════════════════════════

window.getFechaActual = getFechaActual;
window.formatearFechaParaInput = formatearFechaParaInput;
window.formatearFechaParaDisplay = formatearFechaParaDisplay;
window.getHoraActual = getHoraActual;
window.validarFechaFutura = validarFechaFutura;
window.validarRangoHorario = validarRangoHorario;
window.calcularDuracion = calcularDuracion;
window.guardarReserva = guardarReserva;
window.obtenerReserva = obtenerReserva;
window.eliminarReserva = eliminarReserva;
window.guardarTimestampCheckin = guardarTimestampCheckin;
window.getTiempoDesdeCheckin = getTiempoDesdeCheckin;
window.mostrarNotificacion = mostrarNotificacion;
window.mostrarConfirmacion = mostrarConfirmacion;
window.deshabilitarBotonTemporalmente = deshabilitarBotonTemporalmente;
window.iniciarCountdown = iniciarCountdown;

console.log('✅ Utilidades cargadas correctamente');
