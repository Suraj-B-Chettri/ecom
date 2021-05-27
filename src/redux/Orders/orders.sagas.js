import ordersTypes from './orders.types';
import {all, call, takeLatest,put} from 'redux-saga/effects';
import { handleGetOrderDetails, handleGetUserHistory, handleSaveOrder } from './orders.helpers';
import {auth} from '../../firebase/utils'
import { clearCart } from '../Cart/cart.actions';
import {setOrderDetails, setUserOrderHistory} from './orders.actions';

export function* saveOrder ({payload}) {
    try{
        const timestamp= new Date();
         yield handleSaveOrder({...payload, orderUserID: auth.currentUser.uid, orderCreatedDate: timestamp});
        yield put(clearCart())
    } catch(err) {
        console.log(err);
    }
}

export function* onSaveOrderHistoryStart() {
    yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder)
}

export function* getUserHistory({ payload}) {
    try{
        const history = yield handleGetUserHistory(payload);
        yield put(setUserOrderHistory(history))


    } catch(err) {

    }
}

export function* onGetUserHistoryStart() {
    yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserHistory)
}


export function* getOrderDetails({payload}) {
try{
    const order = yield handleGetOrderDetails(payload);
    yield put(setOrderDetails(order));
}catch(e){

}
}

export function* onGetOrderDetailsStart() {
    yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails)
}

export default function* ordersSagas() {
    yield all([call(onSaveOrderHistoryStart), call(onGetUserHistoryStart), call(onGetOrderDetailsStart)])
}

