import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import process from 'process';

const {RAPID_API_KEY} = process.env;//import.meta.env.RAPID_API_KEY;

export const isFetchBaseQueryErrorType = (error: any): error is FetchBaseQueryError => 'status' in error

export const articleApi = createApi({ 
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
        headers.set('X-RapidAPI-Key', `${RAPID_API_KEY}`);
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