import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    status:false,
    userEvents: null
}

const eventSlice =createSlice({
    name: "events",
    initialState,
    reducers: {
        taskData(state,action){
            state.status= true;
            state.userEvents = action.payload;
        }
    }
})


export const {taskData} =eventSlice.actions
export default eventSlice.reducer