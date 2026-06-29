/**
 * Portal Docentes - Conector API Oficial (js/api.js)
 */

const API_URL = "https://script.google.com/macros/s/AKfycbwDNzq42FPP83uuNxNGCCCqzT9iLp199zvBoH9N5FKpCeYJ1-66A6LAFagXd_Eibk6P/exec";

const PortalAPI = {
  /**
   * Obtener todas las incidencias (vía GET implícito de GAS / o simulación por comandos estructurados)
   * Dado que doGet devuelve el HTML, implementamos la llamada mandando la solicitud de datos
   */
  async obtenerIncidencias() {
    try {
      // Como doGet por defecto sirve el HTML en Apps Script, realizamos una llamada estructurada mediante fetch
      // NOTA: Para llamadas limpias multiplataforma se prefiere interactuar por POST estructurado si es CORS puro.
      const respuesta = await fetch(`${API_URL}?fetch=incidencias`, {
        method: "GET",
        mode: "cors"
      });
      if (!respuesta.ok) throw new Error("Error en la respuesta de la red.");
      return await respuesta.json();
    } catch (error) {
      console.error("Error al recuperar incidencias:", error);
      // Fallback dinámico si se requiere pasar por POST estructurado debido a restricciones nativas de GAS
      return Object.freeze([]);
    }
  },

  /**
   * Registrar una nueva incidencia enviando la estructura al doPost de GAS
   */
  async registrarIncidencia(datosIncidencia) {
    try {
      const payload = {
        action: "registrarIncidencia",
        data: datosIncidencia
      };

      const respuesta = await fetch(API_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8" // Evita la pre-petición OPTIONS compleja de CORS en GAS
        },
        body: JSON.stringify(payload)
      });

      if (!respuesta.ok) throw new Error("No se pudo conectar con el servidor del Portal.");
      return await respuesta.json();
    } catch (error) {
      console.error("Error crítico en registrarIncidencia:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Actualizar una incidencia existente (Cambio de estado o asignación de comentarios)
   */
  async actualizarIncidencia(idIncidencia, nuevoEstado, comentarios, rolUsuario) {
    try {
      const payload = {
        action: "actualizarIncidencia",
        data: {
          id: idIncidencia,
          nuevoEstado: nuevoEstado,
          comentarios: comentarios,
          rolUsuario: rolUsuario
        }
      };

      const respuesta = await fetch(API_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      if (!respuesta.ok) throw new Error("No se pudo actualizar el registro en el servidor.");
      return await respuesta.json();
    } catch (error) {
      console.error("Error crítico en actualizarIncidencia:", error);
      return { success: false, error: error.message };
    }
  }
};
