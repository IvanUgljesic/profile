import axios from 'axios';

const url = 'https://ugiv-web.herokuapp.com/posts';
const QandAUrl = 'https://ugiv-web.herokuapp.com/qandas';
const sendEmailUrl = 'https://ugiv-web.herokuapp.com/send';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const fetchQandAs = () => axios.get(QandAUrl);
export const createQandA = (newQandA) => axios.post(QandAUrl, newQandA);
export const sendEmail = (email) => axios.post(sendEmailUrl, email);