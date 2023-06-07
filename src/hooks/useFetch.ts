/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

interface FetchResult<T> {
    data: T | undefined;
    isLoading: boolean;
    error: any;
}

export default function useFetch<T>(
    url: string,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH',
    headers?: object,
    body?: BodyInit
): FetchResult<T> {

    const [data, setData] = useState<T | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        const reqHeaders = new Headers({
            ...headers,
        });

        const reqOptions: RequestInit = {
            headers: reqHeaders,
            method: method,
            body: body,
            signal
        }

        const reqUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`

        const fetchData = async () => {

            setIsLoading(true);

            try {
                const res = await fetch(reqUrl, reqOptions);
                if (!res.ok) {
                    throw new Error(`An error occured: ${res.statusText}`);
                }
                const resData = await res.json();
                setData(resData);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
            
        }
        fetchData();
        
        return () => {

            controller.abort();

        }

    }, [url])

    return { data, isLoading, error };

}