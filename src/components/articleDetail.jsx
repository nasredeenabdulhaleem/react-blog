import ImageComponent from "../components/img"
const BlogDetail = ({blog}) =>{
    return(
        <>
        
        <h1 className="p-4 m-4 font-bold text-4xl text-lime-500 text-center">{blog.title}</h1>

        <div className="container m-2">
            <ImageComponent imageUrl={blog.image} />
            <p className="m-1 p-1 font-thin text-xs text-gray-800">{blog?.author.authorname} | {blog.time_created}</p>
            <article className="font-normal p-2 text-base break-words">
            {blog.article_body}
            </article>
            <div className=" flex flex-wrap m-1">
                {blog.tags.map((tag)=>{
                    return(
                    <p className="text-gray-800 m-2 p-2 italic rounded border-black border hover:bg-amber-400" key={tag.id}>
                    {tag.title}
                </p>)
                })}
            </div>
        </div>

        </>
    )
}

export default BlogDetail;