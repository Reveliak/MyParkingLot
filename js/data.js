/**
 * data.js - Datos simulados (mock) para el prototipo MyParkingLot
 *
 * Este archivo contiene toda la data mock necesaria para simular
 * el funcionamiento de la aplicación sin necesidad de backend.
 */

// ═══════════════════════════════════════════════════════════
// PLAZAS DE ESTACIONAMIENTO (16 plazas totales)
// ═══════════════════════════════════════════════════════════

const MOCK_DATA = {
    // Plazas con estado actual
    plazas: [
        { id: 1, numero: '1', estado: 'libre', asignadoA: null, tipo: 'general' },
        { id: 2, numero: '2', estado: 'libre', asignadoA: null, tipo: 'general' },
        { id: 3, numero: '3', estado: 'ocupada', asignadoA: 'Pedro Gómez', tipo: 'general' },
        { id: 4, numero: '4', estado: 'libre', asignadoA: null, tipo: 'general' },
        { id: 5, numero: '5', estado: 'reservada', asignadoA: 'Ana López', tipo: 'general' },
        { id: 6, numero: '6', estado: 'libre', asignadoA: null, tipo: 'general' },
        { id: 7, numero: '7', estado: 'libre', asignadoA: null, tipo: 'general' },
        { id: 8, numero: '8', estado: 'ocupada', asignadoA: 'Carlos Ruiz', tipo: 'general' },
        { id: 9, numero: '9', estado: 'libre', asignadoA: null, tipo: 'general' },
        { id: 10, numero: '10', estado: 'libre', asignadoA: null, tipo: 'general' },
        { id: 11, numero: '11', estado: 'reservada', asignadoA: 'Laura Sánchez', tipo: 'general' },
        { id: 12, numero: '12', estado: 'libre', asignadoA: null, tipo: 'general' },
        { id: 13, numero: '13', estado: 'no-show', asignadoA: 'Martín Díaz', tipo: 'general', tiempoNoShow: '8 min' },
        { id: 14, numero: '14', estado: 'libre', asignadoA: null, tipo: 'general' },
        { id: 15, numero: '15', estado: 'ocupada', asignadoA: 'Sofía Torres', tipo: 'general' },
        { id: 16, numero: '16', estado: 'libre', asignadoA: null, tipo: 'general' },
        { id: 17, numero: '17', estado: 'ocupada', asignadoA: 'Juan Pérez', tipo: 'general' },
        { id: 18, numero: '18', estado: 'libre', asignadoA: 'María García (Fija)', tipo: 'fija' }
    ],

    // Estados posibles: 'libre', 'reservada', 'ocupada', 'no-show'

    // ═══════════════════════════════════════════════════════════
    // USUARIOS DEMO
    // ═══════════════════════════════════════════════════════════

    usuarios: [
        {
            id: 1,
            nombre: 'Juan Pérez',
            tipo: 'infield', // Sin plaza fija
            email: 'juan.perez@empresa.com',
            plazaAsignada: null
        },
        {
            id: 2,
            nombre: 'María García',
            tipo: 'fixed', // Plaza fija
            email: 'maria.garcia@empresa.com',
            plazaAsignada: 18
        },
        {
            id: 3,
            nombre: 'Admin Facilities',
            tipo: 'admin',
            email: 'facilities@empresa.com',
            plazaAsignada: null
        }
    ],

    // ═══════════════════════════════════════════════════════════
    // LISTA DE ESPERA
    // ═══════════════════════════════════════════════════════════

    listaEspera: [
        {
            id: 1,
            usuarioNombre: 'Valentina G.',
            fecha: '12/12/2025',
            horario: '09:00-14:00',
            prioridad: 1,
            timestamp: new Date('2025-12-12T08:30:00')
        },
        {
            id: 2,
            usuarioNombre: 'Pedro R.',
            fecha: '12/12/2025',
            horario: '10:00-16:00',
            prioridad: 2,
            timestamp: new Date('2025-12-12T08:45:00')
        }
    ],

    // ═══════════════════════════════════════════════════════════
    // HORARIOS DISPONIBLES (bloques de 1 hora)
    // ═══════════════════════════════════════════════════════════

    horarios: [
        '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
        '19:00', '20:00'
    ],

    // Rangos de horario predefinidos comunes
    rangosComunes: [
        { label: 'Mañana completa (08:00-14:00)', inicio: '08:00', fin: '14:00' },
        { label: 'Tarde completa (14:00-20:00)', inicio: '14:00', fin: '20:00' },
        { label: 'Jornada completa (08:00-18:00)', inicio: '08:00', fin: '18:00' },
        { label: 'Medio día (09:00-13:00)', inicio: '09:00', fin: '13:00' }
    ],

    // ═══════════════════════════════════════════════════════════
    // REGLAS DEL SISTEMA
    // ═══════════════════════════════════════════════════════════

    reglas: {
        tiempoCheckin: 10, // minutos para hacer check-in
        anticipacionReserva: 24, // horas mínimas de anticipación
        duracionMinima: 2, // horas mínimas de reserva
        duracionMaxima: 12, // horas máximas de reserva
        liberacionAutomatica: true,
        notificacionesListaEspera: true
    },

    // ═══════════════════════════════════════════════════════════
    // HISTORIAL DE RESERVAS (para reportes)
    // ═══════════════════════════════════════════════════════════

    historialReservas: [
        {
            id: 1,
            usuario: 'Juan Pérez',
            plazaId: 7,
            fecha: '11/12/2025',
            horario: '09:00-14:00',
            checkinRealizado: true,
            horaCheckin: '09:05',
            estado: 'completada'
        },
        {
            id: 2,
            usuario: 'Laura Sánchez',
            plazaId: 11,
            fecha: '11/12/2025',
            horario: '08:00-12:00',
            checkinRealizado: false,
            horaCheckin: null,
            estado: 'no-show'
        },
        {
            id: 3,
            usuario: 'Carlos Ruiz',
            plazaId: 8,
            fecha: '12/12/2025',
            horario: '10:00-16:00',
            checkinRealizado: true,
            horaCheckin: '10:02',
            estado: 'activa'
        }
    ],

    // ═══════════════════════════════════════════════════════════
    // ESTADÍSTICAS (para panel admin)
    // ═══════════════════════════════════════════════════════════

    estadisticas: {
        semanaActual: {
            tasaOcupacion: 68,
            reservasTotal: 42,
            noShowsTotal: 3,
            liberacionesVoluntarias: 8,
            promedioUtilizacion: 72
        },
        mesActual: {
            tasaOcupacion: 65,
            reservasTotal: 187,
            noShowsTotal: 12,
            liberacionesVoluntarias: 34,
            promedioUtilizacion: 70
        }
    }
};

// ═══════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES PARA DATOS
// ═══════════════════════════════════════════════════════════

/**
 * Obtener plazas disponibles (libres) en tiempo real
 */
function getPlazasDisponibles() {
    return MOCK_DATA.plazas.filter(plaza => plaza.estado === 'libre');
}

/**
 * Obtener plaza por ID
 */
function getPlazaById(id) {
    return MOCK_DATA.plazas.find(plaza => plaza.id === id);
}

/**
 * Actualizar estado de una plaza
 */
function actualizarEstadoPlaza(plazaId, nuevoEstado, asignadoA = null) {
    const plaza = getPlazaById(plazaId);
    if (plaza) {
        plaza.estado = nuevoEstado;
        plaza.asignadoA = asignadoA;
        return true;
    }
    return false;
}

/**
 * Agregar usuario a lista de espera
 */
function agregarAListaEspera(usuario) {
    const nuevoItem = {
        id: MOCK_DATA.listaEspera.length + 1,
        usuarioNombre: usuario.nombre,
        fecha: usuario.fecha,
        horario: usuario.horario,
        prioridad: MOCK_DATA.listaEspera.length + 1,
        timestamp: new Date()
    };
    MOCK_DATA.listaEspera.push(nuevoItem);
    return nuevoItem;
}

/**
 * Simular notificación al primer usuario en lista de espera
 */
function notificarProximoEnEspera() {
    if (MOCK_DATA.listaEspera.length > 0) {
        const proximo = MOCK_DATA.listaEspera[0];
        console.log(`📱 Notificación enviada a: ${proximo.usuarioNombre}`);
        return proximo;
    }
    return null;
}

// Exportar data globalmente para el prototipo
window.MOCK_DATA = MOCK_DATA;
window.getPlazasDisponibles = getPlazasDisponibles;
window.getPlazaById = getPlazaById;
window.actualizarEstadoPlaza = actualizarEstadoPlaza;
window.agregarAListaEspera = agregarAListaEspera;
window.notificarProximoEnEspera = notificarProximoEnEspera;

console.log('✅ Datos mock cargados correctamente');
console.log(`📊 Plazas disponibles: ${getPlazasDisponibles().length} de ${MOCK_DATA.plazas.length}`);
