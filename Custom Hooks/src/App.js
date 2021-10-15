import { Fragment, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/hooks/use-http";

function App() {
	const [tasks, setTasks] = useState([]);

	const { isLoading, error, sendRequest: fetchTasks } = useHttp();

	useEffect(() => {
		const transformTask = (taskObj) => {
			const loadedTasks = [];

			for (const taskKey in taskObj) {
				loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
			}

			setTasks(loadedTasks);
		};

		fetchTasks(
			{
				url: "https://react-customhooks-6b333-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
			},
			transformTask
		);
	}, [fetchTasks]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks items={tasks} loading={isLoading} error={error} onFetch={fetchTasks} />
		</Fragment>
	);
}

export default App;
