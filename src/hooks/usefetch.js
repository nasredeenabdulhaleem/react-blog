import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // const abortCont = new AbortController();
        // { signal: abortCont.signal }
            fetch(url, {"headers":{"CONTENT-TYPE":"application/json"}})
                .then(res => {
                    // console.log("res:",res)
                    if (!res.ok) {
                        // console.log('i got here')
                        throw Error('could not fetch the data for that resource');
                    }
                    // console.log('i got here beyond error')
                    return res.json();
                })
                .then(data => {
                    // console.log(data)
                    setData(data)
                    setIsPending(false)
                    setError(null)
                })
                .catch(err => {
                    // if (err.name === "AbortError"){
                         console.log('fetch aborted');
                    // } 
                    setIsPending(false)
                    setError(err.message);
                    
                });
        
        // return() => abortCont.abort();
    }, [url]);
    return { data, isPending, error }
}

export default useFetch