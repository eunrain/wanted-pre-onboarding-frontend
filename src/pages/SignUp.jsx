import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpAPI } from "../tools/instance";
import Layout from "../components/Layout";
import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";

const SignUp = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/todo");
    }
  }, [token]);

  //이메일 비밀번호 확인
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  //유효성 검사
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [btnOn, setBtnOn] = useState(true);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (email.includes("@")) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    if (pw.length >= 8) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const signupHandler = (e) => {
    e.preventDefault();
    const data = { email: email, password: pw };
    SignUpAPI.signUp(data).then((res) => {
      console.log(res);
      if (res.status === 201) {
        alert("회원가입이 완료되었습니다");
        navigate("/signin");
      }
    });
  };

  //이메일, 비밀번호의 valid state 값이 변경될때마다, 버튼 활성화 유무 check
  useEffect(() => {
    if (emailValid && pwValid) {
      setBtnOn(false);
      return;
    }
    setBtnOn(true);
  }, [emailValid, pwValid]);

  return (
    <Layout>
      <SignUpWrap>
        <Form onSubmit={signupHandler}>
          <InputWrap>
            <InputWrapLower>
              <BsFillPersonFill size={24} color={"#949494"} />
              <Input
                type="text"
                name="id"
                id="id"
                placeholder="test@example.com"
                value={email}
                onChange={handleEmail}
                data-testid="email-input"
              />
            </InputWrapLower>
            {!emailValid && email.length > 0 ? (
              <ErrorMsg>올바른 이메일을 입력해주세요</ErrorMsg>
            ) : (
              ""
            )}
            <InputWrapLower>
              <IoIosLock size={24} color={"#949494"} />
              <Input
                type="password"
                name="pwd"
                id="pwd"
                placeholder="8자 이상"
                value={pw}
                onChange={handlePw}
                data-testid="password-input"
              />
            </InputWrapLower>
            {!pwValid && pw.length > 0 ? (
              <ErrorMsg>8자 이상 입력하세요</ErrorMsg>
            ) : (
              ""
            )}
          </InputWrap>
          <Button
            bgColor="#646eff"
            disabled={btnOn}
            data-testid="signup-button"
          >
            가입하기
          </Button>
        </Form>
      </SignUpWrap>
    </Layout>
  );
};

export default SignUp;

const SignUpWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 20px;
`;

const Form = styled.form``;

const InputWrap = styled.div`
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
`;

const InputWrapLower = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f4f4f4;
  border: none;
  border-radius: 8px;
  padding: 3px 10px 3px 18px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 85%;
  height: 35px;
  border: none;
  border-radius: 8px;
  margin-left: 10px;
  padding-left: 10px;
  background-color: transparent;
  :focus {
    outline: none;
  }
`;

const ErrorMsg = styled.div`
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #eb0000;
`;
const Button = styled.button`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.bgColor};
  border: none;
  color: #fff;
  border-radius: 12px;
  margin-top: 10px;
  font-weight: bold;
  cursor: pointer;
`;
