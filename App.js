import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
//import {composeWithDevTools} from 'redux-devtools-extension';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import usersReducer from './store/reducers/users';
import authReducer from './store/reducers/auth';
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
  users: usersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); //composeWithDevTools()); //remover esa funcion cuando terminemos de develop.

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(true);

  if (!fontLoaded) {
    return (
      <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => {
        setFontLoaded(true);
      }} />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
