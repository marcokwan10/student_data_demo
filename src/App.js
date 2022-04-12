import { useEffect, useState } from "react";
import "./App.css";
import Student from "./components/Student";
import SearchBar from "./components/SearchBar";

function App() {
	const [data, setData] = useState([]);
	const [students, setStudents] = useState([]);
	const [nameSearchTerm, setNameSearchTerm] = useState("");

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

	useEffect(() => {
		const isIncluded = (student) => {
			if (!nameSearchTerm) return true;
			else if (
				student.firstName.toLowerCase().includes(nameSearchTerm.toLowerCase()) ||
				student.lastName.toLowerCase().includes(nameSearchTerm.toLowerCase())
			) {
				return true;
			}
		};
		const filteredData = data.filter(isIncluded);
		setStudents(filteredData);
	}, [nameSearchTerm, data]);

	const addTags = (id, tag, e, clearTagsInput) => {
		e.preventDefault();
		const studentsWithTag = students.map((student) => {
			if (student.id === id) {
				student["tags"] ? student["tags"].push(tag) : (student["tags"] = [tag]);
			}
			return student;
		});
		setStudents(studentsWithTag);
		clearTagsInput();
	};

	return (
		<div className="student-container">
			<SearchBar
				searchTerm={nameSearchTerm}
				placeholder="Search by name"
				setFilter={(e) => setNameSearchTerm(e.target.value)}
			/>
			{students.map((student) => (
				<Student studentInfo={student} key={student.id} addTags={addTags} />
			))}
		</div>
	);
}

export default App;
