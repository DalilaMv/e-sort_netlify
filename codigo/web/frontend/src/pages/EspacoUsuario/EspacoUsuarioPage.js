import "../../App.css";
import React, { useState, useEffect } from "react";
import { Typography, Col, Card, Row, Tabs } from "antd";
import authService from "../../services/auth.service";
import Axios from "axios";
import ListSalas from "./ListSalas";
import ListEventos from "./ListEventos";
import { API_URL } from "../../config/env";
import { useDispatch } from "react-redux";
import { getSalaAsync } from "../../slicers/salasSlice";
import { getEventoAsync } from "../../slicers/eventosSlice";
const { Title } = Typography;
const user = authService.getLoggedUser()

function EspacoUsuarioPage() {
  const [minhasSalasList, setMinhasSalaList] = useState([]);
  const [inscritoSalasList, setInscritoSalasList] = useState([]);
  const [meusEventos, setMeusEventos] = useState([]);
  const [participantEventsList, setParticipantEventsList] = useState([]);
  const [esporteList, setEsporteList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalaAsync())
    dispatch(getEventoAsync())
    Axios.get(`${API_URL}/rooms/myroom/${user[0].id}`).then((response) => {
      setMinhasSalaList(response.data)
    });
    Axios.get(`${API_URL}/participants/checkParticipantRoom/${user[0].id}`).then((response) => {
      setInscritoSalasList(response.data)
    });
    Axios.get(`${API_URL}/events/checkRoom/${user[0].id}`).then((response) => {
      setMeusEventos(response.data)
    });
    Axios.get(`${API_URL}/integrants/checkIntegrantsEvents/${user[0].id}`).then((response) => {
      setParticipantEventsList(response.data)
    })
    Axios.get(`${API_URL}/sport`).then((response) => {
      setEsporteList(response.data.sport);
    })
  }, []);

  return (
    <>
      <Row justify="space-around" style={{margin: 40}}>
        <Col span={11}>
          <Card style={{ width: "100%", borderRadius: "10px", }}>
            <Title>Salas</Title>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  label: `Minhas salas`,
                  key: '1',
                  children: (<ListSalas type="owner" salasList={minhasSalasList}  />),
                },
                {
                  label: `Salas em que me inscrevi`,
                  key: '2',
                  children: (<ListSalas type="participant" salasList={inscritoSalasList}/> ),
                },
              ]}
            />
          </Card>
        </Col>
        <Col span={11}>
        <Card style={{ width: "100%" , borderRadius: "10px", }}>
          <Title>Eventos</Title>
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                label: `Meus eventos`,
                key: '1',
                children: (<ListEventos esportesList={esporteList} type="owner" salasList={meusEventos}  />),
              },
              {
                label: `Eventos em que me inscrevi`,
                key: '2',
                children: (<ListEventos  esportesList={esporteList} type="participant" salasList={participantEventsList}/> ),
              },
            ]}
          />
        </Card>
        </Col>
      </Row>
     </>
  );
}

export default EspacoUsuarioPage;
