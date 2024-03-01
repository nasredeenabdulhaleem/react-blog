/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import useFetch from "../hooks/usefetch";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthContext";

const BACKEND_URL = process.env.REACT_APP_BACKENDURL

const CreateArticle = () => {
  const navigate = useNavigate()
  let { authTokens, logoutUser } = useContext(AuthContext)
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("")
  const [tag, setTag] = useState("")
  const [success, setSuccess] = useState(false)
  const { data:categories, isPending:pend, error:err } = useFetch(
    `${BACKEND_URL}/category/`
  );
  const { data:tags, isPending:pending, error } = useFetch(`${BACKEND_URL}` + "/tags" + "/");
//   console.log('category', category)  
//   console.log('tag',tag)

const [selectedFile, setSelectedFile] = useState(null);


const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0]);
};

// add option from multiple select option and set state 

const handleChange = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setTag(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  //  let data ={
  //       'title': title,
  //       'slug': slug,
  //       "image": selectedFile,
  //       'body': body,
  //       'category': category,
  //       'tag': tag
  //  }
   const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('body', body);
      formData.append('category', category);
      formData.append('tag', tag);
      
    let submit = async (data) => {
        let response = fetch(`${BACKEND_URL}/create/`, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+ String(authTokens.access), 
        },
        body: data//JSON.stringify(data)
        
    })
    let res = await (await response).json()
    if ((await response).statusText === "Unauthorized"){
      logoutUser()
    }
    else if((await response).status === 201){
        console.log(res)
        setSuccess(true)
        navigate("/dashboard")
    }
    else{

      console.log((await response).err)

    }
    // .then( (res) =>{
    //     res.json()
    //     console.log(res);
    // })
    
    // .then(data => {
    //     console.log(data)
    // });
  };
  submit(formData);
};

  useEffect(()=>{
    console.log('category', category)  
  console.log('tag',tag)
  },[tag,category]);
  return (
    <div className="justify-center align-middle">
      <form onSubmit={handleSubmit} className="m-3 p-2 w-full text-black">
        <div className="form container p-4">
          <h3 className="font-extrabold text-center m-2 p-2 text-3xl">
            Article Create Form
          </h3>

          <div className="m-1 p-1 w-full flex">
            <label className="p-2 mx-2 text-black" htmlFor="Title">
              Title:
            </label>
            <input
              className="w-full border border-green-400 p-2 font-bold focus:border-blue-400 "
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              required
              id="title"
            />
          </div>
          <div className="m-1 p-1 w-full flex">
            <label className="p-2 mx-2 text-black" htmlFor="Slug">
              Slug:
            </label>
            <input
              className="w-full border border-green-400 p-2 font-bold focus:border-blue-400 "
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              name="slug"
              required
              id="slug"
            />
          </div>
          <div className="m-1 p-2 w-full  flex">
          <label className="p-2 mx-2 text-black" htmlFor="image">Article Image:</label>
            < input type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange}  className="w-full border border-green-400 p-2 font-bold focus:border-blue-400 "/>
          </div>
          <div className="m-1 p-1 w-full flex">
            <label className="p-2 mx-2 text-black" htmlFor="body">
              Body:
            </label>
            <textarea
              className="w-full border border-green-400 p-2 font-bold focus:border-blue-400 "
              type="text"
              cols={27}
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              name="body"
              required
              id="body"
            />
          </div>
          <div className="m-1 p-1 w-full flex">
            <label className="p-2 mx-2 text-black" htmlFor="body">
              Categories:
            </label>
            <select name="category" onChange={(e)=>setCategory(e.target.value)}  id="category" className="w-full border border-green-400 p-2 font-bold focus:border-blue-400 ">
            <option defaultValue>Select Category</option>
            {categories && <>
            {categories.map((category) => (
                  
                  <option key={category.id} value={category.id}>{category.title}</option>
                ))}</>}
            </select>
            <a href="addcategory" className="text-blue-400">&nbsp;Add Category</a>
          </div> 
          <div className="m-1 p-1 w-full flex">
            <label className="p-2 mx-2 text-black" htmlFor="body">
              Tags:
            </label>
            <select name="tag" onChange={handleChange} multiple id="tags"className="w-full border border-green-400 p-2 font-bold focus:border-blue-400 ">
            {tags && <>{tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>{tag.title}</option>
                ))}</>}
            </select>
          </div> 
          <br />
          <div className="rounded-md shadow-sm m-2 p-2 w-full flex justify-center align-middle">
            
            <button type="submit" className="bg-green-400 text-white rounded-md px-4 py-4" value="create-article">
              Create Article
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
