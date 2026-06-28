function cargarReporteDia() {
  profileMode = false;
  // Dependencia de inicialización o interfaz: prepararDataScreen
  prepararDataScreen("Reporte del día", "Incidencias activas para la fecha seleccionada", "report", "blue-light");

  google.script.run
    .withSuccessHandler(renderReporteDia)
    .withFailureHandler(renderError) // Dependencia de interfaz: renderError
    .obtenerReporteDia(currentModule, TEST_USERS[currentModule]);
}

function renderReporteDia(respuesta) {
  // Dependencia de interfaz: formatearFecha
  document.getElementById("dataSubtitle").textContent = `Fecha consultada: ${formatearFecha(respuesta.fecha)}`;
  document.getElementById("dataStats").innerHTML = crearStatsHTML(respuesta.presentes, respuesta.ausentes);

  document.getElementById("dataList").innerHTML = `
        <h2 class="section-title">Incidencias activas</h2>
        <p class="section-subtitle">Fechas cercanas al periodo consultado.</p>
      `;
  renderListaIncidenciasEn("dataList", respuesta.incidencias, "No hay incidencias activas para este día.");
}

function cargarReporteSemanal() {
  profileMode = false;
  // Dependencia de inicialización o interfaz: prepararDataScreen
  prepararDataScreen("Reporte semanal", "Fechas cercanas al periodo consultado.", "calendar", "blue");

  google.script.run
    .withSuccessHandler(renderReporteSemanal)
    .withFailureHandler(renderError) // Dependencia de interfaz: renderError
    .obtenerReporteSemanal(currentModule, TEST_USERS[currentModule]);
}

function renderReporteSemanal(respuesta) {
  // Dependencia de interfaz: formatearFecha
  document.getElementById("dataSubtitle").textContent = `${formatearFecha(respuesta.fechaInicio)} a ${formatearFecha(respuesta.fechaFin)}`;
  document.getElementById("dataStats").innerHTML = crearStatsHTML(respuesta.presentes, respuesta.ausentes);

  const lista = document.getElementById("dataList");

  lista.innerHTML = `
        <h2 class="section-title">Incidencias de la semana</h2>
        <p class="section-subtitle">Fechas cercanas al periodo consultado.</p>
      `;
  if (!respuesta.incidencias || respuesta.incidencias.length === 0) {
    // Dependencia de interfaz: crearTarjetaSimple
    lista.innerHTML += crearTarjetaSimple("Sin registros", "No hay incidencias activas en esta semana.");
    // Dependencia de interfaz: inicializarIconos
    inicializarIconos();
    return;
  }

  respuesta.incidencias.forEach(incidencia => {
    // Dependencia de incidencias: crearCardIncidencia
    lista.appendChild(crearCardIncidencia(incidencia, true));
  });
  // Dependencia de interfaz: inicializarIconos
  inicializarIconos();
}

function abrirConsultaFechas() {
  profileMode = false;
  document.getElementById("rangeFechaInicio").value = "";
  document.getElementById("rangeFechaFin").value = "";
  document.getElementById("rangeStats").innerHTML = "";
  document.getElementById("rangeResults").innerHTML = "";
  document.getElementById("rangeStatus").className = "status-box";
  // Dependencia de interfaz: showScreen
  showScreen("rangeScreen");
}

function ejecutarConsultaFechas() {
  const fechaInicio = document.getElementById("rangeFechaInicio").value;
  const fechaFin = document.getElementById("rangeFechaFin").value;
  const status = document.getElementById("rangeStatus");
  status.className = "status-box show";
  status.textContent = "Consultando fechas...";

  google.script.run
    .withSuccessHandler(renderConsultaFechas)
    .withFailureHandler(error => {
      status.className = "status-box show error";
      // Dependencia de interfaz: obtenerMensajeError
      status.textContent = obtenerMensajeError(error);
    })
    .consultarFechas({ FechaInicio: fechaInicio, FechaFin: fechaFin }, currentModule, TEST_USERS[currentModule]);
}

function renderConsultaFechas(respuesta) {
  const status = document.getElementById("rangeStatus");
  const results = document.getElementById("rangeResults");
  const total = respuesta.incidencias ? respuesta.incidencias.length : 0;

  // Dependencia de interfaz: formatearFecha
  status.className = "status-box show ok";
  status.textContent = `Consulta realizada: ${formatearFecha(respuesta.fechaInicio)} a ${formatearFecha(respuesta.fechaFin)}.
Registros encontrados: ${total}.`;

  document.getElementById("rangeStats").innerHTML = crearStatsHTML(respuesta.presentes, respuesta.ausentes);

  results.innerHTML = `
        <h2 class="section-title">Resultados</h2>
        <p class="section-subtitle">Fechas cercanas al periodo consultado.</p>
      `;
  if (total === 0) {
    // Dependencia de interfaz: crearTarjetaSimple
    results.innerHTML += crearTarjetaSimple("Sin resultados", "No se encontraron permisos en esas fechas.");
    return;
  }

  respuesta.incidencias.forEach(incidencia => {
    // Dependencia de incidencias: crearCardIncidencia
    results.appendChild(crearCardIncidencia(incidencia, true));
  });
  // Dependencia de interfaz: inicializarIconos
  inicializarIconos();
}

function abrirEstadisticaMensual() {
  const hoy = new Date();
  document.getElementById("statMes").value = String(hoy.getMonth() + 1);
  document.getElementById("statAnio").value = String(hoy.getFullYear());
  document.getElementById("statMonthStatus").className = "status-box";
  document.getElementById("statMonthStatus").textContent = "";
  document.getElementById("statMonthResults").innerHTML = "";
  // Dependencia de interfaz: showScreen
  showScreen("statMonthScreen");
}

function consultarEstadisticaMensual() {
  const mes = document.getElementById("statMes").value;
  const anio = document.getElementById("statAnio").value;
  const status = document.getElementById("statMonthStatus");

  if (!mes || !anio) {
    status.className = "status-box show error";
    status.textContent = "Selecciona mes y año.";
    return;
  }

  status.className = "status-box show";
  status.textContent = "Consultando estadística mensual...";

  google.script.run
    .withSuccessHandler(renderEstadisticaMensual)
    .withFailureHandler(error => {
      status.className = "status-box show error";
      // Dependencia de interfaz: obtenerMensajeError
      status.textContent = obtenerMensajeError(error);
    })
    .obtenerEstadisticaMensual(selectedPersonID, currentModule, TEST_USERS[currentModule], mes, anio);
}

function renderEstadisticaMensual(respuesta) {
  const status = document.getElementById("statMonthStatus");
  const container = document.getElementById("statMonthResults");
  status.className = "status-box show ok";
  status.textContent = `Consulta realizada: ${respuesta.mes}/${respuesta.anio}`;
  if (!respuesta.total || respuesta.total === 0) {
    // Dependencia de interfaz: crearTarjetaSimple
    container.innerHTML = crearTarjetaSimple("Mes sin incidencias", "No se encontraron incidencias para el mes seleccionado.");
    return;
  }

  const maximo = Math.max(...respuesta.datos.map(item => item.cantidad), 1);

  let bars = "";
  respuesta.datos.forEach(item => {
    // Dependencia de interfaz: iconMeta, escapeHTML
    const meta = iconMeta(item.tipo);
    const altura = item.cantidad === 0 ? 3 : Math.max(8, Math.round((item.cantidad / maximo) * 160));
    bars += `
          <div class="bar-item">
            <div class="bar-value">${item.cantidad}</div>
            <div class="bar solid-${meta.color}" style="height:${altura}px;"></div>
            <div class="bar-label">${escapeHTML(abreviarTipo(item.tipo))}</div>
           </div>
        `;
  });
  // Dependencia de interfaz: escapeHTML
  container.innerHTML = `
        <article class="data-card">
          <h2 class="data-card-title">Resumen mensual</h2>
          <p class="data-card-text"><strong>Persona:</strong> ${escapeHTML(respuesta.persona.Nombre)} ${escapeHTML(respuesta.persona.Apellidos)}</p>
          <p class="data-card-text"><strong>Periodo:</strong> ${respuesta.mes}/${respuesta.anio}</p>
          <p class="data-card-text"><strong>Total de incidencias:</strong> ${respuesta.total}</p>
          <p class="data-card-text"><strong>Tipo más frecuente:</strong> ${escapeHTML(respuesta.tipoMasFrecuente)}</p>
        </article>

        <section class="chart-wrap">
           <h2 class="section-title">Gráfica mensual</h2>
          <p class="section-subtitle">Cantidad de incidencias por tipo.</p>

          <div class="chart-area">
            <div class="chart-y">Cantidad</div>
            <div class="bars">${bars}</div>
          </div>

          <div class="chart-axis-label">Tipo de incidencia</div>
        </section>
      `;
  // Dependencia de interfaz: inicializarIconos
  inicializarIconos();
}

function abreviarTipo(tipo) {
  if (tipo === "Permiso oficial") return "Permiso";
  if (tipo === "Incapacidad") return "Incap.";
  if (tipo === "Humanitario sindical") return "Hum. Sind.";
  if (tipo === "Humanitario oficial") return "Hum. Ofic.";
  if (tipo === "Comisión sindical") return "Com. Sind.";
  if (tipo === "Comisión oficial") return "Com. Ofic.";
  if (tipo === "Especial") return "Especial";
  return tipo;
}

function prepararDataScreen(titulo, subtitulo, icono, color) {
  document.getElementById("dataTitle").textContent = titulo;
  document.getElementById("dataSubtitle").textContent = subtitulo;
  document.getElementById("dataAccessName").textContent = currentModule;
  document.getElementById("dataStats").innerHTML = "";
  // Dependencia de interfaz: crearTarjetaSimple
  document.getElementById("dataList").innerHTML = crearTarjetaSimple("Cargando información...", "Consultando Google Sheets.");
  document.getElementById("dataBrandIcon").className = `brand-icon solid-${color || "blue"}`;
  document.getElementById("dataBrandIcon").setAttribute("data-icon", icono);
  // Dependencia de interfaz: showScreen
  showScreen("dataScreen");
}

function renderListaIncidenciasEn(idContenedor, incidencias, mensajeVacio) {
  const lista = document.getElementById(idContenedor);
  if (!incidencias || incidencias.length === 0) {
    // Dependencia de interfaz: crearTarjetaSimple
    lista.innerHTML += crearTarjetaSimple("Sin registros", mensajeVacio);
    // Dependencia de interfaz: inicializarIconos
    inicializarIconos();
    return;
  }

  incidencias.forEach(incidencia => {
    // Dependencia de incidencias: crearCardIncidencia
    lista.appendChild(crearCardIncidencia(incidencia, true));
  });
  // Dependencia de interfaz: inicializarIconos
  inicializarIconos();
}

function crearStatsHTML(presentes, ausentes) {
  return `
        <section class="summary-stat-row">
          <article class="summary-big-card presentes">
            <div class="summary-big-icon solid-green" data-icon="user"></div>
            <div>
              <p class="summary-big-title color-green">Presentes</p>
              <p class="summary-big-number color-green">${presentes}</p>
             </div>
          </article>

          <article class="summary-big-card ausentes">
            <div class="summary-big-icon solid-red" data-icon="user"></div>
            <div>
              <p class="summary-big-title color-red">Ausentes</p>
              <p class="summary-big-number color-red">${ausentes}</p>
            </div>
           </article>
        </section>
      `;
}