function showScreen(id, pushHistory = true) {
  if (!id) return;

  if (pushHistory && currentScreen && currentScreen !== id) {
    navigationStack.push(currentScreen);
  }

  document.querySelectorAll(".screen").forEach(function(screen) {
    screen.classList.remove("active");
    limpiarScrollPantalla(screen);
  });

  setTimeout(function() {
    const el = document.getElementById(id);

    if (el) {
      el.classList.add("active");
      currentScreen = id;
      prepararScrollPantallaActiva(el);
      inicializarIconos();
    } else {
      console.warn("Pantalla no encontrada:", id);
    }
  }, 35);
}

function limpiarScrollPantalla(screen) {
  if (!screen) return;

  screen.style.overflowY = "";
  screen.style.webkitOverflowScrolling = "";
  screen.style.touchAction = "";
  screen.style.height = "";
  screen.style.maxHeight = "";
}

function prepararScrollPantallaActiva(el) {
  if (!el) return;

  const esPantallaConScroll = el.classList.contains("screen-scroll") || el.id !== "splash";

  document.documentElement.style.overflowX = "hidden";
  document.documentElement.style.overflowY = "auto";
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "auto";
  document.body.style.position = "static";
  document.body.style.height = "auto";
  document.body.style.minHeight = "100dvh";
  document.body.style.touchAction = "pan-y";

  if (esPantallaConScroll) {
    el.style.overflowX = "hidden";
    el.style.overflowY = "auto";
    el.style.webkitOverflowScrolling = "touch";
    el.style.touchAction = "pan-y";
    el.style.height = "auto";
    el.style.maxHeight = "none";
    el.style.minHeight = "100dvh";
  }

  const contenedores = el.querySelectorAll(".page-top, .module-menu-wrap, .content, .main-fixed-layout");

  contenedores.forEach(function(contenedor) {
    contenedor.style.overflow = "visible";
    contenedor.style.height = "auto";
    contenedor.style.maxHeight = "none";
    contenedor.style.touchAction = "pan-y";
  });

  requestAnimationFrame(function() {
    try {
      el.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    } catch (error) {
      console.warn("No se pudo reiniciar scroll:", error);
    }
  });
}

function goBack() {
  const previous = navigationStack.pop();

  if (!previous || previous === "splash" || previous === "loginScreen") {
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
  document.querySelectorAll("[data-icon]").forEach(function(el) {
    const nombre = el.getAttribute("data-icon");

    if (SVG && SVG[nombre]) {
      el.innerHTML = SVG[nombre];
    }
  });
}

function cssVar(color) {
  return `var(--${color || "blue"})`;
}

function normalizarTextoUI(valor) {
  return String(valor || "").trim();
}

function quitarAcentosUI(valor) {
  return normalizarTextoUI(valor).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function canonicalizarRolUI(valor) {
  const texto = quitarAcentosUI(valor).toLowerCase();

  if (texto === "direccion" || texto === "dir") return "Direccion";
  if (texto === "prefectura" || texto === "pre") return "Prefectura";
  if (texto === "docente" || texto === "doc") return "Docente";
  if (texto === "correspondencia" || texto === "cor") return "Correspondencia";

  return normalizarTextoUI(valor);
}

function canonicalizarModuloUI(valor) {
  return canonicalizarRolUI(valor);
}

function esRolValidoUI(rol) {
  const r = canonicalizarRolUI(rol);

  return r === "Direccion" ||
         r === "Prefectura" ||
         r === "Docente" ||
         r === "Correspondencia";
}

function obtenerRolSesionUI() {
  return canonicalizarRolUI(sessionStorage.getItem("userRol"));
}

function obtenerIDAccesoSesionUI() {
  return normalizarTextoUI(sessionStorage.getItem("userIDAcceso"));
}

function obtenerModuloSesionUI() {
  return canonicalizarModuloUI(sessionStorage.getItem("currentActiveModule"));
}

function iconMeta(tipo) {
  const original = String(tipo || "").trim();
  const texto = quitarAcentosUI(original).toLowerCase();

  if (texto.includes("permiso oficial") || texto.includes("permiso personal")) {
    return {
      color: "purple",
      icono: "permiso-oficial",
      nombre: original || "Permiso oficial",
      name: original || "Permiso oficial"
    };
  }

  if (texto.includes("incapacidad") || texto.includes("licencia medica")) {
    return {
      color: "blue",
      icono: "incapacidad",
      nombre: original || "Incapacidad",
      name: original || "Incapacidad"
    };
  }

  if (texto.includes("humanitario sindical")) {
    return {
      color: "green",
      icono: "humanitario-sindical",
      nombre: original || "Humanitario sindical",
      name: original || "Humanitario sindical"
    };
  }

  if (texto.includes("humanitario oficial")) {
    return {
      color: "orange",
      icono: "humanitario-oficial",
      nombre: original || "Humanitario oficial",
      name: original || "Humanitario oficial"
    };
  }

  if (texto.includes("comision sindical")) {
    return {
      color: "purple-soft",
      icono: "comision-sindical",
      nombre: original || "Comisión sindical",
      name: original || "Comisión sindical"
    };
  }

  if (texto.includes("comision oficial")) {
    return {
      color: "blue-soft",
      icono: "comision-oficial",
      nombre: original || "Comisión oficial",
      name: original || "Comisión oficial"
    };
  }

  if (texto === "comision") {
    return {
      color: "blue-soft",
      icono: "comision-oficial",
      nombre: original || "Comisión oficial",
      name: original || "Comisión oficial"
    };
  }

  if (texto.includes("especial")) {
    return {
      color: "gold",
      icono: "especial",
      nombre: original || "Especial",
      name: original || "Especial"
    };
  }

  return {
    color: "gold",
    icono: "especial",
    nombre: original || "Especial",
    name: original || "Especial"
  };
}

function estadoNotificacionMeta(estado) {
  const texto = quitarAcentosUI(estado).toLowerCase();

  if (texto === "leida") {
    return {
      color: "green",
      texto: "Leída",
      icono: "shield",
      clase: "notification-read"
    };
  }

  return {
    color: "orange",
    texto: "No leída",
    icono: "bell",
    clase: "notification-unread"
  };
}

function esNotificacionLeida(estado) {
  return estadoNotificacionMeta(estado).texto === "Leída";
}

function openModule(moduleName) {
  const moduloSolicitado = canonicalizarModuloUI(moduleName);
  const rolSesion = obtenerRolSesionUI();
  const idAccesoSesion = obtenerIDAccesoSesionUI();

  if (!idAccesoSesion || !esRolValidoUI(rolSesion)) {
    alert("Sesión inválida. Ingresa nuevamente.");
    cerrarSesion();
    return;
  }

  if (!esRolValidoUI(moduloSolicitado) || !MODULES[moduloSolicitado]) {
    alert("Módulo no reconocido.");
    return;
  }

  /*
    Regla principal:
    cada usuario solo puede entrar al módulo que coincide exactamente con su rol.
    Dirección no abre Prefectura, Docente ni Correspondencia desde UI.
  */
  if (moduloSolicitado !== rolSesion) {
    alert(
      "No tienes acceso a este módulo.\n\n" +
      "Tu rol registrado es: " + rolSesion + ".\n" +
      "Solo puedes ingresar al módulo " + rolSesion + "."
    );
    return;
  }

  currentModule = moduloSolicitado;
  profileMode = false;

  sessionStorage.setItem("currentActiveModule", moduloSolicitado);

  const config = MODULES[moduloSolicitado];

  const avatar = document.getElementById("moduleAvatar");
  if (avatar) {
    avatar.className = `module-avatar bg-${config.avatarColor} color-${config.avatarColor}`;
    avatar.setAttribute("data-icon", config.avatar);
  }

  const moduleTitle = document.getElementById("moduleTitle");
  if (moduleTitle) {
    moduleTitle.textContent = config.titulo;
    moduleTitle.className = `module-hero-title color-${config.avatarColor}`;
  }

  const moduleSubtitle = document.getElementById("moduleSubtitle");
  if (moduleSubtitle) {
    moduleSubtitle.textContent = config.subtitulo;
  }

  const moduleImportantText = document.getElementById("moduleImportantText");
  if (moduleImportantText) {
    moduleImportantText.textContent = config.importante;
  }

  const accessTitle = document.getElementById("accessTitle");
  if (accessTitle) {
    accessTitle.textContent = "Acceso: " + moduloSolicitado;
  }

  const accessText = document.getElementById("accessText");
  if (accessText) {
    accessText.textContent = config.acceso;
  }

  const container = document.getElementById("moduleButtons");

  if (!container) {
    alert("No se encontró el contenedor moduleButtons en el index.");
    return;
  }

  container.innerHTML = "";

  config.opciones.forEach(function(option) {
    const button = document.createElement("button");
    button.className = "professional-card";
    button.onclick = function() {
      openOption(option.nombre);
    };
    button.innerHTML = `
      <div class="professional-icon solid-${option.color}" data-icon="${option.icono}"></div>
      <div>
        <h2 class="professional-title color-${option.color}">${escapeHTML(option.nombre)}</h2>
        <p class="professional-desc">${escapeHTML(option.descripcion)}</p>
      </div>
      <div class="professional-arrow color-${option.color}">›</div>
    `;
    container.appendChild(button);
  });

  showScreen("moduleMenu");
}

function openOption(optionName) {
  const opcion = String(optionName || "").trim();
  const rolSesion = obtenerRolSesionUI();

  if (!obtenerIDAccesoSesionUI() || !esRolValidoUI(rolSesion)) {
    alert("Sesión inválida. Ingresa nuevamente.");
    cerrarSesion();
    return;
  }

  if (opcion === "Mi perfil" || opcion === "Mi Perfil") {
    return abrirMiPerfil();
  }

  if (opcion === "Otorgar incidencia") {
    if (rolSesion !== "Direccion") {
      alert("Solo Dirección puede registrar incidencias.");
      return;
    }
    return openTipoIncidencia();
  }

  if (opcion === "Reporte del día") {
    return cargarReporteDia();
  }

  if (opcion === "Reporte semanal") {
    return cargarReporteSemanal();
  }

  if (opcion === "Consulta de fechas") {
    return abrirConsultaFechas();
  }

  if (opcion === "Historial" || opcion === "Historial general") {
    return abrirSelectorHistorial();
  }

  if (opcion === "Notificaciones") {
    return abrirNotificaciones();
  }

  alert("Opción no reconocida: " + opcion);
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
  return quitarAcentosUI(tipo).toLowerCase() === "permiso oficial";
}

function esPermisoOfTexto(tipo) {
  return esPermisoOficialTexto(tipo);
}

function renderError(error) {
  const mensaje = obtenerMensajeError(error);
  const lista = document.getElementById("dataList");

  if (lista) {
    lista.innerHTML = crearTarjetaSimple("Error", mensaje);
  } else {
    alert(mensaje);
  }

  showScreen("dataScreen", false);
}

function obtenerMensajeError(error) {
  if (!error) return "Error desconocido.";
  if (error.message) return error.message;
  return String(error);
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return "Sin fecha";
  if (fechaISO === "Pendiente") return "Pendiente";

  const texto = String(fechaISO).trim();

  /*
    Google Apps Script puede regresar fechas como:
    - YYYY-MM-DD
    - YYYY-MM-DDTHH:mm:ss.sssZ
    - objeto Date convertido a string
  */
  const isoCorto = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (isoCorto) {
    return `${isoCorto[3]}/${isoCorto[2]}/${isoCorto[1]}`;
  }

  const fecha = new Date(texto);

  if (!isNaN(fecha.getTime())) {
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  return texto;
}

function formatearFechaParaInput(fechaISO) {
  if (!fechaISO) return "";

  const texto = String(fechaISO).trim();
  const isoCorto = texto.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (isoCorto) {
    return `${isoCorto[1]}-${isoCorto[2]}-${isoCorto[3]}`;
  }

  const fecha = new Date(texto);

  if (!isNaN(fecha.getTime())) {
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`;
  }

  return "";
}

function formatearFechaReal(fechaISO) {
  return formatearFechaParaInput(fechaISO);
}

function recortarTexto(texto, limite) {
  const limpio = String(texto || "");
  const max = Number(limite || 80);

  if (limpio.length <= max) {
    return limpio;
  }

  return limpio.substring(0, max).trim() + "...";
}

function escapeHTML(texto) {
  return String(texto ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/*
  Compatibilidad para módulos que llaman canonicalizarRolLocal.
*/
function canonicalizarRolLocal(valor) {
  return canonicalizarRolUI(valor);
}
