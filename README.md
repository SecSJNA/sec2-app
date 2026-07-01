# SEC2-APP — Portal de permisos e incidencias

Sistema web móvil para consulta, registro, control y seguimiento de permisos, incidencias, reportes y notificaciones del personal escolar.

Este proyecto está diseñado para funcionar con **costo cero**, usando:

- **GitHub Pages** como frontend público.
- **Google Apps Script** como backend/API.
- **Google Sheets** como base de datos.
- Acceso mediante **IDAcceso + contraseña**.
- Validación de roles desde backend.

---

## 1. Arquitectura definitiva

La arquitectura final recomendada es:

```text
USUARIO
  ↓
GitHub Pages
  ↓
index.html + css/style.css + js/*.js
  ↓
Apps Script Web App
  ↓
Code.gs
  ↓
Google Sheets
```

GitHub muestra la interfaz visual.

Apps Script funciona como motor/API.

Google Sheets guarda usuarios, incidencias, papelera, configuración y notificaciones.

---

## 2. Qué archivos se usan en producción

### 2.1 Frontend real en GitHub

Estos son los archivos que deben estar en el repositorio GitHub:

```text
sec2-app/
├── index.html
├── logoPng.png
├── README.md
├── css/
│   └── style.css
└── js/
    ├── api.js
    ├── app.js
    ├── ui.js
    ├── incidencias.js
    ├── reportes.js
    └── notificaciones.js
```

### 2.2 Backend real en Apps Script

En Google Apps Script se usa:

```text
Code.gs
```

Opcionalmente puede existir:

```text
index.html
```

pero ese `index.html` de Apps Script **no es la app visual real**. Solo puede servir como pantalla mínima de referencia que indique que la API está activa.

---

## 3. Archivos corregidos y cómo pegarlos

Los archivos corregidos se entregaron como TXT para descargarlos y pegar su contenido en el archivo real correspondiente.

### 3.1 Archivos de GitHub

```text
indexgithubhtml.txt          → index.html
stylegithubcss.txt           → css/style.css
apigithubjs.txt              → js/api.js
appgithubjs.txt              → js/app.js
uigithubjs.txt               → js/ui.js
incidenciasgithubjs.txt      → js/incidencias.js
reportesgithubjs.txt         → js/reportes.js
notificacionesgithubjs.txt   → js/notificaciones.js
```

### 3.2 Archivos de Apps Script

```text
SEC2_Code.gs_COMPLETO_CORREGIDO.txt → Code.gs
indexscrip.txt                      → index.html opcional de Apps Script
```

### 3.3 Regla importante

No mezclar versiones anteriores con las nuevas.

La versión real para GitHub debe usar los archivos separados del segundo bloque corregido.

---

## 4. Diferencia entre index de GitHub e index de Apps Script

### 4.1 index.html de GitHub

Este es el que sí usa el usuario.

Contiene:

- Login.
- Pantalla principal.
- Botones de módulos.
- Formularios.
- Reportes.
- Historial.
- Consulta de fechas.
- Notificaciones.
- Carga de archivos JS separados.
- Carga del CSS.

Este archivo va en:

```text
GitHub → index.html
```

### 4.2 index.html de Apps Script

Este no es la app.

Solo puede mostrar una pantalla simple como:

```text
SEC2 API activa
Este proyecto funciona como backend para la app en GitHub.
```

Este archivo va en:

```text
Apps Script → index.html
```

No debe confundirse con el index real de GitHub.

---

## 5. Orden correcto de carga de scripts en GitHub

El `index.html` de GitHub debe cargar los scripts en este orden:

```html
<script src="js/api.js"></script>
<script src="js/ui.js"></script>
<script src="js/incidencias.js"></script>
<script src="js/reportes.js"></script>
<script src="js/notificaciones.js"></script>
<script src="js/app.js"></script>
```

### Motivo

- `api.js` define la comunicación con Apps Script.
- `ui.js` define utilidades visuales, navegación, roles y helpers.
- `incidencias.js` define perfil, historial, detalle, registro y edición.
- `reportes.js` define reportes y estadísticas.
- `notificaciones.js` define mensajes recibidos y enviados.
- `app.js` inicializa sesión, login, constantes, módulos y flujo general.

---

## 6. Roles oficiales del sistema

Los roles válidos son exactamente:

```text
Direccion
Prefectura
Docente
Correspondencia
```

### 6.1 Regla de escritura

Usar:

```text
Direccion
```

No usar:

```text
Dirección
```

Aunque visualmente pueda aparecer “Dirección”, internamente el sistema debe usar **Direccion sin acento**.

---

## 7. Regla principal de acceso por módulos

En la pantalla principal se muestran los cuatro módulos:

```text
Dirección
Correspondencia
Prefectura
Docente
```

Pero cada usuario solo puede entrar al módulo correspondiente a su rol.

### 7.1 Accesos permitidos

```text
Rol Direccion       → módulo Direccion
Rol Correspondencia → módulo Correspondencia
Rol Prefectura      → módulo Prefectura
Rol Docente         → módulo Docente
```

### 7.2 Accesos bloqueados

Un usuario con rol `Docente` no entra a `Direccion`, `Prefectura` ni `Correspondencia`.

Un usuario con rol `Prefectura` no entra a `Direccion`, `Docente` ni `Correspondencia`.

Un usuario con rol `Correspondencia` no entra a `Direccion`, `Prefectura` ni `Docente`.

Un usuario con rol `Direccion` no entra como otro módulo. Dirección tiene su propio módulo administrativo.

---

## 8. Identidad principal del usuario

La identidad principal del sistema es:

```text
IDAcceso
```

No es:

```text
ID
```

### 8.1 Columna A: ID

La columna `ID` sirve como sello interno o auditoría.

Ejemplos:

```text
RegistradoPor
EliminadoPor
EnviadoPor
LeidoPor
```

### 8.2 Columna H: IDAcceso

La columna `IDAcceso` sirve para identificar a la persona real que inicia sesión, consulta, recibe incidencias o recibe notificaciones.

Ejemplos:

```text
IDUsuario en Incidencias
IDUsuario en Notificaciones
idPersona en consultas
idAccesoSesion en API
```

---

## 9. Hoja Usuarios

La hoja `Usuarios` debe tener esta estructura:

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

### 9.1 Significado de columnas

| Columna | Campo | Uso |
|---|---|---|
| A | ID | Sello interno/auditoría |
| B | Nombre | Nombre visible |
| C | Apellidos | Apellidos visibles |
| D | Correo | Correo del usuario |
| E | Rol | Direccion, Prefectura, Docente o Correspondencia |
| F | Turno | A, M o V |
| G | Activo | TRUE/SI/ACTIVO según backend |
| H | IDAcceso | Identidad principal |
| I | Contrasena | Contraseña de acceso |

---

## 10. Turnos oficiales

Los turnos válidos son:

```text
A = Ambos
M = Matutino
V = Vespertino
```

En frontend se muestran como:

```js
const TURNOS_TEXTO = {
  "A": "Ambos",
  "M": "Matutino",
  "V": "Vespertino"
};
```

---

## 11. Sesión en frontend

Después del login correcto se guardan datos en `sessionStorage`.

### 11.1 Variables principales

```text
userID             → ID de auditoría, columna A
userIDAcceso       → IDAcceso real, columna H
userRol            → Rol exacto
userTurno          → Turno
userName           → Nombre visible
currentActiveModule → Módulo activo
```

### 11.2 Variable más importante

```text
sessionStorage.getItem("userIDAcceso")
```

Esa es la identidad principal del usuario.

---

## 12. Comunicación frontend/backend

El frontend llama al backend usando `fetch`.

La URL está definida en:

```text
js/api.js
```

Variable:

```js
const APPS_SCRIPT_URL = "URL_DEL_DESPLIEGUE_DE_APPS_SCRIPT";
```

---

## 13. Parámetros obligatorios enviados a Apps Script

Todas las llamadas después del login deben incluir:

```text
idAccesoSesion
rolSesion
modulo
```

Estos valores se inyectan automáticamente desde `api.js`.

No deben escribirse manualmente desde los demás archivos.

---

## 14. Login

El login usa:

```text
IDAcceso
Contrasena
```

Acción backend:

```text
iniciarSesion
```

El flujo esperado es:

```text
Usuario escribe IDAcceso y contraseña
↓
api.js llama iniciarSesion
↓
Code.gs valida contra hoja Usuarios
↓
Code.gs devuelve usuario válido
↓
app.js guarda sessionStorage
↓
se muestra splash
↓
se muestra pantalla principal
```

---

## 15. Funciones principales de api.js

El archivo `js/api.js` contiene el objeto:

```js
API
```

Con funciones como:

```text
iniciarSesion
obtenerUsuariosParaFormulario
obtenerResumenPersona
obtenerHistorialPersona
obtenerDetalleIncidencia
guardarUsosPermisoOficial
eliminarIncidencia
guardarIncidencia
obtenerReporteDia
obtenerReporteSemanal
consultarFechas
guardarNotificacion
obtenerNotificacionesUsuario
obtenerDetalleNotificacion
obtenerNotificacionesEnviadas
obtenerDetalleNotificacionEnviada
obtenerEstadisticaMensual
```

---

## 16. Incidencias

El sistema permite registrar distintos tipos de incidencia.

### 16.1 Tipos contemplados

```text
Permiso oficial
Incapacidad
Humanitario sindical
Humanitario oficial
Comisión sindical
Comisión oficial
Especial
```

### 16.2 Permiso oficial

El permiso oficial tiene estructura especial:

```text
FechaOficial1
FechaOficial2
FechaOficial3
Uso1Fecha
Uso2Fecha
Uso3Fecha
Uso1Estado
Uso2Estado
Uso3Estado
```

La fecha oficial representa la fecha autorizada.

La fecha de uso representa cuándo se utilizó.

### 16.3 Incidencias normales

Las demás incidencias usan:

```text
FechaInicio
FechaFin
```

Ejemplos:

```text
Incapacidad
Humanitario sindical
Humanitario oficial
Comisión sindical
Comisión oficial
Especial
```

---

## 17. Registro de incidencias

Solo Dirección puede registrar incidencias.

### 17.1 Validación frontend

`js/incidencias.js` valida que el rol sea:

```text
Direccion
```

### 17.2 Validación backend

`Code.gs` también debe validar que el usuario en sesión tenga permiso real.

La seguridad real siempre debe estar en Apps Script, no solo en el frontend.

---

## 18. Edición de permisos oficiales

Solo Dirección puede editar fechas de uso pendientes de un permiso oficial.

El flujo es:

```text
Abrir detalle de incidencia
↓
Si es Permiso oficial y puedeEditar = true
↓
Mostrar botón editar
↓
Cambiar Uso1Fecha / Uso2Fecha / Uso3Fecha si están pendientes
↓
Guardar cambios
```

---

## 19. Eliminación de incidencias

Solo Dirección puede eliminar incidencias.

La eliminación debe mover o registrar la incidencia en la hoja `Papelera`.

No debe desaparecer sin rastro.

La auditoría debe registrar:

```text
EliminadoPor
FechaEliminacion
```

---

## 20. Reporte del día

Roles permitidos:

```text
Direccion
Prefectura
```

El reporte muestra:

```text
presentes
ausentes
incidencias activas
fecha consultada
```

---

## 21. Reporte semanal

Roles permitidos:

```text
Direccion
Prefectura
```

El reporte muestra incidencias dentro de un rango semanal.

Puede usarse como vista operativa para Prefectura.

---

## 22. Consulta de fechas

Roles permitidos:

```text
Direccion
Correspondencia
```

Permite consultar incidencias entre:

```text
FechaInicio
FechaFin
```

Validaciones del frontend:

```text
no dejar fechas vacías
la fecha inicial no puede ser posterior a la fecha final
```

El backend también debe validar permisos y fechas.

---

## 23. Historial por persona

Roles permitidos:

```text
Direccion
Correspondencia
```

Además, cada usuario puede consultar su propio perfil.

La consulta debe hacerse por:

```text
IDAcceso
```

No por:

```text
ID
```

---

## 24. Mi perfil

Todos los roles pueden abrir `Mi perfil`.

Muestra:

```text
Nombre
Apellidos
Turno
IDAcceso
Última incidencia
Estadísticas rápidas
Historial completo
Próximas incidencias
Estadística mensual
```

---

## 25. Estadística mensual

La estadística mensual se consulta por:

```text
selectedPersonID
mes
anio
```

`selectedPersonID` debe contener `IDAcceso`.

La pantalla muestra:

```text
Persona
IDAcceso
Periodo
Total de incidencias
Tipo más frecuente
Gráfica mensual
```

---

## 26. Notificaciones

El sistema tiene:

```text
Notificaciones recibidas
Enviar notificación
Notificaciones enviadas
Detalle de notificación
Estado de lectura
```

---

## 27. Notificaciones recibidas

Todos los roles pueden consultar sus notificaciones recibidas.

Al abrir una notificación recibida, el backend debe marcarla como:

```text
Leída
```

y registrar:

```text
FechaLectura
LeidoPor
```

`LeidoPor` debe ser sello de auditoría del backend.

---

## 28. Enviar notificaciones

Solo Dirección puede enviar notificaciones.

El destinatario se selecciona por:

```text
IDAcceso
```

No por:

```text
ID
```

La notificación debe guardar:

```text
IDNotificacion
IDUsuario
Mensaje
Estado
FechaEnvio
EnviadoPor
FechaLectura
LeidoPor
```

---

## 29. Notificaciones enviadas

Solo Dirección puede consultar notificaciones enviadas.

Permite revisar:

```text
destinatario
mensaje
estado
fecha de envío
fecha de lectura
leído por
```

---

## 30. Estados de notificación

Estados esperados:

```text
No leída
Leída
```

El frontend también reconoce:

```text
No leida
Leida
```

y normaliza visualmente.

---

## 31. Hojas esperadas en Google Sheets

El libro de Google Sheets debe contener:

```text
Usuarios
Incidencias
Papelera
Configuracion
Notificaciones
```

---

## 32. Hoja Incidencias

Debe contener los campos necesarios para:

```text
IDIncidencia
IDUsuario
TipoIncidencia
FechaInicio
FechaFin
FechaOficial1
FechaOficial2
FechaOficial3
Uso1Fecha
Uso1Estado
Uso2Fecha
Uso2Estado
Uso3Fecha
Uso3Estado
LicenciaMedica
Observaciones
Estado
RegistradoPor
FechaRegistro
```

La columna `IDUsuario` debe guardar el `IDAcceso` de la persona afectada.

---

## 33. Hoja Notificaciones

Debe contener campos equivalentes a:

```text
IDNotificacion
IDUsuario
Mensaje
Estado
FechaEnvio
EnviadoPor
FechaLectura
LeidoPor
```

`IDUsuario` debe ser `IDAcceso`.

`EnviadoPor` y `LeidoPor` deben ser sellos de auditoría.

---

## 34. Hoja Papelera

Debe servir para conservar incidencias eliminadas.

Debe guardar:

```text
datos originales de la incidencia
EliminadoPor
FechaEliminacion
Motivo si se agrega después
```

---

## 35. Seguridad

La seguridad real debe estar en `Code.gs`.

El frontend bloquea pantallas para experiencia de usuario, pero no debe considerarse seguridad absoluta.

El backend debe validar:

```text
usuario activo
IDAcceso existente
rol correcto
módulo correcto
permiso para la acción solicitada
```

---

## 36. Validaciones críticas en backend

Apps Script debe validar:

```text
idAccesoSesion
rolSesion
modulo
```

Y confirmar que:

```text
idAccesoSesion existe en Usuarios
usuario está activo
rolSesion coincide con el rol real del usuario
modulo coincide con rol o permiso permitido
acción está permitida para ese rol
```

---

## 37. Reglas de permisos por rol

### 37.1 Dirección

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

### 37.2 Correspondencia

Puede:

```text
ver perfil propio
consultar fechas
consultar historial
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

### 37.3 Prefectura

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
consultar historial general si backend no lo permite
enviar notificaciones
```

### 37.4 Docente

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

## 38. Despliegue de Apps Script

Pasos generales:

1. Abrir Google Apps Script.
2. Pegar el contenido corregido en `Code.gs`.
3. Si se desea, crear `index.html` con el contenido mínimo de `indexscrip.txt`.
4. Guardar.
5. Implementar como aplicación web.
6. Ejecutar como propietario.
7. Permitir acceso según necesidad del proyecto.
8. Copiar la URL del despliegue.
9. Pegar esa URL en `APPS_SCRIPT_URL` dentro de `js/api.js`.

---

## 39. Despliegue de GitHub Pages

Pasos generales:

1. Subir archivos corregidos al repositorio.
2. Verificar estructura:

```text
index.html
css/style.css
js/api.js
js/ui.js
js/incidencias.js
js/reportes.js
js/notificaciones.js
js/app.js
logoPng.png
README.md
```

3. Activar GitHub Pages desde configuración del repositorio.
4. Seleccionar rama principal.
5. Abrir la URL pública de GitHub Pages.
6. Probar login.

---

## 40. Prueba mínima recomendada

Antes de usarlo en escuela, probar con usuarios ficticios.

### 40.1 Usuarios sugeridos

```text
Direccion       → D001
Correspondencia → C001
Prefectura      → P001
Docente         → M001
```

### 40.2 Pruebas de login

Probar:

```text
D001 entra solo a Dirección
C001 entra solo a Correspondencia
P001 entra solo a Prefectura
M001 entra solo a Docente
```

Cada uno debe ver los 4 botones, pero solo debe abrir su propio módulo.

---

## 41. Prueba de incidencias

Con Dirección:

```text
iniciar sesión
abrir Dirección
otorgar incidencia
seleccionar docente
guardar incidencia normal
abrir detalle
verificar IDAcceso del docente
verificar sello de RegistradoPor en backend
```

---

## 42. Prueba de permiso oficial

Con Dirección:

```text
otorgar Permiso oficial
poner FechaOficial1
dejar usos pendientes
guardar
abrir detalle
editar usos pendientes
guardar cambios
verificar detalle
```

---

## 43. Prueba de reportes

Con Dirección o Prefectura:

```text
abrir reporte del día
abrir reporte semanal
verificar presentes
verificar ausentes
verificar lista de incidencias
```

---

## 44. Prueba de consulta de fechas

Con Dirección o Correspondencia:

```text
abrir consulta de fechas
poner fecha inicial
poner fecha final
consultar
ver resultados
probar rango invertido
probar fechas vacías
```

---

## 45. Prueba de notificaciones

Con Dirección:

```text
abrir notificaciones
enviar notificación a un docente
ver enviadas
ver estado No leída
```

Con Docente:

```text
entrar a módulo Docente
abrir notificaciones
abrir detalle de notificación
```

Después:

```text
volver con Dirección
ver notificaciones enviadas
confirmar que aparece Leída
confirmar FechaLectura
confirmar LeidoPor
```

---

## 46. Errores que ya se corrigieron

Se corrigieron problemas como:

```text
Dirección con acento usado internamente
uso de userTest
uso de ID en lugar de IDAcceso
detalle de notificación enviada con variable NotifId inexistente
pantallas faltantes de notificaciones
pantalla faltante de estadística mensual
cierre incorrecto </htm
mezcla entre index de Apps Script e index de GitHub
orden incorrecto de carga de scripts
```

---

## 47. Errores que no deben regresar

No volver a usar:

```text
userTest
TEST_USERS como identidad real
usuario.ID para seleccionar persona
Dirección como clave interna de módulo
HtmlService como interfaz principal si se usa GitHub
index de Apps Script como app real
```

---

## 48. Palabras clave internas correctas

Usar:

```text
Direccion
Correspondencia
Prefectura
Docente
IDAcceso
idAccesoSesion
rolSesion
modulo
currentActiveModule
userIDAcceso
```

Evitar:

```text
Dirección como clave interna
userTest
ID como persona principal
```

---

## 49. Sobre contraseñas

En esta versión las contraseñas viven en Google Sheets.

Para uso real, se recomienda:

```text
usar contraseñas no obvias
no publicar la hoja
no publicar Code.gs si contiene SPREADSHEET_ID
limitar permisos de edición del Sheet
usar IDs de acceso internos
```

---

## 50. Sobre repositorio público

Si el repositorio de GitHub es público, debe evitarse subir:

```text
SPREADSHEET_ID
datos reales de usuarios
contraseñas
capturas con datos sensibles
Code.gs si contiene información privada
```

El frontend necesita la URL pública del despliegue de Apps Script, pero la seguridad debe estar en backend.

---

## 51. Comprobación rápida después de subir cambios

Después de subir archivos, abrir consola del navegador y revisar:

```text
sin errores 404 en css/js
sin errores de funciones no definidas
sin errores CORS
login responde JSON válido
los botones abren solo el módulo correcto
```

---

## 52. Si aparece error de comunicación

Revisar:

```text
APPS_SCRIPT_URL correcta
Apps Script desplegado como web app
permisos de ejecución correctos
Code.gs guardado
nueva versión desplegada
respuesta JSON válida
```

---

## 53. Si login falla

Revisar en hoja Usuarios:

```text
IDAcceso correcto
Contrasena correcta
Rol escrito exactamente
Activo correcto
sin espacios extra
```

Roles válidos:

```text
Direccion
Correspondencia
Prefectura
Docente
```

---

## 54. Si un usuario no puede entrar a su módulo

Revisar:

```text
sessionStorage userRol
sessionStorage currentActiveModule
Rol en hoja Usuarios
openModule recibe Direccion sin acento
```

---

## 55. Si no aparecen docentes en formularios

Revisar backend:

```text
obtenerUsuariosParaFormulario
que devuelva IDAcceso
que devuelva Nombre
que devuelva Apellidos
que devuelva Rol
que devuelva Turno
```

Frontend espera:

```text
usuario.IDAcceso
usuario.Nombre
usuario.Apellidos
usuario.Rol
usuario.Turno
```

---

## 56. Si no se marca Leída una notificación

Revisar en backend:

```text
obtenerDetalleNotificacion
debe actualizar Estado
debe guardar FechaLectura
debe guardar LeidoPor
```

El frontend solo abre el detalle.

La acción real de marcar leído debe hacerla `Code.gs`.

---

## 57. Si las fechas se ven mal

Revisar:

```text
formatearFecha
formatearFechaParaInput
fechas devueltas por Apps Script
zona horaria del proyecto Apps Script
zona horaria del Google Sheet
```

---

## 58. Regla de oro para cambios futuros

Cuando se modifique algo:

1. No tocar todo al mismo tiempo.
2. Cambiar un archivo.
3. Probar login.
4. Probar módulo.
5. Probar acción modificada.
6. Si falla, revisar consola y Apps Script logs.
7. No mezclar versiones anteriores.

---

## 59. Estado final del proyecto

Estado técnico actual:

```text
Backend Code.gs corregido
Frontend GitHub separado corregido
Roles normalizados
IDAcceso definido como identidad principal
Módulos bloqueados por rol
Notificaciones con lectura automática vía backend
Reportes separados
Incidencias separadas
UI separada
CSS completo
README documentado
```

---

## 60. Resumen corto para mantenimiento

```text
La app visible vive en GitHub.
La API vive en Apps Script.
Los datos viven en Google Sheets.
La identidad real es IDAcceso.
El ID de columna A es auditoría.
Los roles son Direccion, Correspondencia, Prefectura y Docente.
No usar userTest.
No usar Dirección con acento como clave interna.
No mezclar index de GitHub con index de Apps Script.
```

---

## 61. Checklist final de archivos

### GitHub

```text
[ ] index.html actualizado con indexgithubhtml.txt
[ ] css/style.css actualizado con stylegithubcss.txt
[ ] js/api.js actualizado con apigithubjs.txt
[ ] js/app.js actualizado con appgithubjs.txt
[ ] js/ui.js actualizado con uigithubjs.txt
[ ] js/incidencias.js actualizado con incidenciasgithubjs.txt
[ ] js/reportes.js actualizado con reportesgithubjs.txt
[ ] js/notificaciones.js actualizado con notificacionesgithubjs.txt
[ ] logoPng.png presente
[ ] README.md actualizado
```

### Apps Script

```text
[ ] Code.gs actualizado con SEC2_Code.gs_COMPLETO_CORREGIDO.txt
[ ] index.html opcional actualizado con indexscrip.txt
[ ] Web app desplegada
[ ] URL pegada en js/api.js
```

### Google Sheets

```text
[ ] Hoja Usuarios existe
[ ] Hoja Incidencias existe
[ ] Hoja Papelera existe
[ ] Hoja Configuracion existe
[ ] Hoja Notificaciones existe
[ ] Usuarios tienen IDAcceso
[ ] Usuarios tienen Rol exacto
[ ] Usuarios tienen Contrasena
[ ] Usuarios están Activos
```

---

## 62. Nota final

Este README describe la versión GitHub + Apps Script del sistema.

Si en el futuro se decide hacer una versión completamente dentro de Apps Script, esa sería una arquitectura diferente y requeriría un `index.html` autocontenido con CSS y JS embebidos.

La versión principal actual es:

```text
GitHub frontend
+
Apps Script backend
+
Google Sheets database
```

---

# APÉNDICE A — Mapa exacto de archivos entregados, ubicación real y uso

Este apéndice sirve como referencia directa para no confundir los archivos TXT de respaldo con los archivos reales de producción.

Los archivos TXT entregados quedan como **respaldo intacto**. Para usar el sistema, se copia el contenido de cada TXT y se pega en el archivo real indicado.

---

## A.1 Regla general

```text
Los archivos .txt entregados NO van con ese nombre dentro del proyecto real.

Los .txt son respaldo y referencia.

El contenido de cada .txt se copia y se pega en su destino real:
- GitHub
- Google Apps Script
```

Ejemplo:

```text
apigithubjs.txt
```

no se sube como `apigithubjs.txt`.

Su contenido se pega en:

```text
GitHub → js/api.js
```

---

## A.2 Archivos definitivos para GitHub

Estos archivos forman la app visual real.

| TXT entregado como respaldo | Archivo real donde debe pegarse | Ubicación real |
|---|---|---|
| `indexgithubhtml.txt` | `index.html` | raíz del repositorio GitHub |
| `stylegithubcss.txt` | `style.css` | `css/style.css` |
| `apigithubjs.txt` | `api.js` | `js/api.js` |
| `appgithubjs.txt` | `app.js` | `js/app.js` |
| `uigithubjs.txt` | `ui.js` | `js/ui.js` |
| `incidenciasgithubjs.txt` | `incidencias.js` | `js/incidencias.js` |
| `reportesgithubjs.txt` | `reportes.js` | `js/reportes.js` |
| `notificacionesgithubjs.txt` | `notificaciones.js` | `js/notificaciones.js` |
| `readmigithubmd.txt` | `README.md` | raíz del repositorio GitHub |

---

## A.3 Estructura final esperada en GitHub

Después de copiar el contenido de cada TXT a su archivo real, el repositorio debe quedar así:

```text
sec2-app/
├── index.html
├── README.md
├── logoPng.png
├── css/
│   └── style.css
└── js/
    ├── api.js
    ├── app.js
    ├── ui.js
    ├── incidencias.js
    ├── reportes.js
    └── notificaciones.js
```

---

## A.4 Archivos definitivos para Google Apps Script

Estos archivos forman el backend/API.

| TXT entregado como respaldo | Archivo real donde debe pegarse | Ubicación real |
|---|---|---|
| `SEC2_Code.gs_COMPLETO_CORREGIDO.txt` | `Code.gs` | Google Apps Script |
| `indexscrip.txt` | `index.html` | Google Apps Script, opcional |

---

## A.5 Estructura final esperada en Google Apps Script

```text
Proyecto Apps Script/
├── Code.gs
└── index.html
```

### Importante

El archivo principal en Apps Script es:

```text
Code.gs
```

El archivo:

```text
index.html
```

en Apps Script es opcional y solo sirve como pantalla mínima de referencia.

La app visual real vive en GitHub, no en Apps Script.

---

## A.6 Tabla completa de respaldo y destino

| Orden | TXT de respaldo entregado | Destino real | Plataforma | Obligatorio |
|---:|---|---|---|---|
| 1 | `SEC2_Code.gs_COMPLETO_CORREGIDO.txt` | `Code.gs` | Apps Script | Sí |
| 2 | `indexscrip.txt` | `index.html` | Apps Script | Opcional |
| 3 | `indexgithubhtml.txt` | `index.html` | GitHub | Sí |
| 4 | `stylegithubcss.txt` | `css/style.css` | GitHub | Sí |
| 5 | `apigithubjs.txt` | `js/api.js` | GitHub | Sí |
| 6 | `appgithubjs.txt` | `js/app.js` | GitHub | Sí |
| 7 | `uigithubjs.txt` | `js/ui.js` | GitHub | Sí |
| 8 | `incidenciasgithubjs.txt` | `js/incidencias.js` | GitHub | Sí |
| 9 | `reportesgithubjs.txt` | `js/reportes.js` | GitHub | Sí |
| 10 | `notificacionesgithubjs.txt` | `js/notificaciones.js` | GitHub | Sí |
| 11 | `readmigithubmd.txt` | `README.md` | GitHub | Recomendado |

---

## A.7 Archivos anteriores que NO deben usarse para producción GitHub

Estos archivos fueron útiles durante la revisión, pero no son la versión final para la arquitectura GitHub con archivos separados:

```text
SEC2_api.js_COMPLETO_CORREGIDO.txt
SEC2_app.js_COMPLETO_CORREGIDO.txt
SEC2_index.html_COMPLETO_CORREGIDO.txt
```

### Motivo

Esos archivos pertenecen al primer bloque de corrección y no son la versión final separada del repositorio GitHub.

Para producción GitHub deben usarse:

```text
apigithubjs.txt
appgithubjs.txt
indexgithubhtml.txt
```

---

## A.8 Regla para no mezclar versiones

Usar esta combinación:

```text
Apps Script:
SEC2_Code.gs_COMPLETO_CORREGIDO.txt → Code.gs

GitHub:
indexgithubhtml.txt        → index.html
stylegithubcss.txt         → css/style.css
apigithubjs.txt            → js/api.js
appgithubjs.txt            → js/app.js
uigithubjs.txt             → js/ui.js
incidenciasgithubjs.txt    → js/incidencias.js
reportesgithubjs.txt       → js/reportes.js
notificacionesgithubjs.txt → js/notificaciones.js
readmigithubmd.txt         → README.md
```

No mezclar con:

```text
SEC2_api.js_COMPLETO_CORREGIDO.txt
SEC2_app.js_COMPLETO_CORREGIDO.txt
SEC2_index.html_COMPLETO_CORREGIDO.txt
```

---

## A.9 Qué archivo se edita si hay cambios futuros

| Necesidad futura | Archivo a editar |
|---|---|
| Cambiar URL de Apps Script | `js/api.js` |
| Cambiar login, sesión o módulos | `js/app.js` |
| Cambiar navegación, formato, bloqueo visual o helpers | `js/ui.js` |
| Cambiar registro, historial, perfil o detalle de incidencias | `js/incidencias.js` |
| Cambiar reportes, consulta de fechas o estadística mensual | `js/reportes.js` |
| Cambiar notificaciones recibidas/enviadas | `js/notificaciones.js` |
| Cambiar diseño visual | `css/style.css` |
| Cambiar estructura de pantallas | `index.html` de GitHub |
| Cambiar permisos reales, lectura/escritura o datos | `Code.gs` |
| Cambiar documentación | `README.md` |

---

## A.10 Checklist de copiado final

Antes de probar la app real, confirmar:

```text
[ ] Copié SEC2_Code.gs_COMPLETO_CORREGIDO.txt en Apps Script → Code.gs
[ ] Copié indexscrip.txt en Apps Script → index.html, si decidí dejar pantalla mínima
[ ] Copié indexgithubhtml.txt en GitHub → index.html
[ ] Copié stylegithubcss.txt en GitHub → css/style.css
[ ] Copié apigithubjs.txt en GitHub → js/api.js
[ ] Copié appgithubjs.txt en GitHub → js/app.js
[ ] Copié uigithubjs.txt en GitHub → js/ui.js
[ ] Copié incidenciasgithubjs.txt en GitHub → js/incidencias.js
[ ] Copié reportesgithubjs.txt en GitHub → js/reportes.js
[ ] Copié notificacionesgithubjs.txt en GitHub → js/notificaciones.js
[ ] Copié readmigithubmd.txt en GitHub → README.md
[ ] Verifiqué que logoPng.png exista en la raíz del repositorio
[ ] Verifiqué que APPS_SCRIPT_URL en js/api.js sea la URL vigente del despliegue Apps Script
[ ] Guardé Apps Script
[ ] Desplegué una nueva versión de Apps Script
[ ] Publiqué cambios en GitHub
[ ] Abrí GitHub Pages y probé login
```

---

## A.11 Resumen mínimo del mapa final

```text
GOOGLE APPS SCRIPT
└── Code.gs                    ← contenido de SEC2_Code.gs_COMPLETO_CORREGIDO.txt
└── index.html opcional         ← contenido de indexscrip.txt

GITHUB
├── index.html                  ← contenido de indexgithubhtml.txt
├── README.md                   ← contenido de readmigithubmd.txt
├── logoPng.png
├── css/
│   └── style.css               ← contenido de stylegithubcss.txt
└── js/
    ├── api.js                  ← contenido de apigithubjs.txt
    ├── app.js                  ← contenido de appgithubjs.txt
    ├── ui.js                   ← contenido de uigithubjs.txt
    ├── incidencias.js          ← contenido de incidenciasgithubjs.txt
    ├── reportes.js             ← contenido de reportesgithubjs.txt
    └── notificaciones.js       ← contenido de notificacionesgithubjs.txt
```

---

## A.12 Nota de respaldo

Los archivos TXT entregados quedan como respaldo histórico y referencia.

No es necesario cambiarles el nombre.

No es necesario subirlos al repositorio.

Lo recomendable es conservarlos en una carpeta local de respaldo, por ejemplo:

```text
SEC2_RESPALDOS_TXT/
├── SEC2_Code.gs_COMPLETO_CORREGIDO.txt
├── indexscrip.txt
├── indexgithubhtml.txt
├── stylegithubcss.txt
├── apigithubjs.txt
├── appgithubjs.txt
├── uigithubjs.txt
├── incidenciasgithubjs.txt
├── reportesgithubjs.txt
├── notificacionesgithubjs.txt
└── readmigithubmd.txt
```

La versión de producción se arma copiando el contenido de esos TXT a los archivos reales descritos en este apéndice.
