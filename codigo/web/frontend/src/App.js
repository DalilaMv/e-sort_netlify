import "./App.css";
import React from "react";
import SalasPage from "./pages/SalasPage";
import EventosPage from "./pages/EventosPage";
import VisaoSalaPage from "./pages/VisaoSalaPage";
import SingInPage from "./pages/SingInPage";
import { Routes, Route } from "react-router";
import NavBar from "./components/nav/nav";
import CadastroPage from "./pages/CadastroPage";
import authService from "./services/auth.service";
import EspacoUsuarioPage from "./pages/EspacoUsuario/EspacoUsuarioPage";
import SorteioPage from "./pages/SorteioPage";

function App() {
  const user = authService.getLoggedUser();
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <NavBar />
            </>
          }
        />
        <Route
          exact
          path="/room"
          element={
            <>
              <NavBar />
              <SalasPage />
            </>
          }
        />
        <Route
          exact
          path="/room/:id"
          element={
            <>
              <NavBar />
              <VisaoSalaPage />
            </>
          }
        />
        <Route
          exact
          path="/event"
          element={
            <>
              <NavBar />
              <EventosPage />
            </>
          }
        />
        <Route
          exact
          path="/home"
          element={
            <>
              <NavBar />
              <EspacoUsuarioPage />
            </>
          }
        />
        <Route exact path="/cadastro" element={<CadastroPage />} />
        {user === null ? (
          <Route exact path="/singin" element={<SingInPage />} />
        ) : null}
        <Route
          exact
          path="/event/:id/sorteio"
          element={
            <>
              <NavBar />
              <SorteioPage />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
