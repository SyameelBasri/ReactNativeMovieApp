import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import { Context } from '../context/FavMovieContext';

const HomeScreen = ({navigation}) => {
	const [term, setTerm] = useState('');
	const {state, getFavMovies} = useContext(Context);

	useEffect(() => {

		const listener = navigation.addListener('didFocus', ()=>{
			getFavMovies();
		});

		return () => {
			listener.remove();
		}
	}, []);

	const searchMovie = () => {
		if(term !== ''){
			navigation.navigate('Results', {searchTerm: term, favMovies: state})
		}
	}

	return(
		<>
			<SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => searchMovie()}/>
			<Text style={styles.heading}>Favorite Movies</Text>
			{state.length !== 0 ?
				<View style={styles.listContainer}>
					<FlatList
						data={state}
						showsVerticalScrollIndicator={false}
						renderItem={({item}) => (
							<TouchableOpacity onPress={() => navigation.navigate('Movie', {id: item.imdbID, isLiked: true, note: item.note})}>
								<View style={{marginBottom: 10,}}>
									<Image style={styles.imageStyle} source={{uri: item.poster}} />
									<Text style={styles.title}>{item.title}</Text>
								</View>
							</TouchableOpacity>
						
						)}
						//Setting the number of column
						numColumns={2}
						keyExtractor={(item, index) => index}
					/>
				</View>
				
			: 
				<View style={styles.homeScreen}>
					<Text>Search your favorite movies.</Text>
				</View>
			}
			
		</>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 15,
		marginTop: 10
	},
	imageStyle: {
		width: 180,
		height: 270,
		borderRadius: 10,
		marginBottom: 5,
		marginHorizontal: 10
		
	},
	title:{
		fontSize: 18,
		textAlign: 'center',
	},
	heading: {
		fontSize: 24,
		textAlign: 'center',
		fontWeight: 'bold'
	}
});

export default HomeScreen;
