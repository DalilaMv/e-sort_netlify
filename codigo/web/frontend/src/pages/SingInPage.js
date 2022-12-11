import "../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Form, Input, message, Alert } from "antd";
import authService from "../services/auth.service";

function SingInPage() {
  const [userNotFoundIsVisible, setUserNotFoundIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const onFinish = async (value) => {
    setLoading(true);
    setUserNotFoundIsVisible(false);
    let data = {
      email: value.email,
      senha: value.senha,
    };

    try {
      let res = await authService.authenticate(data);
      if (res.data.length > 0) {
        authService.setLoggedUser(res.data);
        message.success("Login efetuado com sucesso!");
        window.setTimeout(function () {
          window.location.href = "/room";
        }, 400);
      } else {
        setLoading(false);
        setUserNotFoundIsVisible(true);
      }
    } catch (error) {
      setLoading(false);
      message.error("Erro ao efetuar login");
    }
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
          {userNotFoundIsVisible ? (
            <Alert
              message="Usuário não encontrado!"
              description="Email ou senha incorretos."
              type="error"
              showIcon
              closable
            />
          ) : null}
          <Form
            layout="vertical"
            style={{ marginTop: "30px" }}
            name="login"
            id="login-form"
            onFinish={onFinish}
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
                placeholder="email"
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
                placeholder="senha"
                size="large"
              />
            </Form.Item>
            <Form.Item style={{ paddingTop: "20px" }}>
              <Button
                loading={loading}
                htmlType="submit"
                size="large"
                style={{
                  color: "white",
                  background: "#a5a5a5",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                Log In
              </Button>
            </Form.Item>
            <div>
              <Link>Esqueci minha senha</Link>
            </div>
            <div>
              Não possui uma conta? <Link to="/cadastro"> Cadastre-se </Link>
            </div>
          </Form>
        </Card>
      </Row>
    </>
  );
}

export default SingInPage;
