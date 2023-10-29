import React, { useEffect, useState } from 'react'
import './FrontPage.css'
import { Link } from 'react-router-dom';

export default function FrontPage() {
	const [fpData, setFPdata] = useState();

	useEffect(() => {
		getFPData();
	}, [])

	const getFPData = async () => {
		let result = await fetch(`https://it-exam-web-back.onrender.com/getFPData`);
		result = await result.json();
		setFPdata(result[0].Data);
	}

	return (
		<div className='frontPage'>
			{
				fpData
					?
					fpData.map((e) => {
						return (
							<div className='frontPage_Card flex'>
								<div className='FPleft flex'>
									<h1>{e.FPCardName}</h1>
									<Link className='btn' to={`/secondPage/${e.id}`}>Start</Link>
								</div>
								<div className='FPright flex'>
									<img src={e.FPCardImg}></img>
								</div>
							</div>
						);
					}) : <h1></h1>
			}
		</div>
	)
}
