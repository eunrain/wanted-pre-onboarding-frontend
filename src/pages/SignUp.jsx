import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpAPI } from "../tools/instance";

const SignUp = () => {
  const navigate = useNavigate();

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
    <>
      <div>SignUp</div>
      <form onSubmit={signupHandler}>
        <div>
          <label>
            이메일
            <input
              type="text"
              name="id"
              id="id"
              placeholder="test@example.com"
              value={email}
              onChange={handleEmail}
              data-testid="email-input"
            />
          </label>
        </div>
        {!emailValid && email.length > 0 ? "올바른 이메일을 입력해주세요" : ""}
        <div>
          <label>
            비밀번호
            <input
              type="password"
              name="pwd"
              id="pwd"
              placeholder="8자 이상"
              value={pw}
              onChange={handlePw}
              data-testid="password-input"
            />
          </label>
        </div>
        {!pwValid && pw.length > 0 ? "8자 이상 입력하세요" : ""}
        <button disabled={btnOn} data-testid="signup-button">
          가입하기
        </button>
      </form>
    </>
  );
};

export default SignUp;
