import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  StyleSheet,
  Text
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

import ProductItem from "../../components/shop/ProductItem";

import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";

import Colors from "../../constants/Colors";

const ProductOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const allProducts = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    // re-render the component
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

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

  if (error) {
    return (
      <View style={styles.center}>
        <Text>An error occured!</Text>
        <Button
          title="Try again!"
          onPress={loadProducts}
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

  if (!isLoading && allProducts.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No Products Found</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductOverviewScreen;
