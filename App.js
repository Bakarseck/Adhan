import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Clock from './components/Clock';
import { Audio } from 'expo-av';

const adhans = [
  { label: "Adhan 1", file: require('./assets/adhan/a1.mp3') },
  { label: "Adhan 2", file: require('./assets/adhan/a2.mp3') },
];

const App = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);

  const [sound, setSound] = useState();

  async function playSound(adhanFile) {
    console.log('Loading Sound');
    if (currentSound) {
      await currentSound.unloadAsync();
      setCurrentSound(null);
    }

    const { sound } = await Audio.Sound.createAsync(adhanFile);
    setCurrentSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/12.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>SOUBH: 06h 28</Text>
          <Clock size={200} />
          <View style={styles.cadre}>
            <TouchableOpacity style={styles.buttonAdhan} onPress={(e) => {  setShowDropdown(!showDropdown); console.log("bouton clické change audio") }}>
              <Text style={styles.buttonText} >Changer l'Adhan</Text>

              {showDropdown && (
                <View style={styles.dropdown}>
                  {adhans.map((adhan, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => {
                        playSound(adhan.file);
                        setShowDropdown(false);
                      }}
                    >
                      <Text style={styles.buttonText}>{adhan.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonAdhan} >
              <Text style={styles.buttonText} >Changer Background</Text>
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
    fontSize: 12.5,
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
