const express = require("express");
const cors = require("cors");
const dotdev = require('dotenv');
const bcrypt = require('bcryptjs');
const fileupload = require("express-fileupload");
const User = require("./database/schima/userSchima");

const FPSchima = require("./database/schima/FPSchima");
const SPSchima = require("./database/schima/SPSchima");
const MCQPSchima = require("./database/schima/MCQPSchima");
const CQP_Schima = require("./database/schima/CQPSchima");
const SOQSchima = require("./database/schima/SOQSchima");

dotdev.config({ path: './config.env' });
require("./database/connection");
const app = express();

app.use(fileupload());
app.use(express.json());
app.use(cors());

//REGISTRATION API ================================= REGISTRATION API
app.post('/register', async (req, res) => {

	const { userImage, name, email, password } = req.body;

	try {
		const userExist = await User.findOne({ email: email });

		if (userExist) {
			return res.status(422).json({ error: "User already exist" });
		} else {
			const user = new User({ userImage, name, email, password });
			await user.save();
			return res.status(201).json({ message: "User register successful" });
		}
	} catch (err) {
		console.log(err)
	}
	return res.send(req.body);
});



//LOGIN API ================================= LOGIN API
app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		const userLogin = await User.findOne({ email: email });

		if (userLogin) {
			const isPasordMatch = await bcrypt.compare(password, userLogin.password);

			if (isPasordMatch) {
				let auth_token = await userLogin.generateAuthToken();
				res.json({ "auth_token": auth_token, "id": userLogin._id });
			} else {
				res.status(400).json({ error: "Invalid Cradential" });
			}
		} else {
			res.status(400).json({ error: "Invalid Cradential" });
		}
	} catch (err) {
		console.log(err);
	}
	return res.send(req.body.data);
});


//getToken API ================================= getToken API
app.post("/getToken", async (req, res) => {
	try {
		const { token } = req.body;
		const isToken = await User.findOne({ "tokens.token": token });
		if (isToken) {
			res.json({ "message": true });
		}
	}
	catch (err) {
		console.log(err);
	}
	return res.send(req.body.data);
});


//getUserImage API ================================= getUserImage API
app.post("/getUserImage", async (req, res) => {
	try {
		const { token } = req.body;
		const isToken = await User.findOne({ "tokens.token": token });
		if (isToken) {
			res.json({ "userImg": isToken.userImage });
		}
	}
	catch (err) {
		console.log(err);
	}
	return res.send(req.body.data);
});








//ADD DATA ================================= ADD DATA
app.post('/addData', async (req, res) => {
	const { QNum, QuestionImage } = req.body;

	try {
		const userLogin = await User.findOne({ languageQuestions : languageQuestions} );
			console.log(userLogin);
		// const code_collections = new SOQSchima({ QNum, QuestionImage });
		// await code_collections.save();
		// return res.status(201).json({ message: "code uploaded" });
	} catch (err) {
		console.log(err)
	}
	return res.send(req.body);
});

















app.get("/getFPData", async (req, res) => {
	let getFPData = await FPSchima.find();
	res.send(getFPData);
});



app.get("/getSPData/:id", async (req, res) => {
	let getSPData = await SPSchima.findOne({ _id: req.params.id });
	res.send(getSPData);
});


app.get("/getMCQ/:id", async (req, res) => {
	let getMCQ = await MCQPSchima.findOne({ _id: req.params.id });
	res.send(getMCQ);
});



app.get("/getCQPData/:id", async (req, res) => {
	let getCQP = await CQP_Schima.findOne({ _id: req.params.id });
	res.send(getCQP);
});
















//ADD DATA ================================= ADD DATA
app.post('/addData', async (req, res) => {
	const { name, image, companyName, companyImage, description, sellType, price, offer, deliveryCharge, rating, catagory } = req.body;

	try {
		const code_collections = new productCollection({ name, image, companyName, companyImage, description, sellType, price, offer, deliveryCharge, rating, catagory });
		await code_collections.save();
		return res.status(201).json({ message: "code uploaded" });
	} catch (err) {
		console.log(err)
	}
	return res.send(req.body);
});





//getCatagoryData ================================= getCatagoryData
app.get('/getProducts', async (req, res) => {
	let result = await productCollection.find();
	if (result.length > 0) {
		res.send(result);
	} else {
		res.send({ reslt: "No product found" });
	}
});





app.get("/getFPData", async (req, res) => {
	let getFPData = await QADataSchima.find();
	res.send(getFPData);
});



app.get("/getSPData", async (req, res) => {
	let getSPData = await SPCardDataSchima.find();
	res.send(getSPData);
});

















const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server Start");
});












// FETCH POST
// app.post("/", async(req, res) => {
// 	let userData = new User(req.body);
// 	let result = await userData.save();
// 	res.send(result);
// });


// FETCH GET
// app.get("/", async(req, res) => {
// 	let userData = await User.find();
// 	if(userData.length > 0) {
// 		res.send(userData);
// 	} else {
// 		res.send({reslt:"No product found"});
// 	}
// });

