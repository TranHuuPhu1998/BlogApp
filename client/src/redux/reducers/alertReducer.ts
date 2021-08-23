import {ALERT , IAlertType} from '../types/AlertType'
import {IAlert} from '../../utils/TypeScript'

const initialState : IAlert = {}

const alertReducer = (state = initialState , action: IAlertType): IAlert => {
  switch (action.type){
    case ALERT:
      return action.payload
    default:
      return state
  }
}

export default alertReducer;