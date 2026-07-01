const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDNzq42FPP83uuNxNGCCCqzT9iLp199zvBoH9N5FKpCeYJ1-66A6LAFagXd_Eibk6P/exec";

const API_ROLES_VALIDOS = {
  DIRECCION: "Direccion",
  PREFECTURA: "Prefectura",
  DOCENTE: "Docente",
  CORRESPONDENCIA: "Correspondencia"
};

const API_TIMEOUT_MS = 45000;

function apiNormalizarTexto(valor) {
  return valor === null || valor === undefined ? "" : String(valor).trim();
}

function apiQuitarAcentos(texto) {
  return apiNormalizarTexto(texto).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function apiCanonicalizarRol(valor) {
  const texto = apiQuitarAcentos(valor).toLowerCase();

  if (texto === "direccion" || texto === "dir") return API_ROLES_VALIDOS.DIRECCION;
  if (texto === "prefectura" || texto === "pre") return API_ROLES_VALIDOS.PREFECTURA;
  if (texto === "docente" || texto === "doc") return API_ROLES_VALIDOS.DOCENTE;
  if (texto === "correspondencia" || texto === "cor") return API_ROLES_VALIDOS.CORRESPONDENCIA;

  return apiNormalizarTexto(valor);
}

function apiEsRolValido(rol) {
  const rolCanon = apiCanonicalizarRol(rol);

  return rolCanon === API_ROLES_VALIDOS.DIRECCION ||
         rolCanon === API_ROLES_VALIDOS.PREFECTURA ||
         rolCanon === API_ROLES_VALIDOS.DOCENTE ||
         rolCanon === API_ROLES_VALIDOS.CORRESPONDENCIA;
}

function apiObtenerIDAccesoSesion() {
  return apiNormalizarTexto(sessionStorage.getItem("userIDAcceso"));
}

function apiObtenerRolSesion() {
  return apiCanonicalizarRol(sessionStorage.getItem("userRol"));
}

function apiObtenerModuloSesion() {
  const moduloGuardado = apiCanonicalizarRol(sessionStorage.getItem("currentActiveModule"));
  const rolSesion = apiObtenerRolSesion();

  if (apiEsRolValido(moduloGuardado)) {
    return moduloGuardado;
  }

  if (apiEsRolValido(rolSesion)) {
    return rolSesion;
  }

  return "";
}

function apiObtenerSesionSegura() {
  return {
    idAccesoSesion: apiObtenerIDAccesoSesion(),
    rolSesion: apiObtenerRolSesion(),
    modulo: apiObtenerModuloSesion()
  };
}

function apiTieneSesionValida() {
  const sesion = apiObtenerSesionSegura();

  return Boolean(
    sesion.idAccesoSesion &&
    apiEsRolValido(sesion.rolSesion) &&
    apiEsRolValido(sesion.modulo) &&
    sesion.rolSesion === sesion.modulo
  );
}

function apiMensajeSesionInvalida() {
  return "Sesión inválida o incompleta. Cierra sesión e ingresa nuevamente.";
}

function apiCrearAbortController() {
  if (typeof AbortController === "undefined") {
    return {
      controller: null,
      timeoutId: null
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(function() {
    controller.abort();
  }, API_TIMEOUT_MS);

  return {
    controller: controller,
    timeoutId: timeoutId
  };
}

function apiLimpiarTimeout(timeoutId) {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
}

function apiManejarRespuestaTexto(texto, onSuccess, onFailure) {
  try {
    const data = JSON.parse(texto);

    if (data && data.success) {
      if (typeof onSuccess === "function") {
        onSuccess(data.data);
      }
      return;
    }

    const mensajeError = data && data.error
      ? data.error
      : "El servidor no pudo procesar la solicitud.";

    if (typeof onFailure === "function") {
      onFailure(mensajeError);
    }
  } catch (error) {
    if (typeof onFailure === "function") {
      onFailure("Error de comunicación con el servidor. La respuesta no es JSON válido.");
    }
  }
}

function apiManejarFalloRed(error, onFailure) {
  let mensaje = "Error de red.";

  if (error && error.name === "AbortError") {
    mensaje = "La solicitud tardó demasiado tiempo. Intenta nuevamente.";
  } else if (error && error.message) {
    mensaje = "Error de red: " + error.message;
  }

  if (typeof onFailure === "function") {
    onFailure(mensaje);
  }
}

function apiConstruirParametrosGET(paramsObj, requiereSesion) {
  const params = new URLSearchParams(paramsObj || {});

  if (requiereSesion) {
    const sesion = apiObtenerSesionSegura();

    params.set("idAccesoSesion", sesion.idAccesoSesion);
    params.set("rolSesion", sesion.rolSesion);
    params.set("modulo", sesion.modulo);
  }

  return params;
}

function apiConstruirPayloadPOST(payload, requiereSesion) {
  const finalPayload = Object.assign({}, payload || {});

  if (requiereSesion) {
    const sesion = apiObtenerSesionSegura();

    finalPayload.idAccesoSesion = sesion.idAccesoSesion;
    finalPayload.rolSesion = sesion.rolSesion;
    finalPayload.modulo = sesion.modulo;
  }

  return finalPayload;
}

/*
  GET seguro:
  - Recibe únicamente parámetros propios de la acción.
  - Inyecta internamente idAccesoSesion, rolSesion y modulo desde sessionStorage.
  - app.js no debe mandar manualmente identidad de usuario.
*/
function getRequest(paramsObj, onSuccess, onFailure, opciones) {
  const config = opciones || {};
  const requiereSesion = config.requiereSesion !== false;

  if (requiereSesion && !apiTieneSesionValida()) {
    if (typeof onFailure === "function") {
      onFailure(apiMensajeSesionInvalida());
    }
    return;
  }

  const params = apiConstruirParametrosGET(paramsObj, requiereSesion);
  const abortData = apiCrearAbortController();

  const fetchOptions = {};

  if (abortData.controller) {
    fetchOptions.signal = abortData.controller.signal;
  }

  fetch(APPS_SCRIPT_URL + "?" + params.toString(), fetchOptions)
    .then(function(respuesta) {
      return respuesta.text();
    })
    .then(function(texto) {
      apiLimpiarTimeout(abortData.timeoutId);
      apiManejarRespuestaTexto(texto, onSuccess, onFailure);
    })
    .catch(function(error) {
      apiLimpiarTimeout(abortData.timeoutId);
      apiManejarFalloRed(error, onFailure);
    });
}

/*
  POST seguro:
  - Recibe únicamente payload propio de la acción.
  - Inyecta internamente idAccesoSesion, rolSesion y modulo desde sessionStorage.
  - No usa userTest.
  - No usa ID de columna A como identidad.
*/
function postRequest(payload, onSuccess, onFailure, opciones) {
  const config = opciones || {};
  const requiereSesion = config.requiereSesion !== false;

  if (requiereSesion && !apiTieneSesionValida()) {
    if (typeof onFailure === "function") {
      onFailure(apiMensajeSesionInvalida());
    }
    return;
  }

  const finalPayload = apiConstruirPayloadPOST(payload, requiereSesion);
  const abortData = apiCrearAbortController();

  const fetchOptions = {
    method: "POST",
    body: JSON.stringify(finalPayload)
  };

  /*
    No se agrega header application/json para evitar preflight CORS innecesario
    en Apps Script. El backend lee e.postData.contents.
  */
  if (abortData.controller) {
    fetchOptions.signal = abortData.controller.signal;
  }

  fetch(APPS_SCRIPT_URL, fetchOptions)
    .then(function(respuesta) {
      return respuesta.text();
    })
    .then(function(texto) {
      apiLimpiarTimeout(abortData.timeoutId);
      apiManejarRespuestaTexto(texto, onSuccess, onFailure);
    })
    .catch(function(error) {
      apiLimpiarTimeout(abortData.timeoutId);
      apiManejarFalloRed(error, onFailure);
    });
}

const API = {
  iniciarSesion: function(idAcceso, contrasena, onSuccess, onFailure) {
    const id = apiNormalizarTexto(idAcceso);
    const pass = apiNormalizarTexto(contrasena);

    postRequest({
      action: "iniciarSesion",
      datos: {
        IDAcceso: id,
        Contrasena: pass
      }
    }, onSuccess, onFailure, {
      requiereSesion: false
    });
  },

  obtenerUsuariosParaFormulario: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerUsuariosParaFormulario"
    }, onSuccess, onFailure);
  },

  obtenerResumenPersona: function(idPersona, onSuccess, onFailure) {
    getRequest({
      action: "obtenerResumenPersona",
      idPersona: apiNormalizarTexto(idPersona)
    }, onSuccess, onFailure);
  },

  obtenerHistorialPersona: function(idPersona, filtro, onSuccess, onFailure) {
    getRequest({
      action: "obtenerHistorialPersona",
      idPersona: apiNormalizarTexto(idPersona),
      filtro: apiNormalizarTexto(filtro)
    }, onSuccess, onFailure);
  },

  obtenerDetalleIncidencia: function(idIncidencia, onSuccess, onFailure) {
    getRequest({
      action: "obtenerDetalleIncidencia",
      idIncidencia: apiNormalizarTexto(idIncidencia)
    }, onSuccess, onFailure);
  },

  guardarUsosPermisoOficial: function(idIncidencia, datos, onSuccess, onFailure) {
    postRequest({
      action: "guardarUsosPermisoOficial",
      idIncidencia: apiNormalizarTexto(idIncidencia),
      datos: datos || {}
    }, onSuccess, onFailure);
  },

  eliminarIncidencia: function(idIncidencia, onSuccess, onFailure) {
    postRequest({
      action: "eliminarIncidencia",
      idIncidencia: apiNormalizarTexto(idIncidencia)
    }, onSuccess, onFailure);
  },

  guardarIncidencia: function(datos, onSuccess, onFailure) {
    postRequest({
      action: "guardarIncidencia",
      datos: datos || {}
    }, onSuccess, onFailure);
  },

  obtenerReporteDia: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerReporteDia"
    }, onSuccess, onFailure);
  },

  obtenerReporteSemanal: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerReporteSemanal"
    }, onSuccess, onFailure);
  },

  consultarFechas: function(rango, onSuccess, onFailure) {
    getRequest({
      action: "consultarFechas",
      rango: JSON.stringify(rango || {})
    }, onSuccess, onFailure);
  },

  guardarNotificacion: function(datos, onSuccess, onFailure) {
    postRequest({
      action: "guardarNotificacion",
      datos: datos || {}
    }, onSuccess, onFailure);
  },

  obtenerNotificacionesUsuario: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerNotificacionesUsuario"
    }, onSuccess, onFailure);
  },

  obtenerDetalleNotificacion: function(idNotificacion, onSuccess, onFailure) {
    getRequest({
      action: "obtenerDetalleNotificacion",
      idNotificacion: apiNormalizarTexto(idNotificacion)
    }, onSuccess, onFailure);
  },

  obtenerNotificacionesEnviadas: function(onSuccess, onFailure) {
    getRequest({
      action: "obtenerNotificacionesEnviadas"
    }, onSuccess, onFailure);
  },

  obtenerDetalleNotificacionEnviada: function(idNotificacion, onSuccess, onFailure) {
    getRequest({
      action: "obtenerDetalleNotificacionEnviada",
      idNotificacion: apiNormalizarTexto(idNotificacion)
    }, onSuccess, onFailure);
  },

  obtenerEstadisticaMensual: function(idPersona, mes, anio, onSuccess, onFailure) {
    getRequest({
      action: "obtenerEstadisticaMensual",
      idPersona: apiNormalizarTexto(idPersona),
      mes: apiNormalizarTexto(mes),
      anio: apiNormalizarTexto(anio)
    }, onSuccess, onFailure);
  },

  obtenerSesionActual: function() {
    return apiObtenerSesionSegura();
  },

  cerrarSesionLocal: function() {
    sessionStorage.clear();
  }
};

/*
  Exposición explícita para compatibilidad con app.js y otros módulos.
*/
window.API = API;
window.getRequest = getRequest;
window.postRequest = postRequest;
