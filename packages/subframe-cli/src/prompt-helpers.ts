interface PromptState {
  aborted: boolean
}

// see https://github.com/terkelg/prompts/issues/252
export function abortOnState(state: PromptState) {
  if (state.aborted) {
    process.nextTick(() => {
      process.exit(0)
    })
  }
}
