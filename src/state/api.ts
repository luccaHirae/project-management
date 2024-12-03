import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query"; // need to add /react to the end of this import

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: () => ({}),
});

export const {} = api;
