interface PromptState {
  aborted: boolean
}

// see https://github.com/terkelg/prompts/issues/252
export function abortOnState(state: PromptState) {
  if (state.aborted) {
    process.nextTick(() => {
      // A cancelled prompt may drop a pending warning.
      // eslint-disable-next-line no-restricted-properties
      process.exit(0)
    })
  }
}
