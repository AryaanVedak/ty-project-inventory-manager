import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);   

    const options = {
        method: 'GET',
        url: 'http://192.168.29.169:5001/api/inventory/fetchinventory',
        params: {},
        headers: {
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ4MGFjOTQ1ZDk2YWU5ZmUzOTdlN2U5In0sImlhdCI6MTY4NjIwMDYxMH0._RXLrE3g9RTlVC7MU6RMR64iOPkoioIb378qlboLFgM',
            'Content-Type': 'application/json',
        },
    }

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const r = await axios.request(options);
            const response = r.data[0]
            // console.log(r.data[0])
            setData(response)
            setIsLoading(false);
        } catch (error) {
            setError(error)
            alert('There is an error')
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetch};
}

export default useFetch;