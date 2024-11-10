import axios, { AxiosInstance } from "axios";

export let api: AxiosInstance;

export const initApi = async () => {

	api = axios.create({
		baseURL: "http://localhost:3000",
	});

	api.interceptors.request.use(function(config) {
		
		const token = localStorage.getItem("access_token");
		config.headers.Authorization = `Bearer ${token}`;

		return config;
	});
};