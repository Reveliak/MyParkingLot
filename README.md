# MyParkingLot - Prototipo Low-Fidelity Navegable

## 🅿️ Descripción del Proyecto

**MyParkingLot** es una aplicación digital para la gestión dinámica de plazas de estacionamiento corporativas en empresas con trabajo híbrido, desarrollada mediante metodología **Design Thinking**.

Este es un **prototipo interactivo de baja fidelidad** creado para la **Fase 4: Prototipar** del proceso de Design Thinking, preparado para ser evaluado en la **Fase 5: Test** con usuarios reales.

---

## 🎯 Problema que Resuelve

### Contexto
- **16 plazas** de estacionamiento alquiladas, asignadas históricamente por seniority
- Trabajo híbrido genera **30-50% de plazas vacías** diariamente
- **Infield Team** (sin plaza fija) paga estacionamiento externo
- **Facilities** sin visibilidad ni herramientas de reasignación dinámica
- Inequidad percibida entre empleados

### Insight Clave
> *"El problema no es la falta de espacio, sino la falta de gestión dinámica: hay plazas libres y personas que las necesitan, pero el sistema no conecta ambas realidades."*

---

## 👥 Usuarios y Perfiles (Personas)

### 1. Usuario Primario: Empleado Híbrido / Infield Team
- **Necesidad**: Previsibilidad y acceso rápido al estacionamiento
- **Pain Point**: No saber si habrá disponibilidad al llegar
- **Frecuencia**: 2-3 visitas por mes

### 2. Usuario Secundario: Empleado con Plaza Asignada
- **Necesidad**: Mantener control sobre su beneficio
- **Pain Point**: Miedo a perder la plaza cuando la necesita
- **Disposición**: 6 de 7 liberarían su plaza si el proceso toma <1 minuto

### 3. Usuario Terciario: Facilities / Administrador
- **Necesidad**: Trazabilidad y automatización
- **Pain Point**: Sobrecarga operativa manual (Excel/WhatsApp)
- **Objetivo**: Reducir conflictos y reclamos

---

## 🚀 Funcionalidades Implementadas

### Para Usuarios Finales
✅ **Reserva de plazas** con selección de fecha, horario y plaza específica
✅ **Liberación voluntaria** de plazas asignadas (mensaje colaborativo)
✅ **Check-in obligatorio** al llegar (con countdown de 10 minutos)
✅ **Liberación automática** si no se hace check-in a tiempo
✅ **Visualización en tiempo real** de disponibilidad
✅ **Lista de espera** con notificaciones automáticas

### Para Administradores (Facilities)
✅ **Panel de control** con estado de todas las plazas
✅ **Gestión de no-shows** con liberación manual
✅ **Visualización de lista de espera**
✅ **Estadísticas y reportes** (semanal/mensual)
✅ **Historial de reservas** con trazabilidad completa

---

## 📁 Estructura del Proyecto

```
MyParkingLot/
├── index.html              # Pantalla de login
├── dashboard.html          # Pantalla principal (estado del día)
├── reservar.html          # Flujo de reserva de plaza
├── liberar.html           # Liberación voluntaria de plaza
├── checkin.html           # Check-in con countdown de 10 min
├── admin.html             # Panel Facilities (administrador)
├── css/
│   └── styles.css         # Estilos low-fidelity consistentes
├── js/
│   ├── app.js             # Lógica principal y navegación
│   ├── data.js            # Simulación de datos (mock)
│   └── utils.js           # Funciones auxiliares
├── assets/
│   └── wireframes/        # Imágenes de referencia
└── README.md              # Este archivo
```

---

## 🖥️ Cómo Usar el Prototipo

### Requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- No requiere instalación de dependencias
- No requiere servidor backend

### Instrucciones de Uso

1. **Abrir el prototipo**
   ```bash
   # Desde el directorio del proyecto, abrir con un navegador:
   open index.html
   ```

2. **Seleccionar perfil de usuario**
   - **Empleado sin Plaza Fija (Infield Team)**: Para probar flujo de reserva
   - **Empleado con Plaza Asignada**: Para probar liberación de plaza
   - **Facilities / Administrador**: Para acceder al panel de control

3. **Ingresar nombre** (puede ser cualquier nombre para testing)

4. **Navegar libremente** por las diferentes pantallas

---

## 🧪 Escenarios de Testing

### Escenario 1: Reserva de Plaza (Infield Team)
1. Login como "Empleado sin Plaza Fija"
2. Ir a "RESERVAR PLAZA"
3. Seleccionar fecha y horario
4. Elegir una plaza disponible
5. Confirmar reserva
6. Realizar check-in (o esperar 1 minuto para ver countdown)

**Criterios de validación**:
- ¿El flujo es claro y sin fricción?
- ¿La regla del no-show es comprensible?
- ¿El countdown genera ansiedad innecesaria?

### Escenario 2: Liberación de Plaza (Plaza Fija)
1. Login como "Empleado con Plaza Asignada"
2. Ir a "LIBERAR MI PLAZA"
3. Seleccionar horario de liberación
4. Confirmar

**Criterios de validación**:
- ¿El mensaje se percibe como colaborativo (no punitivo)?
- ¿La acción toma menos de 1 minuto?
- ¿El usuario siente que mantiene control?

### Escenario 3: Panel Administrativo (Facilities)
1. Login como "Facilities / Administrador"
2. Explorar estado de plazas en tiempo real
3. Liberar manualmente una plaza en no-show
4. Visualizar lista de espera
5. Consultar reportes

**Criterios de validación**:
- ¿La información es clara y accionable?
- ¿Se reduce la carga operativa manual?
- ¿Hay trazabilidad suficiente?

---

## 🎨 Diseño Low-Fidelity

### Características del Diseño

#### Estética Minimalista Intencional
- **Colores neutros**: Grises, blancos, azul de acento (`#2563eb`)
- **Tipografía simple**: Sans-serif system fonts
- **Bordes marcados**: 2px para máxima claridad
- **Espaciado generoso**: Para facilitar lectura y toque

#### Objetivo del Diseño
> **USABILIDAD y CLARIDAD, no belleza**

Este es un prototipo low-fi intencional para:
- Centrar el feedback en la funcionalidad, no en la estética
- Permitir iteraciones rápidas basadas en aprendizajes
- Evitar distracciones visuales durante el testeo

---

## 💾 Datos Simulados (Mock)

### Plazas
- **Total**: 16 plazas numeradas (#1 a #18)
- **Estados**: Libre, Reservada, Ocupada, No-show
- **Tipos**: General y Fija (solo plaza #18)

### Usuarios Demo
- **Juan Pérez** (Infield Team - sin plaza fija)
- **María García** (Plaza fija #18)
- **Admin Facilities** (Administrador)

### Reglas del Sistema
- ⏱️ **Tiempo de check-in**: 10 minutos (*simulados como 60 segundos para testing*)
- 📅 **Anticipación de reserva**: 24 horas mínimas
- ⏳ **Duración mínima**: 2 horas
- ⏰ **Liberación automática**: Activada

---

## 🔧 Tecnologías Utilizadas

- **HTML5** semántico
- **CSS3** vanilla (sin frameworks)
- **JavaScript** vanilla (sin librerías externas)
- **localStorage** para persistencia simulada
- **sessionStorage** para gestión de sesión

### ¿Por qué vanilla (sin frameworks)?
- Máxima compatibilidad
- Sin dependencias externas
- Fácil de compartir y probar
- Foco en la funcionalidad, no en la tecnología

---

## 📊 Hallazgos de la Fase de Empatía

### Datos de la Encuesta (N=26)
- **69%** calificó 5/5 en disposición a usar sistema digital
- **6 de 7** empleados con plaza fija liberarían su espacio si el proceso toma <1 min
- **Insight crítico**: *"Siempre y cuando el día que la necesito esté disponible"*

### Pain Points Identificados
1. **Falta de previsibilidad** (no escasez real)
2. **Inequidad percibida** entre beneficiados y no beneficiados
3. **Fricción operativa** en Facilities (Excel/WhatsApp)
4. **Ansiedad por pérdida de beneficio** en titulares de plazas

---

## 📝 POV Statement (Point of View)

> *"Los empleados sin plaza fija necesitan acceso predecible al estacionamiento cuando asisten a la oficina, sin generar ansiedad en titulares de plazas, porque el sistema actual depende del azar y genera inequidad percibida."*

---

## ❓ How Might We...?

> *¿Cómo podríamos crear un sistema dinámico que conecte automáticamente las plazas desocupadas con quienes las necesitan, reduciendo la incertidumbre del usuario, evitando sobrecarga operativa y manteniendo el control para los empleados con plaza fija?*

---

## 🧩 User Flows Implementados

### Flow 1: Reserva
```
Login → Dashboard → Reservar → Seleccionar fecha/horario →
Ver disponibilidad → Elegir plaza → Confirmar → Check-in → Ocupada
```

### Flow 2: Liberación
```
Login → Dashboard → Liberar → Mensaje colaborativo →
Seleccionar horario → Confirmar → Notificación a lista de espera
```

### Flow 3: Administración
```
Login Admin → Panel → Ver estado general → Gestionar no-shows →
Consultar lista de espera → Descargar reportes
```

---

## 🐛 Limitaciones Conocidas (Intencionales)

### Por Diseño del Prototipo
- ⚠️ **No hay backend real**: Todos los datos son simulados en JavaScript
- ⚠️ **No hay persistencia entre sesiones**: Al refrescar se pierde la data
- ⚠️ **Countdown acelerado**: 60 segundos en vez de 10 minutos (para testing)
- ⚠️ **Sin notificaciones reales**: Se simulan en consola
- ⚠️ **Sin integración IoT**: Sensores y lectores simulados

### Estas limitaciones son **intencionales** porque:
1. El objetivo es validar **usabilidad y flujos**, no tecnología
2. Permite **iteraciones rápidas** basadas en feedback
3. Mantiene el **costo de cambio bajo**

---

## 🎯 Criterios de Validación para Fase de Test

El prototipo debe permitir evaluar:

1. ✅ **¿El usuario entiende el flujo sin asistencia?**
2. ✅ **¿La regla del no-show es clara y no genera ansiedad?**
3. ✅ **¿La liberación se percibe como colaborativa, no invasiva?**
4. ✅ **¿Facilities puede operar sin intervención manual constante?**
5. ✅ **¿La percepción de equidad mejora con transparencia?**

---

## 🔍 Debugging y Testing

### Herramientas de Debug Incluidas

Abrir la **consola del navegador** (F12) y ejecutar:

```javascript
// Ver estado completo del sistema
debugEstadoSistema()

// Resetear todo el sistema
resetearSistema()

// Ver plazas disponibles
getPlazasDisponibles()

// Ver reserva actual
obtenerReserva()
```

### Logs Automáticos
El prototipo incluye logs descriptivos en consola para debugging:
- ✅ Reservas confirmadas
- 🆓 Plazas liberadas
- 📱 Notificaciones enviadas
- ⏰ Countdowns activos

---

## 📦 Próximos Pasos (Post-Testing)

### Fase 5: Test
1. Realizar sesiones de testing con usuarios reales (cada perfil)
2. Observar interacciones y puntos de fricción
3. Recopilar feedback cualitativo
4. Identificar pain points no anticipados

### Iteraciones Potenciales
- Ajustar mensajes según feedback emocional
- Simplificar pasos si hay confusión
- Agregar/quitar información según necesidad
- Refinar reglas del sistema (10 min, prioridades, etc.)

### Evolución a MVP Funcional
Una vez validado el prototipo:
- Definir stack tecnológico (React, Node.js, MongoDB, etc.)
- Integrar backend real con base de datos
- Implementar notificaciones push reales
- Agregar módulo IoT opcional (sensores, lectores)
- Desarrollar app móvil nativa (iOS/Android)

---

## 👥 Equipo del Proyecto

- **Diseño UX/UI**: Basado en metodología Design Thinking
- **Desarrollo**: Prototipo low-fidelity navegable
- **Research**: Encuestas (N=26) y entrevistas cualitativas
- **Testing**: Preparado para Fase 5 con usuarios reales

---

## 📚 Documentación de Referencia

### Metodología Aplicada
- **Modelo Stanford de Design Thinking** (5 fases)
- **Prototipado incremental** (sketching → wireframes → prototipo navegable)
- **User-Centered Design** (centrado en necesidades reales)

### Técnicas Utilizadas
- Sketching (bocetos de baja fidelidad)
- Wireframes Low-Fi
- User Flow Mapping
- Service Blueprint
- Personas
- Customer Journey Maps
- POV Statements
- How Might We Questions

---

## 📧 Contacto y Soporte

Para consultas sobre el prototipo:
- **Fase actual**: Fase 4 - Prototipar
- **Próxima fase**: Fase 5 - Test
- **Objetivo**: Aprender y ajustar, no demostrar perfección

---

## 📄 Licencia

Este prototipo fue creado con fines educativos y de testeo de usabilidad en el contexto de un proceso de Design Thinking.

---

## ✨ Agradecimientos

A todos los participantes de las entrevistas y encuestas que permitieron identificar los insights clave para diseñar esta solución centrada en el usuario.

---

**🅿️ MyParkingLot** - *Gestión inteligente y equitativa de cocheras en empresas híbridas*

*Desarrollado con metodología Design Thinking | Fase 4: Prototipar*
