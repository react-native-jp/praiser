import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { Todos } from '../domain/models'
import { AppState } from '../modules'
import { set } from '../modules/todos'
import { Signup } from '../components/pages'

export const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
  actions: {
    setTodos: (newValues: Todos.Model) => {
      return dispatch(set(newValues))
    },
  },
})

export default connect(null, mapDispatchToProps)(Signup)
