import "./cardEvento.css";
import styled from "styled-components";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Card,
  Drawer,
  Modal,
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  InputNumber,
  Select,
  TimePicker,
  DatePicker,
  message,
  List
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import authService from "../../services/auth.service";
import InputCurrency from "../InputCurrency/index";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import dayjs from "dayjs";
import moment from "moment";
import { API_URL } from "../../config/env";
import { useSelector, useDispatch } from "react-redux";
import { deleteEventoAsync, editEventoAsync } from "../../slicers/eventosSlice";
const { Meta } = Card;
const { confirm } = Modal;

const SortIcon = styled(CasinoOutlinedIcon)`
  span .css-i4bv87-MuiSvgIcon-root {
    height: 12px !important;
  }
`;

export default function MyCard(props) {
  const [selectedEvento, setSelectedEvento] = useState([]);
  const [open, setOpen] = useState(false);
  const [componentSize, setComponentSize] = useState("default");
  const [values, setValues] = useState();
  const [isIntegrante, setIsIntegrante] = useState([]);
  const [participantList, setParticipantList] = useState([]);
  const [participantVisible, setParticipantVisible] = useState(false);
  const dispatch = useDispatch();

  const user = authService.getLoggedUser();

  useEffect(() => {
    setValues((prevValue) => ({
      ...prevValue,
      nome: props.nome,
      textoesporte: props.textoesporte,
      local: props.local,
      valor: props.valor,
      quantidadeMax: props.quantidadeMax,
      esporteId: props.esporteId,
      data: props.data,
      horaInicio: props.horaInicio,
      horaFim: props.horaFim,
    }));
    Axios.post(`${API_URL}/integrants/verify-room`, {
      usuarioId: user[0].id,
      eventoId: props.id,
    }).then((response) => {
        setIsIntegrante(response.data)
    })
  }, []);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onEditClick = () => {
    Axios.get(`${API_URL}/event/${props.id}`)
      .then((response) => {
        setSelectedEvento(response.data.event);
      })
      .then(showDrawer);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onCloseParticipantDrawer = () => {
    setParticipantVisible(false);
  };

  const deleteRoom = () => {
    confirm({
      title: "Você confirma a exclusão deste evento?",
      icon: <ExclamationCircleOutlined />,
      content: "Você não poderá voltar nesta ação.",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        dispatch(deleteEventoAsync(props.id))
        .then(() => {
          message.success("Evento deletado com sucesso.")
        })
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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

  const handleClickButton = () => {
    const data = {
      id: props.id,
      nome: values.nome,
      textoesporte: values.textoesporte,
      local: values.local,
      valor: values.valor,
      data: values.data,
      horaFim: values.horaFim,
      horaInicio: values.horaInicio,
      quantidadeMax: values.quantidadeMax,
      esporteId: values.esporteId,
    }
    dispatch(editEventoAsync(data)).then(onClose)
  };

  const initialValues = {
    nome: selectedEvento?.nome || "",
    textoesporte: selectedEvento?.textoesporte || "",
    local: selectedEvento?.local || "",
    valor: selectedEvento?.valor || 0,
    quantidadeMax: selectedEvento?.quantidadeMax || 0,
    esporteId: selectedEvento?.esporteId || undefined,
  };

  const is_owner = user ? props.usuarioId === user[0].id : false;
  const btn_color = is_owner ? "#1890ff" : "rgba(0, 0, 0, 0.45)";


  const participate = () => {
    try {
      Axios.post(`${API_URL}/integrant/save/`, {
        nome: user[0].nome,
        usuarioId: user[0].id, 
        eventoId: props.id
      }).then((response) => {
        message.success(`você ingressou no evento ${props.nome}!`)
      })
    } catch (error) {
      message.error(`Erro ao ingressar no evento ${props.nome}.`);
    }
  }

  const exit = (is_participant, integrante_id) => {
    confirm({
      title: is_participant ? 
        "Você tem certeza que deseja sair desse evento?" : 
        "Você tem certeza que deseja deletar esse integrante?",
      icon: <ExclamationCircleOutlined />,
      content: "Você não poderá voltar nesta ação.",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        try {
          Axios.post(`${API_URL}/integrant/delete/${integrante_id}`)
          .then((response) => {
            if (is_participant) {
              message.success(`você saiu do evento ${props.nome}!`)
            } else {
              message.success(`integrante removido com sucesso`)
            }
          })
        } catch (error) {
          message.error(`Erro ao sair do evento ${props.nome}.`);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
    
  }

  const showParticipantList = () => {
    Axios.get(`${API_URL}/integrants/events/${props.id}`)
    .then((response) => {
      setParticipantList(response.data)

    }).then(setParticipantVisible(true)
    ) 
  }
  
  return (
    <>
      <Card
        style={props.style}
        actions={[
          <EditOutlined
            style={{ color: btn_color }}
            onClick={is_owner && onEditClick}
          />,
          <Link onClick={() => is_owner && deleteRoom()}>
            <DeleteOutlined style={{ color: btn_color }} key="delete" />
          </Link>,
          <Link to={`/event/${props.id}/sorteio`}>
            <SortIcon style={{ color: btn_color, width: 18 }} key="sort" />
          </Link>,
          !is_owner && isIntegrante.length === 0 ? (
            <UserAddOutlined onClick={() => participate()} style={{ color: "#74b151" }} />
          ) : is_owner ? (
            <TeamOutlined onClick={() => showParticipantList()} style={{ color: btn_color}}/>
          ) : (
            <UserDeleteOutlined onClick={() => exit(true,isIntegrante[0].id)} style={{ color: "#f75454"}}/>
          )
        ]}
      >
        <Meta
          title={
            <p className="card-title">
              {props.nome} -{" "}
              {props.esportesList?.find((i) => i.id === props.esporteId)?.nome}
            </p>
          }
          description={
            <>
              <p className="card-description">
                <b>{dayjs(props.data).format("DD/MM/YYYY")}</b>
              </p>
              <p className="card-description">
                <b>Horário:</b> {values?.horaInicio} -{" "}
                {values?.horaFim}
              </p>
              <p className="card-description">
                <b>Local: </b>
                {props.local}
              </p>
              <p className="card-description">
                <b>Valor: </b>R${props.valor}
              </p>
              <p
                style={{ color: "rgb(24, 144, 255)" }}
                className="card-description"
              > 
                <UserOutlined /> {props.quantidade || 0}/{props.quantidadeMax || 0}
              </p>
            </>
          }
        />
      </Card>
      <Drawer
        title="Editar sala"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={handleClickButton} type="primary">
              Salvar
            </Button>
          </Space>
        }
      >
        <Form
          initialValues={initialValues}
          layout="vertical"
          hideRequiredMark
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
                  {props.esportesList?.map((i) => (
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
                // name="data"
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
                  value={moment(values?.data) || null}
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
                // name="hora"
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
                  value={[
                    moment(values?.horaInicio, "HH:mm"),
                    moment(values?.horaFim, "HH:mm"),
                  ]}
                  onChange={(value) => {
                    value !== null &&
                      value.length > 1 &&
                      setValues((prevValue) => ({
                        ...prevValue,
                        horaInicio: dayjs(value[0]).format("HH:mm:ss"),
                        horaFim: dayjs(value[1]).format("HH:mm:ss"),
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
      <Drawer
        title="Lista de participantes"
        visible={participantVisible}
        onClose={onCloseParticipantDrawer}
      >
        <List
          dataSource={participantList}
          renderItem={(item) => (
              <>
                <List.Item key={item.id}>
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item?.usuario.nome}</a>}
                    description={item?.usuario.email} />
                    <Button 
                      onClick={() => exit(false, item?.id)} 
                      shape="cirle" 
                      icon={<UserDeleteOutlined />}
                    />
                </List.Item>
              </>
          )}
        />
      </Drawer>
    </>
  );
}
