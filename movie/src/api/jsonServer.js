import axios from "axios";

export default axios.create({
	baseURL: '<ngrok forwarding url here>',
	responseType: 'json'
});