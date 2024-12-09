import { useState } from "react";
import { formatISO } from "date-fns";
import { Modal } from "@/components/modal";
import { useCreateTaskMutation } from "@/state/api";
import { Priority, Status } from "@/constants";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

interface Form {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  tags: string;
  startDate: string;
  dueDate: string;
  authorUserId: string;
  assignedUserId: string;
}

export const NewTaskModal = ({
  isOpen,
  onClose,
  projectId,
}: NewProjectModalProps) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    status: Status.ToDo,
    priority: Priority.Backlog,
    tags: "",
    startDate: "",
    dueDate: "",
    authorUserId: "",
    assignedUserId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: Status[value as keyof typeof Status],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleCreateProject();
  };

  const handleCreateProject = async () => {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      authorUserId,
      assignedUserId,
    } = form;

    if (!title || !authorUserId) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
      projectId: Number(projectId),
    });
  };

  const isFormValid = () => {
    return form.title && form.authorUserId;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className={inputStyles}
        />

        <textarea
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleTextAreaChange}
          className={inputStyles}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            name="status"
            id="status"
            value={form.status}
            onChange={handleSelectChange}
            className={selectStyles}
          >
            <option value="">Select Status</option>
            <option value={Status.ToDo}>To Do</option>
            <option value={Status.WorkInProgress}>Work In Progress</option>
            <option value={Status.UnderReview}>Under Review</option>
            <option value={Status.Completed}>Completed</option>
          </select>

          <select
            name="priority"
            id="priority"
            value={form.priority}
            onChange={handleSelectChange}
            className={selectStyles}
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>Urgent</option>
            <option value={Priority.High}>High</option>
            <option value={Priority.Medium}>Medium</option>
            <option value={Priority.Low}>Low</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Tags (comma separated)"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          className={inputStyles}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className={inputStyles}
          />

          <input
            type="date"
            placeholder="Due Date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>

        <input
          type="text"
          placeholder="Author User ID"
          name="authorUserId"
          value={form.authorUserId}
          onChange={handleChange}
          className={inputStyles}
        />

        <input
          type="text"
          placeholder="Assigned User ID"
          name="assignedUserId"
          value={form.assignedUserId}
          onChange={handleChange}
          className={inputStyles}
        />

        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-offset-0 focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};
