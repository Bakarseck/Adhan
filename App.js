import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Clock from './components/Clock';
import { Audio } from 'expo-av';

const adhans = [
  { label: "Adhan 1", file: require('./assets/adhan/a1.mp3') },
  { label: "Adhan 2", file: require('./assets/adhan/a2.mp3') },
  { label: "Adhan 3", file: require('./assets/adhan/a3.mp3') },
  { label: "Adhan 4", file: require('./assets/adhan/a4.mp3') },
  { label: "Adhan 5", file: require('./assets/adhan/a5.mp3') },
];

const backgrounds = [
  require('./assets/background/1.jpg'),
  require('./assets/background/2.jpg'),
  require('./assets/background/3.jpg'),
  require('./assets/background/4.jpg'),
  require('./assets/background/5.jpg'),
  require('./assets/background/6.jpg'),
  require('./assets/background/7.jpg'),
  require('./assets/background/8.jpg'),
  require('./assets/background/9.jpg'),
  require('./assets/background/10.jpg'),
  require('./assets/background/11.jpg'),
  require('./assets/background/12.jpg'),
  require('./assets/background/13.jpg'),
  require('./assets/background/14.jpg'),
  require('./assets/background/15.jpg'),
  require('./assets/background/16.jpg'),
  require('./assets/background/17.jpg'),
  require('./assets/background/18.jpg'),
  require('./assets/background/19.jpg'),
  require('./assets/background/20.jpg'),
  require('./assets/background/21.jpg'),
  require('./assets/background/22.jpg'),
  require('./assets/background/23.jpg'),
  require('./assets/background/24.jpg'),
  require('./assets/background/25.jpg'),
  require('./assets/background/26.jpg'),
  require('./assets/background/27.jpg'),
  require('./assets/background/28.jpg'),
  require('./assets/background/29.jpg'),
  require('./assets/background/30.jpg'),
  require('./assets/background/31.jpg'),
  require('./assets/background/32.jpg'),
  require('./assets/background/33.jpg'),
  require('./assets/background/34.jpg'),
  require('./assets/background/35.jpg'),
  require('./assets/background/36.jpg'),
  require('./assets/background/37.jpg'),
  require('./assets/background/38.jpg'),
  require('./assets/background/39.jpg'),
  require('./assets/background/40.jpg'),
  require('./assets/background/41.jpg'),
  require('./assets/background/42.jpg'),
  require('./assets/background/43.jpg'),
  require('./assets/background/44.jpg'),
  require('./assets/background/45.jpg'),
  require('./assets/background/46.jpg'),
  require('./assets/background/47.jpg'),
  require('./assets/background/48.jpg'),
  require('./assets/background/49.jpg'),
  require('./assets/background/50.jpg'),
];


const heuresDePrieres = {
  Fajr: "06:20",
  Dhuhr: "14:15",
  Asr: "17:00",
  Maghrib: "19:27",
  Isha: "20:27"
};

const App = () => {

  const [backgroundIndex, setBackgroundIndex] = useState(11);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [prochainePriere, setProchainePriere] = useState({ nom: '', heure: '' });
  const [play, setPlay] = useState(false);
  const [sound, setSound] = useState();

  const changerBackground = () => {
    const nextIndex = Math.floor(Math.random() * backgrounds.length);
    setBackgroundIndex(nextIndex);
  };


  // Verify time
  useEffect(() => {
    const verifierHeureDePriere = () => {
      const maintenant = new Date();
      const heures = maintenant.getHours();
      const minutes = maintenant.getMinutes();

      const heureActuelle = `${heures}:${minutes < 10 ? '0' : ''}${minutes}`;

      Object.entries(heuresDePrieres).forEach(async ([nom, heure]) => {
        if (heure === heureActuelle) {
          console.log(`Il est temps pour la prière de ${nom}`);
          playSound(adhans[1].file);
        }
      });
    };

    const intervalId = setInterval(verifierHeureDePriere, 60000);

    return () => clearInterval(intervalId);
  }, []);

  async function playSound(adhanFile) {
    setPlay(true);
    console.log('Loading Sound');
    if (currentSound) {
      await currentSound.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(adhanFile);
    setSound(sound);
    setCurrentSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function stopSound() {
    if (currentSound) {
      console.log('Stopping Sound');
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
    setPlay(false);
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  useEffect(() => {
    const trouverProchainePriere = () => {
      const maintenant = new Date();
      const heures = maintenant.getHours();
      const minutes = maintenant.getMinutes();
      const heureActuelle = heures * 60 + minutes;

      const prochainesPrieres = Object.entries(heuresDePrieres).map(([nom, heure]) => {
        const [h, m] = heure.split(':').map(Number);
        return { nom, heure, diff: h * 60 + m - heureActuelle };
      }).filter(priere => priere.diff > 0)
        .sort((a, b) => a.diff - b.diff);

      if (prochainesPrieres.length > 0) {
        const prochaine = prochainesPrieres[0];
        setProchainePriere({ nom: prochaine.nom, heure: prochaine.heure });
      }
    };

    trouverProchainePriere();
    const intervalId = setInterval(trouverProchainePriere, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgrounds[backgroundIndex]}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{prochainePriere.nom}: {prochainePriere.heure}</Text>
          <Clock size={250} />
          <View style={styles.cadre}>
            <TouchableOpacity

              onPress={() => setShowDropdown(true)}
            >
              <Text style={styles.priereText}>Ecouter l'Adhan</Text>
            </TouchableOpacity>

            <Text style={styles.priereText}>Prochaine Prière: {prochainePriere.nom} à {prochainePriere.heure}</Text>

            {play && (
              <TouchableOpacity onPress={stopSound}>
                <Text style={styles.priereText}>Stop Adhan</Text>
              </TouchableOpacity>
            )}

            <Modal
              visible={showDropdown}
              transparent={true}
              onRequestClose={() => setShowDropdown(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.dropdown}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowDropdown(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>

                  {adhans.map((adhan, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => {
                        playSound(adhan.file);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{adhan.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>

            <TouchableOpacity onPress={changerBackground}>
              <Text style={styles.priereText} >Changer le Background</Text>
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
    fontSize: 18,
  },
  buttonAdhan: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cadre: {
    gap: 10,
    position: 'absolute',
    bottom: 50,
    padding: 10,
    borderRadius: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownItemText: {
    textAlign: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end'
  },
  closeButtonText: {
    color: 'black',
    fontSize: 24,
  },
  stopButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  priereText: {
    fontSize: 20, // Taille de la police pour une bonne lisibilité
    color: '#ffffff', // Couleur blanche pour le texte, à ajuster selon votre fond
    fontWeight: 'bold', // Rend le texte plus épais pour attirer l'attention
    textAlign: 'center', // Centre le texte horizontalement dans son conteneur
    marginVertical: 10, // Ajoute un peu d'espace au-dessus et en dessous du texte
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent noir pour une meilleure lisibilité sur des fonds variés
    paddingHorizontal: 20, // Espace horizontal à l'intérieur du conteneur de texte
    paddingVertical: 5, // Espace vertical à l'intérieur du conteneur de texte
    borderRadius: 10, // Bordures arrondies pour un look plus doux
    overflow: 'hidden', // Assure que le fond arrondi ne dépasse pas
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.25, // Opacité de l'ombre
    shadowRadius: 3.84, // Rayon de l'ombre
    elevation: 5, // Elevation pour Android pour ajouter un effet d'ombre
  }
});

export default App;
