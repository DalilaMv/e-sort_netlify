import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../config/env";
import Axios from "axios";

export const eventosSlice = createSlice({
  name: "eventos",
  initialState: {
    eventos: [],
    esportes: [],
  },
  reducers: {
    addEvento: (state, action) => {
      state.eventos.push(action.payload);
    },
    getEvento: (state, action) => {
      state.eventos = [...action.payload];
    },
    getEsporte: (state, action) => {
      state.esportes = [...action.payload];
    },
    deleteEvento: (state, action) => {
      const newState = state.eventos.filter(item => item.id !== action.payload);
      state.eventos = newState
    },
    editEvento: (state, action) => {
      const filter = state.eventos.map((i) => {
        if (i.id === action.payload.id ) {
          return {
            ...i,
            nome: action.payload.nome,
            textoesporte: action.payload.textoesporte,
            local: action.payload.local,
            valor: action.payload.valor,
            data: action.payload.data,
            horaFim: action.payload.horaFim,
            horaInicio: action.payload.horaInicio,
            quantidadeMax: action.payload.quantidadeMax,
            esporteId: action.payload.esporteId,
          }
        }
        return {...i}
      })
      state.eventos = filter;

    },
  }
});


export const editEventoAsync = (data) => async (dispatch) => {
  try {
    await Axios.post(`${API_URL}/event/update/${data.id}`, data)
    await dispatch(editEvento(data))
  } catch (err) {
    throw new Error(err);
  }
}

export const getEventoAsync = (data) => async (dispatch) => {
  try {
    const response = await Axios.get(`${API_URL}/event`);
    dispatch(getEvento(response.data.event));
  } catch (err) {
    throw new Error(err);
  }
};

export const getEsporteAsync = (data) => async (dispatch) => {
  try {
    const response = await Axios.get(`${API_URL}/sport`);
    dispatch(getEsporte(response.data.sport));
  } catch (err) {
    throw new Error(err);
  }
};


export const addEventoAsync = (data) => async (dispatch) => {
  try {
    await Axios.post(`${API_URL}/event/save`, data)
    await setTimeout(function() { dispatch(getEventoAsync())}, 7000)
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteEventoAsync = (id) => async (dispatch) => {
  try {
    await Axios.post(`${API_URL}/event/delete/${id}`)
    dispatch(deleteEvento(id))
  } catch (err) {
    throw new Error(err);
  }
};

export const { addEvento, getEvento, deleteEvento, editEvento, getEsporte} = eventosSlice.actions;
export const listEventos = (state) => state.eventos.eventos;
export const listEsportes = (state) => state.eventos.esportes;
export default eventosSlice.reducer;
