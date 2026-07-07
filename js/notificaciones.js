let notifyUsuariosDisponibles = [];

function abrirNotificaciones() {
  const rol = canonicalizarRolNotificaciones(sessionStorage.getItem("userRol"));
  currentModule = currentModule || sessionStorage.getItem("currentActiveModule") || rol;

  if (rol === "Direccion" && currentModule === "Direccion") {
    showScreen("notifyMenuScreen");
    return;
  }

  abrirLeerNotificaciones();
}

function abrirEnviarNotificacion() {
  const rol = canonicalizarRolNotificaciones(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion") {
    alert("Solo Dirección puede enviar notificaciones.");
    return;
  }

  const select = document.getElementById("notifyUserSelect");
  const mensaje = document.getElementById("notifyMessage");
  const status = document.getElementById("notifySendStatus");

  if (!select || !mensaje || !status) {
    alert("Faltan elementos de envío de notificaciones en el index.");
    return;
  }

  notifyUsuariosDisponibles = [];
  select.innerHTML = `<option value="">Cargando docentes...</option>`;
  mensaje.value = "";
  status.className = "status-box";
  status.textContent = "";

  showScreen("notifySendScreen");

  API.obtenerUsuariosParaFormulario(
    function(usuarios) {
      notifyUsuariosDisponibles = (usuarios || []).filter(function(usuario) {
        return Boolean(usuario && usuario.IDAcceso);
      });

      select.innerHTML = `<option value="">Seleccionar docente</option>`;

      const optionTodos = document.createElement("option");
      optionTodos.value = "__TODOS__";
      optionTodos.textContent = "TODOS";
      select.appendChild(optionTodos);

      notifyUsuariosDisponibles.forEach(function(usuario) {
        const idAcceso = usuario.IDAcceso || "";

        if (!idAcceso) return;

        const option = document.createElement("option");
        option.value = idAcceso;
        option.textContent = `${usuario.Apellidos || ""} ${usuario.Nombre || ""} (${usuario.Rol || "Sin rol"})`.trim();
        select.appendChild(option);
      });
    },
    function(error) {
      select.innerHTML = `<option value="">Error al cargar docentes</option>`;
      status.className = "status-box show error";
      status.textContent = obtenerMensajeError(error);
    }
  );
}

function ejecutarEnvioNotificacion() {
  const rol = canonicalizarRolNotificaciones(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion") {
    alert("Solo Dirección puede enviar notificaciones.");
    return;
  }

  const select = document.getElementById("notifyUserSelect");
  const mensaje = document.getElementById("notifyMessage");
  const status = document.getElementById("notifySendStatus");

  if (!select || !mensaje || !status) {
    alert("Faltan elementos de envío de notificaciones en el index.");
    return;
  }

  const idSeleccionado = select.value;
  const textoMensaje = String(mensaje.value || "").trim();

  if (!idSeleccionado) {
    status.className = "status-box show error";
    status.textContent = "Selecciona un docente.";
    return;
  }

  if (!textoMensaje) {
    status.className = "status-box show error";
    status.textContent = "Escribe un mensaje.";
    return;
  }

  if (idSeleccionado === "__TODOS__") {
    enviarNotificacionATodos(textoMensaje, select, mensaje, status);
    return;
  }

  const docente = obtenerDocenteNotificacionPorID(idSeleccionado);
  const nombreDocente = docente
    ? `${docente.Apellidos || ""} ${docente.Nombre || ""}`.trim()
    : obtenerTextoOpcionSeleccionada(select);

  if (!confirm(`¿Confirmas enviar esta notificación a ${nombreDocente || "este docente"}?`)) {
    return;
  }

  const datos = {
    IDUsuario: idSeleccionado,
    Mensaje: textoMensaje
  };

  status.className = "status-box show";
  status.textContent = "Enviando notificación...";

  API.guardarNotificacion(
    datos,
    function(notificacion) {
      status.className = "status-box show ok";
      status.textContent = `Notificación enviada correctamente: ${notificacion.IDNotificacion || "sin folio"}`;
      select.value = "";
      mensaje.value = "";
    },
    function(error) {
      status.className = "status-box show error";
      status.textContent = obtenerMensajeError(error);
    }
  );
}

function enviarNotificacionATodos(textoMensaje, select, mensaje, status) {
  const docentes = (notifyUsuariosDisponibles || []).filter(function(usuario) {
    return Boolean(usuario && usuario.IDAcceso);
  });

  if (!docentes.length) {
    status.className = "status-box show error";
    status.textContent = "No hay docentes disponibles para enviar la notificación.";
    return;
  }

  if (!confirm(`¿Confirmas enviar esta notificación a TODOS (${docentes.length})?`)) {
    return;
  }

  status.className = "status-box show";
  status.textContent = `Enviando notificaciones: 0 de ${docentes.length}...`;

  let completadas = 0;
  let exitosas = 0;
  let fallidas = 0;
  const errores = [];

  docentes.forEach(function(docente) {
    API.guardarNotificacion(
      {
        IDUsuario: docente.IDAcceso,
        Mensaje: textoMensaje
      },
      function() {
        exitosas++;
        completadas++;
        actualizarEstadoEnvioTodos(completadas, docentes.length, exitosas, fallidas, errores, select, mensaje, status);
      },
      function(error) {
        fallidas++;
        completadas++;
        const nombre = `${docente.Apellidos || ""} ${docente.Nombre || ""}`.trim() || docente.IDAcceso;
        errores.push(`${nombre}: ${obtenerMensajeError(error)}`);
        actualizarEstadoEnvioTodos(completadas, docentes.length, exitosas, fallidas, errores, select, mensaje, status);
      }
    );
  });
}

function actualizarEstadoEnvioTodos(completadas, total, exitosas, fallidas, errores, select, mensaje, status) {
  if (completadas < total) {
    status.className = "status-box show";
    status.textContent = `Enviando notificaciones: ${completadas} de ${total}...`;
    return;
  }

  if (fallidas > 0) {
    status.className = "status-box show error";
    status.textContent = `Envío terminado con errores. Correctas: ${exitosas}. Fallidas: ${fallidas}. ${errores.slice(0, 3).join(" | ")}`;
    return;
  }

  status.className = "status-box show ok";
  status.textContent = `Notificación enviada correctamente a TODOS (${exitosas}).`;
  select.value = "";
  mensaje.value = "";
}

function obtenerDocenteNotificacionPorID(idAcceso) {
  return (notifyUsuariosDisponibles || []).find(function(usuario) {
    return String(usuario.IDAcceso || "") === String(idAcceso || "");
  }) || null;
}

function obtenerTextoOpcionSeleccionada(select) {
  if (!select || select.selectedIndex < 0 || !select.options || !select.options[select.selectedIndex]) {
    return "";
  }

  return String(select.options[select.selectedIndex].textContent || "").trim();
}

function abrirLeerNotificaciones() {
  const lista = document.getElementById("notifyReadList");
  const subtitle = document.getElementById("notifyReadSubtitle");

  if (!lista) {
    alert("No se encontró notifyReadList en el index.");
    return;
  }

  lista.innerHTML = crearTarjetaSimple("Cargando notificaciones...", "Consultando mensajes recibidos.");

  if (subtitle) {
    subtitle.textContent = "Mensajes recibidos";
  }

  showScreen("notifyReadScreen");

  API.obtenerNotificacionesUsuario(
    renderLeerNotificaciones,
    function(error) {
      lista.innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
    }
  );
}

function renderLeerNotificaciones(respuesta) {
  const usuario = respuesta && respuesta.usuario ? respuesta.usuario : {};
  const subtitle = document.getElementById("notifyReadSubtitle");
  const container = document.getElementById("notifyReadList");

  if (subtitle) {
    subtitle.textContent = `${usuario.Nombre || ""} ${usuario.Apellidos || ""}`.trim() || "Mensajes recibidos";
  }

  if (!container) return;

  container.innerHTML = "";

  if (!respuesta || !respuesta.notificaciones || respuesta.notificaciones.length === 0) {
    container.innerHTML = crearTarjetaSimple("Sin notificaciones", "No tienes mensajes recibidos.");
    return;
  }

  respuesta.notificaciones.forEach(function(notificacion) {
    container.appendChild(crearCardNotificacionRecibida(notificacion));
  });

  inicializarIconos();
}

function crearCardNotificacionRecibida(notificacion) {
  const meta = estadoNotificacionMeta(notificacion.Estado);
  const card = document.createElement("article");

  card.className = `notification-card-full ${meta.clase}`;
  card.innerHTML = `
    <div style="display:grid;grid-template-columns:50px 1fr auto;gap:10px;align-items:center;">
      <div class="notification-status-icon solid-${meta.color}" data-icon="${meta.icono}"></div>
      <div>
        <p class="notification-date">${escapeHTML(notificacion.FechaEnvio || "Sin fecha")}</p>
        <p class="notification-message">Enviado por Dirección</p>
        <p class="notification-meta"><strong>Estado:</strong> ${escapeHTML(meta.texto)}</p>
      </div>
      <button class="detail-button" onclick="abrirDetalleNotificacionRecibida('${escapeHTML(notificacion.IDNotificacion || "")}')">Ver detalle</button>
    </div>
  `;

  return card;
}

function abrirDetalleNotificacionRecibida(idNotificacion) {
  selectedNotificationID = String(idNotificacion || "").trim();

  if (!selectedNotificationID) {
    alert("No se recibió ID de notificación.");
    return;
  }

  prepararPantallaDetalleNotificacion("Detalle de notificación", "Mensaje recibido", "cyan", "bell");

  const contenedor = document.getElementById("notifyDetailContent");

  if (contenedor) {
    contenedor.innerHTML = crearTarjetaSimple("Cargando detalle...", "Consultando mensaje y actualizando lectura.");
  }

  showScreen("notifyDetailScreen", false);

  API.obtenerDetalleNotificacion(
    selectedNotificationID,
    function(respuesta) {
      renderDetalleNotificacion(respuesta.notificacion, "recibida");
    },
    function(error) {
      if (contenedor) {
        contenedor.innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
      }
    }
  );
}

function abrirNotificacionesEnviadas() {
  const rol = canonicalizarRolNotificaciones(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion") {
    alert("Solo Dirección puede consultar notificaciones enviadas.");
    return;
  }

  const lista = document.getElementById("notifySentList");

  if (!lista) {
    alert("No se encontró notifySentList en el index.");
    return;
  }

  lista.innerHTML = crearTarjetaSimple("Cargando notificaciones...", "Consultando mensajes enviados.");
  showScreen("notifySentScreen");

  API.obtenerNotificacionesEnviadas(
    renderNotificacionesEnviadas,
    function(error) {
      lista.innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
    }
  );
}

function renderNotificacionesEnviadas(respuesta) {
  const usuario = respuesta && respuesta.usuario ? respuesta.usuario : {};
  const subtitle = document.getElementById("notifySentSubtitle");
  const container = document.getElementById("notifySentList");

  if (subtitle) {
    subtitle.textContent = `Enviadas por: ${usuario.Nombre || ""} ${usuario.Apellidos || ""}`.trim();
  }

  if (!container) return;

  container.innerHTML = "";

  if (!respuesta || !respuesta.notificaciones || respuesta.notificaciones.length === 0) {
    container.innerHTML = crearTarjetaSimple("Sin notificaciones enviadas", "Aún no has enviado notificaciones.");
    return;
  }

  respuesta.notificaciones.forEach(function(notificacion) {
    container.appendChild(crearCardNotificacionEnviada(notificacion));
  });

  inicializarIconos();
}

function crearCardNotificacionEnviada(notificacion) {
  const meta = estadoNotificacionMeta(notificacion.Estado);
  const nombre = `${notificacion.Nombre || ""} ${notificacion.Apellidos || ""}`.trim();
  const card = document.createElement("article");

  card.className = `notification-card-full ${meta.clase}`;
  card.innerHTML = `
    <div style="display:grid;grid-template-columns:50px 1fr auto;gap:10px;align-items:center;">
      <div class="notification-status-icon solid-${meta.color}" data-icon="${meta.icono}"></div>
      <div>
        <p class="notification-date">${escapeHTML(notificacion.FechaEnvio || "Sin fecha")}</p>
        <p class="notification-message">${escapeHTML(nombre || "Sin destinatario")}</p>
        <p class="notification-meta"><strong>Estado:</strong> ${escapeHTML(meta.texto)}</p>
      </div>
      <button class="detail-button" onclick="abrirDetalleNotificacionEnviada('${escapeHTML(notificacion.IDNotificacion || "")}')">Ver detalle</button>
    </div>
  `;

  return card;
}

function abrirDetalleNotificacionEnviada(idNotificacion) {
  const rol = canonicalizarRolNotificaciones(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion") {
    alert("Solo Dirección puede consultar detalle de notificaciones enviadas.");
    return;
  }

  selectedNotificationID = String(idNotificacion || "").trim();

  if (!selectedNotificationID) {
    alert("No se recibió ID de notificación.");
    return;
  }

  prepararPantallaDetalleNotificacion("Detalle de enviada", "Estado de lectura", "green", "report");

  const contenedor = document.getElementById("notifyDetailContent");

  if (contenedor) {
    contenedor.innerHTML = crearTarjetaSimple("Cargando detalle...", "Consultando mensaje enviado.");
  }

  showScreen("notifyDetailScreen");

  API.obtenerDetalleNotificacionEnviada(
    selectedNotificationID,
    function(respuesta) {
      renderDetalleNotificacion(respuesta.notificacion, "enviada");
    },
    function(error) {
      if (contenedor) {
        contenedor.innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
      }
    }
  );
}

function prepararPantallaDetalleNotificacion(titulo, subtitulo, color, icono) {
  const title = document.getElementById("notifyDetailTitle");
  const subtitle = document.getElementById("notifyDetailSubtitle");
  const icon = document.getElementById("notifyDetailIcon");

  if (title) {
    title.textContent = titulo;
    title.className = `page-title color-${color}`;
  }

  if (subtitle) {
    subtitle.textContent = subtitulo;
  }

  if (icon) {
    icon.className = `brand-icon solid-${color}`;
    icon.setAttribute("data-icon", icono);
  }
}

function renderDetalleNotificacion(notificacion, modo) {
  const n = notificacion || {};
  const meta = estadoNotificacionMeta(n.Estado);
  const nombre = `${n.Nombre || ""} ${n.Apellidos || ""}`.trim();
  const tituloPersona = modo === "enviada" ? "Destinatario" : "Docente";

  const html = `
    <article class="notification-card-full ${meta.clase}">
      <div style="display:grid;grid-template-columns:58px 1fr;gap:12px;align-items:center;">
        <div class="notification-status-icon solid-${meta.color}" data-icon="${meta.icono}"></div>
        <div>
          <h2 class="data-card-title color-${meta.color}">${escapeHTML(meta.texto)}</h2>
          <p class="data-card-text"><strong>ID Notificación:</strong> ${escapeHTML(n.IDNotificacion || "Sin ID")}</p>
        </div>
      </div>
    </article>

    <article class="data-card">
      <h2 class="section-title">${escapeHTML(tituloPersona)}</h2>
      <p class="data-card-text"><strong>${escapeHTML(nombre || "Sin nombre")}</strong></p>
      <p class="data-card-text"><strong>Turno:</strong> ${escapeHTML(TURNOS_TEXTO[n.Turno] || n.Turno || "Sin dato")}</p>
    </article>

    <article class="data-card">
      <h2 class="section-title">Mensaje</h2>
      <p class="data-card-text">${escapeHTML(n.Mensaje || "Sin mensaje.")}</p>
    </article>

    <article class="data-card">
      <h2 class="section-title">Envío</h2>
      <p class="data-card-text"><strong>Enviado por ID:</strong> ${escapeHTML(n.EnviadoPor || "Sin dato")}</p>
      <p class="data-card-text"><strong>Fecha de envío:</strong> ${escapeHTML(n.FechaEnvio || "Sin fecha")}</p>
    </article>

    <article class="data-card">
      <h2 class="section-title">Lectura</h2>
      <p class="data-card-text"><strong>Estado:</strong> ${escapeHTML(meta.texto)}</p>
      <p class="data-card-text"><strong>Fecha de lectura:</strong> ${escapeHTML(n.FechaLectura || "Sin lectura registrada")}</p>
      <p class="data-card-text"><strong>Leído por ID:</strong> ${escapeHTML(n.LeidoPor || "Sin lectura registrada")}</p>
    </article>
  `;

  const contenedor = document.getElementById("notifyDetailContent");

  if (contenedor) {
    contenedor.innerHTML = html;
  }

  inicializarIconos();
}

function recortarTextoSeguro(texto, limite) {
  const limpio = String(texto || "");
  const max = Number(limite || 90);

  if (typeof recortarTexto === "function") {
    return recortarTexto(limpio, max);
  }

  if (limpio.length <= max) {
    return limpio;
  }

  return limpio.slice(0, max - 1) + "…";
}

function canonicalizarRolNotificaciones(valor) {
  if (typeof canonicalizarRolLocal === "function") {
    return canonicalizarRolLocal(valor);
  }

  const texto = String(valor || "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (texto === "direccion" || texto === "dir") return "Direccion";
  if (texto === "prefectura" || texto === "pre") return "Prefectura";
  if (texto === "docente" || texto === "doc") return "Docente";
  if (texto === "correspondencia" || texto === "cor") return "Correspondencia";

  return String(valor || "").trim();
}
