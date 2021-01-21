import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

/*API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localSotrage.getItem('profile')).token}`;
    }

    return req;
});*/

//const url = 'https://ugiv-web.herokuapp.com/posts';
//const QandAUrl = 'https://ugiv-web.herokuapp.com/qandas';
//const sendEmailUrl = 'https://ugiv-web.herokuapp.com/send';

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const fetchQandAs = () => API.get('/qandas')
export const createQandA = (newQandA) => API.post('/qandas', newQandA);
export const sendEmail = (email) => API.post('/send', email);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);