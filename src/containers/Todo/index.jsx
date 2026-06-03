import { useState } from "react";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { usePatch } from "@/hooks/usePatch";
import { useDelete } from "@/hooks/useDelete";
import { useToast } from "@/hooks/useToast";
import { ENDPOINTS } from "@/services/endpoints";

import "./style.scss";

import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  const isFormValid = title.trim().length > 0 && body.trim().length > 0;

  const { showToast } = useToast();

  const { data, isLoading } = useGet("tasks", ENDPOINTS.TASK.GET_ALL);
  const todos = data?.tasks || [];

  const { mutate: createTask, isPending: isCreating } = usePost(ENDPOINTS.TASK.CREATE, {
    invalidateKeys: ["tasks"],
    onSuccess: (data) => {
      handleCancel();
      showToast(data.message, "success");
    },
    onError: (err) => showToast(err.error, "error"),
  });

  const { mutate: updateTask, isPending: isUpdating } = usePatch(
    (vars) => ENDPOINTS.TASK.UPDATE(vars._id),
    {
      invalidateKeys: ["tasks"],
      onSuccess: (data) => {
        handleCancel();
        showToast(data.message, "success");
      },
      onError: (err) => showToast(err.error, "error"),
    }
  );

  const handleSave = () => {
    if (!isFormValid) return;
    if (editId !== null) {
      updateTask({ _id: editId, title, body });
    } else {
      createTask({ title, body });
    }
  };

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setTitle(todo.title);
    setBody(todo.body);
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle("");
    setBody("");
  };

  const { mutate: deleteTask } = useDelete((vars) => ENDPOINTS.TASK.DELETE(vars._id), {
    invalidateKeys: ["tasks"],
    onSuccess: (data) => showToast(data.message, "success"),
    onError: (err) => showToast(err.error, "error"),
  });

  const handleDelete = (_id) => {
    deleteTask({ _id });
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
          <Button
            type="button"
            disabled={!isFormValid || isCreating || isUpdating}
            onClick={handleSave}
          >
            {isCreating
              ? "Saving..."
              : isUpdating
                ? "Updating..."
                : editId !== null
                  ? "Update"
                  : "Save"}
          </Button>
          {editId !== null && (
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="todoList">
        {isLoading ? (
          <p className="todoEmpty">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="todoEmpty">No tasks yet.</p>
        ) : (
          todos.map((todo) => (
            <div className="todoCard" key={todo._id}>
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
                <Button variant="danger" width="100%" onClick={() => handleDelete(todo._id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
