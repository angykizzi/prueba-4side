import axios from "axios";

const API_URL = "https://www.4sides.com.mx/api/prueba-tecnica/usuarios/index?results=50";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Respuesta de la API:", response.data);
    return response.data.usuarios;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
};
