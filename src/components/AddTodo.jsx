import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, updateTodo } from "../redux/actions";

export const AddTodo = () => {
    const [value, setValue] = useState({});
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const isEdit = useSelector((state) => state.todoReducer.isEdit);
    const editTodo = useSelector((state) => state.todoReducer.editTodo);

    useEffect(() => {
        editTodo && setValue(() => editTodo);
    }, [editTodo]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!value?.title) {
            setError((error) => ({
                ...error,
                title: 'Please enter todo title',
            }));
            return;
        }
        if (!value?.description) {
            setError((error) => ({
                ...error,
                description: 'Please enter todo description'
            }));
            return;
        }

        if (isEdit) {
            dispatch(updateTodo(editTodo.id, value));
        }
        else {
            dispatch(addNewTodo(value));
        }
        setValue({ title: '', description: '' });
        document.getElementById("todoForm").reset();
    };

    const changeEvent = (e) => {
        setValue(
            {
                ...value,
                [e.target.name]: e.target.value,
            },
        );
        if (e?.target?.name === "title") {
            setError({
                title: "",
            });
        }
        if (e?.target?.name === "description") {
            setError({
                description: ""
            });
        }
    };

    return (
        <div className="container my-4 py-1 border">
            <form className="mt-3 mb-2" id="todoForm" onSubmit={onSubmit}>

                <table>
                    <tr>
                        <td style={{ padding: '1rem' }}>
                            Name
                        </td>
                        <td>
                            <input
                                type="text"
                                name="title"
                                className="form-control mb-2 mr-sm-3"
                                placeholder="Todo Title"
                                defaultValue={value?.title}
                                onChange={(e) => changeEvent(e)}
                            />
                            <span className="text-danger">{error?.title}</span>
                        </td>
                    </tr>

                    <tr>
                        <td style={{ padding: '1rem' }}>
                            Description
                        </td>
                        <td>
                            <textarea
                                name="description"
                                className="form-control mb-2 mr-sm-3"
                                placeholder="Description about what you want To-Do.."
                                defaultValue={value?.description}
                                onChange={(e) => changeEvent(e)}
                                rows="4.5" // add this attribute to set the number of rows
                                cols="125" // add this attribute to set the number of columns
                            />

                            <span className="text-danger">{error?.description}</span>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className="text-center">
                            <button className="btn btn-secondary btn-lg mb-2" type="submit">{isEdit ? 'Update Todo' : 'Create Todo'}</button>
                        </td>

                    </tr>
                </table>
            </form>
        </div>
    );
};