import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AppContext from '../context/AppProvider';
import Carousel, { Pagination } from 'react-native-x-carousel';
import Icon from '@expo/vector-icons/FontAwesome5';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Home = ({ route, navigation }) => {
    const bottomSheetRef = useRef(null);
    const params = route.params;
    const routeParameter = params?.routeParameter ?? null;
    const snapPoints = useMemo(() => ['40%', '40%'], []);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const { routeParam, data, setData } = useContext(AppContext);
    const dataFiltered = data.filter((item) => item.index === (routeParameter ?? routeParam))[0].data ?? [];
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);
    const [currentRating, setCurrentRating] = useState(0);
    const [currentRatingData, setCurrentRatingData] = useState(null);
    const handleOpenRating = (nama, institusi) => {
        const ratingData = dataFiltered.filter((item) => item.nama === nama && item.institusi === institusi)[0];
        setCurrentRating(ratingData?.rating.filter((item) => item.isMe === true)[0]?.value ?? 0)
        setCurrentRatingData(ratingData);
        bottomSheetRef.current?.present();
    }
    const handleSubmitRating = () => {
        const newData = data.map((item) => {
            if (item.index === (routeParameter ?? routeParam)) {
                item.data = item.data.map((val) => {
                    if (val.nama === currentRatingData.nama && val.institusi === currentRatingData.institusi) {
                        if (val.rating.filter((item) => item.isMe === true).length > 0) {
                            val.rating = val.rating.map((value) => {
                                if (value.isMe === true) {
                                    return {
                                        createdAt: value.createdAt,
                                        isMe: true,
                                        value: currentRating
                                    }
                                } else {
                                    return value;
                                }
                            })
                            return val;
                        } else {
                            val.rating.push({
                                createdAt: new Date().toISOString(),
                                isMe: true,
                                value: currentRating
                            })
                            return val;
                        }
                    } else {
                        return val;
                    }
                })
                return item;
            } else {
                return item;
            }
        })
        setData(newData);
        bottomSheetRef?.current?.close();
    }
    const Card = ({ index, gambar, nama, institusi }) => {
        return (
            <React.Fragment>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
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
    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );
    return (
        <ScrollView style={styles.scroll}>
            <View style={[styles.container, { height: (width * 4) / 3, backgroundColor: 'white' }]}>
                <Carousel data={dataFiltered} pagination={Pagination} renderItem={(item, key) => {
                    return (
                        <View key={key} style={{ flex: 1, width: width, height: (width * 4) / 3 }}>
                            <Image style={[styles.image, { width: (width * 4) / 3 }]} source={item.gambar} />
                            <View style={styles.containerDescription}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ width: width * 0.76 }}>
                                        <Text style={styles.title}>{item.nama}</Text>
                                        <Text style={styles.institutionName}>
                                            <Icon name='map-marker-alt' />  {item.institusi}
                                        </Text>
                                    </View>
                                    <TouchableOpacity activeOpacity={0.75} onPress={() => handleOpenRating(item.nama, item.institusi)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 10, borderRadius: 8 }}>
                                        <Icon name='star' color='yellow' solid />
                                        <Text style={{ marginLeft: 5, color: 'white' }}>{((item?.rating.reduce((partialSum, a) => partialSum + a.value, 0) / item.rating?.length) ?? 1).toFixed(1)}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.description} numberOfLines={2}>{item.deskripsi}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('informasi', { index: routeParam, data: item })} style={{ backgroundColor: 'blue', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8 }}><Text style={{ color: 'white' }}><Icon name='angle-right' /> Lihat Detail</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }} />
            </View>
            <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>Fakultas Lainnya</Text>
                {data.map((item) => {
                    if (item.index !== (routeParameter ?? routeParam))
                        return (<Card key={item.index} nama={item.nama} gambar={item.data[0].gambar ?? ''} institusi={item.data.map((items) => items.institusi)} index={item.index} />);
                })}
            </View>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={true}
                    backdropComponent={renderBackdrop}
                >
                    <View style={styles.contentContainer}>
                        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Beri Rating</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                            {[1, 2, 3, 4, 5].map((item) => {
                                const prop = { ...(currentRating >= item && { solid: true }) }
                                return (
                                    <TouchableWithoutFeedback onPress={() => setCurrentRating(item)} key={item}><Icon name='star' size={25} style={{ marginHorizontal: 3 }} color='#FFDF00' {...prop}></Icon></TouchableWithoutFeedback>
                                )
                            })}
                        </View>
                        <Text style={{ textAlign: 'center', fontSize: 15, color: 'rgba(0, 0, 0, 0.85)', marginTop: 15 }}>{currentRatingData !== null && currentRatingData.institusi !== undefined ? currentRatingData.institusi : ''}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 13.5, color: 'rgba(0, 0, 0, 0.6)', marginTop: 5 }}>{currentRatingData !== null && currentRatingData.institusi !== undefined ? currentRatingData.nama : ''}</Text>
                        <Text style={{ textAlign: 'center', fontSize: 12.2, color: 'rgba(0, 0, 0, 0.5)', marginVertical: 15, marginHorizontal: 25 }}>Rating yang akan Anda berikan bisa terhapus dan kembali seperti semula apabila aplikasi direstart</Text>
                        <TouchableOpacity onPress={handleSubmitRating} activeOpacity={0.8} style={{ marginHorizontal: 20, marginVertical: 10, backgroundColor: 'blue', paddingVertical: 12, borderRadius: 12 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Simpan</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>
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