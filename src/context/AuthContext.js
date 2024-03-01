/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const AuthContext = createContext()
const BACKEND_URL = process.env.REACT_APP_BACKENDURL


export default AuthContext


export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(`${BACKEND_URL}token/`, {
                email: e.target.username.value,
                password: e.target.password.value
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            let data = response.data;
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/dashboard');
            } else {
                alert('sup');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Handle the error appropriately here
        }

    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let updateToken = async () => {
        if (!authTokens?.refresh) {
            logoutUser();
        }

        // console.log('update Token Called')
        let response = fetch(`${BACKEND_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        })

        let data = await (await response).json()

        if ((await response).status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }

    }

    let contextData = {
        authTokens: authTokens,
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourminutes = 1000 * 60 * 4315
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourminutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}