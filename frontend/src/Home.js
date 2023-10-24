import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthProvider';

import axios from './api/axios';
const Raspberry_URL = '/register';
const Raspberry_Products_URL = '/products';

const Home = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [gate, setGate] = useState('');
	const [wallet, setWallet] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const [products, setProducts] = useState('');

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [gate, wallet]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				Raspberry_URL,
				{ gate, wallet },
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);

			setGate('');
			setWallet('');
			setSuccess(true);
		} catch (err) {
			console.log(err)
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();
		}
	};

	const handleAddProducts = async (e) => {
		e.preventDefault();
		const data = products?.split(",");
		const temp = [];
		
		for( let i = 0; i < data.length; i++){
			const item = data[i].split("product/");
			if(item.length == 2){
				temp.push(item[1].trim());
			}
		}

		try {
			const response = await axios.post(
				Raspberry_Products_URL,
				{ products: temp },
				{
					headers: { 'Content-Type': 'application/json' },
				}
			);

			setProducts('');
			setSuccess(true);
			setSuccessMsg('Success');
		} catch (err) {
			console.log(err)
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();
		}
	};

	return (
		<>
				<section>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<p
						className={successMsg ? 'successmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{successMsg}
					</p>
					<h1>Registration Link</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="gate">Link ID:</label>
						<input
							type="text"
							id="gate"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setGate(e.target.value)}
							value={gate}
							required
						/>

						<label htmlFor="wallet">User Wallet:</label>
						<input
							type="text"
							id="wallet"
							onChange={(e) => setWallet(e.target.value)}
							value={wallet}
							required
						/>
						<button>Register</button>
					</form>
					<h1>Add Product</h1>
					<form onSubmit={handleAddProducts}>
						<label htmlFor="products">Products</label>
						<textarea
							type="text"
							id="products"
							autoComplete="off"
							onChange={(e) => setProducts(e.target.value)}
							value={products}
							required
						/>
						<button>Add Products</button>
					</form>
				</section>
		</>
	);
};

export default Home;
