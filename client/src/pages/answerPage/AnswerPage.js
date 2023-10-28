import React, { useEffect, useState } from 'react'
import './AnswerPage.css'
import { Link } from 'react-router-dom';

export default function AnswerPage({questionLength, correctAnswer, wrongAnswer}) {

	return (
		<div className='answerPage'>
			<div className='answer_area'>
				<div className='answer_area_top'>
					<h1 className='flex3'><span>Total Question</span><span>{questionLength}</span></h1>
					<h1 className='flex3'><span>Total Marks</span><span>{questionLength}</span></h1>
				</div>
				<div className='answer_area_bottom'>
					<h1 className='flex3'><span>Correct Answer</span><span>{correctAnswer}</span></h1>
					<h1 className='flex3'><span>Wrong Answer</span><span>{wrongAnswer}</span></h1>
					<h1 className='flex3'><span>Your Marks</span><span>{correctAnswer - wrongAnswer}</span></h1>
				</div>
			</div>
			<div className='answerPage_btn_area flex'>
				<Link className='btn answerPage_btn' to="/">Go Home</Link>
			</div>
		</div>
	)
}
