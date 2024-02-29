import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/usefetch";

import BlogDetail from "../components/articleDetail";

function Article() {
    const {articleid} = useParams()
	const {
		data: blog,
		isPending,
		error,
	} = useFetch("http://127.0.0.1:8000/api/detail/"+articleid+'/');

	return (
		<div className="container">
		<div className="flex flex-row align-middle">
		<Link to="/" className='btn border-teal-400 rounded font-bold bg-teal-500 my-5 mx-1 py-2 px-6 hover:bg-teal-700'>Return Home</Link>
		<strong className="uppercase my-5 mx-0 py-2 px-2 rounded font-boldtext-4x
		"> |</strong>
		<h4 className="uppercase my-5 mx-0 py-2 px-2 rounded font-bold text-fuchsia-400">Article <small className="text-black py-1">{articleid}</small></h4>
		</div>
		{error && <div> {error}</div>}
		{isPending && <div> Loading </div>}
		{blog && <BlogDetail blog={blog} />}
			
		</div>
	);
}

export default Article;