import { useEffect, useState } from "react";
import "./App.css";
import Student from "./components/Student";
import SearchBar from "./components/SearchBar";

function App() {
	const [data, setData] = useState([]);
	const [students, setStudents] = useState([]);
	const [nameSearchTerm, setNameSearchTerm] = useState("");
	const [tagSearchTerm, setTagSearchTerm] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://api.hatchways.io/assessment/students");
				const { students } = await response.json();
				console.log("👋 STUDENTS ------>", students);
				setData(students);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!nameSearchTerm && !tagSearchTerm) {
			setStudents(data);
		} else {
			const isIncluded = (student) => {
				if (
					nameSearchTerm &&
					tagSearchTerm &&
					(student.firstName.toLowerCase().includes(nameSearchTerm.toLowerCase()) ||
						student.lastName.toLowerCase().includes(nameSearchTerm.toLowerCase()) ||
						student?.tags?.some((tag) => tag.includes(tagSearchTerm.toLocaleLowerCase())))
				) {
					return true;
				} else if (
					nameSearchTerm &&
					(student.firstName.toLowerCase().includes(nameSearchTerm.toLowerCase()) ||
						student.lastName.toLowerCase().includes(nameSearchTerm.toLowerCase()))
				) {
					return true;
				} else if (tagSearchTerm && student?.tags?.some((tag) => tag.includes(tagSearchTerm.toLocaleLowerCase()))) {
					return true;
				}
			};
			const filteredData = data.filter(isIncluded);
			setStudents(filteredData);
		}
	}, [nameSearchTerm, tagSearchTerm, data]);

	const addTags = (id, tag, e, clearTagsInput) => {
		e.preventDefault();
		clearTagsInput();
		tag = tag.toLowerCase();
		const studentsWithTag = students.map((student) => {
			if (student.id === id) {
				student["tags"] ? student["tags"].push(tag) : (student["tags"] = [tag]);
			}
			return student;
		});
		setStudents(studentsWithTag);
	};

	return (
		<div className="student-container">
			<SearchBar
				searchTerm={nameSearchTerm}
				placeholder="Search by name"
				setFilter={(e) => setNameSearchTerm(e.target.value)}
			/>
			<SearchBar
				searchTerm={tagSearchTerm}
				placeholder="Search by tag"
				setFilter={(e) => setTagSearchTerm(e.target.value)}
			/>
			{students.map((student) => (
				<Student studentInfo={student} key={student.id} addTags={addTags} />
			))}
		</div>
	);
}

export default App;
