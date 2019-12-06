import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '../modules'
import * as Todos from '../usecases/todos'
import { Home } from '../components/pages'
import getTodos from '../selectors/get-todos'

export const mapStateToProps = (state: AppState) => ({
  todos: getTodos(state),
})

export const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
  actions: {
    removeTodo: (userId: string, id: string) => dispatch(Todos.removeAndSync(userId, id)),
    toggleTodo: (userId: string, id: string) => dispatch(Todos.toggleAndSync(userId, id)),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
