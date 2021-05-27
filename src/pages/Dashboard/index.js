import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import OrderHistory from "../../components/OrderHistory";
import { getUserOrderHistory } from "../../redux/Orders/orders.actions";
import "./styles.scss";

const mapState = ({user, ordersData}) => ({
    currentUser: user.currentUser,
    ordersHistory: ordersData.orderHistory.data
})

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const {currentUser, ordersHistory} = useSelector(mapState);
  
  
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id))
  }, [])
  
  return (<div>

    <OrderHistory orders = {ordersHistory}/>
  </div>);
};

export default Dashboard;
