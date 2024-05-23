import axios from './axios';

const getPosts = () => {
	return axios.get(`/articles/feed?limit=10&offset=0`);
};

const PostService = {
	getPosts,
};

export default PostService;
