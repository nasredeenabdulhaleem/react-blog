import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import BlogList from '../components/list-blog';
import EditorsPickCarousel from '../components/EditorsPickCarousel';

function Home() {
	const ITEMS_PER_PAGE = 10;
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	let { user } = useContext(AuthContext);

	useEffect(() => {
		axios.get('http://127.0.0.1:8000/api/')
			.then(response => {
				if (!response.statusText) {
					throw Error('Could not fetch the data for that resource');
				}
				return response.data;
			})
			.then(data => {
				setData(data);
			})
			.catch((error) => {
				setError(error.message);
			});
	}, []);

	const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedBlog = data?.slice(startIndex, endIndex) || [];

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className="home">
			{error && <div className="text-red-500 text-center">{error}</div>}
			{!error && (
				<>
					<header>
						<h2 className="m-2 p-4 text-center text-2xl text-black">Editors Pick</h2>
					</header>
					<header>
						<EditorsPickCarousel blogs={paginatedBlog} />
						<br />
						<hr />
						{user && <h1>My name is {user.username}</h1>}
						<h2 className="m-2 p-4 text-center text-2xl text-black">Latest News</h2>
					</header>
					<div className="m-2">
						{data && <BlogList blogs={paginatedBlog} title="All Blogs" />}
					</div>
					<hr />
					<div className="p-2 m-2 grid place-content-center place-items-center grid-cols-3 bg-slate-200">
						<button
							className="btn border outline outline-amber-400 rounded py-2 px-4 hover:bg-amber-400 hover:text-white"
							disabled={currentPage === 1}
							onClick={() => handlePageChange(currentPage - 1)}
						>
							Previous
						</button>
						<span>{currentPage}</span>
						<button
							className="btn border outline outline-amber-400 rounded py-2 px-4 hover:bg-amber-400 hover:text-white"
							disabled={currentPage === totalPages}
							onClick={() => handlePageChange(currentPage + 1)}
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default Home;