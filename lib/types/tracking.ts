export type TrackingEvent =
  | "page_view"
  | "product_view"
  | "search"
  | "add_to_cart"
  | "remove_from_cart"
  | "quote_request"
  | "price_check"
  | "checkout_start"
  | "purchase_complete"
  | "promo_click"
  | "support_request"
  | "idle"
  | "abandon_cart"

export interface TrackingPayload {
  event: TrackingEvent
  sessionId: string
  userId?: string | null
  ts: number
  payload?: Record<string, any>
}

export interface SessionSummary {
  sessionId: string
  userId?: string | null
  pages: string[]
  lastSeenProducts: Array<{ sku: string; name: string; price: number }>
  searches: string[]
  cart: Array<{ sku: string; qty: number; price: number }>
  cartTotal: number
  offersGiven: Array<{ code: string; discountPct: number; expiresAt: string }>
  wantsCall?: boolean
  contact?: { name?: string; phone?: string; timeWindow?: string; tz?: string }
  lastActionAt: number
}

export interface AndreaResponse {
  message: string
  actions?: Array<
    | { type: "recommend"; items: Array<{ sku: string; why: string }> }
    | { type: "make_offer"; offer: { code: string; discountPct: number; expiresHours: number } }
    | { type: "request_call"; reason: string; fields: Array<"nombre" | "telefono" | "horario" | "zonaHoraria"> }
    | { type: "follow_up" }
    | { type: "security_warning" }
    | { type: "handoff_human"; topic: string }
  >
  entities?: {
    use_case?: string | null
    budget?: number | string | null
    region?: string | null
    urgency?: "baja" | "media" | "alta" | null
  }
  confidence?: number
}
