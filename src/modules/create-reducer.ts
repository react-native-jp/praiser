import { Action, AnyAction } from 'redux'

type Handler<State, Types extends string, Actions extends Action<Types> = AnyAction> = (
  state: State,
  action: Actions,
) => State

type Handlers<State, Types extends string, Actions extends Action<Types> = AnyAction> = {
  readonly [Type in Types]: Handler<State, Types, Actions>
}

export default <State, Types extends string, Actions extends Action<Types> = AnyAction>(
  initialState: State,
  handlers: Handlers<State, Types, Actions>,
) => (state = initialState, action: Actions) =>
  handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state
