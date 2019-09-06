import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from "react-native";

import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";

import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(product => product.id === productId)
  );

  const { imageUrl, price, description } = selectedProduct;
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          title="Add to card"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  const productTitle = navData.navigation.getParam("productTitle");

  return {
    headerTitle: productTitle
  };
};

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: "100%"
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center"
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold"
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans"
  }
});

export default ProductDetailScreen;
