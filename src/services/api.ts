import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return { data: response.data.usuarios, error: null };
  } catch (error) {
    return {
      data: [],
      error: "No se pudo obtener los usuarios. Inténtalo más tarde.",
    };
  }
};
