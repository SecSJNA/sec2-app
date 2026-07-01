function showScreen(id, pushHistory = true) {
  if (pushHistory && currentScreen && currentScreen !== id) {
    navigationStack.push(currentScreen);
  }

  document.querySelectorAll(".screen").forEach(screen => screen.classList.remove("active"));

  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add("active");
      currentScreen = id;
      window.scrollTo(0, 0);
      inicializarIconos();
    }
  }, 35);
}

function goBack() {
  const previous = navigationStack.pop();
  if (!previous || previous === "splash") {
    goMain();
    return;
  }
  showScreen(previous, false);
}

function goMain() {
  profileMode = false;
  navigationStack = [];
  showScreen("main", false);
}

function inicializarIconos() {
  document.querySelectorAll("[data-icon]").forEach(el => {
    const nombre = el.getAttribute("data-icon");
    if (SVG[nombre]) el.innerHTML = SVG[nombre];
  });
}

function cssVar(color) {
  return `var(--${color})`;
}

function iconMeta(tipo) {
  const texto = String(tipo || "").toLowerCase();
  if (texto.includes("permiso oficial") || texto.includes("permiso personal")) {
    return { color: "purple", icono: "permiso-oficial", nombre: tipo || "Permiso oficial" };
  }
  if (texto.includes("incapacidad") || texto.includes("licencia médica") || texto.includes("licencia medica")) {
    return { color: "blue", icono: "incapacidad", nombre: tipo || "Incapacidad" };
  }
  if (texto.includes("humanitario sindical")) {
    return { color: "green", icono: "humanitario-sindical", nombre: tipo || "Humanitario sindical" };
  }
  if (texto.includes("humanitario oficial")) {
    return { color: "orange", icono: "humanitario-oficial", nombre: tipo || "Humanitario oficial" };
  }
  if (texto.includes("comisión sindical") || texto.includes("comision sindical")) {
    return { color: "purple-soft", icono: "comision-sindical", nombre: tipo || "Comisión sindical" };
  }
  if (texto.includes("comisión oficial") || texto.includes("comision oficial")) {
    return { color: "blue-soft", icono: "comision-oficial", nombre: tipo || "Comisión oficial" };
  }
  if (texto === "comisión" || texto === "comision") {
    return { color: "blue-soft", icono: "comision-oficial", nombre: tipo || "Comisión oficial" };
  }
  if (texto.includes("especial")) {
    return { color: "gold", icono: "especial", nombre: tipo || "Especial" };
  }
  return { color: "gold", icono: "especial", nombre: tipo || "Especial" };
}

function estadoNotificacionMeta(estado) {
  const texto = String(estado || "").toLowerCase();
  if (texto === "leida" || texto === "leída") {
    return { color: "green", texto: "Leída", icono: "shield", clase: "notification-read" };
  }
  return { color: "orange", texto: "No leída", icono: "bell", clase: "notification-unread" };
}

function openModule(moduleName) {
  // BLINDAJE DE UI: Verificación de acceso antes de pintar el módulo
  const userRol = sessionStorage.getItem("userRol");
  if (userRol !== "Dirección" && userRol !== moduleName) {
    alert("Acceso no autorizado al módulo.");
    return;
  }

  currentModule = moduleName;
  profileMode = false;
  sessionStorage.setItem("currentActiveModule", moduleName);

  const config = MODULES[moduleName];
  const avatar = document.getElementById("moduleAvatar");
  avatar.className = `module-avatar bg-${config.avatarColor} color-${config.avatarColor}`;
  avatar.setAttribute("data-icon", config.avatar);

  document.getElementById("moduleTitle").textContent = config.titulo;
  document.getElementById("moduleTitle").className = `module-hero-title color-${config.avatarColor}`;
  document.getElementById("moduleSubtitle").textContent = config.subtitulo;
  document.getElementById("moduleImportantText").textContent = config.importante;
  document.getElementById("accessTitle").textContent = "Acceso: " + moduleName;
  document.getElementById("accessText").textContent = config.acceso;
  
  const container = document.getElementById("moduleButtons");
  container.innerHTML = "";

  config.opciones.forEach(option => {
    const button = document.createElement("button");
    button.className = "professional-card";
    button.onclick = () => openOption(option.nombre);
    button.innerHTML = `
      <div class="professional-icon solid-${option.color}" data-icon="${option.icono}"></div>
      <div>
        <h2 class="professional-title color-${option.color}">${option.nombre}</h2>
        <p class="professional-desc">${option.descripcion}</p>
      </div>
      <div class="professional-arrow color-${option.color}">›</div>
    `;
    container.appendChild(button);
  });
  showScreen("moduleMenu");
}

function openOption(optionName) {
  if (optionName === "Mi perfil" || optionName === "Mi Perfil") return abrirMiPerfil();
  if (optionName === "Otorgar incidencia") return openTipoIncidencia();
  if (optionName === "Reporte del día") return cargarReporteDia();
  if (optionName === "Reporte semanal") return cargarReporteSemanal();
  if (optionName === "Consulta de fechas") return abrirConsultaFechas();
  if (optionName === "Historial" || optionName === "Historial general") return abrirSelectorHistorial();
  if (optionName === "Notificaciones") return abrirNotificaciones();
}

function crearTarjetaSimple(titulo, texto) {
  return `
    <article class="data-card">
      <h2 class="data-card-title">${escapeHTML(titulo)}</h2>
      <p class="data-card-text">${escapeHTML(texto)}</p>
    </article>
  `;
}

function mostrarEstadoFormulario(mensaje, esError, esOk) {
  const status = document.getElementById("formStatus");
  status.className = "status-box show";
  if (esError) status.classList.add("error");
  if (esOk) status.classList.add("ok");
  status.textContent = mensaje;
}

function esPermisoOficialTexto(tipo) {
  return String(tipo || "").toLowerCase() === "permiso oficial";
}

function renderError(error) {
  document.getElementById("dataList").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
  showScreen("dataScreen", false);
}

function obtenerMensajeError(error) {
  return error && error.message ? error.message : String(error);
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return "Sin fecha";
  if (fechaISO === "Pendiente") return "Pendiente";
  const partes = fechaISO.toString().split("-");
  if (partes.length !== 3) return fechaISO;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function recortarTexto(texto, limite) {
  const limpio = String(texto || "");
  if (limpio.length <= limite) return limpio;
  return limpio.substring(0, limite).trim() + "...";
}

function escapeHTML(texto) {
  return String(texto)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
