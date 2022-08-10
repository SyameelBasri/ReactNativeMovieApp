import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import MovieDetailsScreen from './src/screens/MovieDetails';
import SearchResultsScreen from './src/screens/SearchResultsScreen';
import { Provider as MovieProvider} from './src/context/MovieContext';
import { Provider as FavMovieProvider } from './src/context/FavMovieContext';
import EditNoteScreen from './src/screens/EditMovieNote';

const navigator = createStackNavigator({
  Home: HomeScreen,
  Movie: MovieDetailsScreen,
  Results: SearchResultsScreen,
  Edit: EditNoteScreen
},{
  initialRouteName: 'Home',
  defaultNavigationOptions:{
    title:'My Movie List'
  }
});

const App = createAppContainer(navigator);

export default () => {
  return <MovieProvider>
    <FavMovieProvider>
      <App/>
    </FavMovieProvider>
  </MovieProvider>
  
};