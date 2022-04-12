import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../App.css";

function Student({ studentInfo, addTags }) {
	const { firstName, lastName, email, company, skill, grades, pic, id, tags } = studentInfo;
	const [isExpanded, setIsExpanded] = useState(false);
	const [tagInput, setTagInput] = useState("");

	const clearTagsInput = () => setTagInput("");

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
								<p key={uuidv4()}>
									Test {idx + 1}: <span>{grade}%</span>
								</p>
							))}
						</div>
					)}
					<div className="tags">{tags && tags.map((tag) => <p key={uuidv4()}>{tag}</p>)}</div>
					<form className="tagsBar" onSubmit={(e) => addTags(id, tagInput, e, clearTagsInput)}>
						<input type="text" value={tagInput} placeholder="Add a tag" onChange={(e) => setTagInput(e.target.value)} />
					</form>
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
