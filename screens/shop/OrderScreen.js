import React from "react";
import { FlatList, Platform, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = props => {
  const orders = useSelector(state => state.orders.orders);

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

export default OrderScreen;
