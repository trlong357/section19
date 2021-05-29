import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://book-edba5-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Couldn't fetch data");
      }
      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "Error",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://book-edba5-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending data failed!");
      }
    };
    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Sended",
          message: "Sended cart data",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "Error",
          message: "Sending cart data failed",
        })
      );
    }
  };
};
