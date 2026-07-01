const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDNzq42FPP83uuNxNGCCCqzT9iLp199zvBoH9N5FKpCeYJ1-66A6LAFagXd_Eibk6P/exec";

// Función maestra purificada: Inyecta el IDAcceso real desde sessionStorage
function getRequest(paramsObj, onSuccess, onFailure) {
  const params = new URLSearchParams(paramsObj);
  // Inyección única de identidad real
  params.append("idAccesoSesion", sessionStorage.getItem("userIDAcceso"));
  params.append("modulo", sessionStorage.getItem("currentActiveModule"));
  
  fetch(`${APPS_SCRIPT_URL}?${params.toString()}`)
    .then(r => r.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        if (data.success) onSuccess(data.data);
        else onFailure(data.error);
      } catch (e) { onFailure("Error de comunicación con el servidor."); }
    })
    .catch(e => onFailure("Error de red: " + e.message));
}

function postRequest(payload, onSuccess, onFailure) {
  // Inyección única de identidad real en el cuerpo del POST
  const finalPayload = {
    ...payload,
    userTest: sessionStorage.getItem("userIDAcceso"),
    modulo: sessionStorage.getItem("currentActiveModule")
  };

  fetch(APPS_SCRIPT_URL, { method: "POST", body: JSON.stringify(finalPayload) })
    .then(r => r.text())
    .then(text => {
      try {
        const data = JSON.parse(text);
        if (data.success) onSuccess(data.data);
        else onFailure(data.error);
      } catch (e) { onFailure("Error de comunicación."); }
    })
    .catch(e => onFailure("Error de red."));
}

const API = {
  iniciarSesion: (id, pass, onSuccess, onFailure) => 
    postRequest({ action: "iniciarSesion", datos: { IDAcceso: id, Contrasena: pass } }, onSuccess, onFailure),

  obtenerUsuariosParaFormulario: (onSuccess, onFailure) => 
    getRequest({ action: "obtenerUsuariosParaFormulario" }, onSuccess, onFailure),

  obtenerResumenPersona: (idPersona, onSuccess, onFailure) => 
    getRequest({ action: "obtenerResumenPersona", idPersona }, onSuccess, onFailure),

  obtenerHistorialPersona: (idPersona, filtro, onSuccess, onFailure) => 
    getRequest({ action: "obtenerHistorialPersona", idPersona, filtro }, onSuccess, onFailure),

  obtenerDetalleIncidencia: (idIncidencia, onSuccess, onFailure) => 
    getRequest({ action: "obtenerDetalleIncidencia", idIncidencia }, onSuccess, onFailure),

  guardarUsosPermisoOficial: (idIncidencia, datos, onSuccess, onFailure) => 
    postRequest({ action: "guardarUsosPermisoOficial", idIncidencia, datos }, onSuccess, onFailure),

  eliminarIncidencia: (idIncidencia, onSuccess, onFailure) => 
    postRequest({ action: "eliminarIncidencia", idIncidencia }, onSuccess, onFailure),

  guardarIncidencia: (datos, onSuccess, onFailure) => 
    postRequest({ action: "guardarIncidencia", datos }, onSuccess, onFailure),

  obtenerReporteDia: (onSuccess, onFailure) => 
    getRequest({ action: "obtenerReporteDia" }, onSuccess, onFailure),

  obtenerReporteSemanal: (onSuccess, onFailure) => 
    getRequest({ action: "obtenerReporteSemanal" }, onSuccess, onFailure),

  consultarFechas: (rango, onSuccess, onFailure) => 
    getRequest({ action: "consultarFechas", rango: JSON.stringify(rango) }, onSuccess, onFailure),

  guardarNotificacion: (datos, onSuccess, onFailure) => 
    postRequest({ action: "guardarNotificacion", datos }, onSuccess, onFailure),

  obtenerNotificacionesUsuario: (onSuccess, onFailure) => 
    getRequest({ action: "obtenerNotificacionesUsuario" }, onSuccess, onFailure),

  obtenerDetalleNotificacion: (idNotificacion, onSuccess, onFailure) => 
    getRequest({ action: "obtenerDetalleNotificacion", idNotificacion }, onSuccess, onFailure),

  obtenerNotificacionesEnviadas: (onSuccess, onFailure) => 
    getRequest({ action: "obtenerNotificacionesEnviadas" }, onSuccess, onFailure),

  obtenerEstadisticaMensual: (idPersona, mes, anio, onSuccess, onFailure) => 
    getRequest({ action: "obtenerEstadisticaMensual", idPersona, mes, anio }, onSuccess, onFailure)
};
