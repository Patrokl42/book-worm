import React from 'react';
import { Image, Text, View, TouchableOpacity } from "react-native";

import NetworkImage from 'react-native-image-progress';
import ProgressPie from 'react-native-progress/Pie';

const ListItem = ({ item, children, marginVertical, editable, onPress }) => {
    return(
        <View style={{
            minHeight: 100,
            flexDirection:'row',
            backgroundColor:'#fff',
            textAlign: 'center',
            marginVertical: marginVertical,
            justifyContent: 'center',
            borderRadius: 10,
            borderBottomColor: '#a7a9ac',
            borderBottomWidth: 1,
        }}>
            <View style={{
                height: 65,
                width: 65,
                marginLeft: 10,
                marginTop: 15,
            }}>
                <TouchableOpacity
                    style={{
                        flex: 1
                    }}
                    onPress={() => onPress(item)}
                    disabled={!editable}
                >
                    {item.image ? (
                    <NetworkImage
                        source={{ uri: item.image }}
                        style={{
                            flex: 1,
                            height: null,
                            width: null,
                            borderRadius: 35,
                            borderColor: '#a7a9ac',
                            borderWidth: 0.5
                        }}
                        indicator={ProgressPie}
                        indicatorProps={{
                            size: 40,
                            borderWidth: 0,
                            color: '#c513af',
                            unfilledColor: 'rgba(200, 200, 200, 0.2)'
                        }}
                        imageStyle={{borderRadius: 35}}
                    />
                    ) : (
                    <Image
                        style={{
                            flex: 1,
                            height: null,
                            width: null,
                            borderRadius: 35,
                            backgroundColor: '#a7a9ac'
                        }}
                    />
                    )}
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                marginLeft: 15
            }}>
                <Text style={{
                    fontWeight: '800',
                    fontSize: 22,
                    color: '#232a38'
                }}>
                    {item.departureCode}
                </Text>
                <Text style={{
                    fontWeight: '100',
                    fontSize: 15,
                    color: '#232a38',
                    marginTop: 5
                }}>
                    {item.department}
                </Text>
                <Text style={{
                    fontWeight: '100',
                    fontSize: 12,
                    color: '#c513af',
                    marginTop: 4
                }}>
                    Delivery Company: {item.deliveryCompany}
                </Text>
            </View>
            {children}
        </View>
    )
};

ListItem.defaultProps = {
    marginVertical: 5,
    editable: false
};

export default ListItem;