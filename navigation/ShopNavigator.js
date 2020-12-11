import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Title, Caption } from 'react-native-paper';

import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions
} from '../screens/shop/ProductDetailScreen';
import CartScreen, {
  screenOptions as cartScreenOptions
} from '../screens/shop/CartScreen';
import OrdersScreen, {
  screenOptions as ordersScreenOptions
} from '../screens/shop/OrdersScreen';
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions
} from '../screens/user/UserProductsScreen';
import EditProductScreen, {
  screenOptions as editProductScreenOptions
} from '../screens/user/EditProductScreen';
import AuthScreen, {
  screenOptions as authScreenOptions
} from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
//Import de Components
import {DrawerContent} from '../components/drawer/DrawerContent';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
 headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerTitleAlign: 'center',
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

// Stack de Productos con 3 Pantallas

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

// Stack de Ordenes con 1 Pantalla

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

// Stack de Admin con 2 Pantallas

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// Drawer con 3 Pantallas (Stacks) (ojo aqui manualmente le damos el look mediante Views)

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

// Stack de Autenticacion con 1 Pantalla

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};

// Pagina de Estilos

const styles = StyleSheet.create({
    drawerContent: {
        marginVertical: 40,
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor: Colors.primary,
        marginBottom: 10,
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        marginBottom: 20,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 5,
        marginTop: '100%',
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
        backgroundColor: '#009387',
        color: '#000',
        fontWeight: 'bold',
        justifyContent: 'flex-end',
    },
});
