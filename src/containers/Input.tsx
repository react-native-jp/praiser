import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { Todo } from '../domain/entities'
import { AppState } from '../modules'
import * as Todos from '../usecases/todos'
import { Input } from '../components/modal'
import getTodos from '../selectors/get-todos'

export const mapStateToProps = (state: AppState) => ({
  todos: getTodos(state),
})

export const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
  actions: {
    addTodo: (userId: string, newValues: Todo.Values) => dispatch(Todos.addAndSync(userId, newValues)),
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Input)
