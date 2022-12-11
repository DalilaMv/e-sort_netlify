import "./card.css";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  UserAddOutlined,
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
  Badge,
  InputNumber,
  message,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../config/env";
import authService from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { deleteSalaAsync, editSalaAsync } from "../../slicers/salasSlice"

const { Meta } = Card;
const { confirm } = Modal;

export default function MyCard(props) {
  const [selectedSala, setSelectedSala] = useState([]);
  const [open, setOpen] = useState(false);
  const [componentSize, setComponentSize] = useState("default");
  const [values, setValues] = useState();
  const [pendingParticipants, setPendingParticipants] = useState(0);
  const [displayBadge, setDisplayBadge] = useState("none");
  const dispatch = useDispatch();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onEditClick = () => {
    Axios.get(`${API_URL}/room/${props.id}`)
      .then((response) => {
        const data = response.data.room
        const data_values = {
          nome: data?.nome || "",
          esporte: data?.esporte || "",
          descricao: data?.descricao || "",
          cidade: data?.cidade || "",
          numParticipantes: data?.numParticipantes || 0,
        }
        setSelectedSala(data);
        setValues(data_values)
        
      })
      .then(showDrawer)
  };

  const onClose = () => {
    setOpen(false);
  };

  const deleteRoom = () => {
    confirm({
      title: "Você confirma a exclusão desta sala?",
      icon: <ExclamationCircleOutlined />,
      content: "Você não poderá voltar nesta ação.",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        dispatch(deleteSalaAsync(props.id))
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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

  const handleClickButton = () => {
    const data = {
      id: selectedSala.id,
      nome: values.nome,
      descricao: values.descricao,
      esporte: values.esporte,
      numParticipantes: values.numParticipantes,
      cidade: values.cidade,
    }
    dispatch(editSalaAsync(data)).then(onClose)
  };

  const initialValues = {
    nome: selectedSala?.nome || "",
    esporte: selectedSala?.esporte || "",
    descricao: selectedSala?.descricao || "",
    cidade: selectedSala?.cidade || "",
    numParticipantes: selectedSala?.numParticipantes || 0,
  };

  const user = authService.getLoggedUser();
  const is_owner = user ? props.usuarioId === user[0].id : false;
  const btn_color = is_owner ? "#1890ff" : "rgba(0, 0, 0, 0.45)";
  const btn_color_2 = is_owner ? "rgba(0, 0, 0, 0.45)" : "#1890ff";

  useEffect(() => {
    if (is_owner) {
      Axios.post(`${API_URL}/preparticipant/number/`, {
        donoId: user[0].id,
        salaId: props.id,
      })
      .then((response) => {
        const count = response.data.count;
        setPendingParticipants(count)
        if (count > 0) {
          setDisplayBadge(true)
        }
      })
    }
  }, [])

  const participate = () => {
    Axios.post(`${API_URL}/preparticipant/save`, {
      salaId: props.id,
      nome: user[0].nome,
      userId: user[0].id,
      donoId: props.usuarioId,
    }).then((response) => {
      message.success("Sua requisição foi enviada com sucesso!")
    })
  }

  return (
    <>
    <Badge.Ribbon 
      style={{ display: displayBadge }} 
      text={`Solicitações: ${pendingParticipants}`} 
      color="orange"
    >
      <Card
        style={props.style}
        /* cover={<img alt="" src={imageSrc} />} */
        actions={[
          <EditOutlined
            style={{ color: btn_color }}
            onClick={is_owner ? onEditClick : undefined}
          />,
          <Link onClick={() => is_owner ? deleteRoom() : undefined}>
            <DeleteOutlined style={{ color: btn_color }} key="delete" />
          </Link>,
          <Link to={`/room/${props.id}`}>
            <EyeOutlined style={{ color: "#1890ff" }} key="view" />
          </Link>,
          <UserAddOutlined onClick={!is_owner ? participate : undefined} style={{ color: btn_color_2 }} />,
        ]}
      >
        <Meta
          title={<p className="card-title">{props.nome}</p>}
          description={
            <>
              <p
                style={{
                  maxWidth: "250px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="card-description"
              >
                {props.description}
              </p>
              <p className="card-description">
                <b>Esporte:</b> {props.esporte}
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
              <Form.Item name="nome" label="Nome">
                <Input
                  name="nome"
                  placeholder="Nome do grupo"
                  onChange={handleChangeValues}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="esporte" label="Esporte">
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
              <Form.Item name="cidade" label="Cidade">
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
          </Row>
        </Form>
      </Drawer>
      </Badge.Ribbon>
    </>
  );
}
