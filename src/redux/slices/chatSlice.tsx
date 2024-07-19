import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChatInterface } from "../../types/chatInterface"

interface State {
  currentChat: ChatInterface | null
}
const initialState: State = {
  currentChat: null,
}

const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<ChatInterface>) => {
      state.currentChat = action.payload
    },
    removeChat: state => {
      state.currentChat = null
    },
  },
})

export const { removeChat, setChat } = chatSlice.actions
export default chatSlice.reducer
