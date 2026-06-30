const TEST_USERS = {
  "Dirección": "D001",
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
  "Dirección": {
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

// Enrutador de arranque seguro (Validación de Llave H)
window.addEventListener("load", () => {
  inicializarIconos();
  
  const llaveAcceso = sessionStorage.getItem("userIDAcceso");
  if (llaveAcceso) {
    currentModule = sessionStorage.getItem("currentActiveModule") || "Dirección";
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
      sessionStorage.setItem("userIDAcceso", usr.IDAcceso || idAcceso);
      sessionStorage.setItem("userRol", usr.Rol);
      sessionStorage.setItem("userTurno", usr.Turno);
      sessionStorage.setItem("userName", usr.Nombre);
      
      const rol = usr.Rol.toLowerCase();
      if (rol.includes("dirección") || rol.includes("dir")) {
        currentModule = "Dirección";
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

function cerrarSesion() {
  sessionStorage.clear();
  document.getElementById("loginIDAcceso").value = "";
  document.getElementById("loginContrasena").value = "";
  document.getElementById("loginStatus").className = "status-box";
  showScreen("loginScreen", false);
}

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
    return
