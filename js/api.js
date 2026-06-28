const APPS_SCRIPT_URL = "https://script.google.com/macros/s/1PRCQTBovAxVh9NmdNILL8QQbkErZ_TP-uFUVkkd6lRk/exec";

// Funciones auxiliares para simplificar y sanitizar las peticiones HTTP
function getRequest(paramsObj, onSuccess, onFailure) {
  const params = new URLSearchParams(paramsObj);
  fetch(`${APPS_SCRIPT_URL}?${params.toString()}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        onSuccess(data.data);
      } else {
        onFailure(data.error || "Error en el servidor");
      }
    })
    .catch(error => {
      console.error("API GET Error:", error);
      onFailure(error);
    });
}

function postRequest(payload, onSuccess, onFailure) {
  // Se envía sin cabecera Content-Type de tipo application/json
  // para evitar la solicitud de pre-vuelo CORS OPTIONS no soportada por Apps Script
  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        onSuccess(data.data);
      } else {
        onFailure(data.error || "Error en el servidor");
      }
    })
    .catch(error => {
      console.error("API POST Error:", error);
      onFailure(error);
    });
}

const API = {
  obtenerUsuariosParaFormulario: function(onSuccess, onFailure) {
    getRequest({ action: "obtenerUsuariosParaFormulario" }, onSuccess, onFailure);
  },

  obtenerResumenPersona: function(idPersona, onSuccess, onFailure) {
    getRequest({
      action: "obtenerResumenPersona",
      idPersona: idPersona,
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  obtenerHistorialPersona: function(idPersona, filtro, onSuccess, onFailure) {
    getRequest({
      action: "obtenerHistorialPersona",
      idPersona: idPersona,
      modulo: currentModule,
      userTest: TEST_USERS[currentModule],
      filtro: filtro
    }, onSuccess, onFailure);
  },

  obtenerDetalleIncidencia: function(idIncidencia, onSuccess, onFailure) {
    getRequest({
      action: "obtenerDetalleIncidencia",
      idIncidencia: idIncidencia,
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  guardarUsosPermisoOficial: function(idIncidencia, datos, onSuccess, onFailure) {
    postRequest({
      action: "guardarUsosPermisoOficial",
      idIncidencia: idIncidencia,
      datos: datos,
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  eliminarIncidencia: function(idIncidencia, onSuccess, onFailure) {
    postRequest({
      action: "eliminarIncidencia",
      idIncidencia: idIncidencia,
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  guardarIncidencia: function(datos, onSuccess, onFailure) {
    postRequest({
      action: "guardarIncidencia",
      datos: datos,
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  obtenerReporteDia: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerReporteDia",
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  obtenerReporteSemanal: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerReporteSemanal",
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  consultarFechas: function(rango, onSuccess, onFailure) {
    getRequest({
      action: "consultarFechas",
      rango: JSON.stringify(rango),
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  guardarNotificacion: function(datos, onSuccess, onFailure) {
    postRequest({
      action: "guardarNotificacion",
      datos: datos,
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  obtenerNotificacionesUsuario: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerNotificacionesUsuario",
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  obtenerDetalleNotificacion: function(idNotificacion, onSuccess, onFailure) {
    getRequest({
      action: "obtenerDetalleNotificacion",
      idNotificacion: idNotificacion,
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  obtenerNotificacionesEnviadas: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerNotificacionesEnviadas",
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  obtenerDetalleNotificacionEnviada: function(idNotificacion, onSuccess, onFailure) {
    getRequest({
      action: "obtenerDetalleNotificacionEnviada",
      idNotificacion: idNotificacion,
      modulo: currentModule,
      userTest: TEST_USERS[currentModule]
    }, onSuccess, onFailure);
  },

  obtenerEstadisticaMensual: function(idPersona, mes, anio, onSuccess, onFailure) {
    getRequest({
      action: "obtenerEstadisticaMensual",
      idPersona: idPersona,
      modulo: currentModule,
      userTest: TEST_USERS[currentModule],
      mes: mes,
      anio: anio
    }, onSuccess, onFailure);
  }
};
