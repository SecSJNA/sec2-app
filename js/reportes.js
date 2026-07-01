function cargarReporteDia() {
  profileMode = false;
  prepararDataScreen("Reporte del día", "Incidencias activas para la fecha seleccionada", "report", "blue-light");

  API.obtenerReporteDia(
    renderReporteDia,
    renderError
  );
}

function renderReporteDia(respuesta) {
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
  prepararDataScreen("Reporte semanal", "Fechas cercanas al periodo consultado.", "calendar", "blue");

  API.obtenerReporteSemanal(
    renderReporteSemanal,
    renderError
  );
}

function renderReporteSemanal(respuesta) {
  document.getElementById("dataSubtitle").textContent = `${formatearFecha(respuesta.fechaInicio)} a ${formatearFecha(respuesta.fechaFin)}`;
  document.getElementById("dataStats").innerHTML = crearStatsHTML(respuesta.presentes, respuesta.ausentes);

  const lista = document.getElementById("dataList");

  lista.innerHTML = `
    <h2 class="section-title">Incidencias de la semana</h2>
    <p class="section-subtitle">Fechas cercanas al periodo consultado.</p>
  `;
  if (!respuesta.incidencias || respuesta.incidencias.length === 0) {
    lista.innerHTML += crearTarjetaSimple("Sin registros", "No hay incidencias activas en esta semana.");
    inicializarIconos();
    return;
  }

  respuesta.incidencias.forEach(incidencia => {
    lista.appendChild(crearCardIncidencia(incidencia, true));
  });
  inicializarIconos();
}

function abrirConsultaFechas() {
  profileMode = false;
  document.getElementById("rangeFechaInicio").value = "";
  document.getElementById("rangeFechaFin").value = "";
  document.getElementById("rangeStats").innerHTML = "";
  document.getElementById("rangeResults").innerHTML = "";
  document.getElementById("rangeStatus").className = "status-box";
  showScreen("rangeScreen");
}

function ejecutarConsultaFechas() {
  const fechaInicio = document.getElementById("rangeFechaInicio").value;
  const fechaFin = document.getElementById("rangeFechaFin").value;
  const status = document.getElementById("rangeStatus");
  status.className = "status-box show";
  status.textContent = "Consultando fechas...";

  API.consultarFechas(
    { FechaInicio: fechaInicio, FechaFin: fechaFin },
    renderConsultaFechas,
    error => {
      status.className = "status-box show error";
      status.textContent = obtenerMensajeError(error);
    }
  );
}

function renderConsultaFechas(respuesta) {
  const status = document.getElementById("rangeStatus");
  const results = document.getElementById("rangeResults");
  const total = respuesta.incidencias ? respuesta.incidencias.length : 0;

  status.className = "status-box show ok";
  status.textContent = `Consulta realizada: ${formatearFecha(respuesta.fechaInicio)} a ${formatearFecha(respuesta.fechaFin)}. Registros encontrados: ${total}.`;

  document.getElementById("rangeStats").innerHTML = crearStatsHTML(respuesta.presentes, respuesta.ausentes);

  results.innerHTML = `
    <h2 class="section-title">Resultados</h2>
    <p class="section-subtitle">Fechas cercanas al periodo consultado.</p>
  `;
  if (total === 0) {
    results.innerHTML += crearTarjetaSimple("Sin resultados", "No se encontraron permisos en esas fechas.");
    return;
  }

  respuesta.incidencias.forEach(incidencia => {
    results.appendChild(crearCardIncidencia(incidencia, true));
  });
  inicializarIconos();
}

function abrirEstadisticaMensual() {
  const hoy = new Date();
  document.getElementById("statMes").value = String(hoy.getMonth() + 1);
  document.getElementById("statAnio").value = String(hoy.getFullYear());
  document.getElementById("statMonthStatus").className = "status-box";
  document.getElementById("statMonthStatus").textContent = "";
  document.getElementById("statMonthResults").innerHTML = "";
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

  API.obtenerEstadisticaMensual(selectedPersonID, mes, anio,
    renderEstadisticaMensual,
    error => {
      status.className = "status-box show error";
      status.textContent = obtenerMensajeError(error);
    }
  );
}

function renderEstadisticaMensual(respuesta) {
  const status = document.getElementById("statMonthStatus");
  const container = document.getElementById("statMonthResults");
  status.className = "status-box show ok";
  status.textContent = `Consulta realizada: ${respuesta.mes}/${respuesta.anio}`;
  if (!respuesta.total || respuesta.total === 0) {
    container.innerHTML = crearTarjetaSimple("Mes sin incidencias", "No se encontraron incidencias para el mes seleccionado.");
    return;
  }

  const maximo = Math.max(...respuesta.datos.map(item => item.cantidad), 1);

  let bars = "";
  respuesta.datos.forEach(item => {
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
  document.getElementById("dataList").innerHTML = crearTarjetaSimple("Cargando información...", "Consultando Google Sheets.");
  document.getElementById("dataBrandIcon").className = `brand-icon solid-${color || "blue"}`;
  document.getElementById("dataBrandIcon").setAttribute("data-icon", icono);
  showScreen("dataScreen");
}

function renderListaIncidenciasEn(idContenedor, incidencias, mensajeVacio) {
  const lista = document.getElementById(idContenedor);
  if (!incidencias || incidencias.length === 0) {
    lista.innerHTML += crearTarjetaSimple("Sin registros", mensajeVacio);
    inicializarIconos();
    return;
  }

  incidencias.forEach(incidencia => {
    lista.appendChild(crearCardIncidencia(incidencia, true));
  });
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
