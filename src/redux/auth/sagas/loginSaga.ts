import { PayloadAction } from "@reduxjs/toolkit";

function* loginSaga({ payload: { username, password } }: PayloadAction<{ username: string; password: string }>) {
    console.log(username, password);
}

export default loginSaga;
