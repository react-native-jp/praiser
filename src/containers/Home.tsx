import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { Todo } from '../domain/entities'
import { AppState } from '../modules'
import * as Todos from '../usecases/todos'
import { Home } from '../components/pages'
import getTodos from '../selectors/get-todos'

export const mapStateToProps = (state: AppState) => ({
  todos: getTodos(state),
})

export const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
  actions: {
    addTodo: (userId: string, newValues: Todo.Values) => dispatch(Todos.addAndSync(userId, newValues)),
    removeTodo: (userId: string, id: string) => dispatch(Todos.removeAndSync(userId, id)),
    toggleTodo: (userId: string, id: string) => dispatch(Todos.toggleAndSync(userId, id)),
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
