import axios from "axios";
import { useEffect, useRef, useState } from "react";
import React from "react";

interface AddTaskProps {
  setShow: (value: boolean) => void;
  fetchData: () => {};
}

const AddTask: React.FC<AddTaskProps> = ({ setShow, fetchData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (closeButton.current) {
      closeButton.current.onclick = () => {
        setShow(false);
      };
    }
  }, [closeButton.current]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const button = document.getElementById("submit") as HTMLButtonElement;

    try {
      button.disabled = true;
      await axios.post("/tasks", formData);

      fetchData();
    } catch (error: any) {
      button.disabled = true;
      throw new Error(error);
    } finally {
      button.disabled = false;
    }
  };

  return (
    <div className="add-form w-80 border p-3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Add new task</h1>

        <button className="size-5" ref={closeButton}>
          <img src="/close.svg" alt="close" className="w-full" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-4 flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="border p-1"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="title">description</label>
          <textarea
            name="description"
            id="description"
            className="border p-1 min-h-28"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }></textarea>
        </div>
        <div className="mb-4 flex flex-col mt-10">
          <button
            type="submit"
            className="bg-black text-white py-2 text-sm disabled:bg-gray-200 disabled:text-gray-600"
            id="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
