function abrirMiPerfil() {
  profileMode = true;
  // Ya no usamos TEST_USERS, usamos el ID obtenido de la sesión segura
  const id = sessionStorage.getItem("userIDAcceso");
  if (id) {
    cargarResumenPersona(id);
  } else {
    cerrarSesion();
  }
}

function abrirSelectorHistorial() {
  profileMode = false;
  const select = document.getElementById("historyPersonSelect");
  select.innerHTML = `<option value="">Cargando docentes...</option>`;

  API.obtenerUsuariosParaFormulario(
    usuarios => {
      select.innerHTML = `<option value="">Seleccionar docente</option>`;
      usuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.ID;
        option.textContent = `${usuario.Apellidos} ${usuario.Nombre}`;
        select.appendChild(option);
      });
    },
    error => {
      select.innerHTML = `<option value="">Error al cargar docentes</option>`;
      alert(obtenerMensajeError(error));
    }
  );
  showScreen("historySelectScreen");
}

function continuarHistorialPersona() {
  const id = document.getElementById("historyPersonSelect").value;
  if (!id) {
    alert("Selecciona un docente.");
    return;
  }
  profileMode = false;
  cargarResumenPersona(id);
}

function cargarResumenPersona(idPersona) {
  selectedPersonID = idPersona;
  document.getElementById("personSummaryContent").innerHTML = crearTarjetaSimple("Cargando resumen...", "Consultando base de datos.");
  showScreen("personSummaryScreen");

  API.obtenerResumenPersona(
    idPersona,
    renderResumenPersona,
    error => {
      document.getElementById("personSummaryContent").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
    }
  );
}

function renderResumenPersona(respuesta) {
  const p = respuesta.persona;
  const e = respuesta.estadisticas;
  const ultima = respuesta.ultimaIncidencia ? formatearFecha(respuesta.ultimaIncidencia.FechaInicio) : "Sin registros";

  const tituloOpciones = profileMode ? "Mi historial" : "Opciones de consulta";
  const descripcionHistorial = profileMode ? "Ver mi historial personal completo." : "Ver todas las incidencias registradas.";
  
  const html = `
        <article class="data-card">
          <div class="summary-header">
            <div class="big-avatar" data-icon="user"></div>
            <div>
              <h2 class="data-card-title">${escapeHTML(p.Nombre)} ${escapeHTML(p.Apellidos)}</h2>
              <p class="data-card-text"><strong>Turno:</strong> ${TURNOS_TEXTO[p.Turno] || p.Turno}</p>
              <p class="data-card-text"><strong>ID:</strong> ${escapeHTML(p.ID)}</p>
              <p class="data-card-text"><strong>Última incidencia:</strong> ${ultima}</p>
            </div>
          </div>

          <h2 class="section-title">Estadísticas rápidas</h2>
          <section class="stat-grid">
            ${statMini(e.total, "Total<br>incidencias", "blue", "humanitario-sindical")}
            ${statMini(e.permisosOficiales, "Permisos<br>oficiales", "purple", "permiso-oficial")}
            ${statMini(e.incapacidades, "Incapacidades", "blue", "incapacidad")}
            ${statMini(e.comisiones, "Comisiones", "blue-soft", "comision-oficial")}
            ${statMini(e.otras, "Otras", "gold", "especial")}
          </section>

          <h2 class="section-title">${tituloOpciones}</h2>
          ${optionCard("Historial completo", descripcionHistorial, "green", "history", "cargarHistorialPersona('todas')")}
          ${optionCard("Próximas incidencias", "Consultar incidencias futuras programadas.", "blue", "calendar", "cargarHistorialPersona('proximas')")}
          ${optionCard("Estadística mensual", "Consultar gráfica mensual por tipo de incidencia.", "orange", "report", "abrirEstadisticaMensual()")}
        </article>

        <section class="info-card">
          <div class="info-icon">i</div>
          <div>
            <h3 class="info-title">Información</h3>
            <p class="info-text">${profileMode ? "Este apartado es personal y solo de consulta." : "Seleccione una opción para consultar información detallada."}</p>
          </div>
        </section>

        <section class="access-card">
          <div class="access-icon" data-icon="shield"></div>
          <div>
            <h2 class="access-title">Acceso: ${currentModule}</h2>
            <p class="access-text">${profileMode ? "Consulta personal sin edición." : "Consulta de historial e incidencias del docente."}</p>
          </div>
          <button class="logout-fake" onclick="cerrarSesion()">Cerrar<br>sesión</button>
        </section>
      `;
  document.getElementById("personSummaryContent").innerHTML = html;
  inicializarIconos();
}

function statMini(num, label, color, icono) {
  return `
        <article class="stat-small bg-${color}">
          <div class="mini-icon color-${color}" data-icon="${icono}"></div>
          <div class="stat-num color-${color}">${num}</div>
          <div class="stat-label">${label}</div>
        </article>
      `;
}

function optionCard(title, desc, color, icon, action) {
  return `
        <button class="professional-card" onclick="${action}" style="margin-bottom:8px;">
          <div class="professional-icon solid-${color}" data-icon="${icon}"></div>
          <div>
            <h2 class="professional-title color-${color}">${title}</h2>
            <p class="professional-desc">${desc}</p>
          </div>
          <div class="professional-arrow color-${color}">›</div>
        </button>
      `;
}

function cargarHistorialPersona(filtro) {
  document.getElementById("dataTitle").textContent = filtro === "proximas" ? "Próximas incidencias" : "Historial completo";
  document.getElementById("dataSubtitle").textContent = "Consulta de incidencias registradas.";
  document.getElementById("dataStats").innerHTML = "";
  document.getElementById("dataList").innerHTML = crearTarjetaSimple("Cargando historial...", "Consultando base de datos.");
  document.getElementById("dataAccessName").textContent = currentModule;
  document.getElementById("dataBrandIcon").className = "brand-icon solid-green";
  document.getElementById("dataBrandIcon").setAttribute("data-icon", "history");
  showScreen("dataScreen");

  API.obtenerHistorialPersona(selectedPersonID, filtro,
    respuesta => {
      document.getElementById("dataSubtitle").textContent = `${respuesta.persona.Nombre} ${respuesta.persona.Apellidos}`;
      renderHistorialConDetalles(respuesta.incidencias);
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
  incidencias.forEach(incidencia => {
    container.appendChild(crearCardIncidencia(incidencia, true));
  });
  inicializarIconos();
}

function abrirDetalleIncidencia(idIncidencia) {
  selectedIncidentID = idIncidencia;
  document.getElementById("detailContent").innerHTML = crearTarjetaSimple("Cargando detalle...", "Consultando base de datos.");
  showScreen("detailScreen");

  API.obtenerDetalleIncidencia(idIncidencia,
    renderDetalleIncidencia,
    error => {
      document.getElementById("detailContent").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
    }
  );
}

function renderDetalleIncidencia(respuesta) {
  const i = respuesta.incidencia;
  const meta = iconMeta(i.TipoIncidencia);
  const puedeEditarEnEstaVista = respuesta.puedeEditar && !profileMode;
  const puedeEliminarEnEstaVista = respuesta.puedeEliminar && !profileMode;

  document.getElementById("detailBrandIcon").className = `brand-icon solid-${meta.color}`;
  document.getElementById("detailBrandIcon").setAttribute("data-icon", meta.icono);
  
  let html = `
        <article class="data-card">
          <div style="display:grid;grid-template-columns:60px 1fr;gap:12px;align-items:center;">
            <div class="mini-icon solid-${meta.color}" data-icon="${meta.icono}"></div>
            <div>
              <h2 class="data-card-title color-${meta.color}">${escapeHTML(i.TipoIncidencia || meta.nombre)}</h2>
              <p class="data-card-text"><strong>ID:</strong> ${escapeHTML(i.IDIncidencia)}</p>
              <span class="tag" style="background:${cssVar('green')};">Activo</span>
            </div>
          </div>
        </article>

        <article class="data-card">
          <h2 class="section-title">Docente</h2>
          <p class="data-card-text"><strong>${escapeHTML(i.Nombre)} ${escapeHTML(i.Apellidos)}</strong></p>
          <p class="data-card-text"><strong>ID:</strong> ${escapeHTML(i.IDUsuario)}</p>
          <p class="data-card-text"><strong>Turno:</strong> ${TURNOS_TEXTO[i.Turno] || i.Turno}</p>
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
          <h2 class="section-title">Capturó</h2>
          <p class="data-card-text"><strong>${escapeHTML(i.RegistradoPor || "Sin dato")}</strong></p>
          <p class="data-card-text"><strong>Fecha de captura:</strong> ${formatearFecha(i.FechaRegistro)}</p>
        </article>
      `;

  if (puedeEditarEnEstaVista && i.TipoIncidencia && esPermisoOficialTexto(i.TipoIncidencia)) {
    html += `<button class="primary-button" onclick="abrirEdicionUsoPermiso()">Editar incidencia</button>`;
  }

  if (puedeEliminarEnEstaVista) {
    html += `<button class="danger-button" onclick="eliminarIncidenciaActual()">Eliminar incidencia</button>`;
  }

  html += `
        <section class="access-card">
          <div class="access-icon" data-icon="shield"></div>
          <div>
            <h2 class="access-title">Acceso: ${currentModule}</h2>
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
  return `
        <div class="official-row" style="border:1px solid var(--border);border-radius:12px;padding:9px;margin-bottom:7px;">
          <div class="official-label">${escapeHTML(label)}</div>
          <div>
            <strong>${fecha === "Pendiente" ? "Pendiente" : formatearFecha(fecha)}</strong>
            <span class="tag" style="background:${estado === "Utilizada" ? cssVar("green") : cssVar("orange")};margin-left:6px;">${escapeHTML(estado)}</span>
          </div>
        </div>
      `;
}

function abrirEdicionUsoPermiso() {
  document.getElementById("editUseContent").innerHTML = crearTarjetaSimple("Cargando edición...", "Consultando permiso oficial.");
  showScreen("editUseScreen");

  API.obtenerDetalleIncidencia(selectedIncidentID,
    respuesta => renderEditarUso(respuesta.incidencia),
    error => {
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
          <div class="official-label">${label}</div>
          <input type="text" value="${formatearFecha(fecha)}" disabled>
        </div>
      `;
}

function editUsoRow(num, fecha, estado) {
  const utilizada = String(estado || "").toLowerCase() === "utilizada" && fecha;
  return `
        <div class="official-row">
          <div class="official-label color-purple">Uso ${num}</div>
          <input id="editUso${num}" type="${utilizada ? "text" : "date"}" value="${utilizada ? formatearFecha(fecha) : ""}" ${utilizada ? "disabled" : ""}>
        </div>
      `;
}

function guardarEdicionUso() {
  if (!confirm("¿Confirmas guardar las fechas de uso pendientes?")) return;

  const status = document.getElementById("editUseStatus");
  status.className = "status-box show";
  status.textContent = "Guardando cambios...";

  const datos = {
    Uso1Fecha: valorInput("editUso1"),
    Uso2Fecha: valorInput("editUso2"),
    Uso3Fecha: valorInput("editUso3")
  };

  API.guardarUsosPermisoOficial(selectedIncidentID, datos,
    () => {
      status.className = "status-box show ok";
      status.textContent = "Cambios guardados correctamente.";
      setTimeout(() => abrirDetalleIncidencia(selectedIncidentID), 800);
    },
    error => {
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
  if (!confirm("¿Confirmas eliminar esta incidencia?")) return;

  API.eliminarIncidencia(selectedIncidentID,
    () => {
      alert("Incidencia eliminada correctamente.");
      cargarResumenPersona(selectedPersonID);
    },
    error => alert(obtenerMensajeError(error))
  );
}

function openTipoIncidencia() {
  profileMode = false;
  const list = document.getElementById("typeList");
  list.innerHTML = "";
  document.getElementById("typeAccessName").textContent = currentModule;

  PERMISSION_TYPES.forEach(tipo => {
    const card = document.createElement("button");
    card.className = "type-card";
    card.onclick = () => abrirFormularioTipo(tipo.nombre);
    card.innerHTML = `
          <div class="type-icon solid-${tipo.color}" data-icon="${tipo.icono}"></div>
          <div>
            <h2 class="type-title color-${tipo.color}">${tipo.nombre}</h2>
            <p class="type-desc">${tipo.descripcion}</p>
          </div>
          <div class="type-arrow color-${tipo.color}">›</div>
        `;
    list.appendChild(card);
  });
  showScreen("typeScreen");
}

function buscarTipo(nombre) {
  return PERMISSION_TYPES.find(tipo => tipo.nombre === nombre) || PERMISSION_TYPES[0];
}

function abrirFormularioTipo(nombreTipo) {
  selectedType = buscarTipo(nombreTipo);
  document.getElementById("formTitle").textContent = selectedType.nombre;
  document.getElementById("formTitle").className = `page-title color-${selectedType.color}`;
  document.getElementById("formSubtitle").textContent = selectedType.descripcion;
  document.getElementById("formAccessName").textContent = currentModule;

  const brand = document.getElementById("formBrandIcon");
  brand.className = `brand-icon solid-${selectedType.color}`;
  brand.setAttribute("data-icon", selectedType.icono);
  limpiarFormulario();
  cargarUsuariosFormulario();
  actualizarFormularioPorTipo();

  showScreen("formScreen");
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
    usuarios => {
      const select = document.getElementById("formUsuario");
      select.innerHTML = `<option value="">Seleccionar docente</option>`;
      usuarios.forEach(usuario => {
        const option = document.createElement("option");
        option.value = usuario.ID;
        option.textContent = `${usuario.Apellidos} ${usuario.Nombre}`;
        select.appendChild(option);
      });
    },
    error => {
      document.getElementById("formUsuario").innerHTML = `<option value="">Error al cargar docentes</option>`;
      mostrarEstadoFormulario(obtenerMensajeError(error), true);
    }
  );
}

function actualizarFormularioPorTipo() {
  document.getElementById("formNormalDates").style.display = selectedType && selectedType.oficial ? "none" : "block";
  document.getElementById("formPermisoOficial").style.display = selectedType && selectedType.oficial ? "block" : "none";
  document.getElementById("grupoLicenciaMedica").style.display = selectedType && selectedType.medico ? "grid" : "none";
  document.getElementById("formInfoText").textContent = selectedType && selectedType.oficial ? "Un permiso oficial puede contener hasta tres fechas autorizadas." : "La fecha de inicio y fin pueden ser el mismo día.";
}

function guardarFormulario() {
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

  if (!datos.IDUsuario) { mostrarEstadoFormulario("Selecciona un docente.", true); return; }
  if (!datos.TipoIncidencia) { mostrarEstadoFormulario("Selecciona el tipo de incidencia.", true); return; }
  if (selectedType.oficial && !datos.FechaOficial1) { mostrarEstadoFormulario("El permiso oficial requiere al menos Fecha Oficial 1.", true); return; }
  if (!selectedType.oficial && (!datos.FechaInicio || !datos.FechaFin)) { mostrarEstadoFormulario("Selecciona fecha de inicio y fecha de fin.", true); return; }

  mostrarEstadoFormulario("Guardando incidencia...", false);

  API.guardarIncidencia(datos,
    incidencia => {
      mostrarEstadoFormulario(`Incidencia guardada correctamente: ${incidencia.IDIncidencia}`, false, true);
      selectedIncidentID = incidencia.IDIncidencia;
      selectedPersonID = incidencia.IDUsuario;
      setTimeout(() => abrirDetalleIncidencia(incidencia.IDIncidencia), 900);
    },
    error => {
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
  card.innerHTML = `
        <div class="person-avatar" data-icon="user"></div>
        <div class="incident-avatar solid-${meta.color}" data-icon="${meta.icono}"></div>
        <div>
          <h2 class="incident-name">${escapeHTML(nombreCompleto || "Sin nombre")}</h2>
          <span class="tag" style="background:${cssVar(meta.color)};">${escapeHTML(incidencia.TipoIncidencia || meta.nombre)}</span>
          <p class="incident-detail">${fechaInicio} a ${fechaFin}</p>
          <p class="incident-detail"><strong>ID:</strong> ${escapeHTML(incidencia.IDIncidencia || "Sin ID")}</p>
        </div>
        <button class="detail-button" onclick="abrirDetalleIncidencia('${escapeHTML(incidencia.IDIncidencia)}')">Ver detalle</button>
      `;
  return card;
}
