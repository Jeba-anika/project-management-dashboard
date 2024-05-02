import { useQuery } from "react-query";

const useFetchData = ({ url, key }) => {


    const { isLoading, isError, data, error } = useQuery(key, async () => {
        const response = await fetch(url);
        const data = await response.json();
        return data

    })


    return {
        data,
        isLoading,
        isError,
        error
    }
}

export default useFetchData