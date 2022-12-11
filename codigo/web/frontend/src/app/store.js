import { configureStore } from '@reduxjs/toolkit';
import cadastroSlice from '../slicers/cadastroSlice';
import eventosSlice from '../slicers/eventosSlice';
import salasSlice from '../slicers/salasSlice';

export default configureStore({
  reducer: {
    cadastro: cadastroSlice,
    salas: salasSlice,
    eventos: eventosSlice
  }
})