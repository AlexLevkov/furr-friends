import { orderService } from "../service/order.service.js";

export const orderStore = {
  strict: true,
  state: {
    orders: [],
  },
  getters: {
    orders({ orders }) {
      return orders;
    },
  },
  mutations: {
    setOrders(state, { orders }) {
      state.orders = orders;
    },
    removeOrder(state, { orderId }) {
      const idx = state.orders.findIndex((order) => order._id === orderId);
      state.orders.splice(idx, 1);
    },
    saveOrder(state, { orderToSave }) {
      const idx = state.orders.findIndex(
        (order) => order._id === orderToSave._id
      );
      if (idx === -1) {
        state.orders.unshift(orderToSave);
      } else {
        // console.log('we have such an order')
      }
    },
  },
  actions: {
    async loadOrders({ commit }) {
      try {
        const orders = await orderService.query();
        commit({ type: "setOrders", orders });
      } catch (err) {
        console.log("OrderStore: Cant load orders", err);
        throw err;
      }
    },
    async removeOrder({ commit }, payload) {
      try {
        await orderService.remove(payload.orderId);
        commit(payload);
      } catch (err) {
        console.log("OrderStore: Cant remove order", err);
        throw err;
      }
    },
    async saveOrder(state, payload) {
      try {
        // validation variables
        const userId = payload.orderToSave.orderBy._id;
        const petId = payload.orderToSave.orderFor._id;
        const orderExist = state.state.orders.filter((order) => {
          if (order.orderBy._id === userId && order.orderFor._id === petId)
            return true;
        });
        // validation test
        if (orderExist.length && !payload.orderToSave._id)
          // validation error
          return Promise.resolve({
            type: "warning",
            msg: "This request has already been sent",
          });
        // validation completed successfully
        const savedOrder = await orderService.save(payload.orderToSave);
        state.commit({ type: "saveOrder", orderToSave: savedOrder });
        return savedOrder;
      } catch (err) {
        console.log("OrderStore!!!: Cant save order", err);
        return Promise.reject(err);
        // throw err
      }
    },
  },
};
