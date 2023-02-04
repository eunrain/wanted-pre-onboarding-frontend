import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TodoAPI } from "../tools/instance";

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

  const addOnChange = (e) => {
    setToDo(e.target.value);
  };

  const updateOnChange = (e) => {
    setUpdateToDo(e.target.value);
  };

  // useEffect(() => {
  //   getTodo();
  // }, []);

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
        alert("todo가 삭제 되었습니다");
        getTodo();
      })
      .catch((err) => console.log(err));
  };

  //todo 수정
  const updateTodo = (data) => {
    TodoAPI.updateTodo({
      todo: data.todo,
      isCompleted: data.isCompleted,
      todoId: data.todoId,
    })
      .then((res) => {
        console.log(res);
        getTodo();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>TodoList</div>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={toDo}
          onChange={addOnChange}
          ata-testid="new-todo-input"
        />
        <button data-testid="new-todo-add-button">추가</button>
        <hr />
        <ul>
          {toDoList.map((todo) => {
            return (
              <li key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={(e) => {
                      console.log(e.target.checked, todo.todo, todo.id);
                      updateToDo({
                        isCompleted: e.target.checked,
                        todo: todo.todo,
                        todoId: todo.id,
                      });
                    }}
                  />
                </label>
                {!isEdit && todo.id === editId ? (
                  <>
                    <input
                      type="text"
                      defaultValue={todo.todo}
                      onChange={updateOnChange}
                      data-testid="modify-input"
                    />
                    <button
                      onClick={() => {
                        updateTodo({
                          isCompleted: todo.isCompleted,
                          todoId: todo.id,
                          todo: updateToDo,
                        });
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
                  </>
                ) : (
                  <>
                    {todo.todo}
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
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </form>
    </>
  );
};

export default Todo;
