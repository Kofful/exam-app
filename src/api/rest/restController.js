import {baseUrl} from "./baseUrl";
import axios from "axios";

export const getAllUsers = () => axios.get(baseUrl + "users");
export const getUserById = (id) => axios.get(baseUrl + "user/" + id);
export const deleteUserById = (id) => axios.delete(baseUrl + "user/" + id);
export const registration = (createAccountData) =>
    axios.post(baseUrl + "user", createAccountData);

export const getAllProjects = () => axios.get(baseUrl + "projects");
export const getProjectById = (id) => axios.get(baseUrl + "project/" + id);