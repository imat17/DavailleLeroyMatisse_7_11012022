// import axios from 'axios';

// // posts
// export const GET_POSTS = "GET_POSTS";

// export const getPosts = () => {
//     return (dispatch) => {
//         return axios 
//         .get(`${process.env.REACT_APP_API_URL}api/post`)
//         .then((res) => {
//             dispatch( {type: GET_POSTS, payload: res.data})
//         })
//     }
// }


// axios({
//     method: 'get',
//     url: `${process.env.REACT_APP_API_URL}api/post`,
//     withCredentials: true,
// })
//     .then((res) => {
//         console.log(res.data);
//     })
//     .catch((err) => {
//         console.log(err);
//     });