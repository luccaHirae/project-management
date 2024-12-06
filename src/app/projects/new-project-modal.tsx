import { useState } from "react";
import { formatISO } from "date-fns";
import { Modal } from "@/components/modal";
import { useCreateProjectMutation } from "@/state/api";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Form {
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const NewProjectModal = ({ isOpen, onClose }: NewProjectModalProps) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [form, setForm] = useState<Form>({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleCreateProject();
  };

  const handleCreateProject = async () => {
    const { projectName, description, startDate, endDate } = form;

    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
  };

  const isFormValid = () => {
    const { projectName, description, startDate, endDate } = form;

    return projectName && description && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <input
          type="text"
          placeholder="Project name"
          name="projectName"
          value={form.projectName}
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
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className={inputStyles}
          />

          <input
            type="date"
            placeholder="End Date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-offset-0 focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};
