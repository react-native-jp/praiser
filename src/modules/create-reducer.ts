import * as Redux from 'redux'

export type Actions<Type extends keyof any = string> = Record<Type, Redux.Action>

type Handler<State = any, Action extends Redux.Action = Redux.AnyAction> = (state: State, action: Action) => State

type Handlers<State, Action extends Actions> = {
  [Type in keyof Action]: Action[Type] extends Redux.Action ? Handler<State, Action[Type]> : never
}

export default function createReducer<State, H extends Handlers<State, any> = Handlers<State, any>>(
  initialState: State,
  handlers: H,
): Redux.Reducer<State> {
  return function(state = initialState, action): State {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
  }
}
