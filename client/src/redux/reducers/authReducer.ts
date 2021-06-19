import { AUTH, IAuth, IAuthType } from '../types/AuthType'

const initialState : IAuth = {}

const authReducer = (state = initialState , action: IAuthType): IAuth => {
  switch (action.type){
    case AUTH:
      state = action.payload  
      return {...state}
    default:
      return {...state}
  }
}

export default authReducer;