import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSingleInvoice = (id) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    console.log(id)

    const options = {
        method: 'GET',
        url: `http://192.168.0.192:5001/api/sale/getinvoice/${id}`,
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
            const response = r.data
            console.log(r.data)
            setData(response)
            setIsLoading(false);
        } catch (error) {
            setError(error)
            alert('There is an error')
            console.log(error)
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

export default useFetchSingleInvoice;