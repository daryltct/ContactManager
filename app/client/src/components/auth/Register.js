import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AlertContext } from '../../context/alert/AlertContext';
import { useAuth, register, clearErrors } from '../../context/auth/AuthContext';

function Register(props) {
	let history = useHistory();
	const { setAlert } = useContext(AlertContext);
	const [ authState, authDispatch ] = useAuth();
	const { error, isLoggedIn } = authState;

	const [ user, setUser ] = useState({
		name: '',
		email: '',
		password: '',
		passwordCfm: ''
	});
	const { name, email, password, passwordCfm } = user;

	useEffect(
		() => {
			//if user already logged in, redirect to home page
			if (isLoggedIn) {
				history.push('/');
			}

			if (error) {
				setAlert(error, 'danger');
				clearErrors(authDispatch);
			}
		},
		[ error, isLoggedIn, history, authDispatch, setAlert ]
	);

	function handleChange(event) {
		const { name, value } = event.target;
		setUser({
			...user,
			[name]: value
		});
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (password !== passwordCfm) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register(authDispatch, { name, email, password });
		}
	}

	return (
		<div className="form-container">
			<h1>
				Account <span className="text-primary">Registration</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input name="name" type="text" value={name} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input name="email" type="email" value={email} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type="password"
						value={password}
						onChange={handleChange}
						required
						minLength="6"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="passwordCfm">Confirm Password</label>
					<input
						name="passwordCfm"
						type="password"
						value={passwordCfm}
						onChange={handleChange}
						required
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary btn-block" value="Register" />
			</form>
		</div>
	);
}

export default Register;
