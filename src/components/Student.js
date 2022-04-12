import React from "react";
import "../App.css";

function Student({ studentInfo }) {
	const { firstName, lastName, email, company, skill, grades, pic } = studentInfo;

	return (
		<div className="student">
			<img src={pic} alt="profile" className="student-profile" />
			<div className="student-info">
				<h1>
					{firstName} {lastName}
				</h1>
				<p>Email: {email}</p>
				<p>Company: {company}</p>
				<p>Skill: {skill}</p>
				<p>Average: {grades.reduce((a, b) => Number(a) + Number(b), 0) / grades.length}%</p>
			</div>
		</div>
	);
}

export default Student;
