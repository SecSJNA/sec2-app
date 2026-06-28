const API = {
  obtenerUsuariosParaFormulario: function(onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerUsuariosParaFormulario();
  },

  obtenerResumenPersona: function(idPersona, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerResumenPersona(idPersona, currentModule, TEST_USERS[currentModule]);
  },

  obtenerHistorialPersona: function(idPersona, filtro, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerHistorialPersona(idPersona, currentModule, TEST_USERS[currentModule], filtro);
  },

  obtenerDetalleIncidencia: function(idIncidencia, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerDetalleIncidencia(idIncidencia, currentModule, TEST_USERS[currentModule]);
  },

  guardarUsosPermisoOficial: function(idIncidencia, datos, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .guardarUsosPermisoOficial(idIncidencia, datos, currentModule, TEST_USERS[currentModule]);
  },

  eliminarIncidencia: function(idIncidencia, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .eliminarIncidencia(idIncidencia, currentModule, TEST_USERS[currentModule]);
  },

  guardarIncidencia: function(datos, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .guardarIncidencia(datos, currentModule, TEST_USERS[currentModule]);
  },

  obtenerReporteDia: function(onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerReporteDia(currentModule, TEST_USERS[currentModule]);
  },

  obtenerReporteSemanal: function(onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerReporteSemanal(currentModule, TEST_USERS[currentModule]);
  },

  consultarFechas: function(rango, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .consultarFechas(rango, currentModule, TEST_USERS[currentModule]);
  },

  guardarNotificacion: function(datos, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .guardarNotificacion(datos, currentModule, TEST_USERS[currentModule]);
  },

  obtenerNotificacionesUsuario: function(onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerNotificacionesUsuario(currentModule, TEST_USERS[currentModule]);
  },

  obtenerDetalleNotificacion: function(idNotificacion, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerDetalleNotificacion(idNotificacion, currentModule, TEST_USERS[currentModule]);
  },

  obtenerNotificacionesEnviadas: function(onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerNotificacionesEnviadas(currentModule, TEST_USERS[currentModule]);
  },

  obtenerDetalleNotificacionEnviada: function(idNotificacion, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerDetalleNotificacionEnviada(idNotificacion, currentModule, TEST_USERS[currentModule]);
  },

  obtenerEstadisticaMensual: function(idPersona, mes, anio, onSuccess, onFailure) {
    google.script.run
      .withSuccessHandler(onSuccess)
      .withFailureHandler(onFailure)
      .obtenerEstadisticaMensual(idPersona, currentModule, TEST_USERS[currentModule], mes, anio);
  }
};