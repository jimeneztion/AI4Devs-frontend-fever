import axios from "axios";

const API_URL = "http://localhost:3010";

export const getInterviewFlowByPosition = async (positionId) => {
  try {
    const response = await axios.get(
      `${API_URL}/positions/${positionId}/interviewflow`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching interview flow:", error);
    if (error.response && error.response.status === 404) {
      throw new Error("Posición no encontrada");
    } else if (error.response) {
      throw new Error(`Error del servidor: ${error.response.status}`);
    } else if (error.request) {
      throw new Error(
        "No se pudo conectar con el servidor. Comprueba tu conexión a internet."
      );
    } else {
      throw new Error("Error inesperado al obtener el flujo de entrevistas");
    }
  }
};

export const getCandidatesByPosition = async (positionId) => {
  try {
    const response = await axios.get(
      `${API_URL}/positions/${positionId}/candidates`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    if (error.response && error.response.status === 404) {
      throw new Error("No se encontraron candidatos para esta posición");
    } else if (error.response) {
      throw new Error(`Error del servidor: ${error.response.status}`);
    } else if (error.request) {
      throw new Error(
        "No se pudo conectar con el servidor. Comprueba tu conexión a internet."
      );
    } else {
      throw new Error("Error inesperado al obtener los candidatos");
    }
  }
};

export const updateCandidateStage = async (candidateId, stageData) => {
  try {
    const response = await axios.put(
      `${API_URL}/candidates/${candidateId}/stage`,
      stageData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating candidate stage:", error);
    if (error.response && error.response.status === 404) {
      throw new Error("Candidato no encontrado");
    } else if (error.response) {
      throw new Error(`Error del servidor: ${error.response.status}`);
    } else if (error.request) {
      throw new Error(
        "No se pudo conectar con el servidor. Comprueba tu conexión a internet."
      );
    } else {
      throw new Error("Error inesperado al actualizar la fase del candidato");
    }
  }
};
