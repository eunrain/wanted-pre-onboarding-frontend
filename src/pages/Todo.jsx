import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoAPI } from "../tools/instance";
import Layout from "../components/Layout";
import styled from "styled-components";
import {
  BsFillXSquareFill,
  BsCheckSquareFill,
  BsFillTrashFill,
  BsPencilSquare,
} from "react-icons/bs";

const Todo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      getTodo();
    }
  }, [token]);

  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(0);
  const [updateToDo, setUpdateToDo] = useState("");

  //todo 불러오기
  const getTodo = () => {
    TodoAPI.getTodos()
      .then((res) => setToDoList(res.data))
      .catch((err) => console.log(err));
  };

  //todo 추가
  const addTodo = (e) => {
    e.preventDefault();
    if (toDo === "") {
      return;
    }
    const data = { todo: toDo };
    TodoAPI.createTodo(data)
      .then((res) => {
        setToDoList((currentArray) => [res.data, ...currentArray]);
      })
      .catch((err) => console.log(err));
    setToDo("");
  };

  //todo 삭제
  const deleteTodo = (data) => {
    TodoAPI.deleteTodo(data)
      .then((res) => {
        alert("todo가 삭제 되었습니다");
        getTodo();
      })
      .catch((err) => console.log(err));
  };

  //todo 수정
  const updateTodo = (todo, checked, id) => {
    TodoAPI.updateTodo({
      todo: todo,
      isCompleted: checked,
      todoId: id,
    })
      .then((res) => {
        getTodo();
      })
      .catch((err) => console.log("err", err));
  };

  const logout = () => {
    localStorage.clear("token");
    navigate("/signin");
  };

  return (
    <Layout>
      <TodoWrap>
        <Form onSubmit={addTodo}>
          <InputWrap>
            <AddInput
              type="text"
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              placeholder="할 일을 추가해주세요"
              data-testid="new-todo-input"
            />
            <AddButton data-testid="new-todo-add-button">+</AddButton>
          </InputWrap>
          <Hr />
          <Ul>
            {toDoList.map((todo) => {
              return (
                <Li key={todo.id}>
                    <Input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={(e) => {
                        updateTodo(todo.todo, e.target.checked, todo.id);
                      }}
                    />
                  {isEdit && todo.id === editId ? (
                    <>
                      <ModifyInput
                        type="text"
                        defaultValue={todo.todo}
                        onChange={(e) => setUpdateToDo(e.target.value)}
                        data-testid="modify-input"
                        autoFocus
                      />
                      <Btns>
                        <Button
                          onClick={() => {
                            updateTodo(updateToDo, todo.isCompleted, todo.id);
                            setIsEdit(false);
                          }}
                          data-testid="submit-button"
                        >
                          <BsCheckSquareFill size="20" cursor="pointer" />
                        </Button>
                        <Button
                          onClick={() => setIsEdit(false)}
                          data-testid="cancel-button"
                        >
                          <BsFillXSquareFill size="20" cursor="pointer" />
                        </Button>
                      </Btns>
                    </>
                  ) : (
                    <>
                      <span>{todo.todo}</span>
                      <Btns>
                        <Button
                          onClick={() => {
                            setIsEdit(true);
                            setEditId(todo.id);
                          }}
                          data-testid="modify-button"
                        >
                          <BsPencilSquare size="20" cursor="pointer" />
                        </Button>
                        <Button
                          onClick={() => {
                            deleteTodo(todo.id);
                          }}
                          data-testid="delete-button"
                        >
                          <BsFillTrashFill size="20" cursor="pointer" />
                        </Button>
                      </Btns>
                    </>
                  )}
                </Li>
              );
            })}
          </Ul>
        </Form>
      </TodoWrap>
      <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
    </Layout>
  );
};

export default Todo;

const TodoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 0 20px;
`;

const InputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const AddInput = styled.input`
  width: 80%;
  height: 40px;
  margin-right: 20px;
  padding-left: 10px;
  border: 1px solid #f4f4f4;
  border-radius: 8px;
  box-shadow: 5px 5px 5px #aaaaaa;
  :focus {
    outline: none;
  }
`;

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  border: 3px solid #646eff;
  background-color: transparent;
  color: #646eff;
  border-radius: 8px;
  font-size: 30px;
  cursor: pointer;
  margin-top: 4px;
`;

const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
  height: 48vh;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  height: 40px;
  border: 1px solid #f4f4f4;
  border-radius: 8px;
  margin-bottom: 10px;
  span {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const ModifyInput = styled.input`
  width: 70%;
  border: none;
  :focus {
    outline: none;
  }
`;

const Btns = styled.div`
  cursor: pointer;
`;

const LogoutBtn = styled.button`
  float: right;
  margin-bottom: 20px;
  margin-right: 20px;
  border: none;
  border-radius: 8px;
  background-color: #bebebe;
  width: 80px;
  height: 30px;
  color: #fff;
  cursor: pointer;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: #646eff;
`;

const Hr = styled.hr`
  border: 0.5px solid #bebebe;
`;

const Form = styled.form``;

const Input = styled.input``;
