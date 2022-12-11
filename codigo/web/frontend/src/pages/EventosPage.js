import "../App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import MyCard from "../components/cardEvento/cardEvento";
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
  Select,
  DatePicker,
  TimePicker,
} from "antd";
import authService from "../services/auth.service";
import dayjs from "dayjs";
import InputCurrency from "../components/InputCurrency/index";
import { useDispatch, useSelector } from "react-redux";
import { getEventoAsync, getEsporteAsync, listEventos, listEsportes, addEventoAsync } from "../slicers/eventosSlice";

const { Title } = Typography;

function EventosPage() {
  const [open, setOpen] = useState(false);
  const [componentSize, setComponentSize] = useState("default");
  const [values, setValues] = useState();
  const eventoList = useSelector(listEventos);
  const esportesList = useSelector(listEsportes);
  const dispatch = useDispatch();

  const user = authService.getLoggedUser();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getEventoAsync())
    dispatch(getEsporteAsync())
  }, []);

  const handleChangeValues = (value) => {
    const field_name = value.target.name;
    const field_value = value.target.value;
    setValues((prevValue) => ({
      ...prevValue,
      [field_name]: field_value,
    }));
  };

  const handleInputNumberAndSelectChanges = (value, field) => {
    setValues((prevValue) => ({
      ...prevValue,
      [field]: value,
    }));
  };

  const handleClickButton = async () => {
    const data = {
      nome: values.nome,
      textoesporte: values.textoesporte,
      local: values.local,
      valor: values.valor,
      data: values.data,
      horaFim: values.horaFim,
      horaInicio: values.horaInicio,
      quantidadeMax: values.quantidadeMax || 0,
      usuarioId: user[0].id,
      esporteId: values.esporteId,
      status: "publico",
      quantidade: 0,
    }
    dispatch(addEventoAsync(data)).then(onClose)
  };

  return (
    <>
      <Row justify="space-between">
        <Title style={{ margin: 15 }} level={3}>
          Eventos
        </Title>
        <div style={{ align: "right" }}>
          <Button
            style={{ margin: 15 }}
            type="primary"
            onClick={showDrawer}
            icon={<PlusOutlined />}
          >
            Novo evento
          </Button>
        </div>
      </Row>
      <div className="lista-de-salas">
        {typeof eventoList !== "undefined" &&
          eventoList?.map((value) => {
            return (
              <MyCard
                style={{
                  width: 300,
                  margin: 15,
                }}
                key={value.id}
                id={value.id}
                data={value.data}
                esporte={value.textoesporte}
                nome={value.nome}
                valor={value.valor}
                local={value.local}
                usuarioId={value.usuarioId}
                esportesList={esportesList}
                horaFim={value.horaFim}
                horaInicio={value.horaInicio}
                quantidadeMax={value.quantidadeMax}
                esporteId={value.esporteId}
                quantidade={value.quantidade}
              ></MyCard>
            );
          })}
      </div>
      <Drawer
        title="Criar um novo evento"
        width={600}
        destroyOnClose
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
                    message: "Por favor digite o nome do evento",
                  },
                ]}
              >
                <Input
                  name="nome"
                  placeholder=" Nome do evento"
                  onChange={handleChangeValues}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="esporteId"
                label="Esporte"
                rules={[
                  {
                    required: true,
                    message: "Selecione um esporte",
                  },
                ]}
              >
                <Select
                  name="esporteId"
                  onChange={(value) =>
                    handleInputNumberAndSelectChanges(value, "esporteId")
                  }
                  placeholder="Esporte"
                  value="id"
                  key="id"
                >
                  {esportesList?.map((i) => (
                    <Select.Option value={i.id} key={i.id}>
                      {i.nome}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="textoesporte"
                label="Descrição"
                rules={[
                  {
                    required: true,
                    message: "Selecione um esporte",
                  },
                ]}
              >
                <TextArea
                  name="textoesporte"
                  onChange={handleChangeValues}
                  placeholder="Selecione um esporte"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="local" label="Endereço">
                <TextArea
                  name="local"
                  placeholder="Endereço"
                  onChange={handleChangeValues}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="data"
                label="Data"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecione uma data",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  name="data"
                  placeholder="Data"
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    value !== null &&
                      setValues((prevValue) => ({
                        ...prevValue,
                        data: dayjs(value).format("YYYY-MM-DD"),
                      }));
                  }}
                />
              </Form.Item>
            </Col>
            <Col style={{ width: "100%" }} span={12}>
              <Form.Item
                name="hora"
                label="Horário de inicio e fim"
                rules={[
                  {
                    required: true,
                    message: "Por favor selecione um horário",
                  },
                ]}
              >
                <TimePicker.RangePicker
                  style={{ width: "100%" }}
                  format="HH:mm"
                  onChange={(value) => {
                    value !== null &&
                      value.length > 1 &&
                      setValues((prevValue) => ({
                        ...prevValue,
                        horaInicio: dayjs(value[0]).format("HH:mm:00"),
                        horaFim: dayjs(value[1]).format("HH:mm:00"),
                      }));
                  }}
                  placeholder={["inicio", "fim"]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="valor"
                label="Valor por pessoa"
                rules={[
                  {
                    required: true,
                    message: "Por favor digite um valor",
                  },
                ]}
              >
                <InputCurrency
                  name="valor"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Valor por pessoa"
                  onChange={handleChangeValues}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="quantidadeMax" label="Máximo de participantes">
                <InputNumber
                  name="quantidadeMax"
                  style={{
                    width: "30%",
                  }}
                  placeholder="máximo"
                  onChange={(value) =>
                    handleInputNumberAndSelectChanges(value, "quantidadeMax")
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}

export default EventosPage;
