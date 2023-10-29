import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Card({ cardData }) {
    const navigate = useNavigate();

    return (
        <h1>fhf</h1>
    )
}




// <div className='card slideBoxDiv'>
//             <div className='imgArea flex'>
//                 <img src={cardData.image} />
//             </div>
//             <div className='textArea'>
//                 <h1>{cardData.name}</h1>
//                 <div className='textAreaDetails'>
//                     <h2>{cardData.companyName}</h2>
//                 </div>
//                 <div className='btnArea flex2'>
//                     {/* <button className="btnAreaBtn btn" onClick={() => goToBuy(cardData)}>Buy</button> */}
//                 </div>
//             </div>
//         </div>