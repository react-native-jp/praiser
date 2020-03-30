export default function() {
  return {
    logEvent(_eventName: string, _options: { id: string; name: string }) {
      return new Promise(resolve => resolve());
    },
  };
}
