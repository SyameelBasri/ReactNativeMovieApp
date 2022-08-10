import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Context as APIContext} from '../context/MovieContext';
import { Context as ServerContext } from '../context/FavMovieContext';
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LikeButton from '../components/LikeButton';

const MovieDetailsScreen = ({navigation}) => {
	const {state, getMovieDetails} = useContext(APIContext);
	const {serverState, addFavMovie, deleteFavMovie, getFavMovies} = useContext(ServerContext);
	const [movieLiked, setMovieLiked] = useState(navigation.getParam('isLiked'));

	const MIN_HEIGHT = 55;

	useEffect(() => {
		getMovieDetails(navigation.getParam('id'));
		
	}, []);

	const onLiked = (liked) => {
		if(liked){
			addFavMovie(state);
			setMovieLiked(liked);
			getFavMovies();
		} else {
			deleteFavMovie(state.imdbID);
			setMovieLiked(liked);
		} 
	}
	

	return(
		<ImageHeaderScrollView
		maxHeight={500}
		minHeight={MIN_HEIGHT}
		renderHeader={() => (<Image source={{uri: state.Poster}}style={styles.image} />)}
		>
		<View style={styles.content}>
			<Text style={styles.title}>{state.Title} ({state.Year})</Text>
			<LikeButton onLiked={onLiked} isLiked={movieLiked}/>
			<View style={styles.infoContainer}>
				<View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
					<Text style={{fontSize: 18}}>Rated: {state.Rated}</Text>
					<Text style={{fontSize: 18}}>Runtime: {state.Runtime}</Text>
				</View>
				<Text style={{alignSelf: 'center', marginBottom: 10, fontSize: 18}}>Genre: {state.Genre}</Text>
			</View>
			
			{movieLiked ? 
			<View style={{width: '90%'}}>
				<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
					<Text style={styles.heading}>Note: </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
						<MaterialCommunityIcons name="pencil" size={20} />
					</TouchableOpacity>
				</View>
				<View style={styles.noteContainer}>
					<Text style={styles.plotNoteText}>{navigation.getParam('note')}</Text>
				</View>
			</View>
			: null}
			
			<Text style={styles.heading}>Plot</Text>
			<View style={styles.plotContainer}>
				<Text style={styles.plotNoteText}>{state.Plot}</Text>
			</View>
			
		</View>
		</ImageHeaderScrollView>
	);
};

const styles = StyleSheet.create({
	image: {
		height: 600,
		width: Dimensions.get('window').width,
		alignSelf: 'center',
		resizeMode: 'cover',
	},
	content: {
		flex: 1,
		height: 650 ,
		alignItems: 'center',
		borderRadius: 50
	},
	title: {
		fontWeight:'bold',
		fontSize: 24,
		marginVertical: 10,
		textAlign: 'center'
	},
	heading: {
		fontWeight:'bold',
		fontSize: 22,
		alignSelf: 'center',
	},
	infoContainer: {
		width: '90%',
		justifyContent: 'center',
		marginTop: 5,
		marginBottom: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
	plotContainer: {
		borderTopWidth: 0.5,
		width: '90%',
		paddingTop: 10,
		marginTop: 5
	},
	noteContainer: {
		borderWidth: 0.5,
		borderRadius: 5,
		paddingVertical: 10,
		marginBottom: 20
	},
	plotNoteText:{
		fontSize: 16,
		letterSpacing: 0.8,
		textAlign: 'justify',
		paddingHorizontal: 8
	}
});

export default MovieDetailsScreen;
