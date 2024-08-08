import axios from "axios";

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

// export default instance;

const CommonApi = async (httpMethod, url, reqBody) => {
  let reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const result = await instance(reqConfig);
    return result;
  } catch (err) {
    console.error('API call error:', err); 
    throw err; 
  }
};

export  { CommonApi}
