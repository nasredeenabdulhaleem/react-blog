import { Link } from "react-router-dom";

function Contact() {
	return (
		<div className="home">
			<h1>Contact</h1>
            <Link to="/" className='btn border-teal-400 rounded font-bold bg-teal-500 m-2 py-2 px-6 hover:bg-teal-700'>Contact</Link>

		</div>
	);
}

export default Contact;