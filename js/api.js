const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDNzq42FPP83uuNxNGCCCqzT9iLp199zvBoH9N5FKpCeYJ1-66A6LAFagXd_Eibk6P/exec";

function getRequest(paramsObj, onSuccess, onFailure) {
  const params = new URLSearchParams(paramsObj);
  
  fetch(`${APPS_SCRIPT_URL}?${params.toString()}`)
    .then(function(response) {
      if (!response.ok) throw new Error("Error HTTP de red: " + response.status);
      return response.text();
    })
    .then(function(text) {
      try {
        const data = JSON.parse(text);
        if (data.success) onSuccess(data.data);
        else onFailure(data.error || "Error reportado por el servidor");
      } catch (err) {
        if (text.includes("<!DOCTYPE html>") || text.includes("<html")) {
          onFailure(
            "Configuración Incorrecta de Apps Script:\n" +
            "El servidor devolvió una página HTML de Google en lugar de datos JSON.\n\n" +
            "Asegúrate de haber configurado en Google Apps Script al implementar:\n" +
            "1. Ejecutar como: 'Yo' (Tu cuenta de Google)\n" +
            "2. Quién tiene acceso: 'Cualquiera' (Anyone)"
          );
        } else {
          onFailure("Error interpretando respuesta del servidor: " + err.message);
        }
      }
    })
    .catch(function(error) {
      console.error("GET Fetch Error:", error);
      onFailure("No se pudo conectar con el servidor. Verifica tu conexión de red o la URL de la Web App.");
    });
}

function postRequest(payload, onSuccess, onFailure) {
  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  })
    .then(function(response) {
      if (!response.ok) throw new Error("Error HTTP de red: " + response.status);
      return response.text();
    })
    .then(function(text) {
      try {
        const data = JSON.parse(text);
        if (data.success) onSuccess(data.data);
        else onFailure(data.error || "Error de servidor al guardar");
      } catch (err) {
        if (text.includes("<!DOCTYPE html>") || text.includes("<html")) {
          onFailure("Error de permisos en Apps Script: Asegúrate de haber desplegado con acceso a 'Cualquiera' (Anyone).");
        } else {
          onFailure("Error procesando confirmación de escritura: " + err.message);
        }
      }
    })
    .catch(function(error) {
      console.error("POST Fetch Error:", error);
      onFailure("Error de conexión de red al intentar guardar datos.");
    });
}

const API = {
  iniciarSesion: function(idAcceso, contrasena, onSuccess, onFailure) {
    postRequest({
      action: "iniciarSesion",
      datos: { IDAcceso: idAcceso, Contrasena: contrasena }
    }, onSuccess, onFailure);
  },

  obtenerUsuariosParaFormulario: function(onSuccess, onFailure) {
    getRequest({ action: "obtenerUsuariosParaFormulario" }, onSuccess, onFailure);
  },

  obtenerResumenPersona: function(idPersona, onSuccess, onFailure) {
    getRequest({
      action: "obtenerResumenPersona", idPersona: idPersona,
      modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  obtenerHistorialPersona: function(idPersona, filtro, onSuccess, onFailure) {
    getRequest({
      action: "obtenerHistorialPersona", idPersona: idPersona,
      modulo: currentModule, userTest: obtenerIdSesionSegura(), filtro: filtro
    }, onSuccess, onFailure);
  },

  obtenerDetalleIncidencia: function(idIncidencia, onSuccess, onFailure) {
    getRequest({
      action: "obtenerDetalleIncidencia", idIncidencia: idIncidencia,
      modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  guardarUsosPermisoOficial: function(idIncidencia, datos, onSuccess, onFailure) {
    postRequest({
      action: "guardarUsosPermisoOficial", idIncidencia: idIncidencia,
      datos: datos, modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  eliminarIncidencia: function(idIncidencia, onSuccess, onFailure) {
    postRequest({
      action: "eliminarIncidencia", idIncidencia: idIncidencia,
      modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  guardarIncidencia: function(datos, onSuccess, onFailure) {
    postRequest({
      action: "guardarIncidencia", datos: datos,
      modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  obtenerReporteDia: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerReporteDia", modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  obtenerReporteSemanal: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerReporteSemanal", modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  consultarFechas: function(rango, onSuccess, onFailure) {
    getRequest({
      action: "consultarFechas", rango: JSON.stringify(rango),
      modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  guardarNotificacion: function(datos, onSuccess, onFailure) {
    postRequest({
      action: "guardarNotificacion", datos: datos,
      modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  obtenerNotificacionesUsuario: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerNotificacionesUsuario", modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  obtenerDetalleNotificacion: function(idNotificacion, onSuccess, onFailure) {
    getRequest({
      action: "obtenerDetalleNotificacion", idNotificacion: idNotificacion,
      modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  obtenerNotificacionesEnviadas: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerNotificacionesEnviadas", modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  obtenerDetalleNotificacionEnviada: function(idNotificacion, onSuccess, onFailure) {
    getRequest({
      action: "obtenerDetalleNotificacionEnviada", idNotificacion: idNotificacion,
      modulo: currentModule, userTest: obtenerIdSesionSegura()
    }, onSuccess, onFailure);
  },

  obtenerEstadisticaMensual: function(idPersona, mes, anio, onSuccess, onFailure) {
    getRequest({
      action: "obtenerEstadisticaMensual", idPersona: idPersona,
      modulo: currentModule, userTest: obtenerIdSesionSegura(), mes: mes, anio: anio
    }, onSuccess, onFailure);
  }
};
