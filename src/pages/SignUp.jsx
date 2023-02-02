import React, { useState } from "react";

const SignUp = () => {
  //이메일 비밀번호 확인
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  //유효성 검사
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

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

  return (
    <>
      <div>SignUp</div>
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
          />
        </label>
      </div>
      {!pwValid && pw.length > 0 ? "8자 이상 입력하세요" : ""}
      <button>가입하기</button>
    </>
  );
};

export default SignUp;
