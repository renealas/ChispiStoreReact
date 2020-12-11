import React from 'react';
import { FlatList, Button, StyleSheet, Platform, Alert, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products';

const UserProductScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    
    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', { productId: id });
    };

    const deleteHandler = (id) => {
        Alert.alert('Estas seguro?', 'Enserio deseas borrar este Articulo', [
            { text: 'No', style: 'default' },
            {
                text: 'Si', style: 'destructive', onPress: () => {
                    dispatch(productActions.deleteProduct(id));
                }
            }
        ])
    };

    if (userProducts.length === 0) {
        return <View style={styles.centered} >
            <Text style={styles.text}>No hay Productos Aun! Comienza a añadir Algunos.</Text>
        </View>
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                (
                    <ProductItem
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            editProductHandler(itemData.item.id);
                        }}
                    >
                        <Button
                            color={Colors.primary}
                            title="Editar"
                            onPress={() => {
                                editProductHandler(itemData.item.id);
                            }}
                        />
                        <Button
                            color={Colors.primary}
                            title="Borrar"
                            onPress={deleteHandler.bind(this, itemData.item.id)}
                        />
                    </ProductItem>
                )
            }
        />
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Tus Productos',
        headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
        </HeaderButtons>),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Add'
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditProduct');
                }} />
        </HeaderButtons>),
    }
}

const styles = StyleSheet.create({
    centered:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default UserProductScreen;