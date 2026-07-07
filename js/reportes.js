function cargarReporteDia() {
  profileMode = false;

  const rol = canonicalizarRolReportes(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion" && rol !== "Prefectura") {
    alert("No tienes permiso para consultar el reporte del día.");
    return;
  }

  prepararDataScreen("Reporte del día", "Incidencias activas para la fecha actual.", "report", "blue-light");

  API.obtenerReporteDia(
    renderReporteDia,
    renderError
  );
}

function renderReporteDia(respuesta) {
  const r = respuesta || {};

  document.getElementById("dataSubtitle").textContent = `Fecha consultada: ${formatearFecha(r.fecha)}`;
  document.getElementById("dataStats").innerHTML = crearStatsHTML(r.presentes || 0, r.ausentes || 0);

  document.getElementById("dataList").innerHTML = `
    <h2 class="section-title">Incidencias activas</h2>
    <p class="section-subtitle">Personal con incidencia en la fecha consultada.</p>
  `;

  renderListaIncidenciasEn("dataList", r.incidencias || [], "No hay incidencias activas para este día.");
}

function cargarReporteSemanal() {
  profileMode = false;

  const rol = canonicalizarRolReportes(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion" && rol !== "Prefectura") {
    alert("No tienes permiso para consultar el reporte semanal.");
    return;
  }

  prepararDataScreen("Reporte semanal", "Fechas cercanas al periodo consultado.", "calendar", "blue");

  API.obtenerReporteSemanal(
    renderReporteSemanal,
    renderError
  );
}

function renderReporteSemanal(respuesta) {
  const r = respuesta || {};

  document.getElementById("dataSubtitle").textContent = `${formatearFecha(r.fechaInicio)} a ${formatearFecha(r.fechaFin)}`;
  document.getElementById("dataStats").innerHTML = crearStatsHTML(r.presentes || 0, r.ausentes || 0);

  const lista = document.getElementById("dataList");

  lista.innerHTML = `
    <h2 class="section-title">Incidencias de la semana</h2>
    <p class="section-subtitle">Personal con incidencias dentro del rango semanal.</p>
  `;

  if (!r.incidencias || r.incidencias.length === 0) {
    lista.innerHTML += crearTarjetaSimple("Sin registros", "No hay incidencias activas en esta semana.");
    inicializarIconos();
    return;
  }

  r.incidencias.forEach(function(incidencia) {
    lista.appendChild(crearCardIncidencia(incidencia, true));
  });

  inicializarIconos();
}

function abrirConsultaFechas() {
  profileMode = false;

  const rol = canonicalizarRolReportes(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion" && rol !== "Correspondencia") {
    alert("No tienes permiso para consultar rangos de fechas.");
    return;
  }

  document.getElementById("rangeFechaInicio").value = "";
  document.getElementById("rangeFechaFin").value = "";
  document.getElementById("rangeStats").innerHTML = "";
  document.getElementById("rangeResults").innerHTML = "";

  const status = document.getElementById("rangeStatus");
  status.className = "status-box";
  status.textContent = "";

  showScreen("rangeScreen");
}

function ejecutarConsultaFechas() {
  const rol = canonicalizarRolReportes(sessionStorage.getItem("userRol"));

  if (rol !== "Direccion" && rol !== "Correspondencia") {
    alert("No tienes permiso para consultar rangos de fechas.");
    return;
  }

  const fechaInicio = document.getElementById("rangeFechaInicio").value;
  const fechaFin = document.getElementById("rangeFechaFin").value;
  const status = document.getElementById("rangeStatus");

  if (!fechaInicio || !fechaFin) {
    status.className = "status-box show error";
    status.textContent = "Selecciona fecha inicial y fecha final.";
    return;
  }

  if (fechaInicio > fechaFin) {
    status.className = "status-box show error";
    status.textContent = "La fecha inicial no puede ser posterior a la fecha final.";
    return;
  }

  status.className = "status-box show";
  status.textContent = "Consultando fechas...";

  API.consultarFechas(
    {
      FechaInicio: fechaInicio,
      FechaFin: fechaFin
    },
    renderConsultaFechas,
    function(error) {
      status.className = "status-box show error";
      status.textContent = obtenerMensajeError(error);
    }
  );
}

function renderConsultaFechas(respuesta) {
  const r = respuesta || {};
  const status = document.getElementById("rangeStatus");
  const results = document.getElementById("rangeResults");
  const incidencias = r.incidencias || [];
  const total = incidencias.length;

  status.className = "status-box show ok";
  status.textContent = `Consulta realizada: ${formatearFecha(r.fechaInicio)} a ${formatearFecha(r.fechaFin)}. Registros encontrados: ${total}.`;

  document.getElementById("rangeStats").innerHTML = crearStatsHTML(r.presentes || 0, r.ausentes || 0);

  results.innerHTML = `
    <h2 class="section-title">Resultados</h2>
    <p class="section-subtitle">Incidencias encontradas en el rango consultado.</p>
  `;

  if (total === 0) {
    results.innerHTML += crearTarjetaSimple("Sin resultados", "No se encontraron incidencias en esas fechas.");
    inicializarIconos();
    return;
  }

  incidencias.forEach(function(incidencia) {
    results.appendChild(crearCardIncidencia(incidencia, true));
  });

  inicializarIconos();
}

function abrirEstadisticaMensual() {
  if (!selectedPersonID) {
    alert("Primero selecciona una persona o abre tu perfil.");
    return;
  }

  const hoy = new Date();

  document.getElementById("statMes").value = String(hoy.getMonth() + 1);
  document.getElementById("statAnio").value = String(hoy.getFullYear());

  const status = document.getElementById("statMonthStatus");
  status.className = "status-box";
  status.textContent = "";

  document.getElementById("statMonthResults").innerHTML = "";
  showScreen("statMonthScreen");
}

function consultarEstadisticaMensual() {
  const mes = document.getElementById("statMes").value;
  const anio = document.getElementById("statAnio").value;
  const status = document.getElementById("statMonthStatus");

  if (!selectedPersonID) {
    status.className = "status-box show error";
    status.textContent = "No hay persona seleccionada para consultar estadística mensual.";
    return;
  }

  if (!mes || !anio) {
    status.className = "status-box show error";
    status.textContent = "Selecciona mes y año.";
    return;
  }

  const mesNumero = Number(mes);
  const anioNumero = Number(anio);

  if (mesNumero < 1 || mesNumero > 12 || anioNumero < 2020 || anioNumero > 2100) {
    status.className = "status-box show error";
    status.textContent = "Selecciona un mes y año válidos.";
    return;
  }

  status.className = "status-box show";
  status.textContent = "Consultando estadística mensual...";

  API.obtenerEstadisticaMensual(
    selectedPersonID,
    mesNumero,
    anioNumero,
    renderEstadisticaMensual,
    function(error) {
      status.className = "status-box show error";
      status.textContent = obtenerMensajeError(error);
    }
  );
}

function renderEstadisticaMensual(respuesta) {
  const r = respuesta || {};
  const status = document.getElementById("statMonthStatus");
  const container = document.getElementById("statMonthResults");
  const datos = Array.isArray(r.datos) ? r.datos : [];

  status.className = "status-box show ok";
  status.textContent = `Consulta realizada: ${escapeHTML(r.mes || "")}/${escapeHTML(r.anio || "")}`;

  if (!r.total || Number(r.total) === 0) {
    container.innerHTML = crearTarjetaSimple("Mes sin incidencias", "No se encontraron incidencias para el mes seleccionado.");
    inicializarIconos();
    return;
  }

  const maximo = Math.max.apply(null, datos.map(function(item) {
    return Number(item.cantidad || 0);
  }).concat([1]));

  let bars = "";

  datos.forEach(function(item) {
    const cantidad = Number(item.cantidad || 0);
    const meta = iconMeta(item.tipo || "");
    const altura = cantidad === 0 ? 3 : Math.max(8, Math.round((cantidad / maximo) * 160));
    const etiqueta = item.dia ? `Día ${item.dia}` : abreviarTipo(item.tipo || "");

    bars += `
      <div class="bar-item">
        <div class="bar-value">${cantidad > 0 ? cantidad : ""}</div>
        <div class="bar solid-${meta.color}" style="height:${altura}px;"></div>
        <div class="bar-label">${escapeHTML(etiqueta)}</div>
      </div>
    `;
  });

  const persona = r.persona || {};

  container.innerHTML = `
    <article class="data-card">
      <h2 class="data-card-title">Resumen mensual</h2>
      <p class="data-card-text"><strong>Persona:</strong> ${escapeHTML(persona.Nombre || "")} ${escapeHTML(persona.Apellidos || "")}</p>
      <p class="data-card-text"><strong>Periodo:</strong> ${escapeHTML(r.mes || "")}/${escapeHTML(r.anio || "")}</p>
      <p class="data-card-text"><strong>Total de incidencias:</strong> ${escapeHTML(r.total || 0)}</p>
      <p class="data-card-text"><strong>Tipo más frecuente:</strong> ${escapeHTML(r.tipoMasFrecuente || "Sin dato")}</p>
    </article>

    <section class="chart-wrap">
      <h2 class="section-title">Gráfica mensual</h2>
      <p class="section-subtitle">Cantidad de incidencias en el periodo seleccionado.</p>

      <div class="chart-area">
        <div class="chart-y">Cantidad</div>
        <div class="bars">${bars}</div>
      </div>

      <div class="chart-axis-label">${datos.some(function(item) { return item.dia; }) ? "Día del mes" : "Tipo de incidencia"}</div>
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
  return tipo || "Sin tipo";
}

function prepararDataScreen(titulo, subtitulo, icono, color) {
  document.getElementById("dataTitle").textContent = titulo;
  document.getElementById("dataSubtitle").textContent = subtitulo;
  document.getElementById("dataAccessName").textContent = currentModule || sessionStorage.getItem("currentActiveModule") || "";
  document.getElementById("dataStats").innerHTML = "";
  document.getElementById("dataList").innerHTML = crearTarjetaSimple("Cargando información...", "Consultando Google Sheets.");
  document.getElementById("dataBrandIcon").className = `brand-icon solid-${color || "blue"}`;
  document.getElementById("dataBrandIcon").setAttribute("data-icon", icono);
  showScreen("dataScreen");
}

function renderListaIncidenciasEn(idContenedor, incidencias, mensajeVacio) {
  const lista = document.getElementById(idContenedor);

  if (!lista) return;

  if (!incidencias || incidencias.length === 0) {
    lista.innerHTML += crearTarjetaSimple("Sin registros", mensajeVacio);
    inicializarIconos();
    return;
  }

  incidencias.forEach(function(incidencia) {
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
          <p class="summary-big-number color-green">${Number(presentes || 0)}</p>
        </div>
      </article>

      <article class="summary-big-card ausentes">
        <div class="summary-big-icon solid-red" data-icon="user"></div>
        <div>
          <p class="summary-big-title color-red">Ausentes</p>
          <p class="summary-big-number color-red">${Number(ausentes || 0)}</p>
        </div>
      </article>
    </section>
  `;
}

function canonicalizarRolReportes(valor) {
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
