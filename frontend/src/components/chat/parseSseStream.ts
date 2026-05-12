/**
 * Parse an SSE response body: events are separated by blank lines (\n\n),
 * each line may be `data: <payload>`. Stream ends with data: [DONE].
 * Handles arbitrary TCP chunk boundaries.
 */
export async function* parseSseTokens(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    let sep: number
    while ((sep = buffer.indexOf('\n\n')) !== -1) {
      const rawEvent = buffer.slice(0, sep)
      buffer = buffer.slice(sep + 2)

      for (const line of rawEvent.split('\n')) {
        const trimmed = line.trimEnd()
        if (!trimmed.startsWith('data:')) continue
        const payload = trimmed.slice(5).replace(/^\s/, '')
        if (payload === '[DONE]') return
        if (payload.length) yield payload
      }
    }
  }
}
