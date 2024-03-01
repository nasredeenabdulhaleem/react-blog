/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import  axiosInstance from "../../config/axios"
import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import AuthContext from "../../context/AuthContext";

import { useParams } from "react-router-dom";
import useFetch from "../../hooks/usefetch";

const BACKEND_URL = process.env.REACT_APP_BACKENDURL;

function ArticleEdit() {

  const navigate = useNavigate()
  let { authTokens, logoutUser } = useContext(AuthContext)
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("")
  const [category, setCategory] = useState(null)
  const [tag, setTag] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [success, setSuccess] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const { data: categories, isPending: pend, error: err } = useFetch(
    `${BACKEND_URL}/category/`
  );
  const { data: tags, isPending: pending, error } = useFetch(`${BACKEND_URL}/tags/`);

  const [selectedFile, setSelectedFile] = useState(null);


const handleFileChange = (event) => {
  setSelectedFile(event.target.files[0]);
};
  //   console.log('tag',tag)

  // add option from multiple select option and set state 
  const handleChange = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setTag(value);
  };

  const { articleid } = useParams()
  // const {
  // 	data: blog,
  // 	isPending,
  // 	error:fail,
  // } = useFetch("http://127.0.0.1:8000/api/detail/"+articleid+'/');
  const handleDelete = (e) =>{
    e.preventDefault();
    console.log("delete")
    let deleteArticle = async (data) => {
      let response = fetch(`${BACKEND_URL}/${articleid}/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
        
      })
      let res = await (await response).json()
      console.log(res);
      if ((await response).statusText === "Unauthorized") {
        logoutUser()
      }
      else if (await (response).status === 204 ) {
        console.log(res)
        setSuccess(true)
        navigate("/dashboard")
      }
      else {

        console.log((await response).err)

      }

    }
    deleteArticle();
  };

  const openModal = () => {
    let modal = document.getElementById('modal');
    if (window.screen.width <= 450){
      modal.style.left = "15vw";
    }else{
    modal.style.left = "30vw";}
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  const closeModal = () => {
    let modal = document.getElementById('modal');
    modal.style.left = "30000vw";
    document.body.style.backgroundColor = "white";
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // let data = {
    //   'title': title,
    //   'slug': slug,
    //   'body': body,
    //   'category': category,
    //   'tag': tag
    // }
    const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('body', body);
      formData.append('category', category);
      formData.append('tag', tag);
   
    let submit = async (data) => {
      let response = fetch(`${BACKEND_URL}/${articleid}/update/`, {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(authTokens.access),
        },
        body: data //JSON.stringify(data)

      })
      let res = await (await response).json()
      if ((await response).statusText === "Unauthorized") {
        logoutUser()
      }
      else if ((await response).status === 200) {
        console.log(res)
        setSuccess(true)
        navigate("/dashboard")
      }
      else {

        console.log((await response).err)

      }

    }
    submit(formData);
  }
  useEffect(() => {


    fetch(`${BACKEND_URL}/detail/` + articleid + '/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      }

    })
      .then((res) => {
        if (res.statusText === "Unauthorized") {
          logoutUser()
        }
        else if (res.status === 404) {
          navigate('*')
          throw (Error('Article with that id does not exist'))
        }
        else if (res.status === 200) {
          return res.json()
        }

      })
      .then(data => {

        let arrTag = data.tags.map(tag => tag.id)
        console.log([arrTag], data.tags)
        // let arrCat = data.category.map(cat=>cat.title)
        setBody(data.article_body)
        setCategory(data.category.id)
        setSlug(data.slug)
        setTag(arrTag)
        setTitle(data.title)
        setSuccess(true)
        setIsPending(false)
      })
      .catch(err => {
        alert(err.message)
      })


  }, [articleid, authTokens.access, logoutUser, navigate])

  return (
    <div className="m-2 p-2">
      <div className="justify-center align-middle">
        {isPending && <p className="text-center uppercase">LOADING....</p>}
        <form onSubmit={handleSubmit} className="m-3 p-2 w-full text-black">
          <div className="form container p-4">
            <h3 className="font-extrabold text-center m-2 p-2 text-3xl">
              Article Update Form
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
                // onChange={(e) => setSlug(e.target.value)}
                readOnly
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
              <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} id="category" className="w-full border border-green-400 p-2 font-bold focus:border-blue-400 ">
              <option defaultValue>Select Category</option>
                {categories && <>{categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.title}</option>
                ))}</>}
              </select>
              <a href="addcategory" className="text-blue-400">&nbsp;Add Category</a>
            </div>
            <div className="m-1 p-1 w-full flex">
              <label className="p-2 mx-2 text-black" htmlFor="tags">
                Select Tags:
              </label>
              <select name="tag" value={tag} onChange={handleChange} multiple id="tags" className="w-full border border-green-400 p-2 font-bold focus:border-blue-400 ">
                {tags && <>{tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>{tag.title}</option>
                ))}</>}

              </select>
            </div>
            <br />
            <div className="rounded-md shadow-sm m-2 p-2 w-full flex justify-center align-middle">
                  <div className="grid grid-cols-2 gap-4">
              <button type="submit" className="bg-green-400 text-white rounded-md px-4 py-4 m-2" value="create-article">
                Update Article
              </button>
              <button type="button" onClick={openModal} className="bg-red-400 text-white rounded-md px-4 py-4 m-2" value="delete-article">
                Delete Article
              </button>
              </div>
            </div>
          </div>
        </form>
        <div id="modal" className="modal">
            <div className="modal-header">Modal Header <span class="close-modal"
                    onClick={closeModal}>&times;</span></div>
            <div className="modal-body">
              <div className="m-2 p-2">
                <h2> Are you sure you  want to delete Article with Title</h2>
                <blockquote className=" text-green-500" >"{title}"</blockquote>
                <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={closeModal} className="bg-green-400 text-white rounded-md px-4 py-4 m-2" value="create-article">
                Return to Edit
              </button>
              <button type="button" onClick={handleDelete} className="bg-red-400 text-white rounded-md px-4 py-4 m-2" value="delete-article">
                Delete Article
              </button>
              </div>
              </div>
            </div>
        </div>
      </div>
    </div>

  );
}

export default ArticleEdit;