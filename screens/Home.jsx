import React, { useContext } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import AppContext from '../context/AppProvider';
import Data from '../Data';
import Carousel, { Pagination } from 'react-native-x-carousel';
import Icon from '@expo/vector-icons/FontAwesome5';

const Home = ({ route, navigation }) => {
    const params = route.params;
    const routeParameter = params?.routeParameter ?? null;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const { routeParam } = useContext(AppContext);
    const dataFiltered = Data.filter((item) => item.index === (routeParameter ?? routeParam))[0].data ?? [];
    const Card = ({ index, gambar, nama, institusi }) => {
        return (
            <React.Fragment>
                <TouchableOpacity onPress={() => {
                    navigation.push('home', { routeParameter: index })
                }} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 13, overFlow: 'hidden', width: ((width - 20) * 0.8) - 10 }}>
                    <>
                        <Image style={{ width: (width - 20) * 0.20, height: (width - 20) * 0.20, borderRadius: 12, marginRight: 10 }} source={gambar} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: 'bold' }}>{nama}</Text>
                            <Text numberOfLines={2}>{institusi.join(', ')}</Text>
                        </View>
                    </>
                </TouchableOpacity>
            </React.Fragment>
        )
    }
    return (
        <ScrollView style={styles.scroll}>
            <View style={[styles.container, { height: height, backgroundColor: 'white' }]}>
                <Carousel data={dataFiltered} pagination={Pagination} renderItem={(item, key) => {
                    return (
                        <View key={key} style={{ flex: 1, width: width, height: height }}>
                            <Image style={styles.image} source={item.gambar} />
                            <View style={styles.containerDescription}>
                                <Text style={styles.title}>{item.nama}</Text>
                                <Text style={styles.institutionName}>
                                    <Icon name='map-marker-alt' />  {item.institusi}
                                </Text>
                                <Text style={styles.description} numberOfLines={2}>{item.deskripsi}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text onPress={() => navigation.navigate('informasi', { index: routeParam, data: item })} style={{ backgroundColor: 'blue', paddingHorizontal: 10, paddingVertical: 7, color: 'white', borderRadius: 10 }}><Icon name='angle-right' /> Lihat Detail</Text>
                                </View>
                            </View>
                        </View>
                    )
                }} />
            </View>
            <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Fakultas Lainnya</Text>
                {Data.map((item) => {
                    if (item.index !== (routeParameter ?? routeParam))
                        return (<Card key={item.index} nama={item.nama} gambar={item.data[0].gambar ?? ''} institusi={item.data.map((items) => items.institusi)} index={item.index} />);
                })}
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        backgroundColor: 'white',
        width: '100%'
    },
    container: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
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
        textShadowRadius: 5,
        marginBottom: 3,
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
        textShadowRadius: 8,
        marginBottom: 5,
    }
});

export default Home