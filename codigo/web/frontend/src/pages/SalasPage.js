import "../App.css";
import React, { useState, useEffect } from "react";
import MyCard from "../components/card/card";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Typography,
  InputNumber,
  Empty,
} from "antd";
import authService from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { getSalaAsync, listSalasFiltered, addSalaAsync, filter } from "../slicers/salasSlice";
import { API_URL } from "../config/env";
// import send from '../util/client';

const { Title } = Typography;
const { Search } = Input;

const publicVapidKey = "BOwwConOTomAudegKukLqQpmRW82QBIaj-n1epsgb5pBkygfe0RqWANSIdIVA7erVqs6DmbpglurAt2XMv1MZJU";

//register the service worker, register our push api, sedn the notifation
async function send(user_id) {
  //register service worker
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });

  //register push
  setTimeout(async function () {
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    //Send push notification
    await fetch(
      `${API_URL}/preparticipants/notification/${user_id}`,
      {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }, 2000);
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function SalasPage() {
  const [open, setOpen] = useState(false);
  const [componentSize, setComponentSize] = useState("default");
  const [values, setValues] = useState();
  const salaListFiltered = useSelector(listSalasFiltered);
  const dispatch = useDispatch();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const user = authService.getLoggedUser()[0];

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log("OIIII");
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        if (registrations.length > 0) {
          for (let registration of registrations) {
            // eslint-disable-next-line no-loop-func
            registration.unregister().then(function () {
              setTimeout(function () {
                send(user.id).catch((err) => console.error(err));
              }, 2000);
            });
          }
        } else {
          send(user.id).catch((err) => console.error(err));
        }
      });
    }
  }, []);

  useEffect(() => {
    dispatch(getSalaAsync())
  }, []);

  const handleChangeValues = (value) => {
    let field_name;
    let field_value;

    if (typeof value === "number") {
      field_name = "numParticipantes";
      field_value = value;
    } else {
      field_name = value.target.name;
      field_value = value.target.value;
    }
    setValues((prevValue) => ({
      ...prevValue,
      [field_name]: field_value,
    }));
  };

  const handleClickButton = async () => {
    const data = {
        nome: values.nome,
        descricao: values.descricao,
        esporte: values.esporte,
        numParticipantes: values.numParticipantes,
        cidade: values.cidade,
        usuarioId: user.id,
      }
    await dispatch(addSalaAsync(data))
    onClose();
  };

  const filter_salas = (value) => {
    dispatch(filter(value))
  };

  return (
    <>
      <Row justify="space-between">
        <Title style={{ margin: 15 }} level={3}>
          Salas disponíveis
        </Title>
        <div style={{ align: "right" }}>
          <Search
            placeholder={"filtrar por cidade"}
            style={{
              width: 250,
              paddingTop: 15,
              paddingRigth: 2,
              marginRight: 15,
            }}
            onSearch={filter_salas}
          />
          <Button
            style={{ margin: 15 }}
            type="primary"
            onClick={showDrawer}
            icon={<PlusOutlined />}
          >
            Nova sala
          </Button>
        </div>
      </Row>
      <div className="lista-de-salas">
        {salaListFiltered?.length > 0 ? (
          salaListFiltered.map((value) => {
            return (
              <>
              <MyCard
                style={{
                  width: 300,
                  margin: 15,
                }}
                key={value.id}
                id={value.id}
                description={value.descricao}
                esporte={value.esporte}
                nome={value.nome}
                usuarioId={value.usuarioId}
              ></MyCard>
              </>
            );
          })
        ) : (
          <Empty
            style={{ margin: "auto", padding: 20 }}
            description="não existem salas cadastradas na cidade filtrada"
          />
        )}
      </div>
      <Drawer
        title="Criar uma nova sala"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={() => handleClickButton()} type="primary">
              Salvar
            </Button>
          </Space>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="nome"
                label="Nome"
                rules={[
                  {
                    required: true,
                    message: "Por favor digite o nome da sala",
                  },
                ]}
              >
                <Input
                  name="nome"
                  placeholder=" Nome do grupo"
                  onChange={handleChangeValues}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="esporte"
                label="Esporte"
                rules={[
                  {
                    required: true,
                    message: "Selecione um esporte",
                  },
                ]}
              >
                <Input
                  name="esporte"
                  onChange={handleChangeValues}
                  placeholder="Selecione um esporte"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="descricao" label="Descrição">
                <TextArea
                  name="descricao"
                  placeholder="Descricao"
                  onChange={handleChangeValues}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cidade"
                label="Cidade"
                rules={[
                  {
                    required: true,
                    message: "Por favor digite a cidade",
                  },
                ]}
              >
                <Input
                  name="cidade"
                  placeholder="Cidade"
                  onChange={handleChangeValues}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="numParticipantes"
                label="Número máximo de integrantes"
                rules={[
                  {
                    required: true,
                    message: "Por favor digite um número",
                  },
                ]}
              >
                <InputNumber
                  name="numParticipantes"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Número máximo de integrantes"
                  onChange={handleChangeValues}
                />
              </Form.Item>
            </Col>
            {/*             <Col span={12}>
              <Form.Item
                name="imagem"
                label="Ícone da sala"
                rules={[
                  {
                    required: false,
                  },
                ]}
              ></Form.Item>
            </Col> */}
          </Row>
        </Form>
      </Drawer>
    </>
  );
}

export default SalasPage;
