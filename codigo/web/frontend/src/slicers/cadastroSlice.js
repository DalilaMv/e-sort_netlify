import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import { message } from "antd";
import { API_URL } from "../config/env";
const axios = require("axios");

export const cadastroSlice = createSlice({
  name: "cadastro",
  initialState: {
    data: []
  },
  reducers: {
    addUser: (state, action) => {
      state.data.push(action.payload);
    },
  }
});

export const saveUserAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/user/save`, data).then(async (response) => {
      message.success("Usuário cadastrado com sucesso!");
      let res = await authService.authenticate({
        email: data["email"],
        senha: data["senha"],
      });
      authService.setLoggedUser(res.data);
      window.setTimeout(function () {
        window.location.href = "/room";
      }, 400);
    });
    dispatch(addUser(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export const { addUser } = cadastroSlice.actions;
export const listUsers = (state) => state.cadastro.data;
export default cadastroSlice.reducer;
