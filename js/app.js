/**
 * app.js - Lógica principal de la aplicación MyParkingLot
 *
 * Este archivo contiene funciones globales y lógica compartida
 * entre todas las páginas del prototipo.
 */

// ═══════════════════════════════════════════════════════════
// INICIALIZACIÓN GLOBAL
// ═══════════════════════════════════════════════════════════

(function() {
    'use strict';

    // Verificar que los datos mock estén cargados
    if (typeof window.MOCK_DATA === 'undefined') {
        console.error('❌ MOCK_DATA no está cargado');
    } else {
        console.log('✅ App inicializada correctamente');
    }

    // Log de información del entorno
    console.log('%c🅿️ MyParkingLot - Prototipo Low-Fidelity', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('Fase 4: Prototipar | Fase 5: Test');
    console.log('Metodología: Design Thinking');
})();

// ═══════════════════════════════════════════════════════════
// GESTIÓN DE SESIÓN Y AUTENTICACIÓN
// ═══════════════════════════════════════════════════════════

/**
 * Verificar si el usuario está autenticado
 */
function verificarAutenticacion() {
    const userType = sessionStorage.getItem('userType');
    const userName = sessionStorage.getItem('userName');

    if (!userType || !userName) {
        console.warn('⚠️ Usuario no autenticado');
        return false;
    }

    return true;
}

/**
 * Obtener información del usuario actual
 */
function getUsuarioActual() {
    return {
        tipo: sessionStorage.getItem('userType'),
        nombre: sessionStorage.getItem('userName')
    };
}

/**
 * Cerrar sesión
 */
function cerrarSesion() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = 'index.html';
}

// ═══════════════════════════════════════════════════════════
// GESTIÓN DE PLAZAS
// ═══════════════════════════════════════════════════════════

/**
 * Obtener información completa de todas las plazas
 */
function obtenerTodasLasPlazas() {
    return window.MOCK_DATA.plazas;
}

/**
 * Obtener plazas por estado
 */
function obtenerPlazasPorEstado(estado) {
    return window.MOCK_DATA.plazas.filter(plaza => plaza.estado === estado);
}

/**
 * Reservar una plaza
 */
function reservarPlaza(plazaId, usuario, fecha, horario) {
    const plaza = window.getPlazaById(plazaId);

    if (!plaza) {
        console.error(`❌ Plaza ${plazaId} no encontrada`);
        return false;
    }

    if (plaza.estado !== 'libre') {
        console.error(`❌ Plaza ${plazaId} no está disponible`);
        return false;
    }

    // Actualizar estado
    const resultado = window.actualizarEstadoPlaza(plazaId, 'reservada', usuario);

    if (resultado) {
        console.log(`✅ Plaza #${plaza.numero} reservada por ${usuario}`);

        // Agregar al historial
        const registroHistorial = {
            id: window.MOCK_DATA.historialReservas.length + 1,
            usuario: usuario,
            plazaId: plazaId,
            fecha: fecha,
            horario: horario,
            checkinRealizado: false,
            horaCheckin: null,
            estado: 'activa',
            timestamp: new Date()
        };

        window.MOCK_DATA.historialReservas.push(registroHistorial);
    }

    return resultado;
}

/**
 * Liberar una plaza
 */
function liberarPlazaManual(plazaId) {
    const plaza = window.getPlazaById(plazaId);

    if (!plaza) {
        console.error(`❌ Plaza ${plazaId} no encontrada`);
        return false;
    }

    const resultado = window.actualizarEstadoPlaza(plazaId, 'libre', null);

    if (resultado) {
        console.log(`🆓 Plaza #${plaza.numero} liberada`);

        // Notificar al próximo en lista de espera
        window.notificarProximoEnEspera();
    }

    return resultado;
}

// ═══════════════════════════════════════════════════════════
// GESTIÓN DE RESERVAS DE USUARIO
// ═══════════════════════════════════════════════════════════

/**
 * Verificar si el usuario tiene una reserva activa
 */
function tieneReservaActiva() {
    const reserva = window.obtenerReserva();
    return reserva !== null;
}

/**
 * Cancelar reserva del usuario
 */
function cancelarReservaUsuario() {
    const reserva = window.obtenerReserva();

    if (!reserva) {
        console.warn('⚠️ No hay reserva activa para cancelar');
        return false;
    }

    // Liberar la plaza
    window.actualizarEstadoPlaza(reserva.plazaId, 'libre', null);

    // Notificar al próximo en espera
    window.notificarProximoEnEspera();

    // Eliminar reserva
    window.eliminarReserva();

    console.log('❌ Reserva cancelada exitosamente');
    return true;
}

// ═══════════════════════════════════════════════════════════
// GESTIÓN DE LISTA DE ESPERA
// ═══════════════════════════════════════════════════════════

/**
 * Obtener lista de espera completa
 */
function obtenerListaEspera() {
    return window.MOCK_DATA.listaEspera;
}

/**
 * Remover usuario de lista de espera
 */
function removerDeListaEspera(itemId) {
    const index = window.MOCK_DATA.listaEspera.findIndex(item => item.id === itemId);

    if (index !== -1) {
        window.MOCK_DATA.listaEspera.splice(index, 1);
        console.log(`🗑️ Usuario removido de lista de espera`);
        return true;
    }

    return false;
}

// ═══════════════════════════════════════════════════════════
// NOTIFICACIONES Y ALERTS
// ═══════════════════════════════════════════════════════════

/**
 * Simular envío de notificación push
 */
function enviarNotificacion(usuario, mensaje, tipo = 'info') {
    console.log(`📱 Notificación ${tipo} para ${usuario}: ${mensaje}`);

    // En un prototipo real, aquí se integraría con:
    // - Push Notifications (Firebase, OneSignal)
    // - Email (SendGrid, AWS SES)
    // - SMS (Twilio)
    // - WhatsApp Business API

    return true;
}

/**
 * Notificar liberación de plaza
 */
function notificarLiberacionPlaza(plazaNumero) {
    const proximoEnEspera = window.MOCK_DATA.listaEspera[0];

    if (proximoEnEspera) {
        const mensaje = `¡Buenas noticias! La plaza #${plazaNumero} está disponible para tu horario ${proximoEnEspera.horario}`;
        enviarNotificacion(proximoEnEspera.usuarioNombre, mensaje, 'success');
    }
}

// ═══════════════════════════════════════════════════════════
// VALIDACIONES DE NEGOCIO
// ═══════════════════════════════════════════════════════════

/**
 * Validar disponibilidad de plaza para un horario específico
 */
function validarDisponibilidadPlaza(plazaId, fecha, horaInicio, horaFin) {
    const plaza = window.getPlazaById(plazaId);

    if (!plaza) return false;

    // En un sistema real, aquí se verificaría:
    // - Conflictos con otras reservas
    // - Horarios de operación
    // - Mantenimiento programado
    // - Reglas especiales por tipo de plaza

    return plaza.estado === 'libre';
}

/**
 * Validar si el usuario puede reservar (reglas de negocio)
 */
function validarPermisosReserva(userType) {
    // Todos los tipos de usuario pueden reservar en este prototipo
    // En un sistema real, aquí se aplicarían reglas como:
    // - Límite de reservas por semana
    // - Prioridades por seniority
    // - Restricciones por tipo de usuario
    // - Penalizaciones por no-shows previos

    return true;
}

// ═══════════════════════════════════════════════════════════
// REPORTES Y ESTADÍSTICAS
// ═══════════════════════════════════════════════════════════

/**
 * Calcular tasa de ocupación actual
 */
function calcularTasaOcupacion() {
    const plazas = window.MOCK_DATA.plazas;
    const total = plazas.length;
    const ocupadas = plazas.filter(p => p.estado === 'ocupada' || p.estado === 'reservada').length;

    return Math.round((ocupadas / total) * 100);
}

/**
 * Obtener resumen del día
 */
function obtenerResumenDia() {
    const plazas = window.MOCK_DATA.plazas;

    return {
        total: plazas.length,
        libres: plazas.filter(p => p.estado === 'libre').length,
        reservadas: plazas.filter(p => p.estado === 'reservada').length,
        ocupadas: plazas.filter(p => p.estado === 'ocupada').length,
        noShow: plazas.filter(p => p.estado === 'no-show').length,
        tasaOcupacion: calcularTasaOcupacion()
    };
}

/**
 * Generar reporte para exportación
 */
function generarReporte(tipo = 'semanal') {
    const stats = tipo === 'semanal' ?
        window.MOCK_DATA.estadisticas.semanaActual :
        window.MOCK_DATA.estadisticas.mesActual;

    const reporte = {
        tipo: tipo,
        fecha: window.getFechaActual(),
        estadisticas: stats,
        resumenDia: obtenerResumenDia(),
        historial: window.MOCK_DATA.historialReservas
    };

    console.log('📊 Reporte generado:', reporte);
    return reporte;
}

// ═══════════════════════════════════════════════════════════
// SIMULACIÓN DE CHECK-IN AUTOMÁTICO
// ═══════════════════════════════════════════════════════════

/**
 * Simular verificación de check-in pendientes
 * (Se ejecutaría en un worker o tarea programada en un sistema real)
 */
function verificarCheckinsPendientes() {
    const plazas = window.MOCK_DATA.plazas;
    const ahora = new Date();

    plazas.forEach(plaza => {
        if (plaza.estado === 'reservada') {
            // Simular verificación de 10 minutos
            // En un sistema real, aquí se compararía con el horario real de la reserva

            console.log(`⏰ Verificando check-in para plaza #${plaza.numero}`);
        }
    });
}

// ═══════════════════════════════════════════════════════════
// DEBUG Y DESARROLLO
// ═══════════════════════════════════════════════════════════

/**
 * Función de debug para mostrar estado del sistema
 */
function debugEstadoSistema() {
    console.group('🔍 Estado del Sistema - MyParkingLot');
    console.log('Usuario actual:', getUsuarioActual());
    console.log('Reserva activa:', window.obtenerReserva());
    console.log('Resumen del día:', obtenerResumenDia());
    console.log('Lista de espera:', window.MOCK_DATA.listaEspera);
    console.log('Plazas:', window.MOCK_DATA.plazas);
    console.groupEnd();
}

/**
 * Resetear datos del sistema (útil para testing)
 */
function resetearSistema() {
    localStorage.clear();
    sessionStorage.clear();
    console.log('🔄 Sistema reseteado');
    window.location.reload();
}

// ═══════════════════════════════════════════════════════════
// EXPORTAR FUNCIONES GLOBALMENTE
// ═══════════════════════════════════════════════════════════

window.verificarAutenticacion = verificarAutenticacion;
window.getUsuarioActual = getUsuarioActual;
window.cerrarSesion = cerrarSesion;
window.obtenerTodasLasPlazas = obtenerTodasLasPlazas;
window.obtenerPlazasPorEstado = obtenerPlazasPorEstado;
window.reservarPlaza = reservarPlaza;
window.liberarPlazaManual = liberarPlazaManual;
window.tieneReservaActiva = tieneReservaActiva;
window.cancelarReservaUsuario = cancelarReservaUsuario;
window.obtenerListaEspera = obtenerListaEspera;
window.removerDeListaEspera = removerDeListaEspera;
window.enviarNotificacion = enviarNotificacion;
window.notificarLiberacionPlaza = notificarLiberacionPlaza;
window.validarDisponibilidadPlaza = validarDisponibilidadPlaza;
window.validarPermisosReserva = validarPermisosReserva;
window.calcularTasaOcupacion = calcularTasaOcupacion;
window.obtenerResumenDia = obtenerResumenDia;
window.generarReporte = generarReporte;
window.verificarCheckinsPendientes = verificarCheckinsPendientes;
window.debugEstadoSistema = debugEstadoSistema;
window.resetearSistema = resetearSistema;

// Tip para developers: Ejecutá debugEstadoSistema() en la consola para ver el estado completo
console.log('💡 Tip: Ejecutá debugEstadoSistema() en la consola para ver el estado del sistema');
