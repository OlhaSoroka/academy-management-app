import axios from "../index";
const USER_URL = "https://inventorsoft-vue-2022-users.herokuapp.com/";
const useToken = (token) => ({
  headers: {
    "Access-Control-Allow-Origin": "*",
    authorization: `Bearer ${token}`,
  },
});

//functions with tokens
export const deleteUserById = async (id, token) => {
  const response = await axios.delete(
    `${USER_URL}firebase/delete-user/${id}`,
    useToken(token)
  );
  return await response.data;
};

export const getAllUsers = async (token) => {
  const response = await axios.get(
    `${USER_URL}firebase/get-all-users`,
    useToken(token)
  );
  return await response.data;
};

export const gethUserByID = async (id, token) => {
  const response = await axios.get(
    `${USER_URL}firebase/get-user/${id}`,
    useToken(token)
  );
  return await response.data;
};

export const updateUserByID = async (id, data, token) => {
  const response = await axios.post(
    `${USER_URL}firebase/update-user/${id}`,
    data,
    useToken(token)
  );
  return await response.data;
};

export const registerUser = async (data, token) => {
  const response = await axios.post(
    `${USER_URL}firebase/register`,
    data,
    useToken(token)
  );
  return await response.data;
};