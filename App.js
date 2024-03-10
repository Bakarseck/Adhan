import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Clock from './components/Clock';
// import Sound from 'react-native-sound';

// Sound.setCategory('Playback');

const App = () => {

  const [currentAdhan, setCurrentAdhan] = useState(null);

  // const playSound = () => {
  //   const sound = new Sound(require('./assets/adhan/a1.mp3'), (error) => {
  //     if (error) {
  //       console.log('Erreur lors du chargement du son', error);
  //       return;
  //     }
  //     sound.play(() => {
  //       sound.release();
  //     });
  //   });
  // };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/12.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>SOUBH</Text>
          <Clock size={300} />
          <View style={styles.cadre}>
            <TouchableOpacity style={styles.buttonAdhan} onPress={(e) => { console.log("bouton clické change audio") }}>
              <Text style={styles.buttonText} >Changer l'Adhan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonAdhan} >
              <Text style={styles.buttonText} >Ecouter Adhan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    textAlign: 'center',
    top: 70,
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  buttonAdhan: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 10,
    borderRadius: 10,
  },
  cadre: {
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    bottom: 50,
    padding: 10,
    borderRadius: 10,
  }
});

export default App;
