import { Link } from "react-router-dom";

function Error() {
	return (
		<div className=" container text-center uppercase ">
			<h1 className="bg-red-500 m-4 p-2 text-center text-red-100">404 Error </h1>
			<h4>Page Not Found </h4><br />
			<h5>Return Home <Link to="/" className='btn border-teal-400 rounded font-bold bg-teal-500 m-2 py-2 px-6 hover:bg-teal-700'>Home</Link>
			</h5>
		</div>
	);
}

export default Error;