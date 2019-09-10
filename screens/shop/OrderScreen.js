import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Platform,
  Text,
  StyleSheet,
  View,
  Button,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

import OrderItem from "../../components/shop/OrderItem";

import * as orderActions from "../../store/actions/order";
import Colors from "../../constants/Colors";

const OrderScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const orders = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(orderActions.fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadOrders();
  }, [dispatch, loadOrders]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text>An error occured!</Text>
        <Button
          title="Try again!"
          onPress={loadOrders}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => {
        const { amount, readableDate, items } = itemData.item;
        return <OrderItem amount={amount} date={readableDate} items={items} />;
      }}
    />
  );
};

OrderScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your orders",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default OrderScreen;
