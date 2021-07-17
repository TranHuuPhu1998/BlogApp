import { Dispatch } from 'redux'
import { AUTH, IAuthType } from '../types/AuthType'
import { ALERT, IAlertType } from '../types/AlertType'

import { IUserLogin , IUserRegister } from '../../utils/TypeScript'
import { postAPI , getAPI  } from '../../utils/FetchData'
import { validRegister } from '../../utils/Valid'

//action refreshToken

export const refreshToken = () => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const logged = localStorage.getItem('logged')
  if(logged !== 'devat-channel') return;

  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    const res = await getAPI('refresh_token')
    console.log("🚀 ~ file: authAction.ts ~ line 20 ~ res", res)
    
    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

//action logout

export const logout = () => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    localStorage.removeItem('logged')
    await getAPI('logout')
    window.location.href = "/"
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

//action register

export const register = (userRegister: IUserRegister) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const check = validRegister(userRegister)
  if(check.errLength > 0){
    return dispatch({type:ALERT , payload: {errors:check.errMsg}})
  }

  try {
    dispatch({type:ALERT , payload:{loading : true}})

    const res = await postAPI('register' , userRegister)
    
    dispatch({type:ALERT , payload:{success : res.data.msg}})
  } catch (err: any) {
    dispatch({type: ALERT , payload : {errors: err.response.data.msg}})
  }
} 

// action login

export const login = (userLogin: IUserLogin) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({type: ALERT , payload : {loading: true}})

    const res = await postAPI('login', userLogin)

    dispatch({ type: AUTH , payload: res.data })

    dispatch({type: ALERT , payload : {success: res.data.msg}})
    localStorage.setItem('logged', 'devat-channel')
  } catch (err: any) {
    dispatch({type: ALERT , payload : {errors: err.response.data.msg}})
  }
}

// action google login

export const googleLogin = (id_token: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('google_login', { id_token })

    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })

    localStorage.setItem('logged', 'devat-channel')
    
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

// action facebook Login

export const facebookLogin = (accessToken: string, userID: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('facebook_login', { accessToken, userID })
    
    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    localStorage.setItem('logged', 'devat-channel')
    
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}