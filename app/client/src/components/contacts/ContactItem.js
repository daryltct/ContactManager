import React from 'react';
import { useContacts, deleteContact, setCurrent, clearCurrent } from '../../context/contact/ContactContext';

function ContactItem({ contact }) {
	const [ contactState, contactDispatch ] = useContacts();
	const { _id, name, email, phone, type } = contact;

	function handleDelete() {
		clearCurrent(contactDispatch);
		deleteContact(contactDispatch, _id);
	}

	return (
		<div className="card bg-light">
			<h3 className="text-primary text-left">
				{`${name} `}
				<span className={`float-right badge ${type === 'professional' ? 'badge-success' : 'badge-primary'}`}>
					{type.charAt(0).toUpperCase() + type.slice(1)}
				</span>
			</h3>
			<ul className="list">
				{email && (
					<li>
						<i className="fas fa-envelope-open" />
						{` ${email}`}
					</li>
				)}
				{phone && (
					<li>
						<i className="fas fa-phone" />
						{` ${phone}`}
					</li>
				)}
			</ul>
			<p>
				<button className="btn btn-dark btn-sm" onClick={(onClick) => setCurrent(contactDispatch, contact)}>
					Edit
				</button>
				<button className="btn btn-danger btn-sm" onClick={handleDelete}>
					Delete
				</button>
			</p>
		</div>
	);
}

export default ContactItem;
