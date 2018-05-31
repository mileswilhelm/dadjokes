import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { AppLoading, Font } from 'expo';
import axios from 'axios';

const API_URL = 'https://icanhazdadjoke.com/';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      isReady: false,
      backgroundColor: '#fff',
      textColor: '#000',
      currentJoke: 'Tap the screen to get new jokes!'
    };

    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount() {
    (async() => {
      await Font.loadAsync({
        'SourceCodePro': require('./assets/fonts/SourceCodePro-Black.ttf')
      });
      this.setState({isReady: true});
    })();
  }

  handlePress() {
    axios.get(API_URL, {
      headers: {
        Accept: "application/json"
      }
    })
      .catch(error => console.log('Error! Please try again later!', error))
      .then((res) => {
        const jokeResponse = res.data.joke;
        // alert(jokeResponse);
        this.setState({currentJoke: jokeResponse});
      })

    const colors = [
      {'name':'red', 'background':'#FFCDD2', 'color': '#C62828'},
      {'name':'blue', 'background':'#BBDEFB', 'color': '#1565C0'},
      {'name':'pink', 'background':'#F8BBD0', 'color': '#AD1457'},
      {'name':'purple', 'background':'#E1BEE7', 'color': '#6A1B9A'},
      {'name':'cyan', 'background':'#E0F7FA', 'color': '#00838F'},
      {'name':'teal', 'background':'#E0F2F1', 'color': '#00695C'},
      {'name':'green', 'background':'#E8F5E9', 'color': '#2E7D32'},
      {'name':'yellow', 'background':'#FFFDE7', 'color': '#F9A825'},
      {'name':'orange', 'background':'#FFF3E0', 'color': '#EF6C00'},
    ];  

    const randNumber = Math.floor(Math.random()*colors.length);
    
    this.setState({
      backgroundColor: colors[randNumber].background,
      textColor: colors[randNumber].color
    });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    return (
      <TouchableHighlight onPress={this.handlePress} style={styles.container}>
        <View 
          style={[
            styles.container, 
            {backgroundColor: this.state.backgroundColor}, 
            {borderColor: this.state.textColor}
          ]}
        >
          <Text style={[styles.font, {color: this.state.textColor}]}>{this.state.currentJoke}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderStyle: 'solid',
  },
  font: {
    fontFamily: 'SourceCodePro',
    fontSize: 24,
    textAlign: 'center',
    padding: 20
  }
});
