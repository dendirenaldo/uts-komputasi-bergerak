import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Data from './Data';

export default function App() {
  const width = Dimensions.get('window').width;
  return (
    <React.Fragment>
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={[styles.container, { width: width, height: (width * 3) / 2 }]}>
          <Image style={[styles.gambarBG, { width: width, height: (width * 3) / 2 }]} source={Data[0].gambar} />
          <View style={styles.header}>
            <Text style={styles.headerTeks}>{Data[0].institusi}</Text>
          </View>
          <View style={styles.deskripsi}>
            <View style={styles.lokasi}>
              <Text style={[styles.lokasiTeks, { maxWidth: width * 0.7 }]}>{Data[0].nama}</Text>
              <View style={styles.rating}>
                {[1, 2, 3, 4, 5].map((item) => (
                  <>
                    <AntDesign name={item <= Data[0].rating ? 'heart' : 'hearto'} color="white" />
                  </>
                ))}
              </View>
            </View>
            <View style={styles.separator}></View>
            <Text style={styles.keterangan}>{Data[0].deskripsi}</Text>
            <TouchableOpacity style={styles.tombol}>
              <Text style={styles.tombolTeks}>LEBIH BANYAK&gt;</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Fakultas Lainnya</Text>
          {Data.map((item, index) => {
            if (index !== 0) {
              return (
                <View activeOpacity={0.7} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 13, overFlow: 'hidden', width: ((width - 20) * 0.8) - 10 }}>
                  <>
                    <Image style={{ width: (width - 20) * 0.20, height: (width - 20) * 0.20, borderRadius: 12, marginRight: 10 }} source={item.gambar} />
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: 'bold' }}>{item.nama}</Text>
                      <Text numberOfLines={2}>{item.institusi}</Text>
                    </View>
                  </>
                </View>
              )
            }
          })}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
    overflow: 'hidden'
  },
  deskripsi: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 15
  },
  lokasi: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lokasiTeks: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  keterangan: {
    color: 'white',
    marginBottom: 10
  },
  separator: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    marginTop: 8,
  },
  header: {
    position: 'absolute',
    top: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    width: '100%'
  },
  headerTeks: {
    color: 'white',
    letterSpacing: 5,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 500
  },
  gambarBG: {
    width: '100%',
    paddingBottom: 10,
    position: 'relative'
  },
  tombol: {
    marginBottom: 10,
    marginLeft: 200,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'flex-end',
    borderRadius: 100
  },
  tombolTeks: {
    color: '#fff'
  },
  rating: {
    flexDirection: 'row',
    gap: 4,
  }
});

