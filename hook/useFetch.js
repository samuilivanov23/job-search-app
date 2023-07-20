import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from '@env';

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoadingState, setIsLoadingState] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': rapidApiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoadingState(true);

        try{
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoadingState(false);
        } catch(error) {
            setError(error);
            alert("There is an error!");
        } finally {
            setIsLoadingState(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetchData = () => {
        setIsLoadingState(true);
        fetchData();
    }

    return { data, isLoadingState, error, refetchData };
}

export default useFetch;