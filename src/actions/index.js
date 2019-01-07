import _ from 'lodash';
import jsonPlaceholder from "../apis/jsonplaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // instead of we can use lodash _.chain(getstate().props).map('userId').uniq().forEach(id=>dispatch(fetchUser(id))).value();
    const userIds = _.uniq(_.map(getState().posts,'userId'));
    userIds.forEach(x=> dispatch(fetchUser(x)));
    // Solution for await all
    // await Promise.all(userIds.map(id=>id(dispatch(fetchUser(id))))).then(function(response){console.log(response)});
};

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({type:'FETCH_POSTS', payload: response.data});
};

export const fetchUser =  (id) => async dispatch => { 
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type:'FETCH_USER', payload:response.data});
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);  

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

