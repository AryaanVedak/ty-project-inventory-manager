import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);   

    const options = {
        method: 'GET',
        url: 'http://localhost:5001/api/inventory/fetchinventory',
        params: {},
        headers: {},
    }

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            
            setData(response.data.data)
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
    }

}