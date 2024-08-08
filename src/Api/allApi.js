import { CommonApi } from "./instance";

export const CreateItem = async (reqBody) => {
  return await CommonApi("POST", "/create-item/", reqBody);
};

export const GetItems = async () => {
  return await CommonApi("GET", "/items/");
};


export const UpdateItem = async (id, reqBody) => {
  return await CommonApi("PUT", `/items/${id}/`, reqBody);
};

export const DeleteItem = async (id) => {
  return await CommonApi("DELETE", `/items/${id}/`);
};
