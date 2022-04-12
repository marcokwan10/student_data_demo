import { useEffect, useState } from "react";
import "./App.css";
import Student from "./components/Student";

function App() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://api.hatchways.io/assessment/students");
				const { students } = await response.json();
				setData(students);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="student-container">
			{data.map((student) => (
				<Student studentInfo={student} key={student.id} />
			))}
		</div>
	);
}

export default App;
