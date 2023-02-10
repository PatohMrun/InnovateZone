import { useState, useEffect } from "react";
const useFetch=(url)=>{
    
    const [data, setData]=useState(null)
    const [pending, setPending]= useState(true);
    const [Errors, setError]= useState(null);
    // const DeletePost=(id)=>{
    //     const newData=(data.filter(Data=> Data.id !==id));
    //     setData(newData);

    // }
    
    useEffect(()=>{
        setTimeout(()=>{
        fetch(url)
        .then((res)=>{
            if(!res.ok){
                throw Error("Oops! Cannot Fetch data for that source...")
            }
           return res.json();
        }).then((data)=>{
           setData(data)
           setPending(false)
        }).catch(err=>{
            // setError(err.message);
            setError(err.message)
            setPending(false);
        })
    }, ); 
   
       },[url])

    return(
{data,pending,Errors}
    );
}
export default useFetch;