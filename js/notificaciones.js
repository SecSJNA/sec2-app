function abrirNotificaciones() {
  if (currentModule === "Dirección") {
    // Dependencia de interfaz: showScreen
    showScreen("notifyMenuScreen");
  } else {
    abrirLeerNotificaciones();
  }
}

function abrirEnviarNotificacion() {
  const select = document.getElementById("notifyUserSelect");
  select.innerHTML = `<option value="">Cargando personas...</option>`;
  document.getElementById("notifyMessage").value = "";
  document.getElementById("notifySendStatus").className = "status-box";
  document.getElementById("notifySendStatus").textContent = "";

  google.script.run
    .withSuccessHandler(usuarios => {
      select.innerHTML = `<option value="">Seleccionar persona</option>`;
      usuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.ID;
        option.textContent = `${usuario.Apellidos} ${usuario.Nombre}`;
        select.appendChild(option);
      });
    })
    .withFailureHandler(error => {
      select.innerHTML = `<option value="">Error al cargar personas</option>`;
      const status = document.getElementById("notifySendStatus");
      status.className = "status-box show error";
      // Dependencia de interfaz: obtenerMensajeError
      status.textContent = obtenerMensajeError(error);
    })
    .obtenerUsuariosParaFormulario();
  // Dependencia de interfaz: showScreen
  showScreen("notifySendScreen");
}

function ejecutarEnvioNotificacion() {
  const datos = {
    IDUsuario: document.getElementById("notifyUserSelect").value,
    Mensaje: document.getElementById("notifyMessage").value
  };
  const status = document.getElementById("notifySendStatus");

  if (!datos.IDUsuario) {
    status.className = "status-box show error";
    status.textContent = "Selecciona una persona.";
    return;
  }

  if (!datos.Mensaje.trim()) {
    status.className = "status-box show error";
    status.textContent = "Escribe un mensaje.";
    return;
  }

  status.className = "status-box show";
  status.textContent = "Enviando notificación...";

  google.script.run
    .withSuccessHandler(notificacion => {
      status.className = "status-box show ok";
      status.textContent = `Notificación enviada correctamente: ${notificacion.IDNotificacion}`;
      document.getElementById("notifyUserSelect").value = "";
      document.getElementById("notifyMessage").value = "";
    })
    .withFailureHandler(error => {
      status.className = "status-box show error";
      // Dependencia de interfaz: obtenerMensajeError
      status.textContent = obtenerMensajeError(error);
    })
    .guardarNotificacion(datos, currentModule, TEST_USERS[currentModule]);
}

function abrirLeerNotificaciones() {
  // Dependencia de interfaz: crearTarjetaSimple
  document.getElementById("notifyReadList").innerHTML = crearTarjetaSimple("Cargando notificaciones...", "Consultando mensajes recibidos.");
  // Dependencia de interfaz: showScreen
  showScreen("notifyReadScreen");

  google.script.run
    .withSuccessHandler(renderLeerNotificaciones)
    .withFailureHandler(error => {
      // Dependencia de interfaz: crearTarjetaSimple, obtenerMensajeError
      document.getElementById("notifyReadList").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
    })
    .obtenerNotificacionesUsuario(currentModule, TEST_USERS[currentModule]);
}

function renderLeerNotificaciones(respuesta) {
  document.getElementById("notifyReadSubtitle").textContent = `${respuesta.usuario.Nombre} ${respuesta.usuario.Apellidos}`;

  const container = document.getElementById("notifyReadList");
  container.innerHTML = "";

  if (!respuesta.notificaciones || respuesta.notificaciones.length === 0) {
    // Dependencia de interfaz: crearTarjetaSimple
    container.innerHTML = crearTarjetaSimple("Sin notificaciones", "No tienes mensajes recibidos.");
    return;
  }

  respuesta.notificaciones.forEach(notificacion => {
    container.appendChild(crearCardNotificacionRecibida(notificacion));
  });
  // Dependencia de interfaz: inicializarIconos
  inicializarIconos();
}

function crearCardNotificacionRecibida(notificacion) {
  // Dependencia de interfaz: estadoNotificacionMeta, escapeHTML, recortarTexto
  const meta = estadoNotificacionMeta(notificacion.Estado);
  const card = document.createElement("article");
  card.className = `notification-card ${meta.clase}`;

  card.innerHTML = `
        <div class="notification-status-icon solid-${meta.color}" data-icon="${meta.icono}"></div>
        <div>
          <p class="notification-date">${escapeHTML(notificacion.FechaEnvio || "Sin fecha")}</p>
          <p class="notification-message">${escapeHTML(recortarTexto(notificacion.Mensaje || "", 72))}</p>
          <p class="notification-meta"><strong>Estado:</strong> ${escapeHTML(meta.texto)}</p>
        </div>
        <button class="detail-button" onclick="abrirDetalleNotificacionRecibida('${escapeHTML(notificacion.IDNotificacion)}')">Ver detalle</button>
      `;
  return card;
}

function abrirDetalleNotificacionRecibida(idNotificacion) {
  selectedNotificationID = idNotificacion;
  document.getElementById("notifyDetailTitle").textContent = "Detalle de notificación";
  document.getElementById("notifyDetailTitle").className = "page-title color-cyan";
  document.getElementById("notifyDetailSubtitle").textContent = "Mensaje recibido";
  document.getElementById("notifyDetailIcon").className = "brand-icon solid-cyan";
  document.getElementById("notifyDetailIcon").setAttribute("data-icon", "bell");
  // Dependencia de interfaz: crearTarjetaSimple
  document.getElementById("notifyDetailContent").innerHTML = crearTarjetaSimple("Cargando detalle...", "Consultando mensaje.");
  // Dependencia de interfaz: showScreen
  showScreen("notifyDetailScreen");

  google.script.run
    .withSuccessHandler(respuesta => {
      renderDetalleNotificacion(respuesta.notificacion, "recibida");
    })
    .withFailureHandler(error => {
      // Dependencia de interfaz: crearTarjetaSimple, obtenerMensajeError
      document.getElementById("notifyDetailContent").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
    })
    .obtenerDetalleNotificacion(idNotificacion, currentModule, TEST_USERS[currentModule]);
}

function abrirNotificacionesEnviadas() {
  // Dependencia de interfaz: crearTarjetaSimple
  document.getElementById("notifySentList").innerHTML = crearTarjetaSimple("Cargando notificaciones...", "Consultando mensajes enviados.");
  // Dependencia de interfaz: showScreen
  showScreen("notifySentScreen");

  google.script.run
    .withSuccessHandler(renderNotificacionesEnviadas)
    .withFailureHandler(error => {
      // Dependencia de interfaz: crearTarjetaSimple, obtenerMensajeError
      document.getElementById("notifySentList").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
    })
    .obtenerNotificacionesEnviadas(currentModule, TEST_USERS[currentModule]);
}

function renderNotificacionesEnviadas(respuesta) {
  document.getElementById("notifySentSubtitle").textContent = `Enviadas por: ${respuesta.usuario.Nombre} ${respuesta.usuario.Apellidos}`;
  const container = document.getElementById("notifySentList");
  container.innerHTML = "";

  if (!respuesta.notificaciones || respuesta.notificaciones.length === 0) {
    // Dependencia de interfaz: crearTarjetaSimple
    container.innerHTML = crearTarjetaSimple("Sin notificaciones enviadas", "Aún no has enviado notificaciones.");
    return;
  }

  respuesta.notificaciones.forEach(notificacion => {
    container.appendChild(crearCardNotificacionEnviada(notificacion));
  });
  // Dependencia de interfaz: inicializarIconos
  inicializarIconos();
}

function crearCardNotificacionEnviada(notificacion) {
  // Dependencia de interfaz: estadoNotificacionMeta, escapeHTML
  const meta = estadoNotificacionMeta(notificacion.Estado);
  const nombre = `${notificacion.Nombre || ""} ${notificacion.Apellidos || ""}`.trim();

  const card = document.createElement("article");
  card.className = `notification-card ${meta.clase}`;
  card.innerHTML = `
        <div class="notification-status-icon solid-${meta.color}" data-icon="${meta.icono}"></div>
        <div>
          <p class="notification-date">${escapeHTML(notificacion.FechaEnvio || "Sin fecha")}</p>
          <p class="notification-message">${escapeHTML(nombre || "Sin destinatario")}</p>
          <p class="notification-meta"><strong>Estado:</strong> ${escapeHTML(meta.texto)}</p>
        </div>
        <button class="detail-button" onclick="abrirDetalleNotificacionEnviada('${escapeHTML(notificacion.IDNotificacion)}')">Ver detalle</button>
      `;
  return card;
}

function abrirDetalleNotificacionEnviada(idNotificacion) {
  selectedNotificationID = idNotificacion;
  document.getElementById("notifyDetailTitle").textContent = "Detalle de enviada";
  document.getElementById("notifyDetailTitle").className = "page-title color-green";
  document.getElementById("notifyDetailSubtitle").textContent = "Estado de lectura";
  document.getElementById("notifyDetailIcon").className = "brand-icon solid-green";
  document.getElementById("notifyDetailIcon").setAttribute("data-icon", "report");
  // Dependencia de interfaz: crearTarjetaSimple
  document.getElementById("notifyDetailContent").innerHTML = crearTarjetaSimple("Cargando detalle...", "Consultando mensaje enviado.");
  // Dependencia de interfaz: showScreen
  showScreen("notifyDetailScreen");

  google.script.run
    .withSuccessHandler(respuesta => {
      renderDetalleNotificacion(respuesta.notificacion, "enviada");
    })
    .withFailureHandler(error => {
      // Dependencia de interfaz: crearTarjetaSimple, obtenerMensajeError
      document.getElementById("notifyDetailContent").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
    })
    .obtenerDetalleNotificacionEnviada(idNotificacion, currentModule, TEST_USERS[currentModule]);
}

function renderDetalleNotificacion(notificacion, modo) {
  // Dependencia de interfaz: estadoNotificacionMeta, escapeHTML
  const meta = estadoNotificacionMeta(notificacion.Estado);
  const nombre = `${notificacion.Nombre || ""} ${notificacion.Apellidos || ""}`.trim();

  let html = `
        <article class="notification-card-full ${meta.clase}">
          <div style="display:grid;grid-template-columns:58px 1fr;gap:12px;align-items:center;">
            <div class="notification-status-icon solid-${meta.color}" data-icon="${meta.icono}"></div>
            <div>
              <h2 class="data-card-title color-${meta.color}">${escapeHTML(meta.texto)}</h2>
              <p class="data-card-text"><strong>ID:</strong> ${escapeHTML(notificacion.IDNotificacion || "Sin ID")}</p>
            </div>
          </div>
        </article>

        <article class="data-card">
          <h2 class="section-title">${modo === "enviada" ?
"Destinatario" : "Mensaje recibido"}</h2>
          <p class="data-card-text"><strong>${escapeHTML(nombre || "Sin nombre")}</strong></p>
          <p class="data-card-text"><strong>ID usuario:</strong> ${escapeHTML(notificacion.IDUsuario || "Sin dato")}</p>
          <p class="data-card-text"><strong>Turno:</strong> ${TURNOS_TEXTO[notificacion.Turno] ||
notificacion.Turno || "Sin dato"}</p>
        </article>

        <article class="data-card">
          <h2 class="section-title">Mensaje</h2>
          <p class="data-card-text">${escapeHTML(notificacion.Mensaje || "Sin mensaje.")}</p>
        </article>

        <article class="data-card">
          <h2 class="section-title">Envío</h2>
          <p class="data-card-text"><strong>Enviado por:</strong> ${escapeHTML(notificacion.EnviadoPor || "Sin dato")}</p>
          <p class="data-card-text"><strong>Fecha de envío:</strong> ${escapeHTML(notificacion.FechaEnvio || "Sin fecha")}</p>
        </article>

        <article class="data-card">
          <h2 class="section-title">Lectura</h2>
          <p class="data-card-text"><strong>Estado:</strong> ${escapeHTML(meta.texto)}</p>
          <p class="data-card-text"><strong>Fecha de lectura:</strong> ${escapeHTML(notificacion.FechaLectura || "Sin lectura registrada")}</p>
          <p class="data-card-text"><strong>Leído por:</strong> ${escapeHTML(notificacion.LeidoPor ||
"Sin lectura registrada")}</p>
        </article>
      `;

  document.getElementById("notifyDetailContent").innerHTML = html;
  // Dependencia de interfaz: inicializarIconos
  inicializarIconos();
}