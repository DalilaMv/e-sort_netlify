import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../config/env";
import Axios from "axios";

export const salasSlice = createSlice({
  name: "salas",
  initialState: {
    data: [],
    data_filtered: [],
  },
  reducers: {
    addSala: (state, action) => {
      state.data.push(action.payload);
      state.data_filtered.push(action.payload);
    },
    getSala: (state, action) => {
      state.data = [...action.payload];
      state.data_filtered = [...action.payload];
    },
    deleteSala: (state, action) => {
      const newState = state.data.filter(item => item.id !== action.payload);
      state.data = newState
      state.data_filtered = newState
    },
    filter: (state, action) => {
      const filter = state.data.filter((item) => item.cidade.toLowerCase().includes(action.payload.toLowerCase()));
      state.data_filtered = filter;
    },
    editSala: (state, action) => {
      const filter = state.data.map((i) => {
        if (i.id === action.payload.id ) {
          return {
            ...i,
            nome: action.payload.nome,
            descricao: action.payload.descricao,
            esporte: action.payload.esporte,
            numParticipantes: action.payload.numParticipantes,
            cidade:action.payload.cidade,
          }
        }
        return {...i}
      })
      state.data = filter;
      state.data_filtered = filter;

    },
  }
});

export const editSalaAsync = (data) => async (dispatch) => {
  try {
    await Axios.post(`${API_URL}/room/update/${data.id}`, data)
    await dispatch(editSala(data))
  } catch (err) {
    throw new Error(err);
  }
}

export const getSalaAsync = (data) => async (dispatch) => {
  try {
    const response = await Axios.get(`${API_URL}/room`);
    dispatch(getSala(response.data.room));
  } catch (err) {
    throw new Error(err);
  }
};

export const addSalaAsync = (data) => async (dispatch) => {
  try {
    await Axios.post(`${API_URL}/room/save`, data)
    await setTimeout(function() { dispatch(getSalaAsync())}, 5000)
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteSalaAsync = (id) => async (dispatch) => {
  try {
    await Axios.post(`${API_URL}/room/delete/${id}`)
    // await setTimeout(function() { dispatch(getSalaAsync())}, 5000)
    dispatch(deleteSala(id))
  } catch (err) {
    throw new Error(err);
  }
};

export const { addSala, getSala, deleteSala, filter, editSala } = salasSlice.actions;
export const listSalas = (state) => state.salas.data;
export const listSalasFiltered = (state) => state.salas.data_filtered;
export default salasSlice.reducer;
