import { useEffect, useState } from "react";
import minus from "/minus.svg";
import { Task } from "../types/tasks.type";
import axios from "axios";
import AddTask from "./AddTask";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isShow, setIsShow] = useState(false);

  const fetchData = async () => {
    try {
      const response: any = await axios.get("/tasks");
      setTasks(response.data);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setTasks(tasks.filter((task) => task.id !== id));

      await axios.delete(`/tasks/${id}`);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const showField = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="flex md:max-h-[90vh] px-4 md:px-0 mx-auto overflow-hidden flex-col-reverse md:flex-row relative">
          <div className="max-w-screen-sm md:min-w-96 border flex min-h-96 items-center flex-col p-5">
            <h1 className="font-bold text-3xl">Todo List App</h1>

            <div className="flex w-full mt-5 justify-between items-center">
              <p className="text-base font-medium">Add new tasks</p>
              <button
                className="bg-black text-white px-2 flex justify-center items-center size-8"
                onClick={showField}>
                +
              </button>
            </div>

            <div className="flex flex-col gap-1 mt-5 w-full max-h-[500px] overflow-y-scroll mb-5 scroll-m-2">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div
                    className="group px-2 py-1 flex justify-between items-center gap-2 border w-full"
                    key={task.id}>
                    <div className="flex-1">
                      <h1 className="font-medium">{task.title}</h1>
                      <h1 className="text-sm">{task.description}</h1>
                    </div>
                    <button onClick={() => handleDelete(task.id)} className="size-4">
                      <img
                        src={minus}
                        alt="minus"
                        className="w-4 cursor-pointer hidden group-hover:block"
                      />
                    </button>
                  </div>
                ))
              ) : (
                <div>loading...</div>
              )}
            </div>
          </div>

          {isShow && <AddTask setShow={setIsShow} fetchData={fetchData} />}
        </div>
      </div>
    </>
  );
};

export default Home;
