import { createSlice } from "@reduxjs/toolkit";

const UIStoreSlice = createSlice({
	name: "UI-STORE",
	initialState: { isShowCart: false, notification: null },
	reducers: {
		showCart(state) {
			state.isShowCart = !state.isShowCart;
		},
		notify(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

export const UIStoreActions = UIStoreSlice.actions;

export default UIStoreSlice.reducer;
