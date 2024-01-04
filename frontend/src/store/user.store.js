import { userService } from "../service/user.service.js";

export const userStore = {
  state: {
    loggedinUser: userService.getLoggedinUser(),
    users: [],
    isUserModalOpen: false,
  },
  getters: {
    users({ users }) {
      return users;
    },
    loggedinUser({ loggedinUser }) {
      return loggedinUser;
    },
    userModal({ isUserModalOpen }) {
      return isUserModalOpen;
    },
  },
  mutations: {
    setLoggedinUser(state, { user }) {
      state.loggedinUser = user;
    },
    setUsers(state, { users }) {
      state.users = users;
    },
    setUser(state, { user }) {
      const idx = state.users.findIndex((usr) => usr._id === user._id);
      if (idx === -1) {
        state.users.push(user);
      } else {
        state.users.splice(idx, 1, user);
      }
    },
    removeUser(state, { userId }) {
      // BUG: should be !==
      state.users = state.users.filter((user) => user._id === userId);
    },
    toggleUserModal(state) {
      state.isUserModalOpen = !state.isUserModalOpen;
    },
  },
  actions: {
    async login({ commit }, { userCred }) {
      try {
        const user = await userService.login(userCred);
        commit({ type: "setLoggedinUser", user });
        commit({ type: "toggleUserModal" });
        return user;
      } catch (err) {
        throw err;
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: "setLoggedinUser", user: null });
        commit({ type: "toggleUserModal" });
        return true;
      } catch (err) {
        console.log("userStore: Error in logout", err);
        throw err;
      }
    },
    async signup({ commit }, { userCred }) {
      try {
        const user = await userService.signup(userCred);
        commit({ type: "setLoggedinUser", user });
        commit({ type: "toggleUserModal" });
        return user;
      } catch (err) {
        console.log("userStore: Error in signup", err);
        throw err;
      }
    },
    async loadUsers({ commit }) {
      try {
        const users = await userService.getUsers();
        // console.log('users:', users)
        commit({ type: "setUsers", users });
      } catch (err) {
        console.log("userStore: Error in loadUsers", err);
        throw err;
      }
    },
    async removeUser({ commit }, { userId }) {
      try {
        await userService.remove(userId);
        commit({ type: "removeUser" }, userId);
      } catch (err) {
        console.log("userStore: Error in removeUser", err);
        throw err;
      }
    },
    async updateUser({ commit }, { user }) {
      try {
        user = await userService.update(user);
        commit({ type: "setUser", user });
      } catch (err) {
        console.log("userStore: Error in updateUser", err);
        throw err;
      }
    },
    async addReview({ commit }, { review, user }) {
      try {
        user = await userService.addReview(user, review);
        console.log("user:", user);
        commit({ type: "setUser", user });
      } catch (err) {
        console.log("userStore: Error in adding review", err);
        throw err;
      }
    },
  },
};
