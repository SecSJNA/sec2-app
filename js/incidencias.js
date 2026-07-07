function abrirMiPerfil() {
  profileMode = true;

  const idAcceso = sessionStorage.getItem("userIDAcceso");

  if (!idAcceso) {
    alert("Sesión inválida. Ingresa nuevamente.");
    cerrarSesion();
    return;
  }

  selectedPersonID = idAcceso;
  cargarResumenPersona(idAcceso);
}

function abrirSelectorHistorial() {
  profileMode = false;

  const rol = canonicalizarRolLocal(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion" && rol !== "Correspondencia") {
    alert("No tienes permiso para consultar historial general.");
    return;
  }

  const select = document.getElementById("historyPersonSelect");

  if (!select) {
    alert("No se encontró el selector de historial en el index.");
    return;
  }

  select.innerHTML = `<option value="">Cargando docentes...</option>`;

  API.obtenerUsuariosParaFormulario(
    function(usuarios) {
      select.innerHTML = `<option value="">Seleccionar docente</option>`;

      (usuarios || []).forEach(function(usuario) {
        const idAcceso = usuario.IDAcceso || "";

        if (!idAcceso) return;

        const option = document.createElement("option");
        option.value = idAcceso;
        option.textContent = `${usuario.Apellidos || ""} ${usuario.Nombre || ""}`.trim();
        select.appendChild(option);
      });
    },
    function(error) {
      select.innerHTML = `<option value="">Error al cargar docentes</option>`;
      alert(obtenerMensajeError(error));
    }
  );

  showScreen("historySelectScreen");
}

function continuarHistorialPersona() {
  const select = document.getElementById("historyPersonSelect");
  const idAcceso = select ? select.value : "";

  if (!idAcceso) {
    alert("Selecciona un docente.");
    return;
  }

  profileMode = false;
  selectedPersonID = idAcceso;
  cargarResumenPersona(idAcceso);
}

function cargarResumenPersona(idPersona) {
  const idAcceso = String(idPersona || "").trim();

  if (!idAcceso) {
    alert("No se recibió IDAcceso de la persona.");
    return;
  }

  selectedPersonID = idAcceso;

  const contenedor = document.getElementById("personSummaryContent");

  if (contenedor) {
    contenedor.innerHTML = crearTarjetaSimple("Cargando resumen...", "Consultando base de datos.");
  }

  showScreen("personSummaryScreen");

  API.obtenerResumenPersona(
    idAcceso,
    renderResumenPersona,
    function(error) {
      const cont = document.getElementById("personSummaryContent");
      if (cont) {
        cont.innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
      }
    }
  );
}


function configurarPantallaResumenPersona() {
  const titulo = document.querySelector("#personSummaryScreen .page-title");
  const subtitulo = document.querySelector("#personSummaryScreen .page-subtitle");
  const icono = document.querySelector("#personSummaryScreen .brand-icon");

  if (profileMode) {
    if (titulo) {
      titulo.textContent = "Mi perfil";
      titulo.className = "page-title color-gold";
    }

    if (subtitulo) {
      subtitulo.textContent = "Información personal e historial propio";
    }

    if (icono) {
      icono.className = "brand-icon solid-gold";
      icono.setAttribute("data-icon", "user");
    }
  } else {
    if (titulo) {
      titulo.textContent = "Resumen del docente";
      titulo.className = "page-title color-green";
    }

    if (subtitulo) {
      subtitulo.textContent = "Información general e historial de incidencias";
    }

    if (icono) {
      icono.className = "brand-icon solid-green";
      icono.setAttribute("data-icon", "history");
    }
  }
}

function calcularEstadisticasRapidasResumen(respuesta) {
  const incidencias = respuesta && Array.isArray(respuesta.incidencias) ? respuesta.incidencias : [];
  const estadisticasBackend = respuesta && respuesta.estadisticas ? respuesta.estadisticas : {};

  const resultado = {
    total: Number(estadisticasBackend.total || incidencias.length || 0),
    permisosOficiales: 0,
    incapacidades: 0,
    comisiones: 0,
    humanitarios: 0,
    especiales: 0
  };

  incidencias.forEach(function(incidencia) {
    const tipo = String(incidencia.TipoIncidencia || "")
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (tipo.includes("permiso oficial") || tipo.includes("permiso personal")) {
      resultado.permisosOficiales++;
      return;
    }

    if (tipo.includes("incapacidad") || tipo.includes("licencia medica")) {
      resultado.incapacidades++;
      return;
    }

    if (tipo.includes("comision oficial") || tipo.includes("comision sindical")) {
      resultado.comisiones++;
      return;
    }

    if (tipo.includes("humanitario oficial") || tipo.includes("humanitario sindical")) {
      resultado.humanitarios++;
      return;
    }

    if (tipo.includes("especial")) {
      resultado.especiales++;
      return;
    }
  });

  /*
    Si por alguna razón el backend mandó estadísticas pero no mandó lista completa,
    se respeta el backend como respaldo.
  */
  if (!incidencias.length) {
    resultado.permisosOficiales = Number(estadisticasBackend.permisosOficiales || 0);
    resultado.incapacidades = Number(estadisticasBackend.incapacidades || 0);
    resultado.comisiones = Number(estadisticasBackend.comisiones || 0);
    resultado.especiales = Number(estadisticasBackend.especiales || estadisticasBackend.otras || 0);
  }

  return resultado;
}

function crearGridEstadisticasRapidas(stats) {
  return `
    <section class="stat-grid stat-grid-compact">
      ${statMini(stats.total || 0, "Total<br>incidencias", "blue", "humanitario-sindical")}
      ${statMini(stats.permisosOficiales || 0, "Permisos<br>oficiales", "purple", "permiso-oficial")}
      ${statMini(stats.incapacidades || 0, "Incapacidades", "green", "incapacidad")}
      ${statMini(stats.comisiones || 0, "Comisiones", "orange", "comision-oficial")}
      ${statMini(stats.humanitarios || 0, "Humanitarios", "cyan", "humanitario-oficial")}
      ${statMini(stats.especiales || 0, "Especiales", "gold", "especial")}
    </section>
  `;
}

function renderResumenPersona(respuesta) {
  configurarPantallaResumenPersona();

  const p = respuesta && respuesta.persona ? respuesta.persona : {};
  const stats = calcularEstadisticasRapidasResumen(respuesta);
  const ultima = respuesta && respuesta.ultimaIncidencia
    ? formatearFecha(respuesta.ultimaIncidencia.FechaInicio)
    : "Sin registros";

  const tituloOpciones = profileMode ? "Mi historial" : "Opciones de consulta";
  const descripcionHistorial = profileMode
    ? "Ver mi historial personal completo."
    : "Ver todas las incidencias registradas del docente.";

  const moduloVisible = currentModule || sessionStorage.getItem("currentActiveModule") || "";

  const html = `
    <article class="data-card">
      <div class="summary-header">
        <div class="big-avatar" data-icon="user"></div>
        <div>
          <h2 class="data-card-title">${escapeHTML(p.Nombre || "")} ${escapeHTML(p.Apellidos || "")}</h2>
          <p class="data-card-text"><strong>Turno:</strong> ${escapeHTML(TURNOS_TEXTO[p.Turno] || p.Turno || "Sin dato")}</p>
          <p class="data-card-text"><strong>Última incidencia:</strong> ${escapeHTML(ultima)}</p>
        </div>
      </div>

      <h2 class="section-title">Estadísticas rápidas</h2>
      ${crearGridEstadisticasRapidas(stats)}

      <h2 class="section-title">${tituloOpciones}</h2>
      ${optionCard("Historial completo", descripcionHistorial, "green", "history", "cargarHistorialPersona('todas')")}
      ${optionCard("Próximas incidencias", "Consultar incidencias futuras programadas.", "blue", "calendar", "cargarHistorialPersona('proximas')")}
      ${optionCard("Estadística mensual", "Consultar gráfica mensual por tipo de incidencia.", "orange", "report", "abrirEstadisticaMensual()")}
    </article>

    <section class="info-card">
      <div class="info-icon">i</div>
      <div>
        <h3 class="info-title">Información</h3>
        <p class="info-text">${profileMode ? "Este apartado es personal y solo de consulta." : "Seleccione una opción para consultar información detallada del docente."}</p>
      </div>
    </section>

    <section class="access-card">
      <div class="access-icon" data-icon="shield"></div>
      <div>
        <h2 class="access-title">Acceso: ${escapeHTML(moduloVisible)}</h2>
        <p class="access-text">${profileMode ? "Consulta personal sin edición." : "Consulta de historial e incidencias del docente."}</p>
      </div>
      <button class="logout-fake" onclick="cerrarSesion()">Cerrar<br>sesión</button>
    </section>
  `;

  const contenedor = document.getElementById("personSummaryContent");

  if (contenedor) {
    contenedor.innerHTML = html;
  }

  inicializarIconos();
}

function statMini(num, label, color, icono) {
  return `
    <article class="stat-small bg-${color}">
      <div class="mini-icon color-${color}" data-icon="${icono}"></div>
      <div class="stat-num color-${color}">${Number(num || 0)}</div>
      <div class="stat-label">${label}</div>
    </article>
  `;
}

function optionCard(title, desc, color, icon, action) {
  return `
    <button class="professional-card" onclick="${action}" style="margin-bottom:8px;">
      <div class="professional-icon solid-${color}" data-icon="${icon}"></div>
      <div>
        <h2 class="professional-title color-${color}">${escapeHTML(title)}</h2>
        <p class="professional-desc">${escapeHTML(desc)}</p>
      </div>
      <div class="professional-arrow color-${color}">›</div>
    </button>
  `;
}

function cargarHistorialPersona(filtro) {
  if (!selectedPersonID) {
    alert("No hay persona seleccionada para consultar historial.");
    return;
  }

  document.getElementById("dataTitle").textContent = filtro === "proximas" ? "Próximas incidencias" : "Historial completo";
  document.getElementById("dataSubtitle").textContent = "Consulta de incidencias registradas.";
  document.getElementById("dataStats").innerHTML = "";
  document.getElementById("dataList").innerHTML = crearTarjetaSimple("Cargando historial...", "Consultando base de datos.");
  document.getElementById("dataAccessName").textContent = currentModule || sessionStorage.getItem("currentActiveModule") || "";
  document.getElementById("dataBrandIcon").className = "brand-icon solid-green";
  document.getElementById("dataBrandIcon").setAttribute("data-icon", "history");

  showScreen("dataScreen");

  API.obtenerHistorialPersona(
    selectedPersonID,
    filtro,
    function(respuesta) {
      const persona = respuesta && respuesta.persona ? respuesta.persona : {};
      document.getElementById("dataSubtitle").textContent = `${persona.Nombre || ""} ${persona.Apellidos || ""}`.trim();
      renderHistorialConDetalles(respuesta.incidencias || []);
    },
    renderError
  );
}

function renderHistorialConDetalles(incidencias) {
  const container = document.getElementById("dataList");
  container.innerHTML = "";

  if (!incidencias || incidencias.length === 0) {
    container.innerHTML = crearTarjetaSimple("Sin registros", "No hay incidencias para mostrar.");
    return;
  }

  container.innerHTML = `
    <h2 class="section-title">Incidencias registradas</h2>
    <p class="section-subtitle">Fechas cercanas al periodo consultado.</p>
  `;

  incidencias.forEach(function(incidencia) {
    container.appendChild(crearCardIncidencia(incidencia, true));
  });

  inicializarIconos();
}


function abrirDetalleIncidenciaDesdeCreacion(idIncidencia) {
  /*
    Camino especial después de crear una incidencia:
    - muestra el detalle como confirmación visual
    - evita que la flecha regrese al formulario lleno
    - deja como regreso inmediato la pantalla de tipos de incidencia
  */
  navigationStack = ["typeScreen"];
  abrirDetalleIncidencia(idIncidencia, true);
}

function abrirDetalleIncidencia(idIncidencia, desdeCreacion = false) {
  selectedIncidentID = String(idIncidencia || "").trim();

  if (!selectedIncidentID) {
    alert("No se recibió ID de incidencia.");
    return;
  }

  document.getElementById("detailContent").innerHTML = crearTarjetaSimple("Cargando detalle...", "Consultando base de datos.");

  if (desdeCreacion) {
    showScreen("detailScreen", false);
  } else {
    showScreen("detailScreen");
  }

  API.obtenerDetalleIncidencia(
    selectedIncidentID,
    renderDetalleIncidencia,
    function(error) {
      document.getElementById("detailContent").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
    }
  );
}

function renderDetalleIncidencia(respuesta) {
  const i = respuesta && respuesta.incidencia ? respuesta.incidencia : {};
  const meta = iconMeta(i.TipoIncidencia);

  const puedeEditarEnEstaVista = Boolean(respuesta && respuesta.puedeEditar) && !profileMode;
  const puedeEliminarEnEstaVista = Boolean(respuesta && respuesta.puedeEliminar) && !profileMode;

  const detailBrandIcon = document.getElementById("detailBrandIcon");
  if (detailBrandIcon) {
    detailBrandIcon.className = `brand-icon solid-${meta.color}`;
    detailBrandIcon.setAttribute("data-icon", meta.icono);
  }

  let html = `
    <article class="data-card">
      <div style="display:grid;grid-template-columns:60px 1fr;gap:12px;align-items:center;">
        <div class="mini-icon solid-${meta.color}" data-icon="${meta.icono}"></div>
        <div>
          <h2 class="data-card-title color-${meta.color}">${escapeHTML(i.TipoIncidencia || meta.name || "Incidencia")}</h2>
          <p class="data-card-text"><strong>ID Incidencia:</strong> ${escapeHTML(i.IDIncidencia || "Sin dato")}</p>
          <span class="tag" style="background:${cssVar('green')};">Activo</span>
        </div>
      </div>
    </article>

    <article class="data-card">
      <h2 class="section-title">Docente</h2>
      <p class="data-card-text"><strong>${escapeHTML(i.Nombre || "")} ${escapeHTML(i.Apellidos || "")}</strong></p>
      <p class="data-card-text"><strong>Turno:</strong> ${escapeHTML(TURNOS_TEXTO[i.Turno] || i.Turno || "Sin dato")}</p>
    </article>
  `;

  if (esPermisoOficialTexto(i.TipoIncidencia)) {
    html += renderDetallePermisoOficial(i);
  } else {
    html += `
      <article class="data-card">
        <h2 class="section-title">Periodo autorizado</h2>
        <p class="data-card-text"><strong>Fecha inicio:</strong> ${formatearFecha(i.FechaInicio)}</p>
        <p class="data-card-text"><strong>Fecha fin:</strong> ${formatearFecha(i.FechaFin)}</p>
      </article>
    `;
  }

  if (i.LicenciaMedica) {
    html += `
      <article class="data-card">
        <h2 class="section-title">Licencia médica</h2>
        <p class="data-card-text">${escapeHTML(i.LicenciaMedica)}</p>
      </article>
    `;
  }

  html += `
    <article class="data-card">
      <h2 class="section-title">Observaciones</h2>
      <p class="data-card-text">${escapeHTML(i.Observaciones || "Sin observaciones.")}</p>
    </article>

    <article class="data-card">
      <h2 class="section-title">Sello de auditoría</h2>
      <p class="data-card-text"><strong>Registrado por ID:</strong> ${escapeHTML(i.RegistradoPor || "Sin dato")}</p>
      <p class="data-card-text"><strong>Fecha de captura:</strong> ${formatearFecha(i.FechaRegistro)}</p>
    </article>
  `;

  if (puedeEditarEnEstaVista && esPermisoOficialTexto(i.TipoIncidencia)) {
    html += `<button class="primary-button" onclick="abrirEdicionUsoPermiso()">Editar uso de permiso oficial</button>`;
  }

  if (puedeEliminarEnEstaVista) {
    html += `<button class="danger-button" onclick="eliminarIncidenciaActual()">Eliminar incidencia</button>`;
  }

  html += `
    <section class="access-card">
      <div class="access-icon" data-icon="shield"></div>
      <div>
        <h2 class="access-title">Acceso: ${escapeHTML(currentModule || sessionStorage.getItem("currentActiveModule") || "")}</h2>
        <p class="access-text">${profileMode ? "Consulta personal sin edición." : "Consulta y monitoreo de incidencias."}</p>
      </div>
      <button class="logout-fake" onclick="cerrarSesion()">Cerrar<br>sesión</button>
    </section>
  `;

  document.getElementById("detailContent").innerHTML = html;
  inicializarIconos();
}

function renderDetallePermisoOficial(i) {
  return `
    <article class="data-card">
      <h2 class="section-title">Fechas oficiales autorizadas</h2>
      ${detalleFecha("Fecha Oficial 1", i.FechaOficial1, "Autorizada")}
      ${detalleFecha("Fecha Oficial 2", i.FechaOficial2, "Autorizada")}
      ${detalleFecha("Fecha Oficial 3", i.FechaOficial3, "Autorizada")}
    </article>

    <article class="data-card">
      <h2 class="section-title">Fechas de uso</h2>
      ${detalleFecha("Uso 1", i.Uso1Fecha || "Pendiente", i.Uso1Estado || "Pendiente")}
      ${detalleFecha("Uso 2", i.Uso2Fecha || "Pendiente", i.Uso2Estado || "Pendiente")}
      ${detalleFecha("Uso 3", i.Uso3Fecha || "Pendiente", i.Uso3Estado || "Pendiente")}
    </article>
  `;
}

function detalleFecha(label, fecha, estado) {
  const estadoSeguro = estado || "Pendiente";
  const fechaTexto = fecha === "Pendiente" ? "Pendiente" : formatearFecha(fecha);
  const color = String(estadoSeguro).toLowerCase() === "utilizada" ? cssVar("green") : cssVar("orange");

  return `
    <div class="official-row" style="border:1px solid var(--border);border-radius:12px;padding:9px;margin-bottom:7px;">
      <div class="official-label">${escapeHTML(label)}</div>
      <div>
        <strong>${escapeHTML(fechaTexto)}</strong>
        <span class="tag" style="background:${color};margin-left:6px;">${escapeHTML(estadoSeguro)}</span>
      </div>
    </div>
  `;
}

function abrirEdicionUsoPermiso() {
  const rol = canonicalizarRolLocal(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion") {
    alert("Solo Dirección puede editar permisos oficiales.");
    return;
  }

  document.getElementById("editUseContent").innerHTML = crearTarjetaSimple("Cargando edición...", "Consultando permiso oficial.");
  showScreen("editUseScreen");

  API.obtenerDetalleIncidencia(
    selectedIncidentID,
    function(respuesta) {
      renderEditarUso(respuesta.incidencia);
    },
    function(error) {
      document.getElementById("editUseContent").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
    }
  );
}

function renderEditarUso(i) {
  const html = `
    <section class="data-card">
      <h2 class="section-title">Fechas oficiales autorizadas</h2>
      <p class="section-subtitle">Estas fechas no se modifican.</p>
      ${readonlyFecha("Fecha Oficial 1", i.FechaOficial1)}
      ${readonlyFecha("Fecha Oficial 2", i.FechaOficial2)}
      ${readonlyFecha("Fecha Oficial 3", i.FechaOficial3)}
    </section>

    <section class="data-card">
      <h2 class="section-title color-purple">Fechas de uso</h2>
      <p class="section-subtitle">Solo puedes asignar fechas pendientes.</p>
      ${editUsoRow(1, i.Uso1Fecha, i.Uso1Estado)}
      ${editUsoRow(2, i.Uso2Fecha, i.Uso2Estado)}
      ${editUsoRow(3, i.Uso3Fecha, i.Uso3Estado)}
    </section>

    <section class="info-card">
      <div class="info-icon">i</div>
      <div>
        <h3 class="info-title">Información importante</h3>
        <p class="info-text">Las fechas ya utilizadas no pueden modificarse.</p>
      </div>
    </section>

    <button class="primary-button" onclick="guardarEdicionUso()">Guardar cambios</button>
    <div id="editUseStatus" class="status-box"></div>

    <section class="access-card">
      <div class="access-icon" data-icon="shield"></div>
      <div>
        <h2 class="access-title">Acceso: Dirección</h2>
        <p class="access-text">Edición de fechas de uso pendientes.</p>
      </div>
      <button class="logout-fake" onclick="cerrarSesion()">Cerrar<br>sesión</button>
    </section>
  `;

  document.getElementById("editUseContent").innerHTML = html;
  inicializarIconos();
}

function readonlyFecha(label, fecha) {
  return `
    <div class="official-row">
      <div class="official-label">${escapeHTML(label)}</div>
      <input type="text" value="${escapeHTML(formatearFecha(fecha))}" disabled>
    </div>
  `;
}

function editUsoRow(num, fecha, estado) {
  const utilizada = String(estado || "").toLowerCase() === "utilizada" && Boolean(fecha);

  return `
    <div class="official-row">
      <div class="official-label color-purple">Uso ${num}</div>
      <input id="editUso${num}" type="${utilizada ? "text" : "date"}" value="${utilizada ? escapeHTML(formatearFecha(fecha)) : ""}" ${utilizada ? "disabled" : ""}>
    </div>
  `;
}

function guardarEdicionUso() {
  const rol = canonicalizarRolLocal(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion") {
    alert("Solo Dirección puede editar permisos oficiales.");
    return;
  }

  if (!selectedIncidentID) {
    alert("No hay incidencia seleccionada.");
    return;
  }

  if (!confirm("¿Confirmas guardar las fechas de uso pendientes?")) return;

  const status = document.getElementById("editUseStatus");
  status.className = "status-box show";
  status.textContent = "Guardando cambios...";

  const datos = {
    Uso1Fecha: valorInput("editUso1"),
    Uso2Fecha: valorInput("editUso2"),
    Uso3Fecha: valorInput("editUso3")
  };

  API.guardarUsosPermisoOficial(
    selectedIncidentID,
    datos,
    function() {
      status.className = "status-box show ok";
      status.textContent = "Cambios guardados correctamente.";
      setTimeout(function() {
        abrirDetalleIncidencia(selectedIncidentID);
      }, 800);
    },
    function(error) {
      status.className = "status-box show error";
      status.textContent = obtenerMensajeError(error);
    }
  );
}

function valorInput(id) {
  const el = document.getElementById(id);
  return el && !el.disabled ? el.value : "";
}

function eliminarIncidenciaActual() {
  const rol = canonicalizarRolLocal(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion") {
    alert("Solo Dirección puede eliminar incidencias.");
    return;
  }

  if (!selectedIncidentID) {
    alert("No hay incidencia seleccionada.");
    return;
  }

  if (!confirm("¿Confirmas eliminar esta incidencia?")) return;

  API.eliminarIncidencia(
    selectedIncidentID,
    function() {
      alert("Incidencia eliminada correctamente.");
      selectedIncidentID = "";
      openTipoIncidencia();
    },
    function(error) {
      alert(obtenerMensajeError(error));
    }
  );
}

function openTipoIncidencia() {
  profileMode = false;

  const rol = canonicalizarRolLocal(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion") {
    alert("Solo Dirección puede registrar incidencias.");
    return;
  }

  const list = document.getElementById("typeList");

  if (!list) {
    alert("No se encontró la lista de tipos de incidencia en el index.");
    return;
  }

  list.innerHTML = "";

  const typeAccess = document.getElementById("typeAccessName");
  if (typeAccess) {
    typeAccess.textContent = currentModule || "Direccion";
  }

  PERMISSION_TYPES.forEach(function(tipo) {
    const card = document.createElement("button");
    card.className = "type-card";
    card.onclick = function() {
      abrirFormularioTipo(tipo.nombre);
    };
    card.innerHTML = `
      <div class="type-icon solid-${tipo.color}" data-icon="${tipo.icono}"></div>
      <div>
        <h2 class="type-title color-${tipo.color}">${escapeHTML(tipo.nombre)}</h2>
        <p class="type-desc">${escapeHTML(tipo.descripcion)}</p>
      </div>
      <div class="type-arrow color-${tipo.color}">›</div>
    `;
    list.appendChild(card);
  });

  showScreen("typeScreen");
  inicializarIconos();
}

function buscarTipo(nombre) {
  return PERMISSION_TYPES.find(function(tipo) {
    return tipo.nombre === nombre;
  }) || PERMISSION_TYPES[0];
}

function abrirFormularioTipo(nombreTipo) {
  const rol = canonicalizarRolLocal(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion") {
    alert("Solo Dirección puede registrar incidencias.");
    return;
  }

  selectedType = buscarTipo(nombreTipo);

  document.getElementById("formTitle").textContent = selectedType.nombre;
  document.getElementById("formTitle").className = `page-title color-${selectedType.color}`;
  document.getElementById("formSubtitle").textContent = selectedType.descripcion;
  document.getElementById("formAccessName").textContent = currentModule || "Direccion";

  const brand = document.getElementById("formBrandIcon");
  brand.className = `brand-icon solid-${selectedType.color}`;
  brand.setAttribute("data-icon", selectedType.icono);

  limpiarFormulario();
  cargarUsuariosFormulario();
  actualizarFormularioPorTipo();

  showScreen("formScreen");
  inicializarIconos();
}

function limpiarFormulario() {
  document.getElementById("formUsuario").innerHTML = `<option value="">Cargando docentes...</option>`;
  document.getElementById("formFechaInicio").value = "";
  document.getElementById("formFechaFin").value = "";
  document.getElementById("formLicencia").value = "";
  document.getElementById("formObservaciones").value = "";
  document.getElementById("fechaOficial1").value = "";
  document.getElementById("fechaOficial2").value = "";
  document.getElementById("fechaOficial3").value = "";
  document.getElementById("uso1Fecha").value = "";
  document.getElementById("uso2Fecha").value = "";
  document.getElementById("uso3Fecha").value = "";

  const status = document.getElementById("formStatus");
  status.className = "status-box";
  status.textContent = "";
}

function cargarUsuariosFormulario() {
  API.obtenerUsuariosParaFormulario(
    function(usuarios) {
      const select = document.getElementById("formUsuario");
      select.innerHTML = `<option value="">Seleccionar docente</option>`;

      (usuarios || []).forEach(function(usuario) {
        const idAcceso = usuario.IDAcceso || "";

        if (!idAcceso) return;

        const option = document.createElement("option");
        option.value = idAcceso;
        option.textContent = `${usuario.Apellidos || ""} ${usuario.Nombre || ""} (${TURNOS_TEXTO[usuario.Turno] || usuario.Turno || "Sin turno"})`.trim();
        select.appendChild(option);
      });
    },
    function(error) {
      document.getElementById("formUsuario").innerHTML = `<option value="">Error al cargar docentes</option>`;
      mostrarEstadoFormulario(obtenerMensajeError(error), true);
    }
  );
}

function actualizarFormularioPorTipo() {
  document.getElementById("formNormalDates").style.display = selectedType && selectedType.oficial ? "none" : "block";
  document.getElementById("formPermisoOficial").style.display = selectedType && selectedType.oficial ? "block" : "none";
  document.getElementById("grupoLicenciaMedica").style.display = selectedType && selectedType.medico ? "grid" : "none";
  document.getElementById("formInfoText").textContent = selectedType && selectedType.oficial
    ? "Un permiso oficial puede contener hasta tres fechas autorizadas."
    : "La fecha de inicio y fin pueden ser el mismo día.";
}

function guardarFormulario() {
  const rol = canonicalizarRolLocal(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion") {
    mostrarEstadoFormulario("Solo Dirección puede guardar incidencias.", true);
    return;
  }

  const datos = {
    IDUsuario: document.getElementById("formUsuario").value,
    TipoIncidencia: selectedType ? selectedType.nombre : "",
    FechaInicio: document.getElementById("formFechaInicio").value,
    FechaFin: document.getElementById("formFechaFin").value,
    LicenciaMedica: document.getElementById("formLicencia").value,
    Observaciones: document.getElementById("formObservaciones").value,
    FechaOficial1: document.getElementById("fechaOficial1").value,
    FechaOficial2: document.getElementById("fechaOficial2").value,
    FechaOficial3: document.getElementById("fechaOficial3").value,
    Uso1Fecha: document.getElementById("uso1Fecha").value,
    Uso2Fecha: document.getElementById("uso2Fecha").value,
    Uso3Fecha: document.getElementById("uso3Fecha").value
  };

  if (!datos.IDUsuario) {
    mostrarEstadoFormulario("Selecciona un docente.", true);
    return;
  }

  if (!datos.TipoIncidencia) {
    mostrarEstadoFormulario("Selecciona el tipo de incidencia.", true);
    return;
  }

  if (selectedType.oficial && !datos.FechaOficial1) {
    mostrarEstadoFormulario("El permiso oficial requiere al menos Fecha Oficial 1.", true);
    return;
  }

  if (!selectedType.oficial && (!datos.FechaInicio || !datos.FechaFin)) {
    mostrarEstadoFormulario("Selecciona fecha de inicio y fecha de fin.", true);
    return;
  }

  if (!selectedType.oficial && datos.FechaInicio > datos.FechaFin) {
    mostrarEstadoFormulario("La fecha de inicio no puede ser posterior a la fecha de fin.", true);
    return;
  }

  if (!confirm("¿Confirmas guardar esta incidencia?")) {
    return;
  }

  mostrarEstadoFormulario("Guardando incidencia...", false);

  API.guardarIncidencia(
    datos,
    function(incidencia) {
      mostrarEstadoFormulario(`Incidencia guardada correctamente: ${incidencia.IDIncidencia}`, false, true);
      selectedIncidentID = incidencia.IDIncidencia;
      selectedPersonID = incidencia.IDUsuario;
      setTimeout(function() {
        abrirDetalleIncidenciaDesdeCreacion(incidencia.IDIncidencia);
      }, 900);
    },
    function(error) {
      mostrarEstadoFormulario(obtenerMensajeError(error), true);
    }
  );
}

function crearCardIncidencia(incidencia, conDetalle) {
  const nombreCompleto = `${incidencia.Nombre || ""} ${incidencia.Apellidos || ""}`.trim();
  const fechaInicio = formatearFecha(incidencia.FechaInicio);
  const fechaFin = formatearFecha(incidencia.FechaFin);
  const meta = iconMeta(incidencia.TipoIncidencia);

  const card = document.createElement("article");
  card.className = "incident-card";

  let botonDetalle = `<div></div>`;

  if (conDetalle !== false) {
    botonDetalle = `<button class="detail-button" onclick="abrirDetalleIncidencia('${escapeHTML(incidencia.IDIncidencia || "")}')">Ver detalle</button>`;
  }

  card.innerHTML = `
    <div class="person-avatar" data-icon="user"></div>
    <div class="incident-avatar solid-${meta.color}" data-icon="${meta.icono}"></div>
    <div>
      <h2 class="incident-name">${escapeHTML(nombreCompleto || "Sin nombre")}</h2>
      <span class="tag" style="background:${cssVar(meta.color)};">${escapeHTML(incidencia.TipoIncidencia || meta.name || "Incidencia")}</span>
      <p class="incident-detail">${escapeHTML(fechaInicio)} a ${escapeHTML(fechaFin)}</p>
      <p class="incident-detail"><strong>ID Incidencia:</strong> ${escapeHTML(incidencia.IDIncidencia || "Sin ID")}</p>
    </div>
    ${botonDetalle}
  `;

  return card;
}

function mostrarEstadoFormulario(mensaje, esError, esOk) {
  const status = document.getElementById("formStatus");

  if (!status) {
    if (esError) alert(mensaje);
    return;
  }

  status.className = "status-box show";

  if (esError) {
    status.classList.add("error");
  }

  if (esOk) {
    status.classList.add("ok");
  }

  status.textContent = mensaje;
}

function esPermisoOficialTexto(tipo) {
  return String(tipo || "").trim().toLowerCase() === "permiso oficial";
}

function esPermisoOfTexto(tipo) {
  return esPermisoOficialTexto(tipo);
}

function canonicalizarRolLocal(valor) {
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
