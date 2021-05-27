import { firestore } from "../../firebase/utils";

export const handleSaveOrder = (order) => {
  console.log("aakai xaina yeha ta");
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc()
      .set(order)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleGetUserHistory = (uid) => {
  return new Promise((resolve, reject) => {
    let ref = firestore
      .collection("orders")
      .orderBy("orderCreatedDate", "desc");
    ref = ref.where("orderUserID", "==", uid);
    ref
      .get()
      .then((snap) => {
        const data = [
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({ data });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const handleGetOrderDetails = (orderID) => {
  return new Promise((resolve, reject) => {
    console.log(orderID);
    firestore
      .collection("orders")
      .doc(orderID)
      .get()
      .then((snap) => {
        if(snap.exists) {
            resolve({...snap.data(),documentID: orderID});
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
