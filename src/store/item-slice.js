import { createSlice } from '@reduxjs/toolkit'

const itemSlice = createSlice({
      name: 'ui',
      initialState: { cartIsVisible: false, notification: null },
      reducers: {
            toggle(state) {
                  state.cartIsVisible = !state.cartIsVisible
            },
            showNotification(state, action) {
                  state.notification = {
                        status: action.payload.status,
                        title: action.payload.title,
                        message: action.payload.message
                  }
            }
      }
})

export const itemActions = itemSlice.actions

export default itemSlice