import jsonServer from "../api/jsonServer";
import createDataContext from "./createDataContext";

const favMovieReducer = (state, action) => {
	switch(action.type){
		case 'get_favmovies':
			return action.payload;
		case 'edit_movienote':
			return state.map((movie) => {
				if(movie.id === action.payload.id){
					return action.payload;
				} else {
					return movie;
				}
			});
		default:
			return state;
	}
}

const getFavMovies = dispatch => {
	return async () => {
		try{
			const response = await jsonServer.get('/favorite_movies');
			const favMovies = response.data;
			dispatch({type: 'get_favmovies', payload: favMovies.reverse()});
		} catch (err) {
			console.log(err);
		}
	}
}

const addFavMovie = () => {
	return async(movie, note="") => {
		await jsonServer.post('/favorite_movies', {id: movie.imdbID, imdbID: movie.imdbID, title: movie.Title, poster: movie.Poster, note});
		
	}
}

const deleteFavMovie = () => {
	return async (imdbID) => {
		await jsonServer.delete(`/favorite_movies/${imdbID}`);
	}
}

const editMovieNote = dispatch => {
	return async (id, imdbID, title, poster, note, callback) => {
		await jsonServer.put(`/favorite_movies/${id}`, {imdbID, title, poster, note});
		dispatch({type: 'edit_movienote', payload: {id, imdbID, title, poster, note}});
		if(callback){
			callback();
		}
	}
}

export const {Context, Provider} = createDataContext(
	favMovieReducer,
	{
		getFavMovies, 
		addFavMovie,
		deleteFavMovie,
		editMovieNote
	},
	[]
);