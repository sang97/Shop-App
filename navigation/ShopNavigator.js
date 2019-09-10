import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createSwitchNavigator } from "react-navigation";

import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import UserProductScreen from "../screens/user/UserProductScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";

import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : ""
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  //color of title text
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary
};

const ProductNavigator = createStackNavigator(
  {
    ProductOverview: {
      screen: ProductOverviewScreen
    },
    ProductDetail: {
      screen: ProductDetailScreen
    },
    Cart: {
      screen: CartScreen
    }
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          size={23}
          color={drawerConfig.tintColor}
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
        />
      )
    }
  }
);

const OrderNavigator = createStackNavigator(
  {
    Order: OrderScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          size={23}
          color={drawerConfig.tintColor}
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
        />
      )
    }
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProduct: UserProductScreen,
    EditProduct: EditProductScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions,
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          size={23}
          color={drawerConfig.tintColor}
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
        />
      )
    }
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductNavigator,
    Order: OrderNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
