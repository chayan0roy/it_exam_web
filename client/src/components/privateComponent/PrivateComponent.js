import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import FromData from 'form-data';

import FrontPage from '../../pages/frontPage/FrontPage'
import SecondPage from '../../pages/secondPage/SecondPage';
import AnswerPage from '../../pages/answerPage/AnswerPage';
import MCQPage from '../../pages/mcqPage/MCQPage';
import CodingQuestionPage from '../../pages/codingQuestionPage/CodingQuestionPage';
import ShortOutputPage from '../../pages/shortOutputPage/ShortOutputPage';

import Register from '../../pages/login_register/Register';
import Login from '../../pages/login_register/Login';

export default function PrivateComponent({ isLogin, setIsLogin }) {

    const navigate = useNavigate();



	const [questionLength, setQuestionLength] = useState(0);
	const [correctAnswer, setCorrectAnswer] = useState(0);
	const [wrongAnswer, setWrongAswer] = useState(0);




    const [FPId, setFPId] = useState();
    const [SPData, setSPData] = useState();

    useEffect(() => {
        check_Auth_Token();
    }, []);

    const check_Auth_Token = async () => {
        const token = Cookies.get("auth_token");
        if (token) {
            let fromData = new FromData();
            fromData.append("token", token);
            const result = await axios.post("https://it-exam-web-back.onrender.com/getToken", fromData,);
            if (result.data.message) {
                setIsLogin(true);
                navigate('/');
            } else {
                Cookies.remove("auth_token");
                setIsLogin(false);
                navigate('/register');
            }
        } else {
            setIsLogin(false);
            navigate('/register');
        }
    }

    return (
        <Routes>
            {
                isLogin ?
                    <>
                        <Route path='/' element={<FrontPage setFPId={setFPId} />} />
                        <Route path='/secondPage/:id' element={<SecondPage />} />
                        <Route path='/answerPage' element={<AnswerPage questionLength={questionLength} correctAnswer={correctAnswer} wrongAnswer={wrongAnswer} />} />
                        <Route path='/mcqPage/:languageID' element={<MCQPage setQuestionLength={setQuestionLength} setCorrectAnswer={setCorrectAnswer} setWrongAswer={setWrongAswer} />} />
                        <Route path='/codingQuestionPage/:languageID' element={<CodingQuestionPage />} />
                        <Route path='/shortOutputPage/:languageID' element={<ShortOutputPage />} />
                    </>
                    :
                    <>
                        <Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
                        <Route path='/register' element={<Register />} />
                    </>
            }
        </Routes>
    )
}
