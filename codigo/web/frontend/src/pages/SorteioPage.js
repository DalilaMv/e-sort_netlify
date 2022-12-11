import "../App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Row,
  Typography,
  Card,
  Space,
  Form,
  InputNumber,
  Divider,
  Col,
  Button,
} from "antd";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { API_URL } from "../config/env";
const { Title, Text } = Typography;

const MeuCard = styled(Card)`
  margin-left: 15px;
`;

function SorteioPage() {
  const { id } = useParams();
  const [evento, setEvento] = useState();

  console.log(evento);

  useEffect(() => {
    Axios.get(`${API_URL}/event/${id}`).then((response) => {
      setEvento(response.data.event);
    });
  }, []);

  return (
    <>
      <Row justify="space-between">
        <Title style={{ marginLeft: 90, marginTop: 15 }} level={3}>
          Sorteio
        </Title>
      </Row>
      <Row justify="space-around" style={{ margin: 40 }}>
        <Col span={11}>
          <MeuCard style={{ borderRadius: "10px" }}>
            <Space direction="vertical">
              <Title style={{ marginBottom: -10 }} level={5}>
                {evento?.nome}
              </Title>
              <Divider />
              <Text type="secondary">{evento?.status}</Text>
              <Space>
                <Text>
                  {evento?.data}, {evento?.horaInicio} - {evento?.horaFim}
                </Text>
              </Space>
              <p>
                <UserOutlined /> {evento?.quantidade}/{evento?.quantidadeMax}
              </p>
              <Form layout="vertical" hideRequiredMark>
                <Space direction="horizontal">
                  <Form.Item
                    name="nome"
                    label="Quantidade de grupos"
                    rules={[
                      {
                        required: true,
                        message: "Por favor digite o nome da sala",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: 200 }}
                      name="quantidade"
                      placeholder=" Quantidade de grupos"
                    />
                  </Form.Item>
                  <Button style={{ marginTop: 6 }} type="primary">
                    {" "}
                    Sortear{" "}
                  </Button>
                </Space>
              </Form>
            </Space>
          </MeuCard>
        </Col>
        <Col span={11}>
          <MeuCard style={{ borderRadius: "10px" }}>
            <Title level={5}>Equipes</Title>
            <Divider />
          </MeuCard>
        </Col>
      </Row>
    </>
  );
}

export default SorteioPage;
