import createDataContext from "./createDataContext";
import omdb from '../api/omdb';
import jsonServer from "../api/jsonServer";


const movieReducer = (state, action) => {
	switch(action.type){
		case 'get_favmovies':
			return action.payload;
		case 'movie_details':
			return action.payload;
		case 'search_movies':
			return action.payload;
		default:
			return state;
	}
}

const searchMovies = dispatch => {
	return async (searchTerm, page, type="", y="") => {
		try{
			const response = await omdb.get('/?apikey=f9073c74&', {
				params:{
					s: searchTerm,
					type,
					y,
					page
				}
			});
			const searchResults = response.data;

			dispatch({type: 'search_movies', payload: searchResults})
		} catch (err) {
			console.log(err);
		}
	}
}

const getMovieDetails = dispatch => {
	return async(imdbID) => {
		try{
			const response = await omdb.get('/?apikey=f9073c74&', {
				params:{
					i: imdbID,
					plot: 'full' 
				}
			});
			const movieDetails = response.data;

			dispatch({type: 'movie_details', payload: movieDetails});
		} catch (err) {
			console.log(err);
		}
	}
}



export const {Context, Provider} = createDataContext(
	movieReducer,
	{
		searchMovies, 
		getMovieDetails, 
	},
	[]
);