import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoAPI } from "../tools/instance";
import Layout from "../components/Layout";
import styled from "styled-components";

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
  const [isEdit, setIsEdit] = useState(true);
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
        console.log(res);
        setToDoList((currentArray) => [res.data, ...currentArray]);
      })
      .catch((err) => console.log(err));
    setToDo("");
  };

  //todo 삭제
  const deleteTodo = (data) => {
    TodoAPI.deleteTodo(data)
      .then((res) => {
        console.log(res);
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

  return (
    <Layout>
      <TodoWrap>
        <form onSubmit={addTodo}>
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
          <hr />
          <Ul>
            {toDoList.map((todo) => {
              return (
                <Li key={todo.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={(e) => {
                        console.log(e.target.checked, todo.todo, todo.id);
                        updateTodo(todo.todo, e.target.checked, todo.id);
                      }}
                    />
                  </label>
                  {!isEdit && todo.id === editId ? (
                    <>
                      <ModifyInput
                        type="text"
                        defaultValue={todo.todo}
                        onChange={(e) => setUpdateToDo(e.target.value)}
                        data-testid="modify-input"
                      />
                      <Btns>
                        <button
                          onClick={() => {
                            updateTodo(updateToDo, todo.isCompleted, todo.id);
                            setIsEdit(true);
                          }}
                          data-testid="submit-button"
                        >
                          제출
                        </button>
                        <button
                          onClick={() => setIsEdit(true)}
                          data-testid="cancel-button"
                        >
                          취소
                        </button>
                      </Btns>
                    </>
                  ) : (
                    <>
                      <span>{todo.todo}</span>
                      <Btns>
                        <button
                          onClick={() => {
                            setIsEdit(false);
                            setEditId(todo.id);
                          }}
                          data-testid="modify-button"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => {
                            deleteTodo(todo.id);
                          }}
                          data-testid="delete-button"
                        >
                          삭제
                        </button>
                      </Btns>
                    </>
                  )}
                </Li>
              );
            })}
          </Ul>
        </form>
      </TodoWrap>
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
  //font-weight: bold;
  cursor: pointer;
  margin-top: 4px;
`;

const Ul = styled.ul`
  list-style: none;
  padding-left: 0;
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
    margin-right: px;
  }
`;

const ModifyInput = styled.input`
  border: none;
  :focus {
    outline: none;
  }
`;

const Btns = styled.div``;
