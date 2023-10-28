import React, { useEffect, useState } from 'react'
import FromData from 'form-data';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import img from "../../assets/accont.png"


export default function Register() {

	const navigate = useNavigate();

	const [userImage, setUserImage] = useState(img);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");

	const convertUserIMG = (e) => {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        fileReader.onload = () => {
            setUserImage(fileReader.result);
        }
    }

	const handleSubmit = async () => {
		if (userImage && name && email && password && cpassword) {
			if (password === cpassword) {
				let fromData = new FromData();
				fromData.append("userImage", userImage);
				fromData.append("name", name);
				fromData.append("email", email);
				fromData.append("password", password);

				const result = await axios.post("http://localhost:5000/register", fromData,);
				navigate('/login');
			} else {
				alert("Password and Confrom Password");
			}
		} else {
			alert("Please Fill The field");
		}
	}

	return (
		<>
			<div className='register'>
				<div className='inputArea'>
					<div className='input_image_box'>
						<img className='input_image' src={userImage == "" || userImage == null ? img : userImage}></img>
						<input className='image_input' accept='image/*' type='file' name='userImage' onChange={convertUserIMG}></input>
					</div>
					<div class="input_box">
						<input className='input_box' type='text' name='name' required onChange={(e) => setName(e.target.value)}></input>
						<span>Enter User Name</span>
						<i></i>
					</div>
					<div class="input_box">
						<input className='input_box' type='email' name='email' required onChange={(e) => setEmail(e.target.value)}></input>
						<span>Enter Email</span>
						<i></i>
					</div>
					<div class="input_box">
						<input className='input_box' type='text' name='password' required onChange={(e) => setPassword(e.target.value)}></input>
						<span>Enter Password</span>
						<i></i>
					</div>
					<div class="input_box">
						<input className='input_box' type='text' name='cpassword' required onChange={(e) => setCpassword(e.target.value)}></input>
						<span>Enter Confirm Password</span>
						<i></i>
					</div>
					<button className='btn' type='submit' onClick={handleSubmit}>Submit</button>
					<Link className='link' to="/login">Login your Account</Link>
				</div>
			</div>
		</>
	)
}
