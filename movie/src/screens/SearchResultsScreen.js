import React, {useContext, useEffect, useState, useRef} from 'react';
import { View, Text, StyleSheet, FlatList, Button, ScrollView, TouchableOpacity, Image} from 'react-native';
import Filter from '../components/Filter';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Context } from '../context/MovieContext';

const SearchResultsScreen = ({navigation}) => {
	const flatListRef = useRef()
	const {state, searchMovies} = useContext(Context);
	const [page, setPage] = useState(1);

	const [type, setType] = useState('');
	const [year, setYear] = useState('');

	const totalPages = Math.ceil(state.totalResults/10);
	const favMovies = navigation.getParam('favMovies');

	useEffect(() => {
		searchMovies(navigation.getParam('searchTerm'), page);
		
		const listener = navigation.addListener('didFocus', ()=>{
			setPage(1);
			searchMovies(navigation.getParam('searchTerm'), page);
		});

		return () => {
			listener.remove();
		}
	}, []);

	const nextPage = (step) =>{
		const nextNum = page + step;
		searchMovies(navigation.getParam('searchTerm'), nextNum);
		setPage(nextNum);
		flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
	}

	const showMovieDetails = (imdbID) => {
		for (const movie of favMovies) {
			if(movie.imdbID === imdbID){
				navigation.navigate('Movie', {id: movie.imdbID, isLiked: true, note: movie.note});
			}
		}
		navigation.navigate('Movie', {id: imdbID});
	}

	return(
		<>
			<Filter type={type} year={year} setType={setType} setYear={setYear} searchTerm={navigation.getParam('searchTerm')}/>
			<FlatList 
				ref={flatListRef}
				data={state.Search}
				keyExtractor={(movie) => movie.imdbID}
				renderItem={({item}) => {
					return (
						<TouchableOpacity onPress={() => showMovieDetails(item.imdbID)}>
							<View style={styles.container}>
								<Image style={styles.imageStyle} source={{uri: item.Poster}}/>
								<View style={{flex: 1}}>
									<Text style={styles.nameStyle}>{item.Title}</Text>
									<Text style={{fontSize: 16}}>Year: {item.Year}</Text>
									<Text style={{fontSize: 16}}>Type: {item.Type}</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
			<View style={styles.pages}>
				<TouchableOpacity onPress={() => page > 1 ? nextPage(-1): null}>
					<MaterialCommunityIcons name="arrow-left" size={40} color={'white'}/>
				</TouchableOpacity>
				<Text style={{fontSize: 16, color: 'white'}}>{page} of {totalPages}</Text>
				<TouchableOpacity onPress={() => page < totalPages ? nextPage(1): null}>
					<MaterialCommunityIcons name="arrow-right" size={40} color={'white'}/>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	pages:{
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: '#294C60',
		height: '6%',
	},
	container:{
		paddingHorizontal: 15,
		flexDirection: 'row',
		borderBottomWidth: 0.5,
		paddingVertical: 10,
	},
	imageStyle: {
		width: 120,
		height: 180,
		borderRadius: 10,
		marginBottom: 5,
		marginEnd: 10
	},
	nameStyle: {
		fontWeight:'bold',
		fontSize: 18,
	},
});

export default SearchResultsScreen;
