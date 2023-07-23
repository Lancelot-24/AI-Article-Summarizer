import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

export const isFetchBaseQueryErrorType = (error: any): error is FetchBaseQueryError => 'status' in error

const apiKeyUrl = `/.netlify/functions/apiKey`;

export const getKey = async () => {
    const key = await fetch(apiKeyUrl).then((response) => response.json())//.then((data) => data.key);
    
    return key;
}
const key = await getKey().then((data) => data.key);

export const articleApi = createApi({ 
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
        headers.set('X-RapidAPI-Key', `${key}`);
        headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

        return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
});


export const { useLazyGetSummaryQuery } = articleApi;