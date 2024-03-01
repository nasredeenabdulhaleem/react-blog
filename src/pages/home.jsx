import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import EditorsPickCarousel from '../components/EditorsPickCarousel';
import BlogList from '../components/list-blog';
import AuthContext from '../context/AuthContext';

const backend_url = process.env.REACT_APP_BACKENDURL
console.log(backend_url)


function Home() {
	const ITEMS_PER_PAGE = 10;
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	let { user } = useContext(AuthContext);

	useEffect(() => {
		axios.get(backend_url)
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
			{error &&
				<div className="flex items-center justify-center text-center text-red-500 bg-red-100 border border-red-400 rounded-lg p-4 m-4">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 mr-2 text-red-500">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
					There was an error loading this page. Please try again later.
				</div>
			}
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