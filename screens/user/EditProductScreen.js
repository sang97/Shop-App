import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";

const EditProductScreen = props => {
  const id = props.navigation.getParam("productId");
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(product => product.id === id)
  );

  let initalTitle = editedProduct ? editedProduct.title : "";
  let initalImageUrl = editedProduct ? editedProduct.imageUrl : "";
  let initalDescription = editedProduct ? editedProduct.description : "";
  let initalPrice = editedProduct ? editedProduct.price.toString() : "";

  const [title, setTitle] = useState(initalTitle);
  const [imageUrl, setIamgeUrl] = useState(initalImageUrl);
  const [price, setPrice] = useState(initalPrice);
  const [description, setDescription] = useState(initalDescription);

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    const data = {
      title,
      description,
      imageUrl,
      price: Number(price)
    };

    if (editedProduct) {
      //edit product
      dispatch(productActions.updateProduct(id, data));
    } else {
      dispatch(productActions.createProduct(data));
    }
    props.navigation.goBack();
  }, [dispatch, id, title, description, imageUrl]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formEntry}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          ></TextInput>
        </View>
        <View style={styles.formEntry}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setIamgeUrl(text)}
          ></TextInput>
        </View>
        <View style={styles.formEntry}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={text => setPrice(text)}
            editable={!editedProduct}
          ></TextInput>
        </View>
        <View style={styles.formEntry}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          ></TextInput>
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const pid = navData.navigation.getParam("productId");
  const onFormSubmit = navData.navigation.getParam("submit");
  return {
    headerTitle: pid ? "Edit Product " : "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={onFormSubmit}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formEntry: {
    width: "100%"
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default EditProductScreen;
