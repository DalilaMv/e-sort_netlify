import "../App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Card,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Typography,
  InputNumber,
  Empty,
  List,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { UserOutlined } from "@ant-design/icons";
import { API_URL } from "../config/env";

const { Title } = Typography;
function VisaoSalaPage() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [componentSize, setComponentSize] = useState("default");
  const [participanteList, setParticipanteList] = useState(undefined);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  
  const onClose = () => {
    setOpen(false);
  };

  const [sala, setSala] = useState([]);
  useEffect(() => {
    Axios.get(`${API_URL}/room/${id}`).then((response) => {
      setSala(response.data.room);
    });
  }, []);
  const [evento, setEvento] = useState([]);
  useEffect(() => {
    Axios.get(`${API_URL}/events/checkRoom/${id}`).then(
      (response) => {
        setEvento(response.data.event);
      }
    );
  }, []);
  useEffect(() => {
    Axios.get(`${API_URL}/participants/rooms/${id}`).then(
      (response) => {
        setParticipanteList(response.data.participant);
      }
    );
  }, []);
  return (
    <div>
      <Form
        className="form-card"
        labelCol={{ span: 6 }}
        style={{ justifyContent: "center", alignItems: "center", margin: 20 }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Card style={{ borderRadius: "4px" }}>
          <Title style={{ margin: 15, marginLeft: 400 }} level={3}>
            {sala.nome}
          </Title>
          <Form
            layout="horizontal"
            style={{ marginTop: "30px" }}
            name="sala"
            id="visaoSala"
          >
            <Form.Item label="Descrição">
              <TextArea
                style={{ border: "1px solid #F0F1F7", borderRadius: "4px" }}
                name="descricao"
                value={sala.descricao}
                readOnly="true"
                disabled
              />
            </Form.Item>
            <Form.Item label="Esporte">
              <Input
                style={{ border: "1px solid #F0F1F7", borderRadius: "4px" }}
                name="Esporte"
                readOnly="true"
                size="large"
                value={sala.esporte}
                disabled
              />
            </Form.Item>
            <Form.Item label="Número de integrantes cadastrados">
              <InputNumber
                style={{ border: "1px solid #F0F1F7", borderRadius: "4px" }}
                name="numParticipantes"
                value={sala.numParticipantes}
                readOnly="true"
                disabled
              />
            </Form.Item>
            <Form.Item label="Cidade">
              <Input
                style={{ border: "1px solid #F0F1F7", borderRadius: "4px" }}
                name="cidade"
                value={sala.cidade}
                readOnly="true"
                disabled
              ></Input>
            </Form.Item>
            <Button
            style={{ margin: 15 }}
            type="primary"
            onClick={showDrawer}
            icon={<UserOutlined/>}
          >
            Visualizar Participantes
          </Button>
          </Form>
          {typeof evento !== "undefined" &&
            evento.map((value) => {
              return (
                <Card
                  style={{
                    borderRadius: "4px",
                    color: "white",
                    width: "40%",
                    marginLeft: 300,
                  }}
                >
                  <Title
                    style={{ margin: 20, marginLeft: 80, marginBottom: 25 }}
                    level={3}
                  >
                    Proximo Evento
                  </Title>
                  <Form
                    layout="horizontal"
                    name="proximoEvento"
                    id="proximoEvento-form"
                  >
                    <Form.Item
                      name="DataProximoEvento"
                      label="Data do Proximo Evento"
                    >
                      <Input
                        style={{
                          border: "1px solid #F0F1F7",
                          borderRadius: "4px",
                        }}
                        name="DataEvento"
                        value={evento.data}
                        readOnly="true"
                        disabled
                      />
                    </Form.Item>
                    <Form.Item
                      name="inscritos"
                      label="Inscritos Proximo Evento"
                    >
                      <Input
                        style={{
                          border: "1px solid #F0F1F7",
                          borderRadius: "4px",
                        }}
                        name="InscritosEvento"
                        value={evento.quantidade}
                        readOnly="true"
                        disabled
                      />
                    </Form.Item>
                    <Form.Item style={{ paddingTop: "20px" }}>
                      <Button
                        htmlType="submit"
                        size="large"
                        style={{
                          color: "white",
                          background: "#36ace2",
                          borderRadius: "4px",
                          marginLeft: 40,
                          width: "80%",
                        }}
                      >
                        <Link to="/room"> Inscrever-se</Link>
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              );
            })}
        <Drawer
        title="Participantes"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        {/* <Form
          layout="vertical"
          hideRequiredMark
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        > */}
          <Row gutter={16}>
            {/* <Col span={12}>
              <Form.Item
                name="nome"
                label="Nome Do Participante"
              >
              </Form.Item>
            </Col>  */}
          
            <List
              dataSource={participanteList}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    // avatar={<Avatar src={item.picture.large} />}
                    // title={<a href="https://ant.design">{item.nome}</a>}
                    description={item.nome}
                  />
                  <div>Content</div>
                </List.Item>
              )}
            />
          </Row> 
        {/* </Form> */}
      </Drawer>
        </Card>
      </Form>
    </div>
  );
}

export default VisaoSalaPage;
