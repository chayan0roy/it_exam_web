import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './CodingQuestionPage.css'

export default function CodingQuestionPage() {
	const params = useParams();
	const [cqPage, setCQPage] = useState();
	const [index, setIndex] = useState(0);


	useEffect(() => {
		getCQPData();
	}, [])

	const getCQPData = async () => {
		let result = await fetch(`https://it-exam-web-back.onrender.com/getCQPData/${params.languageID}`);
		result = await result.json();
		setCQPage(result.languageQuestions);
	}

	const SendAnswer = () => {
		setIndex(index + 1);
	}
	const nextQuestion = () => {
		setIndex(index + 1);
	}

	const gotoHome = () => {
		setIndex(0);
	}

	return (
		<div className='codingQuestionPage'>
			{
				cqPage
					?
					<>
						<h1><span>{cqPage[index].QNum}</span>{cqPage[index].Question}</h1>
						{
							cqPage[index].QuestionSuggestion.length != 0
								?
								cqPage[index].QuestionSuggestion.map((e) => {
									return (
										<h2>{e}</h2>
									);
								})
								:
								<></>
						}
						<textarea></textarea>
						<div className='btnArea'>
							<button className="btn" onClick={SendAnswer}>Send</button>
							{
								index + 1 != cqPage.length
									?
									<button className="btn" onClick={nextQuestion}>Next</button>
									:
									<Link className="btn" onClick={gotoHome} to='/'>Exit</Link>
							}
						</div>
					</>
					:
					<></>
			}

		</div>
	)
}
