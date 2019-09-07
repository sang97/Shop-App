import React from "react";
import { FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

import ProductItem from "../../components/shop/ProductItem";

import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductOverviewScreen = props => {
  const allProducts = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const renderItemHandle = itemData => {
    const { imageUrl, title, price, id } = itemData.item;

    const selectItemHandler = (id, title) => {
      props.navigation.navigate("ProductDetail", {
        productId: id,
        productTitle: title
      });
    };

    return (
      <ProductItem
        imageUrl={imageUrl}
        title={title}
        price={price}
        onSelect={() => selectItemHandler(id, title)}
      >
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={() => selectItemHandler(id, title)}
        />
        <Button
          color={Colors.primary}
          title="Add To Cart"
          onPress={() => dispatch(cartActions.addToCart(itemData.item))}
        />
      </ProductItem>
    );
  };

  return (
    <FlatList
      data={allProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => renderItemHandle(itemData)}
    />
  );
};

ProductOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
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

export default ProductOverviewScreen;
