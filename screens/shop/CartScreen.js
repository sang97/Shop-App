import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/shop/CartItem";

import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";

const CartScreen = props => {
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

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          <Text style={styles.amount}>${+cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>
      <View>
        <Text>Cart Items</Text>
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
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default CartScreen;
