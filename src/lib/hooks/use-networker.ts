import * as React from 'react';

import { UiContext, NetworkContext } from '../../contexts';

type Task = () => Promise<void>;
export default function useNetworker() {
  const { dispatchNetworkActions } = React.useContext(NetworkContext);
  const { setError } = React.useContext(UiContext);

  return async (task: Task) => {
    try {
      dispatchNetworkActions({ type: 'begin' });
      await task();
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      dispatchNetworkActions({ type: 'end' });
    }
  };
}
