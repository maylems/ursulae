export function formatTokens(tokens: number) {
  return tokens >= 1000 ? `${(tokens / 1000).toFixed(1)}k` : `${tokens}`;
}

// A ratio like 0.013 would read as 0.01 with two decimals, so keep a third
// decimal while it is small.
export function formatRatio(ratio: number) {
  return `${ratio.toFixed(ratio < 0.1 ? 3 : 2)}:1`;
}

// Per-request costs are often well under a cent, so keep more decimals for them.
export function formatSmallUsd(value: number) {
  if (value === 0) return '$0.0000';
  return `$${value.toFixed(value < 0.01 ? 6 : 4)}`;
}
