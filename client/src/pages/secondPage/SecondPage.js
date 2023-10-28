import React, { useEffect, useState } from 'react'
import './SecondPage.css'
import { Link, useParams } from 'react-router-dom';

export default function SecondPage() {
	const params = useParams();
	const [spData, setSPdata] = useState();

	useEffect(() => {
		getSPData();
	}, [])

	const getSPData = async () => {
		let result = await fetch(`https://it-exam-web-back.onrender.com/getSPData/${params.id}`);
		result = await result.json();
		setSPdata(result.language);
	}

	return (
		<div className='secondPage flex2'>
			{
				spData
					?
					spData.map((e) => {
						return (
							<div className='SPCard flex3'>
								<div className='SPCardImgArea flex'>
									<img src={e.languageImage}></img>
								</div>
								<div className='SPCardButton flex2'>
									<h1>{e.languageName}</h1>
									<Link className='btn' to={`/${e.nextPage}/${e.languageID}`}>Start</Link>
								</div>
							</div>
						);
					})
					:
					<></>
			}
		</div>
	)
}



