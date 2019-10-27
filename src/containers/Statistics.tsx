import { connect } from 'react-redux'

import { AppState } from '../modules'
import { Statistics } from '../components/pages'
import getStatistics from '../selectors/get-statistics'

export const mapStateToProps = (state: AppState) => ({
  statistics: getStatistics(state),
})

export default connect(mapStateToProps)(Statistics)
