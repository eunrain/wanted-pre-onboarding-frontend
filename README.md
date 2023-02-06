# wanted pre onboarding internship

## 1. 프로젝트 소개
원티드 프리온보딩 인턴십 선발 과제 입니다.
<br/>
[☑️배포링크]([https://wanted-pre-onboarding-frontend-mauve.vercel.app/](https://wanted-pre-onboarding-frontend-mauve.vercel.app/))

<br/>

## 2. 프로젝트 실행 방법
```
yarn install
yarn start
````

<br/>

## 3. 주요 기능 
## 🔐 회원가입/로그인
https://user-images.githubusercontent.com/113877276/216991323-38ae2da9-21c2-4eb1-a7bc-b632b2196ef8.mov

`Assignment 1 `
- 회원가입과 로그인 페이지에 이메일, 비밀번호 유효성 검사기능 구현
  - 이메일 조건: `@` 포함
  - 비밀번호 조건: 8자 이상
- 유효성 검사 통과하지 못할경우 button에 `disabled` 속성 부여

`Assignment 2`
- 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동

`Assignment 3`
- 로그인이 정상적으로 완료되었을 시 `/todo` 경로로 이동

`Assignment 4`
- 로그인 여부에 따른 리다이렉트 처리

<br/>

## 🗓 TODOLIST
https://user-images.githubusercontent.com/113877276/216992178-a6cd9b27-3ddd-4fdb-ab3e-7c86a2d03ac8.mov

`Assignment 5`
- `/todo` 경로에 접속하면 투두리스트 목록 불러오기 
  - TODO의 내용과 완료 여부가 표시됨

`Assignment 6`
- 새로운 TODO 추가 기능 구현

`Assignment 7`
- TODO의 체크박스를 통해 완료 여부 수정 기능 구현

`Assignment 8`
- TODO 우측에 수정버튼과 삭제버튼 추가 (수정모드일때, 제출버튼/삭제버튼)

`Assignment 9`
- 투두리스트 삭제 기능 구현

`Assignment 10`
- 투두리스트 수정 기능 구현

<br/>

## 4. 사용한 기술
| 기술 | 선정 이유 |
| --- | --- |
| React | 컴포넌트로 레고 블록과 같은 작은 단위로 개발하며 이렇게 하면 가독성이 높고 간단하여 캡슐화, 확장성, 결합성, 재사용과 같은 장점이 있어 짧은 시간에 완성도 있는 서비스를 만들기 용이하여 선택했습니다. |
| React-Router-DOM|	uri 대하여 routing을 통해 렌더링 하기 위해서 선정했습니다. |
| Axios | Promise API를 활용하는 HTTP 통신 라이브러리로, 비동기로 HTTP 통신을 할 수 있으며 return을 promise 객체로 해주기 때문에 response 데이터를 다루기 쉽다는 장점에 선택했습니다. |
| Vercel| Github과 같은 저장소를 연결하여 즉시 빌드를 실행하고 CI/CD 배포가 용이하다는 장점이 있어 선택했습니다. |
