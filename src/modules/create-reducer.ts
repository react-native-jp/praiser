import * as Redux from 'redux'

export type AllActions<Type extends keyof any = string> = Record<Type, Redux.Action>

type Handler<State = any, Action extends Redux.Action = Redux.AnyAction> = (state: State, action: Action) => State

type Handlers<State, Actions extends AllActions> = {
  [Type in keyof Actions]: Actions[Type] extends Redux.Action ? Handler<State, Actions[Type]> : never
}

export default function createReducer<State, HandlerDefinitions extends Handlers<State, any>>(
  initialState: State,
  handlers: HandlerDefinitions,
): Redux.Reducer<State> {
  return function(state = initialState, action): State {
    return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
  }
}
