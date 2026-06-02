import { useState } from "react";

import "./style.scss";

import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";

import { todoList as initialTodoList } from "@/constants/TodoList";

const Todo = () => {
  const [todos, setTodos] = useState(initialTodoList);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  const isFormValid = title.trim().length > 0 && body.trim().length > 0;

  const handleSave = () => {
    if (!isFormValid) return;

    if (editId !== null) {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === editId ? { ...todo, title, body } : todo))
      );
      setEditId(null);
    } else {
      const newTodo = { id: Date.now(), title, body };
      setTodos((prev) => [...prev, newTodo]);
    }

    setTitle("");
    setBody("");
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setBody(todo.body);
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle("");
    setBody("");
  };

  return (
    <div className="todoContainer">
      <div className="todoForm">
        <Input
          label="Todo Title"
          placeholder="Enter your title..."
          required={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          label="Todo Body"
          placeholder="Write your body..."
          required={true}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="todoForm__actions">
          <Button type="button" disabled={!isFormValid} onClick={handleSave}>
            {editId !== null ? "Update" : "Save"}
          </Button>
          {editId !== null && (
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="todoList">
        {todos.map((todo) => (
          <div className="todoCard" key={todo.id}>
            <p>
              Title: <span>{todo.title}</span>
            </p>
            <p>
              Body: <span>{todo.body}</span>
            </p>
            <div className="btnWrapper">
              <Button width="100%" onClick={() => handleEdit(todo)}>
                Edit
              </Button>
              <Button variant="danger" width="100%" onClick={() => handleDelete(todo.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
