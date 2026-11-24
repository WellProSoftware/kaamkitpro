export function createRequestSequence() {
  let sequence = 0;

  return {
    next() {
      sequence += 1;
      return sequence;
    },
    isCurrent(requestId) {
      return requestId === sequence;
    },
    invalidate() {
      sequence += 1;
    },
  };
}
