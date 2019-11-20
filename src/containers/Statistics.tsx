import { connect } from 'react-redux'

import { AppState } from '../modules'
import { Statistics } from '../components/pages'
import getStatistics from '../selectors/get-statistics'
import getHistories from '../selectors/get-histories'

export const mapStateToProps = (state: AppState) => ({
  statistics: getStatistics(state),
  histories: getHistories(state),
})

export default connect(mapStateToProps)(Statistics)
