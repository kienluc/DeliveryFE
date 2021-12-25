import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/authConstant';



export const login = (info) => ({
    type: USER_LOGIN_SUCCESS,
    payload: info
})

export const logout = () => ({
    type: USER_LOGOUT
})