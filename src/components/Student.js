import React, { useState } from "react";
import "../App.css";

function Student({ studentInfo }) {
	const { firstName, lastName, email, company, skill, grades, pic } = studentInfo;
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="student">
			<img src={pic} alt="profile" className="student-profile" />
			<div className="student-info">
				<div>
					<h1>
						{firstName} {lastName}
					</h1>
					<p>Email: {email}</p>
					<p>Company: {company}</p>
					<p>Skill: {skill}</p>
					<p>Average: {grades.reduce((a, b) => Number(a) + Number(b), 0) / grades.length}%</p>
					{isExpanded && (
						<div className="grades">
							{grades.map((grade, idx) => (
								<>
									<p key={idx}>
										Test {idx + 1}: <span>{grade}%</span>
									</p>
								</>
							))}
						</div>
					)}
				</div>
				{!isExpanded && (
					<button className="expand" onClick={() => setIsExpanded(true)}>
						+
					</button>
				)}
				{isExpanded && (
					<button className="expand" onClick={() => setIsExpanded(false)}>
						-
					</button>
				)}
			</div>
		</div>
	);
}

export default Student;
