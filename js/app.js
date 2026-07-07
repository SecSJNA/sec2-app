const TEST_USERS = {
  "Direccion": "D001",
  "Correspondencia": "C001",
  "Prefectura": "P001",
  "Docente": "M001"
};

const TURNOS_TEXTO = {
  "A": "Ambos",
  "M": "Matutino",
  "V": "Vespertino"
};

const SVG = {
  director: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="18" r="10" fill="currentColor"/><path d="M13 58c2-16 12-24 19-24s17 8 19 24H13Z" fill="currentColor"/><path d="M27 36h10l-3 8 3 14H27l3-14-3-8Z" fill="#fff"/></svg>`,
  edit: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M16 7h29l9 9v40H16V7Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><path d="M44 7v12h10" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><path d="M24 28h18M24 38h13" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>`,
  group: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="22" r="9" fill="currentColor"/><circle cx="16" cy="27" r="7" fill="currentColor"/><circle cx="48" cy="27" r="7" fill="currentColor"/><path d="M18 57c1-12 8-19 14-19s13 7 14 19H18Z" fill="currentColor"/><path d="M3 57c1-10 6-15 12-15 4 0 7 2 9 5-3 3-5 6-6 10H3ZM46 57c-1-4-3-7-6-10 2-3 5-5 9-5 6 0 11 5 12 15H46Z" fill="currentColor"/></svg>`,
  book: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M14 13c8 0 14 3 18 9 4-6 10-9 18-9v39c-8 0-14 3-18 9-4-6-10-9-18-9V13Z" fill="currentColor"/><path d="M22 23c4 .5 7 2 9 5M42 23c-4 .5-7 2-9 5" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`,
  report: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M14 8h36v48H14V8Z" fill="currentColor"/><path d="M23 20h18M23 30h12" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M25 47V37M33 47V31M41 47V25" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`,
  history: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M19 19a21 21 0 1 1-5 22" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M18 11v16H4" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 20v14l10 6" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>`,
  calendar: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="14" width="44" height="40" rx="6" fill="currentColor"/><path d="M10 25h44" stroke="#fff" stroke-width="5"/><path d="M21 8v12M43 8v12" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><rect x="19" y="32" width="7" height="7" fill="#fff"/><rect x="29" y="32" width="7" height="7" fill="#fff"/><rect x="39" y="32" width="7" height="7" fill="#fff"/><rect x="19" y="43" width="7" height="7" fill="#fff"/><rect x="29" y="43" width="7" height="7" fill="#fff"/></svg>`,
  "file-plus": `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M16 7h27l9 9v40H16V7Z" fill="currentColor"/><path d="M42 7v12h10" fill="#fff" opacity=".95"/><path d="M25 28h14M25 38h10" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M47 39v14M40 46h14" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>`,
  bell: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 58a7 7 0 0 0 7-7H25a7 7 0 0 0 7 7Z" fill="currentColor"/><path d="M13 45h38l-5-7V26c0-8-5-14-14-14S18 18 18 26v12l-5 7Z" fill="currentColor"/></svg>`,
  shield: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 5 54 14v15c0 15-9 26-22 30C19 55 10 44 10 29V14L32 5Z" fill="currentColor"/><path d="m24 33 6 6 13-15" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  user: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="20" r="12" fill="currentColor"/><path d="M10 58c2-15 13-23 22-23s20 8 22 23H10Z" fill="currentColor"/></svg>`,
  message: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M10 12h44v32H26L13 55V44h-3V12Z" fill="currentColor"/><path d="M21 25h22M21 35h16" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`,
  "permiso-oficial": `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><rect x="11" y="13" width="38" height="39" rx="6" fill="none" stroke="currentColor" stroke-width="6"/><path d="M11 25h38M22 8v12M38 8v12" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="m39 46 5 5 11-13" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><rect x="20" y="32" width="7" height="7" fill="currentColor"/><rect x="31" y="32" width="7" height="7" fill="currentColor"/></svg>`,
  incapacidad: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 6 53 15v15c0 14-8 24-21 28C19 54 11 44 11 30V15L32 6Z" fill="currentColor"/><path d="M28 19h8v10h10v8H36v10h-8V37H18v-8h10V19Z" fill="#fff"/></svg>`,
  "humanitario-sindical": `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="24" r="9" fill="currentColor"/><circle cx="17" cy="29" r="7" fill="currentColor"/><circle cx="47" cy="29" r="7" fill="currentColor"/><path d="M18 58c1-13 8-20 14-20s13 7 14 20H18Z" fill="currentColor"/><path d="M4 58c1-10 6-16 12-16 4 0 7 2 9 5-3 3-5 7-6 11H4ZM45 58c-1-4-3-8-6-11 2-3 5-5 9-5 6 0 11 6 12 16H45Z" fill="currentColor"/></svg>`,
  "humanitario-oficial": `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M24 19 9 34l15 15 8-8 8 8c4 4 10 2 11-4l5-8-15-15-9 7-8-10Z" fill="currentColor"/><path d="m22 36 7-7 14 14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="m36 31 6-5 8 8-6 8" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  "comision-sindical": `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="m32 6 6 13 14 2-10 10 3 18-13-7-13 7 3-18-10-10 14-2 6-13Z" fill="currentColor"/><circle cx="32" cy="40" r="6" fill="currentColor"/><circle cx="22" cy="43" r="5" fill="currentColor"/><circle cx="42" cy="43" r="5" fill="currentColor"/><path d="M16 58c1-8 7-13 16-13s15 5 16 13H16Z" fill="currentColor"/></svg>`,
  "comision-oficial": `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><rect x="9" y="21" width="46" height="33" rx="5" fill="currentColor"/><path d="M24 21v-7h16v7" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M9 34h46" stroke="#fff" stroke-width="5"/><rect x="28" y="31" width="8" height="8" rx="1" fill="#fff"/></svg>`,
  especial: `<svg class="icon-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="m32 7 8 16 18 3-13 13 3 18-16-9-16 9 3-18L6 26l18-3 8-16Z" fill="currentColor"/></svg>`
};

const PERMISSION_TYPES = [
  { nombre: "Permiso oficial", descripcion: "Registro de hasta tres fechas independientes.", color: "purple", icono: "permiso-oficial", medico: false, oficial: true },
  { nombre: "Incapacidad", descripcion: "Ausencia médica por uno o varios días.", color: "blue", icono: "incapacidad", medico: true, oficial: false },
  { nombre: "Humanitario sindical", descripcion: "Permiso humanitario autorizado por representación sindical.", color: "green", icono: "humanitario-sindical", medico: false, oficial: false },
  { nombre: "Humanitario oficial", descripcion: "Permiso humanitario autorizado por la institución.", color: "orange", icono: "humanitario-oficial", medico: false, oficial: false },
  { nombre: "Comisión sindical", descripcion: "Actividad oficial asignada por representación sindical.", color: "purple-soft", icono: "comision-sindical", medico: false, oficial: false },
  { nombre: "Comisión oficial", descripcion: "Actividad oficial asignada por la institución.", color: "blue-soft", icono: "comision-oficial", medico: false, oficial: false },
  { nombre: "Especial", descripcion: "Incidencia extraordinaria no clasificada en categorías anteriores.", color: "gold", icono: "especial", medico: false, oficial: false }
];

const MODULES = {
  "Direccion": {
    titulo: "Módulo Dirección",
    subtitulo: "Administración General",
    avatar: "director",
    avatarColor: "blue",
    importante: "Dirección cuenta con acceso completo para registrar, consultar, editar y eliminar incidencias.",
    acceso: "Permisos completos de administración y gestión.",
    opciones: [
      { nombre: "Mi perfil", descripcion: "Consulta personal e historial propio.", color: "gold", icono: "user" },
      { nombre: "Otorgar incidencia", descripcion: "Crear nueva incidencia.", color: "purple", icono: "file-plus" },
      { nombre: "Consulta de fechas", descripcion: "Análisis por fecha o rango.", color: "orange", icono: "calendar" },
      { nombre: "Historial general", descripcion: "Consulta por docente.", color: "green", icono: "history" },
      { nombre: "Reporte del día", descripcion: "Incidencias activas del día actual.", color: "blue-light", icono: "report" },
      { nombre: "Reporte semanal", descripcion: "Vista automática semanal.", color: "blue", icono: "calendar" },
      { nombre: "Notificaciones", descripcion: "Centro de mensajes.", color: "cyan", icono: "bell" }
    ]
  },
  "Correspondencia": {
    titulo: "Módulo Correspondencia",
    subtitulo: "Captura y consulta",
    avatar: "edit",
    avatarColor: "green",
    importante: "Correspondencia puede consultar información y revisar notificaciones.",
    acceso: "Permisos de consulta.",
    opciones: [
      { nombre: "Mi perfil", descripcion: "Consulta personal e historial propio.", color: "gold", icono: "user" },
      { nombre: "Consulta de fechas", descripcion: "Análisis por fecha o rango.", color: "orange", icono: "calendar" },
      { nombre: "Historial", descripcion: "Consulta por docente.", color: "green", icono: "history" },
      { nombre: "Notificaciones", descripcion: "Ver mensajes recibidos.", color: "blue", icono: "bell" }
    ]
  },
  "Prefectura": {
    titulo: "Módulo Prefectura",
    subtitulo: "Consulta y supervisión",
    avatar: "group",
    avatarColor: "orange",
    importante: "Prefectura únicamente puede consultar información según su turno.",
    acceso: "Permisos de consulta operativa.",
    opciones: [
      { nombre: "Mi perfil", descripcion: "Consulta personal e historial propio.", color: "gold", icono: "user" },
      { nombre: "Reporte del día", descripcion: "Incidencias activas del día actual.", color: "blue-light", icono: "report" },
      { nombre: "Reporte semanal", descripcion: "Análisis semanal.", color: "blue", icono: "calendar" },
      { nombre: "Notificaciones", descripcion: "Ver mensajes y avisos.", color: "cyan", icono: "bell" }
    ]
  },
  "Docente": {
    titulo: "Módulo Docente",
    subtitulo: "Consulta personal",
    avatar: "book",
    avatarColor: "purple",
    importante: "Usted únicamente puede consultar su información personal.",
    acceso: "Consulta exclusiva de información propia.",
    opciones: [
      { nombre: "Mi Perfil", descripcion: "Ver mi resumen personal.", color: "gold", icono: "user" },
      { nombre: "Notificaciones", descripcion: "Ver mensajes y avisos.", color: "purple", icono: "bell" }
    ]
  }
};

let currentModule = "";
let selectedType = null;
let selectedPersonID = "";
let selectedIncidentID = "";
let selectedNotificationID = "";
let profileMode = false;
let currentScreen = "loginScreen";
let navigationStack = [];

window.addEventListener("load", () => {
  inicializarIconos();
  const llaveAcceso = sessionStorage.getItem("userIDAcceso");
  if (llaveAcceso) {
    currentModule = sessionStorage.getItem("currentActiveModule") || "Direccion";
    showScreen("main", false);
  } else {
    showScreen("loginScreen", false);
  }
});

function ejecutarLogin() {
  const idAcceso = document.getElementById("loginIDAcceso").value.trim();
  const contrasena = document.getElementById("loginContrasena").value.trim();
  const statusBox = document.getElementById("loginStatus");

  if (!idAcceso || !contrasena) {
    statusBox.className = "status-box show error";
    statusBox.textContent = "Por favor, completa ambos campos.";
    return;
  }

  statusBox.className = "status-box show";
  statusBox.textContent = "Validando credenciales seguras...";

  API.iniciarSesion(idAcceso, contrasena, 
    function(respuesta) {
      const usr = respuesta;
      sessionStorage.setItem("userID", usr.ID);
      sessionStorage.setItem("userIDAcceso", idAcceso);
      sessionStorage.setItem("userRol", usr.Rol);
      sessionStorage.setItem("userTurno", usr.Turno);
      sessionStorage.setItem("userName", usr.Nombre);
      
      const rol = usr.Rol.toLowerCase();
      if (rol.includes("dirección") || rol.includes("dir")) {
        currentModule = "Direccion";
      } else if (rol.includes("corresponde") || rol.includes("cor")) {
        currentModule = "Correspondencia";
      } else if (rol.includes("prefectura") || rol.includes("pre")) {
        currentModule = "Prefectura";
      } else {
        currentModule = "Docente";
      }

      sessionStorage.setItem("currentActiveModule", currentModule);
      
      statusBox.className = "status-box show ok";
      statusBox.textContent = "¡Bienvenido, " + usr.Nombre + "!";
      
      setTimeout(function() {
        showScreen("splash", false);
        setTimeout(function() {
          showScreen("main", false);
        }, 1500);
      }, 800);
    },
    function(err) {
      statusBox.className = "status-box show error";
      statusBox.textContent = err || "Usuario o contraseña incorrectos.";
    }
  );
}

function esRolDireccion(rolStr) {
  const r = (rolStr || "").toLowerCase();
  return r.includes("dirección") || r.includes("dir");
}

function esRolCorrespondencia(rolStr) {
  const r = (rolStr || "").toLowerCase();
  return r.includes("corresponde") || r.includes("cor");
}

function esRolPrefectura(rolStr) {
  const r = (rolStr || "").toLowerCase();
  return r.includes("prefectura") || r.includes("pre");
}

function esRolDocente(rolStr) {
  const r = (rolStr || "").toLowerCase();
  return r.includes("doc");
}

function cerrarSesion() {
  sessionStorage.clear();
  document.getElementById("loginIDAcceso").value = "";
  document.getElementById("loginContrasena").value = "";
  document.getElementById("loginStatus").className = "status-box";
  showScreen("loginScreen", false);
}

function showScreen(id, pushHistory = true) {
  if (!id) return;

  if (pushHistory && currentScreen && currentScreen !== id) {
    navigationStack.push(currentScreen);
  }

  document.querySelectorAll(".screen").forEach(function(screen) {
    screen.classList.remove("active");
    limpiarScrollPantallaApp(screen);
  });

  setTimeout(function() {
    const el = document.getElementById(id);

    if (el) {
      el.classList.add("active");
      currentScreen = id;
      prepararScrollPantallaActivaApp(el);
      inicializarIconos();
    }
  }, 35);
}

function limpiarScrollPantallaApp(screen) {
  if (!screen) return;

  screen.style.overflowX = "";
  screen.style.overflowY = "";
  screen.style.webkitOverflowScrolling = "";
  screen.style.touchAction = "";
  screen.style.height = "";
  screen.style.maxHeight = "";
}

function prepararScrollPantallaActivaApp(el) {
  if (!el) return;

  document.documentElement.style.overflowX = "hidden";
  document.documentElement.style.overflowY = "auto";
  document.documentElement.style.height = "auto";

  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "auto";
  document.body.style.position = "static";
  document.body.style.height = "auto";
  document.body.style.minHeight = "100dvh";
  document.body.style.touchAction = "pan-y";

  if (el.classList.contains("screen-scroll") || el.id !== "splash") {
    el.style.overflowX = "hidden";
    el.style.overflowY = "auto";
    el.style.webkitOverflowScrolling = "touch";
    el.style.touchAction = "pan-y";
    el.style.height = "100dvh";
    el.style.maxHeight = "100dvh";
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

function cssVar(color) { return `var(--${color})`; }

function obtenerIdSesionSegura() {
  if(!currentModule) {
    currentModule = sessionStorage.getItem("currentActiveModule") || "Direccion";
  }
  return sessionStorage.getItem("userIDAcceso") || sessionStorage.getItem("userID") || TEST_USERS[currentModule] || "D001";
}

function iconMeta(tipo) {
  const texto = String(tipo || "").toLowerCase();
  if (texto.includes("permiso oficial") || texto.includes("permiso personal")) {
    return { color: "purple", icono: "permiso-oficial", name: tipo || "Permiso oficial" };
  }
  if (texto.includes("incapacidad") || texto.includes("licencia médica") || texto.includes("licencia medica")) {
    return { color: "blue", icono: "incapacidad", name: tipo || "Incapacidad" };
  }
  if (texto.includes("humanitario sindical")) {
    return { color: "green", icono: "humanitario-sindical", name: tipo || "Humanitario sindical" };
  }
  if (texto.includes("humanitario oficial")) {
    return { color: "orange", icono: "humanitario-oficial", name: tipo || "Humanitario oficial" };
  }
  if (texto.includes("comisión sindical") || texto.includes("comision sindical")) {
    return { color: "purple-soft", icono: "comision-sindical", name: tipo || "Comisión sindical" };
  }
  if (texto.includes("comisión oficial") || texto.includes("comision oficial")) {
    return { color: "blue-soft", icono: "comision-oficial", name: tipo || "Comisión oficial" };
  }
  if (texto === "comisión" || texto === "comision") {
    return { color: "blue-soft", icono: "comision-oficial", name: tipo || "Comisión oficial" };
  }
  if (texto.includes("especial")) {
    return { color: "gold", icono: "especial", name: tipo || "Especial" };
  }

  return { color: "gold", icono: "especial", name: tipo || "Especial" };
}

function estadoNotificacionMeta(estado) {
  const texto = String(estado || "").toLowerCase();
  if (texto === "leida" || texto === "leída") {
    return { color: "green", texto: "Leída", icono: "shield", clase: "notification-read" };
  }
  return { color: "orange", texto: "No leída", icono: "bell", clase: "notification-unread" };
}

function esNotificacionLeida(est) { return estadoNotificacionMeta(est); }

function openModule(moduleName) {
  const rol = (sessionStorage.getItem("userRol") || "").toLowerCase();

  // Validación estricta usando nombres limpios de módulo
  if (moduleName === "Direccion" && !esRolDireccion(rol)) {
    alert("Su rol es " + rol + ". No tiene acceso a este módulo.");
    return;
  }
  if (moduleName === "Correspondencia" && !esRolCorrespondencia(rol) && !esRolDireccion(rol)) {
    alert("Su rol es " + rol + ". No tiene acceso a este módulo.");
    return;
  }
  if (moduleName === "Prefectura" && !esRolPrefectura(rol) && !esRolDireccion(rol)) {
    alert("Su rol es " + rol + ". No tiene acceso a este módulo.");
    return;
  }
  if (moduleName === "Docente" && !esRolDocente(rol) && !esRolDireccion(rol)) {
    alert("Su rol es " + rol + ". No tiene acceso a este módulo.");
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
  
  const container = document.getElementById("moduleButtons"); container.innerHTML = "";

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

function abrirMiPerfil() {
  profileMode = true;
  // Apuntamos al IDAcceso (Columna H) como raíz de sesión para evitar cruces
  selectedPersonID = sessionStorage.getItem("userIDAcceso") || obtenerIdSesionSegura();
  cargarResumenPersona(selectedPersonID);
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
        option.value = usuario.IDAcceso; // Enlazado unívocamente a IDAcceso (Col H)
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
  if (!id) { alert("Selecciona un docente."); return; }
  profileMode = false;
  cargarResumenPersona(id);
}

function cargarResumenPersona(idPersona) {
  selectedPersonID = idPersona;
  document.getElementById("personSummaryContent").innerHTML = crearTarjetaSimple("Cargando resumen...", "Consultando base de datos.");
  showScreen("personSummaryScreen");
  
  API.obtenerResumenPersona(idPersona, renderResumenPersona, error => {
    document.getElementById("personSummaryContent").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
  });
}

function renderResumenPersona(respuesta) {
  const p = respuesta.persona;
  const e = respuesta.estadisticas;
  const ultima = respuesta.ultimaIncidencia ? formatearFecha(respuesta.ultimaIncidencia.FechaInicio) : "Sin registros";
  const tituloOpciones = profileMode ? "Mi historial" : "Opciones de consulta";
  const descripcionHistorial = profileMode ? "Ver mi historial personal completo." : "Ver todas las incidencias registradas.";
  if(!currentModule) currentModule = sessionStorage.getItem("currentActiveModule") || "Direccion";
  
  const html = `
    <article class="data-card">
      <div class="summary-header">
        <div class="big-avatar" data-icon="user"></div>
        <div>
          <h2 class="data-card-title">${escapeHTML(p.Nombre)} ${escapeHTML(p.Apellidos)}</h2>
          <p class="data-card-text"><strong>Turno:</strong> ${TURNOS_TEXTO[p.Turno] || p.Turno}</p>
          <p class="data-card-text"><strong>ID de Acceso:</strong> ${escapeHTML(p.IDAcceso)}</p>
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
  document.getElementById("personSummaryContent").innerHTML = html; inicializarIconos();
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
  document.getElementById("dataSubtitle").textContent = "Consultando base de datos.";
  document.getElementById("dataStats").innerHTML = ""; document.getElementById("dataList").innerHTML = crearTarjetaSimple("Cargando historial...", "Consultando base de datos.");
  document.getElementById("dataAccessName").textContent = currentModule;
  document.getElementById("dataBrandIcon").className = "brand-icon solid-green";
  document.getElementById("dataBrandIcon").setAttribute("data-icon", "history"); showScreen("dataScreen");
  
  API.obtenerHistorialPersona(selectedPersonID, filtro, respuesta => {
    document.getElementById("dataSubtitle").textContent = `${respuesta.persona.Nombre} ${respuesta.persona.Apellidos}`;
    renderHistorialConDetalles(respuesta.incidencias);
  }, renderError);
}

function renderHistorialConDetalles(incidencias) {
  const container = document.getElementById("dataList"); container.innerHTML = "";
  if (!incidencias || incidencias.length === 0) {
    container.innerHTML = crearTarjetaSimple("Sin registros", "No hay incidencias para mostrar."); return;
  }
  container.innerHTML = `
    <h2 class="section-title">Incidencias registradas</h2>
    <p class="section-subtitle">Fechas cercanas al periodo consultado.</p>
  `;
  incidencias.forEach(incidencia => { container.appendChild(crearCardIncidencia(incidencia, true)); });
  inicializarIconos();
}

function abrirDetalleIncidencia(idIncidencia) {
  selectedIncidentID = idIncidencia; document.getElementById("detailContent").innerHTML = crearTarjetaSimple("Cargando detalle...", "Consultando base de datos.");
  showScreen("detailScreen");
  
  API.obtenerDetalleIncidencia(idIncidencia, renderDetalleIncidencia, error => {
    document.getElementById("detailContent").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
  });
}

function renderDetalleIncidencia(respuesta) {
  const i = respuesta.incidencia; const meta = iconMeta(i.TipoIncidencia);
  const andPuedeEditar = respuesta.puedeEditar; const andPuedeEliminar = respuesta.puedeEliminar;

  document.getElementById("detailBrandIcon").className = `brand-icon solid-${meta.color}`;
  document.getElementById("detailBrandIcon").setAttribute("data-icon", meta.icono);

  let html = `
    <article class="data-card">
      <div style="display:grid;grid-template-columns:60px 1fr;gap:12px;align-items:center;">
        <div class="mini-icon solid-${meta.color}" data-icon="${meta.icono}"></div>
        <div>
          <h2 class="data-card-title color-${meta.color}">${escapeHTML(i.TipoIncidencia || meta.name)}</h2>
          <p class="data-card-text"><strong>ID Incidencia:</strong> ${escapeHTML(i.IDIncidencia)}</p>
          <span class="tag" style="background:${cssVar('green')};">Activo</span>
        </div>
      </div>
    </article>
    <article class="data-card">
      <h2 class="section-title">Docente</h2>
      <p class="data-card-text"><strong>${escapeHTML(i.Nombre)} ${escapeHTML(i.Apellidos)}</strong></p>
      <p class="data-card-text"><strong>ID de Acceso:</strong> ${escapeHTML(i.IDUsuario)}</p>
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
      <h2 class="section-title">Registrado por (Sello de Auditoría ID)</h2>
      <p class="data-card-text"><strong>Sello:</strong> ${escapeHTML(i.RegistradoPor || "Sin dato")}</p>
      <p class="data-card-text"><strong>Fecha de captura:</strong> ${formatearFecha(i.FechaRegistro)}</p>
    </article>
  `;

  if (andPuedeEditar && i.TipoIncidencia && esPermisoOfTexto(i.TipoIncidencia)) {
    html += `<button class="primary-button" onclick="abrirEdicionUsoPermiso()">Editar incidencia</button>`;
  }

  if (andPuedeEliminar) {
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
  document.getElementById("detailContent").innerHTML = html; inicializarIconos();
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
  
  API.obtenerDetalleIncidencia(selectedIncidentID, respuesta => renderEditarUso(respuesta.incidencia), error => {
    document.getElementById("editUseContent").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
  });
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
  document.getElementById("editUseContent").innerHTML = html; inicializarIconos();
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
      <input id="editUso${num}" type="${utilizada ? "text" : "date"}" value="${utilizada ? formatearFechaReal(fecha) : ""}" ${utilizada ? "disabled" : ""}>
    </div>
  `;
}

function guardarEdicionUso() {
  if (!confirm("¿Confirmas guardar las fechas de uso pendientes?")) return;
  const status = document.getElementById("editUseStatus");
  status.className = "status-box show"; status.textContent = "Guardando cambios...";
  
  const datos = {
    Uso1Fecha: valorInput("editUso1"), Uso2Fecha: valorInput("editUso2"), Uso3Fecha: valorInput("editUso3")
  };
  
  API.guardarUsosPermisoOficial(selectedIncidentID, datos, function() {
    status.className = "status-box show ok"; status.textContent = "Cambios guardados correctamente.";
    setTimeout(function() { abrirDetalleIncidencia(selectedIncidentID); }, 800);
  }, function(error) {
    status.className = "status-box show error"; status.textContent = obtenerMensajeError(error);
  });
}

function valorInput(id) {
  const el = document.getElementById(id); return el ? el.value : "";
}

function eliminarIncidenciaActual() {
  if(!confirm("¿Estás seguro de eliminar esta incidencia? Esta acción no se puede deshacer.")) return;
  API.eliminarIncidencia(selectedIncidentID, function(res) {
    alert("Incidencia eliminada exitosamente."); goBack();
  }, function(err) {
    alert("Error eliminando: " + err);
  });
}

function crearCardIncidencia(i, mostrarDetalleBtn = true) {
  const meta = iconMeta(i.TipoIncidencia); const card = document.createElement("article");
  card.className = "incident-card";
  
  let html = `
    <div class="incident-avatar solid-${meta.color}" data-icon="${meta.icono}"></div>
    <div class="person-avatar" data-icon="user"></div>
    <div>
      <h3 class="incident-name">${escapeHTML(i.Nombre)} ${escapeHTML(i.Apellidos)}</h3>
      <p class="incident-detail"><strong>Tipo:</strong> ${escapeHTML(i.TipoIncidencia || "Incidencia")}</p>
      <p class="incident-detail"><strong>Periodo:</strong> ${formatearFecha(i.FechaInicio)} al ${formatearFecha(i.FechaFin)}</p>
    </div>
  `;
  if (mostrarDetalleBtn) {
    html += `<button class="detail-button" onclick="abrirDetalleIncidencia('${escapeHTML(i.IDIncidencia)}')">Ver<br>detalle</button>`;
  } else {
    html += `<div></div>`;
  }
  
  card.innerHTML = html; return card;
}

function crearTarjetaSimple(titulo, texto) {
  return `
    <section class="data-card">
      <h2 class="data-card-title">${escapeHTML(titulo)}</h2>
      <p class="data-card-text">${escapeHTML(texto)}</p>
    </section>
  `;
}

function escapeHTML(texto) {
  return String(texto)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function abrirNotificaciones() {
  if (currentModule !== "Direccion") { abrirLeerNotificaciones(); return; }
  showScreen("notifyMenuScreen");
}

function abrirLeerNotificaciones() {
  document.getElementById("notifyReadList").innerHTML = crearTarjetaSimple("Cargando notificaciones...", "Consultando mensajes recibidos.");
  document.getElementById("notifyReadSubtitle").textContent = "Mensajes recibidos (" + currentModule + ")";
  showScreen("notifyReadScreen");
  
  API.obtenerNotificacionesUsuario(respuesta => {
    renderNotificacionesLeidas(respuesta.notificaciones);
  }, error => {
    document.getElementById("notifyReadList").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
  });
}

function renderNotificacionesLeidas(notificaciones) {
  const container = document.getElementById("notifyReadList"); container.innerHTML = "";
  if (!notificaciones || notificaciones.length === 0) {
    container.innerHTML = crearTarjetaSimple("Sin notificaciones", "No se encontraron mensajes en su bandeja."); return;
  }
  notificaciones.forEach(n => {
    const meta = estadoNotificacionMeta(n.Estado); const card = document.createElement("article");
    card.className = `notification-card-full ${meta.clase}`;
    card.onclick = () => abrirDetalleNotificacionRecibida(n.IDNotificacion);
    card.innerHTML = `
      <div style="display:grid;grid-template-columns:42px 1fr;gap:10px;align-items:center;margin-bottom:8px;">
        <div class="notification-status-icon solid-${meta.color}" data-icon="${meta.icono}"></div>
        <div>
          <h3 style="margin:0;font-size:11px;font-weight:900;text-transform:uppercase;color:var(--text);">${meta.texto}</h3>
          <p style="margin:0;font-size:10px;color:#4b5563;">Enviado el: ${n.FechaEnvio}</p>
        </div>
      </div>
      <p class="notification-message">${escapeHTML(n.Mensaje)}</p>
      <p class="notification-meta"><strong>Enviado por:</strong> Dirección</p>
    `;
    container.appendChild(card);
  });
  inicializarIconos();
}

function abrirDetalleNotificacionRecibida(idNotificacion) {
  showScreen("notifyDetailScreen");
  document.getElementById("notifyDetailContent").innerHTML = crearTarjetaSimple("Cargando mensaje...", "Actualizando estado de lectura.");
  
  API.obtenerDetalleNotificacion(idNotificacion, respuesta => {
    const n = respuesta.notificacion; const meta = estadoNotificacionMeta(n.Estado);
    document.getElementById("notifyDetailIcon").className = `brand-icon solid-${meta.color}`;
    document.getElementById("notifyDetailIcon").setAttribute("data-icon", "bell");
    document.getElementById("notifyDetailContent").innerHTML = `
      <article class="notification-card-full" style="border-left:7px solid var(--cyan);">
        <p class="notification-date">Recibido: ${escapeHTML(n.FechaEnvio)}</p>
        <p class="notification-message">${escapeHTML(n.Mensaje)}</p>
        <p class="notification-meta"><strong>Estatus:</strong> Leído</p>
        <p class="notification-meta"><strong>Leído el:</strong> ${escapeHTML(n.FechaLectura)}</p>
      </article>
    `;
  }, error => {
    document.getElementById("notifyDetailContent").innerHTML = crearTarjetaSimple("Error al leer", obtenerMensajeError(error));
  });
}

function abrirEnviarNotificacion() {
  const select = document.getElementById("notifyUserSelect"); select.innerHTML = `<option value="">Cargando personas...</option>`;
  showScreen("notifySendScreen"); document.getElementById("notifySendStatus").className = "status-box";
  
  API.obtenerUsuariosParaFormulario(usuarios => {
    select.innerHTML = `<option value="">Seleccionar persona</option>`;
    usuarios.forEach(u => {
      const opt = document.createElement("option"); opt.value = u.IDAcceso;
      opt.textContent = `${u.Apellidos} ${u.Nombre} (${u.Rol})`; select.appendChild(opt);
    });
  }, error => {
    select.innerHTML = `<option value="">Error cargando personal</option>`; alert(obtenerMensajeError(error));
  });
}

function ejecutarEnvioNotificacion() {
  const id = document.getElementById("notifyUserSelect").value;
  const msg = document.getElementById("notifyMessage").value;
  const status = document.getElementById("notifySendStatus");
  if (!id) { alert("Selecciona la persona a notificar."); return; }
  if (!msg.trim()) { alert("Escribe el contenido del mensaje."); return; }
  status.className = "status-box show"; status.textContent = "Enviando notificación...";
  
  API.guardarNotificacion({ IDUsuario: id, Mensaje: msg }, respuesta => {
    status.className = "status-box show ok";
    status.textContent = "Notificación enviada correctamente a " + respuesta.Nombre + " " + respuesta.Apellidos;
    document.getElementById("notifyMessage").value = "";
  }, error => {
    status.className = "status-box show error"; status.textContent = obtenerMensajeError(error);
  });
}

function abrirNotificacionesEnviadas() {
  document.getElementById("notifySentList").innerHTML = crearTarjetaSimple("Cargando notificaciones...", "Consultando historial de mensajes enviados.");
  showScreen("notifySentScreen");
  
  API.obtenerNotificacionesEnviadas(respuesta => {
    renderNotificacionesEnviadasLista(respuesta.notificaciones);
  }, error => {
    document.getElementById("notifySentList").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
  });
}

function renderNotificacionesEnviadasLista(notificaciones) {
  const container = document.getElementById("notifySentList"); container.innerHTML = "";
  if (!notificaciones || notificaciones.length === 0) {
    container.innerHTML = crearTarjetaSimple("Sin notificaciones", "No ha enviado notificaciones a ningún docente."); return;
  }
  notificaciones.forEach(n => {
    const meta = estadoNotificacionMeta(n.Estado); const card = document.createElement("article");
    card.className = `notification-card-full ${meta.clase}`;
    card.onclick = () => abrirDetalleNotificacionEnviada(n.IDNotificacion);
    card.innerHTML = `
      <p class="notification-date">Enviado: ${escapeHTML(n.FechaEnvio)} para: ${escapeHTML(n.Nombre)} ${escapeHTML(n.Apellidos)}</p>
      <p class="notification-message">${escapeHTML(n.Mensaje)}</p>
      <p class="notification-meta"><strong>Estatus lectura:</strong> ${meta.texto}</p>
    `;
    container.appendChild(card);
  });
  inicializarIconos();
}

function abrirDetalleNotificacionEnviada(idNotifId) { alert("Revisando estatus de lectura del mensaje: " + NotifId); }

function esPermisoOfTexto(tipo) { return String(tipo || "").toLowerCase() === "permiso oficial"; }

function esPermisoOficialTexto(tipo) { return String(tipo || "").toLowerCase() === "permiso oficial"; }

function renderError(error) {
  document.getElementById("dataList").innerHTML = crearTarjetaSimple("Error", obtenerMensajeError(error));
  showScreen("dataScreen", false);
}

function openTipoIncidencia() {
  const container = document.getElementById("typeList"); container.innerHTML = "";
  document.getElementById("typeAccessName").textContent = currentModule; showScreen("typeScreen");
  
  PERMISSION_TYPES.forEach(tipo => {
    if (currentModule !== "Direccion" && tipo.oficial) return;
    const button = document.createElement("button"); button.className = "type-card";
    button.onclick = () => abrirFormularioIncidencia(tipo);
    button.innerHTML = `
      <div class="type-icon solid-${tipo.color}" data-icon="${tipo.icono}"></div>
      <div>
        <h2 class="type-title color-${tipo.color}">${tipo.nombre}</h2>
        <p class="type-desc">${tipo.descripcion}</p>
      </div>
      <div class="type-arrow color-${tipo.color}">›</div>
    `;
    container.appendChild(button);
  });
  inicializarIconos();
}

function abrirFormularioIncidencia(tipo) {
  selectedType = tipo;
  document.getElementById("formBrandIcon").className = `brand-icon solid-${tipo.color}`;
  document.getElementById("formBrandIcon").setAttribute("data-icon", tipo.icono);
  document.getElementById("formTitle").textContent = tipo.nombre;
  document.getElementById("formSubtitle").textContent = tipo.descripcion;
  document.getElementById("formAccessName").textContent = currentModule;
  document.getElementById("formStatus").className = "status-box";
  document.getElementById("formObservaciones").value = "";
  const select = document.getElementById("formUsuario"); select.innerHTML = `<option value="">Cargando docentes...</option>`;
  
  API.obtenerUsuariosParaFormulario(usuarios => {
    select.innerHTML = `<option value="">Seleccionar docente</option>`;
    usuarios.forEach(u => {
      const opt = document.createElement("option"); opt.value = u.IDAcceso;
      opt.textContent = `${u.Apellidos} ${u.Nombre} (${TURNOS_TEXTO[u.Turno] || u.Turno})`; select.appendChild(opt);
    });
  }, error => {
    select.innerHTML = `<option value="">Error cargando docentes</option>`; alert(obtenerMensajeError(error));
  });

  if (tipo.oficial) {
    document.getElementById("formNormalDates").style.display = "none";
    document.getElementById("formPermisoOficial").style.display = "block";
    document.getElementById("fechaOficial1").value = ""; document.getElementById("fechaOficial2").value = "";
    document.getElementById("fechaOficial3").value = ""; document.getElementById("uso1Fecha").value = "";
    document.getElementById("uso2Fecha").value = ""; document.getElementById("uso3Fecha").value = "";
  } else {
    document.getElementById("formNormalDates").style.display = "block";
    document.getElementById("formPermisoOficial").style.display = "none";
    document.getElementById("formFechaInicio").value = ""; document.getElementById("formFechaFin").value = "";
  }

  if (tipo.medico) {
    document.getElementById("grupoLicenciaMedica").style.display = "grid"; document.getElementById("formLicencia").value = "";
  } else {
    document.getElementById("grupoLicenciaMedica").style.display = "none";
  }

  showScreen("formScreen");
  document.getElementById("formInfoText").textContent = tipo.oficial ? "El permiso oficial calcula el rango según las fechas oficiales." : "La fecha de inicio y fin pueden ser el mismo día.";
}

function guardarFormulario() {
  const usrIDUsuario = document.getElementById("formUsuario").value;
  const usuarioIDAcceso = sessionStorage.getItem("userIDAcceso");
  
  if (!usrIDUsuario) { alert("Selecciona un docente afectado."); return; }
  
  const datos = {
    IDUsuario: usrIDUsuario, TipoIncidencia: selectedType.nombre,
    FechaInicio: valorInput("formFechaInicio"), FechaFin: valorInput("formFechaFin"),
    FechaOficial1: valorInput("fechaOficial1"), FechaOficial2: valorInput("fechaOficial2"),
    FechaOficial3: valorInput("fechaOficial3"), Uso1Fecha: valorInput("uso1Fecha"),
    Uso2Fecha: valorInput("uso2Fecha"), Uso3Fecha: valorInput("uso3Fecha"),
    LicenciaMedica: valorInput("formLicencia"), Observaciones: valorInput("formObservaciones"),
    RegistradoPor: usuarioIDAcceso
  };
  
  showScreen("splash", false); mostrarEstadoFormulario("Guardando incidencia...", false, false);
  
  API.guardarIncidencia(datos, resultado => {
    mostrarEstadoFormulario("Incidencia guardada correctamente.", false, true);
    setTimeout(function() { abrirDetalleIncidencia(resultado.IDIncidencia); }, 1200);
  }, error => {
    mostrarEstadoFormulario(obtenerMensajeError(error), true, false);
  });
}

function mostrarEstadoFormulario(mensaje, esError, esOk) {
  const status = document.getElementById("formStatus"); status.className = "status-box show";
  if (esError) status.classList.add("error"); if (esOk) status.classList.add("ok");
  status.textContent = mensaje;
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return "Sin fecha"; if (fechaISO === "Pendiente") return "Pendiente";
  const partes = fechaISO.toString().split("-");
  if (partes.length !== 3) return fechaISO;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function formatearFechaReal(fecha) { return formatearFecha(fecha); }

function cargarReporteDia() {
  document.getElementById("dataTitle").textContent = "Reporte del día";
  document.getElementById("dataSubtitle").textContent = "Cargando incidencias...";
  document.getElementById("dataStats").innerHTML = ""; document.getElementById("dataList").innerHTML = "";
  document.getElementById("dataAccessName").textContent = currentModule;
  document.getElementById("dataBrandIcon").className = "brand-icon solid-blue";
  document.getElementById("dataBrandIcon").setAttribute("data-icon", "report"); showScreen("dataScreen");
  
  API.obtenerReporteDia(respuesta => {
    document.getElementById("dataSubtitle").textContent = "Personal activo o con incidencias el " + formatearFecha(respuesta.fecha);
    document.getElementById("dataStats").innerHTML = renderEstadisticaGeneral(respuesta);
    renderListaIncidencias(respuesta.incidencias);
  }, renderError);
}

function renderEstadisticaGeneral(r) {
  return `
    <section class="summary-stat-row">
      <article class="summary-big-card presentes">
        <div class="summary-big-icon solid-green" data-icon="shield"></div>
        <div>
          <p class="summary-big-title">Presentes</p>
          <p class="summary-big-number color-green">${r.presentes}</p>
        </div>
      </article>
      <article class="summary-big-card ausentes">
        <div class="summary-big-icon solid-red" data-icon="incapacidad"></div>
        <div>
          <p class="summary-big-title">Ausentes</p>
          <p class="summary-big-number color-red">${r.ausentes}</p>
        </div>
      </article>
    </section>
  `;
}

function renderListaIncidencias(incidencias) {
  const container = document.getElementById("dataList"); container.innerHTML = "";
  if (!incidencias || incidencias.length === 0) {
    container.innerHTML = crearTarjetaSimple("Sin incidencias", "Todo el personal se encuentra sin incidencias registradas en esta fecha."); return;
  }
  container.innerHTML = `
    <h2 class="section-title">Personal con incidencia</h2>
    <p class="section-subtitle">Docentes ausentes o con permiso.</p>
  `;
  incidencias.forEach(incidencia => { container.appendChild(crearCardIncidencia(incidencia, true)); });
  inicializarIconos();
}

function cargarReporteSemanal() {
  document.getElementById("dataTitle").textContent = "Reporte semanal";
  document.getElementById("dataSubtitle").textContent = "Cargando reporte semanal...";
  document.getElementById("dataStats").innerHTML = ""; document.getElementById("dataList").innerHTML = "";
  document.getElementById("dataAccessName").textContent = currentModule;
  document.getElementById("dataBrandIcon").className = "brand-icon solid-blue";
  document.getElementById("dataBrandIcon").setAttribute("data-icon", "calendar"); showScreen("dataScreen");
  
  API.obtenerReporteSemanal(r => {
    document.getElementById("dataSubtitle").textContent = `Del ${formatearFecha(r.fechaInicio)} al ${formatearFecha(r.fechaFin)}`;
    document.getElementById("dataStats").innerHTML = renderEstadisticaGeneral(r);
    renderListaIncidencias(r.incidencias);
  }, renderError);
}

function abrirConsultaFechas() {
  document.getElementById("rangeFechaInicio").value = ""; document.getElementById("rangeFechaFin").value = "";
  document.getElementById("rangeStats").innerHTML = ""; document.getElementById("rangeResults").innerHTML = "";
  document.getElementById("rangeStatus").className = "status-box"; showScreen("rangeScreen");
}

function ejecutarConsultaFechas() {
  const inicio = document.getElementById("rangeFechaInicio").value;
  const fin = document.getElementById("rangeFechaFin").value; const status = document.getElementById("rangeStatus");
  
  if (!inicio || !fin) { alert("Selecciona ambas fechas para el rango de consulta."); return; }
  status.className = "status-box show"; status.textContent = "Consultando...";
  
  API.consultarFechas({ FechaInicio: inicio, FechaFin: fin }, r => {
    status.className = "status-box"; document.getElementById("rangeStats").innerHTML = renderEstadisticaGeneral(r);
    const container = document.getElementById("rangeResults"); container.innerHTML = "";
    if (!r.incidencias || r.incidencias.length === 0) {
      container.innerHTML = crearTarjetaSimple("Sin incidencias", "No existen incidencias en este intervalo."); return;
    }
    container.innerHTML = `
      <h2 class="section-title">Resultados de búsqueda</h2>
      <p class="section-subtitle">Incidencias encontradas en el rango.</p>
    `;
    r.incidencias.forEach(inc => { container.appendChild(crearCardIncidencia(inc, true)); });
    inicializarIconos();
  }, error => {
    status.className = "status-box show error"; status.textContent = obtenerMensajeError(error);
  });
}

function abrirEstadisticaMensual() {
  document.getElementById("statMes").value = ""; document.getElementById("statAnio").value = new Date().getFullYear();
  document.getElementById("statMonthResults").innerHTML = ""; document.getElementById("statMonthStatus").className = "status-box";
  showScreen("statMonthScreen");
}

function consultarEstadisticaMensual() {
  const mes = document.getElementById("statMes").value; const anio = document.getElementById("statAnio").value;
  const status = document.getElementById("statMonthStatus");
  if (!mes) { alert("Seleccione el mes a analizar."); return; }
  if (!anio || anio < 2020 || anio > 2100) { alert("Introduzca un año válido."); return; }
  status.className = "status-box show"; status.textContent = "Generando estadística...";
  
  API.obtenerEstadisticaMensual(selectedPersonID, mes, anio, res => {
    status.className = "status-box"; const d = res.datos;
    const html = `
      <article class="data-card">
        <h2 class="data-card-title">${escapeHTML(res.persona.Nombre)} ${escapeHTML(res.persona.Apellidos)}</h2>
        <p class="data-card-text"><strong>Periodo analizado:</strong> ${formatearFecha(res.fechaInicio)} al ${formatearFecha(res.fechaFin)}</p>
        <p class="data-card-text"><strong>Total incidencias en días:</strong> ${res.total}</p>
        <p class="data-card-text"><strong>Incidencia más frecuente:</strong> ${escapeHTML(res.tipoMasFrecuente)}</p>
        <section class="chart-wrap">
          <div class="chart-axis-label">Días del mes ${escapeHTML(res.mes)}/${escapeHTML(res.anio)}</div>
          <div class="chart-area">
            <div class="chart-y">Días afectados</div>
            <div class="bars" id="statMonthBars"></div>
          </div>
        </section>
      </article>
    `;
    document.getElementById("statMonthResults").innerHTML = html;
    const barsContainer = document.getElementById("statMonthBars"); barsContainer.innerHTML = "";
    
    d.forEach(item => {
      const h = Math.min(item.cantidad * 22, 210); const meta = iconMeta(item.tipo);
      const barDiv = document.createElement("div"); barDiv.className = "bar-item";
      barDiv.innerHTML = `
        <span class="bar-value">${item.cantidad > 0 ? item.cantidad : ""}</span>
        <div class="bar solid-${meta.color}" style="height:${h}px;"></div>
        <div class="bar-label">Día<br>${item.dia}</div>
      `;
      barsContainer.appendChild(barDiv);
    });
    inicializarIconos();
  }, function(error) {
    status.className = "status-box show error"; status.textContent = obtenerMensajeError(error);
  });
}

function obtenerMensajeError(err) {
  return err.message || err;
}
