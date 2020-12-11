import React, {useState, useEffect, useCallback} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import * as authActions from '../../store/actions/auth';
import * as userActions from '../../store/actions/users';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function DrawerContent(props) {  
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const user = useSelector(state => state.users.loggedUsers);

    const dispatch = useDispatch();

    const loadUsers = useCallback (async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(userActions.fetchUsers());
        } catch (err){
            setError(err.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {       
        setIsLoading(true); 
        loadUsers().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadUsers]);

    let name;
    let image;
    let role;

    if (user.length === 0) {
        name = "Desconocido";
        image = 'https://www.clipartkey.com/mpngs/m/18-185558_png-file-svg-person-icon-circle-png.png';
        role = "Shopper";
    } else {
        name = user[0].name;
        image = user[0].imageUrl;
        role = user[0].role;
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: image
                                }}
                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Title style={styles.title}>{name}</Title>
                                <Caption style={styles.caption}>{role}</Caption>
                            </View>
                        </View>
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="cart"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Productos"
                            onPress={() => {props.navigation.navigate('Products')}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="format-list-bulleted"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Ordenes"
                            onPress={() => {props.navigation.navigate('Orders')}}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="border-color"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Mis Productos"
                            onPress={() => {props.navigation.navigate('Admin')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Cerrar Session"
                    onPress={() => {
                        dispatch(authActions.logout());
                        //props.navigation.navigate('Auth');
                    }}
                />
            </Drawer.Section>
        </View>
    );
};


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor: '#009387',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        marginBottom:20,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        backgroundColor: '#009387',
        color: '#000',
        fontWeight: 'bold',
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});