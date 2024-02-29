import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogItem = ({ blog }) => (
    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden m-4">
        <Link to={`/article/edit/${blog.slug}`}>
            <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{blog.title}</h3>
                <p className="text-gray-700 text-base">{blog.snippet}</p>
                <p className="text-gray-600 italic mt-2">{blog.author.authorname}</p>
                <p className="text-gray-600 mt-1">{blog.time_created}</p>
            </div>
            <div className='px-4 pt-2 pb-4'>
                {blog.tags.map((tag) => (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={tag.id}>
                        {tag.title}
                    </span>
                ))}
            </div>
        </Link>
    </div>
);

// const DashboardBlogList = ({ blogs, isPending, error, navigate }) => (
//     <div className="w-full p-6">
//         <div className="mb-4">
//             <button onClick={() => { navigate('/article/create') }} className='w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-500'>Create Article</button>
//         </div>
//         {isPending && <p className='text-2xl text-center'>Loading . . .</p>}
//         {error && <p className='text-red-500 text-center'>An error occurred, Articles could not be fetched</p>}
//         {blogs && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {blogs.map((blog) => <BlogItem blog={blog} key={blog.id} />)}
//         </div>}
//     </div>
// );


const DashboardBlogList = ({ blogs, isPending, error, navigate }) => {
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    }

    const pages = [];
    for (let i = 1; i <= Math.ceil(blogs.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="w-full p-6">
            <div className="mb-4">
                <button onClick={() => { navigate('/article/create') }} className='w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-500'>Create Article</button>
            </div>
            {isPending && <p className='text-2xl text-center'>Loading . . .</p>}
            {error && <p className='text-red-500 text-center'>An error occurred, Articles could not be fetched</p>}
            {currentItems && currentItems.map((blog) => <BlogItem blog={blog} key={blog.id} />)}
            <div className="flex justify-center">
                {pages.map((page) => (
                    <button onClick={handleClick} key={page} id={page} className={`h-8 w-8 ${currentPage === page ? 'bg-blue-500 text-white' : 'text-blue-500'}`}>
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DashboardBlogList;