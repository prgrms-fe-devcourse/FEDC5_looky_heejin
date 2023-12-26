const { VITE_BASE_URL } = import.meta.env;

import axios from "axios";

export const rootAPI = axios.create({
  baseURL: VITE_BASE_URL,
  timeout: 15000,
  headers: {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const _GET = async (endPoint: string) => {
  try {
    const response = await rootAPI.get(endPoint);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const _POST = async (endPoint: string, params: any) => {
  try {
    const response = await rootAPI.post(endPoint, params);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const _PATCH = async (endPoint: string, params: any) => {
  try {
    const response = await rootAPI.patch(endPoint, params);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const _PUT = async (endPoint: string, params: any) => {
  try {
    const response = await rootAPI.put(endPoint, params);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const _DELETE = async (endPoint: string) => {
  try {
    const response = await rootAPI.delete(endPoint);
    return response;
  } catch (error) {
    console.error(error);
  }
};
