# BASEMAESTRASEC2 — Portal Docentes / Sistema de permisos e incidencias

Documento maestro operativo para GitHub README.md y respaldo técnico del proyecto SEC2-APP.

Estado: BASE BUENA V2 / V3 visual
Fecha de corte: 2026-07-01
Uso: copiar completo a README.md o conservar como guía de recuperación.

---

## 1. Descripción general

SEC2-APP es un sistema web móvil para consulta, registro, control y seguimiento de permisos, incidencias, reportes y notificaciones del personal escolar.

El sistema está diseñado para costo cero usando:

- GitHub Pages como frontend público.
- Google Apps Script como backend/API.
- Google Sheets como base de datos.
- Acceso mediante IDAcceso + contraseña.
- Validación de roles y sesión desde backend.
- Interfaz exclusiva móvil en orientación vertical.

---

## 2. Arquitectura final

```text
USUARIO
  ↓
GitHub Pages
  ↓
index.html + css/style.css + js/*.js
  ↓
Apps Script Web App /exec
  ↓
Code.gs
  ↓
Google Sheets
```

Reglas fundamentales:

```text
GitHub = app visual real
Apps Script = API/backend
Google Sheets = base de datos
Apps Script index.html = pantalla mínima opcional, NO es la app visual
```

---

## 3. Archivos vigentes y dónde van

### 3.1 GitHub Pages

Estos archivos van en el repositorio GitHub:

```text
INDEXGITHUBV3.txt        → index.html
styleV2.txt              → css/style.css
apigithubjs.txt          → js/api.js
appgithubjs.txt          → js/app.js
uigithubjs.txt           → js/ui.js
incidenciasV2.txt        → js/incidencias.js
reportesgithubjs.txt     → js/reportes.js
notificacionesgithubjs.txt → js/notificaciones.js
logoPng.png              → logoPng.png
BASEMAESTRASEC2.TXT      → README.md, si se quiere usar como README
```

### 3.2 Google Apps Script

Estos archivos van en Apps Script:

```text
Codegsrealdefinitivo_v3_lista_completa_sin_compatibilidad_antigua.txt → Code.gs
indexscrip.txt                                                        → index.html
```

El `index.html` de Apps Script solo debe mostrar una pantalla mínima de API activa. No debe contener la app visual completa.

---

## 4. Archivos obsoletos o de respaldo

No usar para producción actual:

```text
SEC2_Code.gs_COMPLETO_CORREGIDO.txt
indexgithubhtml.txt
indexgithubhtml_final.txt
indexgithubhtml_final_v2_menuprincipal.txt
INDEXGITHUBV2.txt
stylegithubcss.txt
incidenciasgithubjs.txt
SEC2_api.js_COMPLETO_CORREGIDO.txt
SEC2_app.js_COMPLETO_CORREGIDO.txt
SEC2_index.html_COMPLETO_CORREGIDO.txt
```

Notas:

```text
INDEXGITHUBV2.txt funcionó, pero fue reemplazado por INDEXGITHUBV3.txt.
stylegithubcss.txt funcionó como base, pero fue reemplazado por styleV2.txt.
incidenciasgithubjs.txt funcionó como base, pero fue reemplazado por incidenciasV2.txt.
```

---

## 5. Regla crítica de versiones

No mezclar archivos de distintas etapas.

La combinación buena actual es:

```text
INDEXGITHUBV3.txt
styleV2.txt
incidenciasV2.txt
apigithubjs.txt
appgithubjs.txt
uigithubjs.txt
reportesgithubjs.txt
notificacionesgithubjs.txt
Codegsrealdefinitivo_v3_lista_completa_sin_compatibilidad_antigua.txt
indexscrip.txt
```

Si algo falla, regresar exactamente a esa combinación.

---

## 6. Orden actual de scripts en GitHub

El `index.html` de GitHub debe cargar los scripts al final del body en este orden:

```html
<script src="js/api.js"></script>
<script src="js/app.js"></script>
<script src="js/ui.js"></script>
<script src="js/incidencias.js"></script>
<script src="js/reportes.js"></script>
<script src="js/notificaciones.js"></script>
```

Motivo:

```text
api.js comunica con Apps Script.
app.js inicializa sesión, módulos y variables globales.
ui.js contiene utilidades visuales y navegación.
incidencias.js controla perfiles, historial, registro, detalle y permisos.
reportes.js controla reportes y estadísticas.
notificaciones.js controla mensajes recibidos/enviados.
```

---

## 7. Regla sobre CSS

El `index.html` de GitHub NO debe tener un bloque grande `<style>...</style>` interno.

Debe usar solo:

```html
<link rel="stylesheet" href="css/style.css">
```

Motivo:

```text
El CSS interno viejo anulaba styleV2.
La regla vieja .stat-grid { display:flex; flex-direction:column; } rompía el resumen rápido.
El diseño correcto vive en css/style.css.
```

---

## 8. Pantalla inicial

La pantalla inicial muestra cuatro módulos:

```text
Dirección
Correspondencia
Prefectura
Docente
```

Regla visual actual:

```text
Debajo de los módulos debe aparecer:
- Información importante.
- Tarjeta de acceso / sesión activa.
- Botón cerrar sesión.
- Footer de sistema seguro y confidencial.
```

Ese comportamiento está en `INDEXGITHUBV3.txt`.

---

## 9. Roles oficiales

Los roles internos válidos son exactamente:

```text
Direccion
Correspondencia
Prefectura
Docente
```

Regla:

```text
Usar Direccion sin acento como clave interna.
Puede mostrarse “Dirección” visualmente, pero internamente debe ser Direccion.
```

---

## 10. Acceso por módulos

Aunque la pantalla principal muestre los cuatro módulos, cada usuario solo debe entrar al módulo que corresponde a su rol.

```text
Rol Direccion       → módulo Direccion
Rol Correspondencia → módulo Correspondencia
Rol Prefectura      → módulo Prefectura
Rol Docente         → módulo Docente
```

Regla final adoptada:

```text
Dirección tampoco entra a los otros módulos como si fuera otro rol.
Dirección tiene su propio módulo administrativo.
```

---

## 11. Identidad del sistema

La identidad real de una persona es:

```text
IDAcceso
```

No es:

```text
ID
```

La columna A `ID` sirve como sello/auditoría:

```text
RegistradoPor
EliminadoPor
EnviadoPor
LeidoPor
```

La columna H `IDAcceso` sirve como identidad funcional:

```text
inicio de sesión
IDUsuario en Incidencias
IDUsuario en Notificaciones
consultas de historial
perfil personal
notificaciones recibidas
```

---

## 12. Hoja Usuarios

Estructura actual esperada:

```text
A: ID
B: Nombre
C: Apellidos
D: Correo
E: Rol
F: Turno
G: Activo
H: IDAcceso
I: Contrasena
```

### 12.1 Columna ID

Uso:

```text
sello de auditoría
quién registró
quién eliminó
quién envió
quién leyó
```

No usar para buscar perfil o persona.

### 12.2 Columna IDAcceso

Uso:

```text
login
sesión
consultas
relación con Incidencias.IDUsuario
relación con Notificaciones.IDUsuario
```

### 12.3 Columna Activo

Valores esperados:

```text
Sí / Si / si / sí
No / no
```

Si está en `No`, el usuario no debe poder iniciar sesión.

---

## 13. Hoja Incidencias

La regla limpia actual es:

```text
Incidencias.IDUsuario = Usuarios.IDAcceso
```

No se debe mezclar con el ID de columna A.

Si existen incidencias viejas creadas con otro identificador, pueden no coincidir. La decisión final fue trabajar limpio desde cero con IDAcceso.

Columnas esperadas principales:

```text
IDIncidencia
IDUsuario
Nombre
Apellidos
Correo
Rol
Turno
TipoIncidencia
FechaInicio
FechaFin
LicenciaMedica
Observaciones
RegistradoPor
FechaRegistro
Estado
FechaOficial1
FechaOficial2
FechaOficial3
Uso1Fecha
Uso1Estado
Uso2Fecha
Uso2Estado
Uso3Fecha
Uso3Estado
```

---

## 14. Tipos de incidencia

Tipos oficiales:

```text
Permiso oficial
Incapacidad
Humanitario sindical
Humanitario oficial
Comisión sindical
Comisión oficial
Especial
```

---

## 15. Resumen rápido de perfil / docente

La pantalla de resumen rápido debe mostrar 6 cuadros compactos en 3 columnas x 2 filas:

```text
Total incidencias | Permisos oficiales | Incapacidades
Comisiones        | Humanitarios       | Especiales
```

Reglas de conteo:

```text
Total incidencias = todas las incidencias de la persona
Permisos oficiales = permiso oficial / permiso personal, según código visual actual
Incapacidades = incapacidades / licencias médicas
Comisiones = comisión oficial + comisión sindical
Humanitarios = humanitario oficial + humanitario sindical
Especiales = especial
```

Regla visual:

```text
Mi perfil = oro
Resumen del docente consultado = verde
```

`IDAcceso` no debe mostrarse visualmente en perfil, resumen, historial ni detalle de incidencia.

---

## 16. Módulo Dirección

Puede:

```text
ver perfil propio
registrar incidencias
consultar fechas
consultar historial general
ver reporte del día
ver reporte semanal
enviar notificaciones
ver notificaciones recibidas
ver notificaciones enviadas
editar uso de permiso oficial
eliminar incidencias
```

No debe entrar a otros módulos como si fuera otro rol.

---

## 17. Módulo Correspondencia

Puede:

```text
ver perfil propio
consultar fechas
consultar historial general
ver notificaciones recibidas
```

No puede:

```text
registrar incidencias
editar incidencias
eliminar incidencias
enviar notificaciones
ver notificaciones enviadas
```

---

## 18. Módulo Prefectura

Puede:

```text
ver perfil propio
ver reporte del día
ver reporte semanal
ver notificaciones recibidas
```

No puede:

```text
registrar incidencias
editar incidencias
eliminar incidencias
consultar otros docentes, salvo que backend lo permita explícitamente
enviar notificaciones
```

---

## 19. Módulo Docente

Puede:

```text
ver perfil propio
ver historial personal
ver próximas incidencias propias
ver estadística mensual propia
ver notificaciones recibidas
```

No puede:

```text
registrar incidencias
consultar otros docentes
ver reportes generales
enviar notificaciones
eliminar incidencias
editar incidencias
```

---

## 20. Hoja Notificaciones

Columnas funcionales esperadas:

```text
IDNotificacion
IDUsuario
Nombre
Apellidos
Correo
Rol
Turno
Mensaje
EnviadoPor
FechaEnvio
Estado
FechaLectura
LeidoPor
```

Regla de identidad:

```text
Notificaciones.IDUsuario = Usuarios.IDAcceso
```

Estado esperado:

```text
No leida / No leída
Leída / Leida
```

---

## 21. Lectura automática de notificaciones

Diseño esperado:

```text
El frontend abre el detalle de una notificación recibida.
API.obtenerDetalleNotificacion llama al backend.
Code.gs debe marcar Estado = Leída.
Code.gs debe guardar FechaLectura.
Code.gs debe guardar LeidoPor.
```

Regla técnica:

```text
El frontend no debe marcar leído manualmente.
La acción real debe hacerla Code.gs al ejecutar obtenerDetalleNotificacion.
```

Prueba mínima:

```text
1. Dirección envía notificación a Docente.
2. Docente entra a Notificaciones.
3. Debe aparecer como No leída.
4. Docente abre detalle.
5. Volver a revisar hoja Notificaciones.
6. Debe cambiar a Leída y llenar FechaLectura / LeidoPor.
7. Dirección revisa Enviadas.
8. Debe ver estado Leída.
```

---

## 22. Reportes

Reportes esperados:

```text
Reporte del día
Reporte semanal
Consulta de fechas
Estadística mensual
Historial completo
Próximas incidencias
```

Dirección y Prefectura usan reportes generales según permisos.

Docente usa reportes propios.

Correspondencia consulta historial y fechas.

---

## 23. Apps Script Web App

Configuración esperada:

```text
Ejecutar como: propietario del script
Acceso: según necesidad de publicación
URL usada por GitHub: termina en /exec
No usar /dev para producción
```

La URL `/exec` debe estar en:

```text
js/api.js
const APPS_SCRIPT_URL = ".../exec";
```

---

## 24. API segura

El frontend debe enviar automáticamente:

```text
idAccesoSesion
rolSesion
modulo
```

Esos valores salen de:

```text
sessionStorage.getItem("userIDAcceso")
sessionStorage.getItem("userRol")
sessionStorage.getItem("currentActiveModule")
```

No usar:

```text
userTest
ID de columna A como identidad principal
```

---

## 25. Validaciones críticas de backend

Apps Script debe validar:

```text
idAccesoSesion existe
usuario activo
rol real coincide con rolSesion
modulo coincide con el rol permitido
acción permitida para ese rol
```

---

## 26. Caché / retardo de Sheets

Pendiente final no resuelto del todo:

```text
Apps Script / Google Sheets puede tardar en reflejar cambios manuales.
Ejemplos:
- agregar IDAcceso
- agregar contraseña
- cambiar Activo
- borrar incidencias
- crear usuarios
```

Se observó que con tiempo la lista de docentes sí se actualiza.

Siguiente fase opcional:

```text
gsV2.txt
```

Objetivo:

```text
reducir o eliminar caché de lectura
mejorar refresco desde Sheets
no tocar frontend
no tocar CSS
no tocar módulos
```

---

## 27. Prueba mínima de sistema

Antes de uso real:

```text
1. Login Dirección.
2. Intentar entrar a Dirección: permitido.
3. Intentar entrar a otro módulo: bloqueado.
4. Registrar incidencia a docente.
5. Ver detalle de incidencia.
6. Consultar Historial General.
7. Ver Resumen del docente en verde.
8. Revisar 6 estadísticas rápidas.
9. Login Docente.
10. Ver Mi perfil en oro.
11. Ver que IDAcceso no se muestre.
12. Probar reporte del día.
13. Probar reporte semanal.
14. Probar consulta de fechas.
15. Probar notificación recibida.
16. Abrir detalle de notificación.
17. Confirmar que marque Leída en Sheets.
```

---

## 28. Recuperación rápida

Si algo falla visualmente, revisar:

```text
index.html = debe venir de INDEXGITHUBV3.txt
css/style.css = debe venir de styleV2.txt
js/incidencias.js = debe venir de incidenciasV2.txt
```

Si falla comunicación con backend:

```text
js/api.js
APPS_SCRIPT_URL
despliegue /exec
permisos de Apps Script
```

Si falla sesión:

```text
sessionStorage userIDAcceso
sessionStorage userRol
sessionStorage currentActiveModule
Usuarios.IDAcceso
Usuarios.Contrasena
Usuarios.Activo
Usuarios.Rol
```

Si falla lectura de incidencias:

```text
Incidencias.IDUsuario debe ser igual a Usuarios.IDAcceso
no usar ID columna A
revisar encabezados
revisar Estado eliminado/cancelado
```

Si falla lista de docentes:

```text
Usuarios.IDAcceso lleno
Usuarios.Contrasena llena si requiere login
Usuarios.Activo no debe ser No
esperar posible retardo de Sheets
revisar obtenerUsuariosParaFormulario
```

---

## 29. Regla de oro para cambios futuros

```text
No tocar todo al mismo tiempo.
Cambiar un archivo.
Probar.
Si falla, regresar solo ese archivo.
No mezclar versiones.
No corregir backend y frontend al mismo tiempo salvo necesidad comprobada.
```

Orden recomendado de intervención:

```text
1. HTML / index
2. CSS
3. JS de módulo afectado
4. API
5. Code.gs
6. README
```

---

## 30. Estado actual final

Estado técnico actual:

```text
Frontend GitHub funcional
Backend Apps Script funcional
Login funcional
Bloqueo de roles funcional
Incidencias funcionales con IDAcceso
Resumen docente verde funcional
Mi perfil oro funcional
IDAcceso oculto en incidencias/perfil
Resumen rápido corregido
Lista de docentes completa después de refresco
Menú inicial con tarjeta de acceso y cerrar sesión
Notificaciones diseñadas para marcar Leída al abrir detalle desde backend
```

Pendientes para próxima sesión:

```text
1. Probar visualmente INDEXGITHUBV3 en menú inicial.
2. Probar notificaciones reales.
3. Confirmar que al abrir detalle cambia Estado a Leída.
4. Si hay retardo molesto, crear gsV2.txt para caché/refresco.
5. Revisar si notificaciones muestran IDUsuario y ocultarlo si aparece.
```

---

## 31. Mapa final ultra corto

```text
GitHub:
INDEXGITHUBV3.txt          → index.html
styleV2.txt                → css/style.css
apigithubjs.txt            → js/api.js
appgithubjs.txt            → js/app.js
uigithubjs.txt             → js/ui.js
incidenciasV2.txt          → js/incidencias.js
reportesgithubjs.txt       → js/reportes.js
notificacionesgithubjs.txt → js/notificaciones.js
BASEMAESTRASEC2.TXT        → README.md

Apps Script:
Codegsrealdefinitivo_v3_lista_completa_sin_compatibilidad_antigua.txt → Code.gs
indexscrip.txt                                                        → index.html

Sheets:
Usuarios
Incidencias
Papelera
Configuracion
Notificaciones
```
