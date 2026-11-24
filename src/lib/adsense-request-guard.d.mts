export function createRequestSequence(): {
  next(): number;
  isCurrent(requestId: number): boolean;
  invalidate(): void;
};
