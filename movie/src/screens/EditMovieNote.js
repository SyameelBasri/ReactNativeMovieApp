import React, {useContext} from "react";
import {StyleSheet} from 'react-native';
import { Context } from "../context/FavMovieContext";
import NoteForm from "../components/NoteForm";

const EditNoteScreen = ({navigation}) => {
	const imdbID = navigation.getParam('id');
	const {state, editMovieNote} = useContext(Context);

	const movie = state.find((movie) => movie.imdbID === imdbID);

	const onEditNote = (note) =>{
		editMovieNote(movie.id, movie.imdbID, movie.title, movie.poster, note, () => navigation.navigate('Movie', {id: imdbID, isLiked: true, note: note}));
	}

	return (
		<NoteForm 
			initialNote={movie.note}
			onSubmit={(note) => onEditNote(note)}/>
	);
}

const styles = StyleSheet.create({});

export default EditNoteScreen;