import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  let cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    //return as an array
    const transformedCartItems = [];
    for (let key in state.cart.items) {
      const { title, price, quantity, sum } = state.cart.items[key];
      transformedCartItems.push({
        id: key,
        title,
        price,
        quantity,
        sum
      });
    }
    return transformedCartItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  });

  const dispatch = useDispatch();

  const renderItemHandler = itemData => {
    const { quantity, title, sum, id } = itemData.item;
    return (
      <CartItem
        quantity={quantity}
        title={title}
        sum={sum}
        removeable
        onRemove={() => dispatch(cartActions.removeFromCart(id))}
      />
    );
  };

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          <Text style={styles.amount}>${+cartTotalAmount.toFixed(2)}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <View>
        <FlatList
          keyExtractor={item => item.id}
          data={cartItems}
          renderItem={itemData => renderItemHandler(itemData)}
        />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default CartScreen;
