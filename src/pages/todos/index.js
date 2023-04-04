import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import createTodo from "api/todos/useCreateTodo";
import deleteTodo from "api/todos/useDeleteTodo";
import getTodo from "api/todos/useGetTodo";
import updateTodo from "api/todos/useUpdateTodo";

function Todos() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTodo, setEditTodo] = useState("");

  const createData = () => {
    createTodo(todo)
      .then((result) => {
        if (result.status === 201) {
          setTodo("");
          getData();
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  const getData = () => {
    getTodo()
      .then((result) => {
        const { data } = result;
        if (result.status === 200) {
          setData(data);
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  const updateData = (id, todo, isCompleted) => {
    updateTodo(id, todo, isCompleted)
      .then((result) => {
        if (result.status === 200) {
          setEditId(null);
          getData();
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  const deleteData = (id) => {
    deleteTodo(id)
      .then((result) => {
        if (result.status === 204) {
          getData();
        }
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    console.log(token);

    if (token !== null) {
      getData();
    } else {
      alert("로그인을 해주세요.");
      navigate("/signin");
    }
  }, []);

  return (
    <div className="px-8">
      <div
        className="flex items-center justify-between p-6 mx-auto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl backdrop-blur-sm"
        aria-label="Global"
      >
        Todos
      </div>
      <div className="px-6 py-24 bg-white isolate sm:py-10 lg:px-8">
        <div className="flex w-full mb-8">
          <input
            data-testid="new-todo-input"
            className="mr-4 lg:px-2 relative block rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-2/3"
            placeholder="New Todo"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <div className="w-32">
            <button
              type="button"
              className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-300"
              data-testid="new-todo-add-button"
              onClick={() => {
                createData();
              }}
            >
              추가
            </button>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div>
          <ul className="grid w-full gap-6 md:grid-cols-3">
            {data.map((item, index) => (
              <li key={item.id}>
                <div className="w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg ">
                  <div className="inline-flex items-center w-full mb-5">
                    <input
                      type="checkbox"
                      id="react-option"
                      value={item.isCompleted}
                      checked={item.isCompleted}
                      className="w-6 h-6 mr-5 text-purple-600 form-checkbox"
                      onChange={(e) => {
                        updateData(item.id, item.todo, !item.isCompleted);
                      }}
                    />
                    <div className="block w-full">
                      <div className="w-full text-lg font-semibold">
                        {`#${index + 1}`}
                      </div>
                      {item.id === editId ? (
                        <input
                          data-testid="modify-input"
                          className="mr-4 lg:px-2 relative block rounded border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                          placeholder="Edit Todo"
                          value={editTodo}
                          onChange={(e) => {
                            setEditTodo(e.target.value);
                          }}
                        />
                      ) : (
                        <div className="w-full text-sm">{item.todo}</div>
                      )}
                    </div>
                  </div>
                  {editId === item.id ? (
                    <div className="flex justify-end w-full mt-5 mr-8 lg:ml-4 lg:mt-0">
                      <span className="sm:block">
                        <button
                          type="button"
                          data-testid="submit-button"
                          className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => {
                            updateData(item.id, editTodo, item.isCompleted);
                          }}
                        >
                          제출
                        </button>
                      </span>

                      <span className="ml-3 mr-3 sm:block">
                        <button
                          type="button"
                          data-testid="cancel-button"
                          className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-md shadow-sm ring-1 ring-inset ring-gray-300"
                          onClick={() => {
                            setEditId(null);
                          }}
                        >
                          취소
                        </button>
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-end w-full mt-5 mr-8 lg:ml-4 lg:mt-0">
                      <span className="sm:block">
                        <button
                          type="button"
                          data-testid="modify-button"
                          className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => {
                            setEditId(item.id);
                            setEditTodo(item.todo);
                          }}
                        >
                          수정
                        </button>
                      </span>

                      <span className="ml-3 mr-3 sm:block">
                        <button
                          type="button"
                          data-testid="delete-button"
                          className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-md shadow-sm ring-1 ring-inset ring-gray-300"
                          onClick={() => {
                            deleteData(item.id);
                          }}
                        >
                          삭제
                        </button>
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Todos;
