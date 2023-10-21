import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5';

const Informasi = ({ route, navigation }) => {
    const { index, data } = route.params;
    const width = Dimensions.get('window').width;
    return (
        <ScrollView style={styles.scroll}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', position: 'relative' }}>
                <Image source={data.gambar} style={{ width: width, height: (width * 3) / 4 }} />
                <View style={{ paddingHorizontal: 12, paddingVertical: 16 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 3 }}>{data.nama}</Text>
                    <Text style={styles.institutionName}>
                        <Icon name='map-marker-alt' />  {data.institusi}
                    </Text>
                    <Text style={styles.description}>{data.deskripsi}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()} style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 50, position: 'absolute', top: 50, left: 10, backgroundColor: 'white' }}>
                    <Icon name='angle-left' fixedWidth size={23} />
                </TouchableOpacity>
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
    institutionName: {
        color: '#2AAF74',
        fontWeight: '500',
        fontSize: 14,
        marginBottom: 10,
    },
    description: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontWeight: '400',
        fontSize: 12.5,
        marginBottom: 5,
    }
})

export default Informasi