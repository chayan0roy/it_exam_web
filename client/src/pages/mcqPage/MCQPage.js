import React, { useEffect, useState, useRef } from 'react'
import './MCQPage.css'
import { Link, useParams } from 'react-router-dom';

export default function MCQPage({ setQuestionLength, setCorrectAnswer, setWrongAswer }) {

	const params = useParams();

	const [allQuestions, setAllQuestions] = useState();
	const [index, setIndex] = useState(0);
	const [countDown, setCountDown] = useState(15);
	const [clickCounter, setClickCounter] = useState(0);

	const [cAnswer, setCAnswer] = useState(0);
	const [wAnswer, setWAswer] = useState(0);

	const [answerAreaClass, setAnswerAreaClass] = useState("answer_Area");
	const [answer, setAnswer] = useState(null);
	const [isCorrect, setIsCorrect] = useState("ans");
	const [nextBtnClass, setNextBtnClass] = useState("btn none");
	const [submitBtnClass, setSubmitBtnClass] = useState("btn none");


	useEffect(() => {
		getSPData();
	}, [])

	const getSPData = async () => {
		let result = await fetch(`https://it-exam-web-back.onrender.com/getMCQ/${params.languageID}`);
		result = await result.json();
		setAllQuestions(result.languageQuestions);
	}


	//Timer Part
	let timerId = useRef();
	useEffect(() => {
		timerId.current = setInterval(() => {
			setCountDown(prev => prev - 1)
		}, 1000);
		return () => clearInterval(timerId.current);
	}, [clickCounter])

	useEffect(() => {
		if (countDown <= 0) {
			clearInterval(timerId.current);
			allQuestions[index].Option.map((a, ai) => {
				if (a == allQuestions[index].Answer) {
					setAnswer(a);
					setIsCorrect("ans correct")
				}
			})
			setAnswerAreaClass('answer_Area pointer');
			if (index >= allQuestions.length - 1) {
				setSubmitBtnClass("btn")
			} else {
				setNextBtnClass("btn");
			}
		}
	}, [countDown])




	//Question Answer Part
	const nextQuestion = () => {
		setClickCounter(clickCounter + 1);
		setCountDown(15);
		setNextBtnClass("btn none");
		setAnswerAreaClass('answer_Area')
		setAnswer(null);
		if (index <= allQuestions.length - 1) {
			setIndex(index + 1);
		}
	}

	const selectOption = (OP) => {
		clearInterval(timerId.current);
		setAnswerAreaClass('answer_Area pointer');
		if (OP == allQuestions[index].Answer) {
			setCAnswer(cAnswer + 1);
			setAnswer(OP);
			setIsCorrect("ans correct")
		} else {
			setWAswer(wAnswer + 1);
			setAnswer(OP);
			setIsCorrect("ans wrong")
		}

		if (index >= allQuestions.length - 1) {
			setSubmitBtnClass("btn")
		} else {
			setNextBtnClass("btn");
		}
	}

	const sendAnswer = () => {
		setQuestionLength(allQuestions.length);
		setCorrectAnswer(cAnswer);
		setWrongAswer(wAnswer);
	}


	return (
		<>
			{
				allQuestions
					?
					<div className='quizPage flex'>
						<div className='question_Answer_Area'>
							<h1>{allQuestions[index].QNum}. {allQuestions[index].Question}</h1>
							<ul className={answerAreaClass}>
								{
									allQuestions[index].Option.map((OP, OPi) => {
										return (
											<li onClick={() => selectOption(OP)} className={answer === OP ? isCorrect : 'ans'} ><span>{OPi + 1}. </span>{OP}</li>
										)
									})
								}
							</ul>
						</div>
						<div className='quizPageBottom flex3'>
							<div className=' quizPageBottomLeft flex3'>
								<h1>{index + 1} out of {allQuestions.length}</h1>
								<div className='timer flex'>{countDown}</div>
							</div>
							<div className='quizPageBottomRight flex'>
								<button className={nextBtnClass} onClick={nextQuestion}>Next</button>
								<Link className={submitBtnClass} onClick={sendAnswer} to='/answerPage'>Submit</Link>
							</div>
						</div>
					</div>
					: <></>
			}
		</>
	)
}