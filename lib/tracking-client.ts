import type { TrackingEvent } from "./types/tracking"

class TrackingClient {
  private queue: Array<any> = []
  private sessionId: string
  private flushInterval: NodeJS.Timeout | null = null

  constructor() {
    this.sessionId = this.getOrCreateSessionId()
    this.startBatchFlush()
  }

  private getOrCreateSessionId(): string {
    let sid = sessionStorage.getItem("titano_session_id")
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`
      sessionStorage.setItem("titano_session_id", sid)
    }
    return sid
  }

  private startBatchFlush() {
    this.flushInterval = setInterval(() => {
      this.flush()
    }, 10000) // Flush every 10 seconds
  }

  track(event: TrackingEvent, payload?: Record<string, any>) {
    const userId = localStorage.getItem("userId") || null

    this.queue.push({
      event,
      sessionId: this.sessionId,
      userId,
      ts: Date.now(),
      payload,
    })

    // If queue is large, flush immediately
    if (this.queue.length >= 10) {
      this.flush()
    }
  }

  async flush() {
    if (this.queue.length === 0) return

    const events = [...this.queue]
    this.queue = []

    try {
      await fetch("/api/tracking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events }),
      })
    } catch (error) {
      console.error("[Tracking] Failed to send events:", error)
      // Re-queue on failure
      this.queue.unshift(...events)
    }
  }

  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval)
    }
    this.flush()
  }
}

export const tracker = typeof window !== "undefined" ? new TrackingClient() : null
