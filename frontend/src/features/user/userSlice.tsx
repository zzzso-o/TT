import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { create } from "yup/lib/array";
import { request } from "../../utils/axios";
import axios from "axios";

export type userData = {
  userId: string;
  userPw: string;
  userNickname: string;
  userEmail: string;
  userPhone: string;
  userGender: string;
  userCode: any;
  //* notice 권한 확인을 위한 값
  userAuthority: any;
};

export const initialState: userData = {
  userId: "",
  userPw: "",
  userNickname: localStorage.getItem('user_nickname') || '',
  // userNickname:"",
  userEmail: "",
  userPhone: "",
  userGender: "",
  userCode: localStorage.getItem('userCode'),
  //* notice 권한 확인을 위한 값
  userAuthority: localStorage.getItem('user_authority')
};




const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchProfile: (state: userData, action) => {
      state.userEmail = action.payload.userEmail;
      state.userPhone = action.payload.userPhone;
      state.userId = action.payload.userId;
      state.userPw = action.payload.userPw;
      state.userNickname = action.payload.userNickname;
      state.userGender =action.payload.userGender;
      state.userCode = action.payload.userCode;
      localStorage.setItem('user_nickname', action.payload.userNickname);
      //* notice 권한 확인을 위한 값
      localStorage.setItem('user_authority', action.payload.userAuthority);
    },
  },
});

// export const sendRegisterRequest = (data : Object) => {
//     request('POST', 'api/user/register', data)
// }

export const sendRegisterRequest = createAsyncThunk(
  "sendRegisterRequest",
  async (data) => {
    return request("POST", "/api" + "/user/register", data);
  },
);

const { reducer, actions } = userSlice; //
export const { fetchProfile } = actions;
export default userSlice.reducer;
