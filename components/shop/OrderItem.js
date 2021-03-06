import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import CartItem from "./CartItem";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

const OrderItem = props => {
  const [showDetail, setShowDetail] = useState(false);
  const { amount, date, items } = props;

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetail ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetail(prevState => !prevState)}
      />
      {showDetail && (
        <View style={styles.detailItems}>
          {items.map(item => {
            const { id, quantity, title, sum } = item;
            return (
              <CartItem key={id} quantity={quantity} title={title} sum={sum} />
            );
          })}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center"
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888"
  },
  detailItems: {
    width: "100%"
  }
});

export default OrderItem;
