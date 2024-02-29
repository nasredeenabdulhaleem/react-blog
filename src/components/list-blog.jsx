import { Link } from "react-router-dom";
import ImageComponent from "./img";

const BlogList = ({ blogs }) => {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 place-content-center lg:grid-cols-3 xl:grid-cols-4 gap-4 m-4">
				{blogs.map((blog) => (
					<Link to={`/article/detail/${blog.slug}`} key={blog.id}>
						<div className="max-w-sm rounded overflow-hidden shadow-lg grid grid-rows-auto1frauto">
							<ImageComponent imageUrl={blog.image} className="w-full" />
							<div className="px-6 py-4">
								<div className="font-bold text-xl mb-2">{blog.title}</div>
								<p className="text-gray-700 text-base">{blog.snippet}</p>
							</div>
							<div className="px-6 pt-4 pb-2">
								<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Written by: {blog.author.authorname}</span>
								<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{blog.time_created}</span>
								<br />
								{blog.tags.map((tag) => (
									<span key={tag.id} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag.title}</span>
								))}
							</div>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default BlogList;