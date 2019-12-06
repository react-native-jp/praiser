import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { AppState } from '../modules'
import * as Todos from '../usecases/todos'
import { Detail } from '../components/pages'
import getTodos from '../selectors/get-todos'

export const mapStateToProps = (state: AppState) => ({
  todos: getTodos(state),
})

export const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
  actions: {
    changeTodo: (
      userId: string,
      id: string,
      newValue: {
        title: string
        detail: string
      },
    ) => dispatch(Todos.editTodo(userId, id, newValue)),
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
