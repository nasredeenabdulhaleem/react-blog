/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import React from 'react'
// import  axiosInstance from "../../config/axios"

import { useNavigate, Link } from 'react-router-dom';
import holder from '../images/nas.jpg'
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ProfileCard from '../../components/ProfileCard';
import DashboardBlogList from '../../components/DasboardBlogList';

const BACKEND_URL = process.env.REACT_APP_BACKENDURL

const Dashboard = () => {
    const [blogs, setBlog] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [author, setAuthor] = useState("")
    let { authTokens, logoutUser } = useContext(AuthContext)
    // const BlogDetail = (e)=>{
    //     e.preventDefault();

    // }
    let navigate = useNavigate()
    useEffect(() => {

        fetch(`${BACKEND_URL}/author-article/`,
            {
                headers: {
                    "CONTENT-TYPE": "application/json",
                    "Authorization": 'Bearer ' + String(authTokens.access)
                },
            })
            .then(res => {
                if (!res.status === 200) {
                    throw Error('could not fetch the data for that resource');
                } else if (res.statusText === 'Unauthorized') {
                    logoutUser()
                }
                return res.json()
            })
            .then(data => {
                setBlog(data)
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })

            // Get Author profile details
            fetch(`${BACKEND_URL}author/detail/`,
            {
                headers: {
                    "CONTENT-TYPE": "application/json",
                    "Authorization": 'Bearer ' + String(authTokens.access)
                },
            })
            .then(res => {
                if (!res.status === 200) {
                    throw Error('could not fetch the data for that resource');
                } else if (res.statusText === 'Unauthorized') {
                    logoutUser()
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                setAuthor(data)
                // setBlog(data)
                // setIsPending(false)
                // setError(null)
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
            
  
    });

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className='text-center text-4xl text-black mb-6'>Dashboard</header>
                <div className="grid lg:grid-cols-3 gap-6">
                    <ProfileCard author={author} holder={holder} />
                    <div className="col-span-2 bg-white shadow rounded-lg p-6">
                        <DashboardBlogList blogs={blogs} isPending={isPending} error={error} navigate={navigate} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard;