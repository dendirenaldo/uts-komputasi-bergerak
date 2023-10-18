import Icon from '@expo/vector-icons/FontAwesome5';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-x-carousel';


export default function App() {
  const data = [{
    gambar: require('./assets/1.jpg'),
    nama: 'Fakultas Teknik',
    institusi: 'Universitas Sriwijaya',
    deskripsi: 'Fakultas Teknik Universitas Sriwijaya merupakan Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem exercitationem eligendi iusto rerum. Placeat similique accusamus accusantium officiis dolorum, est officia incidunt, aliquid vitae omnis eos, dolor eligendi delectus dignissimos.'
  }, {
    gambar: require('./assets/2.jpg'),
    nama: 'Fakultas Teknik',
    institusi: 'Universitas Indonesia',
    deskripsi: 'Fakultas Teknik Universitas Indonesia merupakan Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem exercitationem eligendi iusto rerum. Placeat similique accusamus accusantium officiis dolorum, est officia incidunt, aliquid vitae omnis eos, dolor eligendi delectus dignissimos.'
  }, {
    gambar: require('./assets/3.jpg'),
    nama: 'Fakultas Teknik',
    institusi: 'Universitas Riau',
    deskripsi: 'Fakultas Teknik Universitas Riau merupakan Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem exercitationem eligendi iusto rerum. Placeat similique accusamus accusantium officiis dolorum, est officia incidunt, aliquid vitae omnis eos, dolor eligendi delectus dignissimos.'
  }, {
    gambar: require('./assets/4.png'),
    nama: 'Fakultas Teknik',
    institusi: 'Universitas Gadjah Mada',
    deskripsi: 'Fakultas Teknik Universitas Riau merupakan Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem exercitationem eligendi iusto rerum. Placeat similique accusamus accusantium officiis dolorum, est officia incidunt, aliquid vitae omnis eos, dolor eligendi delectus dignissimos.'
  }, {
    gambar: require('./assets/5.jpg'),
    nama: 'Sekolah Tinggi Elektro dan Informatika',
    institusi: 'Institut Teknologi Bandung',
    deskripsi: 'Sekolah Tinggi Elektro dan Informatika Institut Teknologi Bandung merupakan Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem exercitationem eligendi iusto rerum. Placeat similique accusamus accusantium officiis dolorum, est officia incidunt, aliquid vitae omnis eos, dolor eligendi delectus dignissimos.'
  }]
  const width = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <Carousel data={data} pagination={Pagination} renderItem={(item, key) => {
        return (
          <View key={key} style={{ width: width }}>
            <Image style={styles.image} source={item.gambar} />
            <View style={styles.containerDescription}>
              <Text style={styles.title}>{item.nama}</Text>
              <Text style={styles.institutionName}>
                <Icon name='map-marker-alt' />  {item.institusi}
              </Text>
              <Text style={styles.description}>{item.deskripsi}</Text>
            </View>
          </View>
        )
      }} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  containerDescription: {
    bottom: 30,
    position: 'absolute',
    paddingHorizontal: 10
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 5
  },
  institutionName: {
    color: '#2AAF74',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 5
  },
  description: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '400',
    fontSize: 12.5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 8
  }
});
