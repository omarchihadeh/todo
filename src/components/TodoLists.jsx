import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, editTodo, markTodoCompleted, clearAlltodo } from "../redux/actions";

export const TodoLists = () => {
    const todos = useSelector((state) => state.todoReducer.todos);
    const dispatch = useDispatch();
    const [selectedTodo, setSelectedTodo] = useState([]);

    const actionClick = (data) => {
        if (data && data?.type === "edit") {
            dispatch(editTodo(data?.todo?.id));
        } else if (data && data?.type === "delete") {
            dispatch(deleteTodo(data?.todo?.id));
        }
    };

    const changeEvent = (e, todoId) => {
        if (e?.target?.name !== "select_all_todo" && e?.target?.checked === true) {
            if (selectedTodo.indexOf(todoId) === -1) {
                setSelectedTodo((todo) => [...todo, todoId]);
            }
        } else if (e?.target?.name !== "select_all_todo" && e?.target?.checked === false) {
            const todos = selectedTodo.filter((todo) => todo !== todoId);
            setSelectedTodo(todos);
        }

        if (e?.target?.name === "select_all_todo" && e?.target?.checked === true) {
            todos && todos.forEach((todo, index) => {
                const allChkbox = document.getElementsByName(`todo_${index}`);

                for (let chk of allChkbox) {
                    chk.checked = true;
                    let todoId = todo?.id;

                    setSelectedTodo((todo) => [
                        ...todo,
                        todoId
                    ]);
                }
            });
        }

        else if (e?.target?.name === "select_all_todo" && e?.target?.checked === false) {
            todos && todos.forEach((todo, index) => {
                const allChkbox = document.getElementsByName(`todo_${index}`);
                for (let chk of allChkbox) {
                    chk.checked = false;
                    setSelectedTodo([]);
                }
            });
        }
    };

    const markCompleted = () => {
        dispatch(markTodoCompleted(selectedTodo));
    };

    return (
        <div className="container my-2">
            <div className="row pb-4" style={{ height: "60px" }}>
                <div className="col-xl-12 text-right">
                    {selectedTodo.length > 0 && (
                        <div className="text-center">
                            <button
                                className="btn btn-danger"
                                onClick={() => dispatch(clearAlltodo())}
                            >
                                Clear All
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button
                                className="btn btn-success ml-2"
                                onClick={markCompleted}
                            >
                                Completed
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped text-center">
                    <thead>
                        <tr>
                            <th>
                                SelectAll &nbsp;
                                <input
                                    type={"checkbox"}
                                    onChange={(e) => changeEvent(e)}
                                    name={"select_all_todo"}
                                />
                            </th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {todos && todos.map((todo, index) => (
                            <tr key={index}>
                                <td>
                                    SelectThis &nbsp;
                                    <input
                                        type={"checkbox"}
                                        value={todo?.id}
                                        onChange={(e) => changeEvent(e, todo?.id)}
                                        name={`todo_${index}`}
                                    />
                                </td>
                                <td>{todo?.title}</td>
                                <td>{todo?.description}</td>
                                <td>
                                    {todo?.isCompleted ? (
                                        <span className="text-success">Completed</span>
                                    ) : todo?.isPending ? (
                                        <span className="text-danger">Pending</span>
                                    ) : (
                                        ""
                                    )}
                                </td>
                                <td>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => actionClick({ todo: todo, type: "edit" })}
                                    >
                                        Edit
                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className="btn btn-danger btn-sm ml-1"
                                        onClick={() => actionClick({ todo: todo, type: "delete" })}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};