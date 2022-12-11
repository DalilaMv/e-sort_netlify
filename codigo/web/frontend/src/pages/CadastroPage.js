import "../App.css";
import React from "react";
import Axios from "axios";
import {
  Button,
  Row,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Space,
  message,
} from "antd";
import dayjs from "dayjs";
import authService from "../services/auth.service";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserAsync } from "../slicers/cadastroSlice";


function CadastroPage() {
  const dispatch = useDispatch();
  const genero_options = [
    { id: 1, name: "feminino" },
    { id: 2, name: "masculino" },
  ];

  // const onFinish = async (value) => {

  //   Axios.post("http://localhost:8080/user/save", {
  //     email: value.email,
  //     nome: value.nome,
  //     senha: value.senha,
  //     idade: dayjs(value.idade).format("DD/MM/YYYY"),
  //     genero: value.genero,
  //   })
  //     .then(async (response) => {
  //       message.success("Usuário cadastrado com sucesso!");
  //       let res = await authService.authenticate({
  //         email: value.email,
  //         senha: value.senha,
  //       });
  //       authService.setLoggedUser(res.data);
  //       window.setTimeout(function () {
  //         window.location.href = "/room";
  //       }, 400);
  //     })
  //     .catch((err) => {
  //       message.success("Erro ao cadastrar usuário:" + err);
  //     });
  // };

  const onSave = (value) => {
    const data = {
      email: value.email,
      nome: value.nome,
      senha: value.senha,
      idade: dayjs(value.idade).format("DD/MM/YYYY"),
      genero: value.genero,
    }
    dispatch(saveUserAsync(data));
  };

  return (
    <>
      <Row
        justify="space-around"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card style={{ borderRadius: "4px" }}>
          <Form
            id="cadastro-form"
            layout="vertical"
            style={{ marginTop: "20px" }}
            name="login"
            onFinish={onSave}
          >
            <img
              alt=""
              src="images/e-sort.png"
              style={{ width: 500, marginBottom: 15 }}
            />
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Informe seu email!",
                },
              ]}
            >
              <Input
                style={{ border: "1px solid #F0F1F7", borderRadius: "4px" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="nome"
              label="Nome"
              rules={[
                {
                  required: true,
                  message: "Informe seu nome!",
                },
              ]}
            >
              <Input
                style={{ border: "1px solid #F0F1F7", borderRadius: "4px" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="senha"
              label="Senha"
              rules={[
                {
                  required: true,
                  message: "Informe sua senha!",
                },
              ]}
            >
              <Input.Password
                style={{ border: "1px solid #F0F1F7", borderRadius: "4px" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="genero"
              label="Gênero"
              rules={[
                {
                  required: true,
                  message: "Informe seu gênero!",
                },
              ]}
            >
              <Select
                style={{ border: "1px solid #F0F1F7", borderRadius: "4px" }}
                size="large"
                placeholder="Selecione um gênero"
              >
                {genero_options.map((g) => (
                  <Select.Option value={g.id} key={g.id}>
                    {g.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Space>
              <Form.Item
                name="idade"
                label="Data nascimento"
                rules={[
                  {
                    required: true,
                    message: "Informe sua idade!",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  placeholder="Selecione uma data"
                  style={{ width: 220, borderRadius: "4px" }}
                />
              </Form.Item>
            </Space>
            <Form.Item style={{ paddingTop: "20px" }}>
              <Button
                htmlType="submit"
                size="large"
                style={{
                  color: "white",
                  background: "#a5a5a5",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                Cadastrar
              </Button>
            </Form.Item>
          </Form>
          <div>
            Já possui uma conta? Faça<Link to="/singin"> Log In</Link>.
          </div>
        </Card>
      </Row>
    </>
  );
}

export default CadastroPage;
