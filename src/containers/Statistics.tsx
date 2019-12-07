import React from 'react'
import { useSelector } from 'react-redux'

import getStatistics from '../selectors/get-statistics'
import getHistories from '../selectors/get-histories'
import { Statistics } from '../components/pages'

export default function ConnectedStatistics() {
  const statistics = useSelector(getStatistics)
  const histories = useSelector(getHistories)

  return <Statistics statistics={statistics} histories={histories} />
}
