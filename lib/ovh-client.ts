import OVH from "ovh"

// OVH API Client Configuration
export const ovhClient = OVH({
  endpoint: "ovh-eu",
  appKey: process.env.OVH_APP_KEY || "052737af6236a51c2a8c729e5d7424d6",
  appSecret: process.env.OVH_APP_SECRET || "8d973a9982c42c6f80f86aeb02c48b81",
  consumerKey: process.env.OVH_CONSUMER_KEY || "4561ecddab9b4726",
})

export default ovhClient

// Logging interfaces
export interface OVHLog {
  id: string
  timestamp: Date
  action: string
  endpoint: string
  method: string
  status: "success" | "error"
  user?: string
  details?: any
  error?: string
}

const logs: OVHLog[] = []

export function logOVHAction(log: Omit<OVHLog, "id" | "timestamp">) {
  const newLog: OVHLog = {
    id: `ovh-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    ...log,
  }
  logs.push(newLog)
  console.log("[OVH API]", newLog)
  return newLog
}

export function getOVHLogs(limit = 100) {
  return logs.slice(-limit).reverse()
}

// Helper functions with logging
async function requestWithLogging(method: string, endpoint: string, data?: any, user?: string): Promise<any> {
  try {
    const result = await ovhClient.requestPromised(method, endpoint, data)
    logOVHAction({
      action: `${method} ${endpoint}`,
      endpoint,
      method,
      status: "success",
      user,
      details: { dataKeys: data ? Object.keys(data) : [] },
    })
    return result
  } catch (error: any) {
    logOVHAction({
      action: `${method} ${endpoint}`,
      endpoint,
      method,
      status: "error",
      user,
      error: error.message,
    })
    throw error
  }
}

export async function getOVHVPS(user?: string) {
  return requestWithLogging("GET", "/vps", undefined, user)
}

export async function getOVHDedicatedServers(user?: string) {
  return requestWithLogging("GET", "/dedicated/server", undefined, user)
}

export async function getOVHCloudProjects(user?: string) {
  return requestWithLogging("GET", "/cloud/project", undefined, user)
}

export async function getOVHDomains(user?: string) {
  return requestWithLogging("GET", "/domain", undefined, user)
}

export async function restartVPS(vpsName: string, user?: string) {
  return requestWithLogging("POST", `/vps/${vpsName}/reboot`, undefined, user)
}

export async function stopVPS(vpsName: string, user?: string) {
  return requestWithLogging("POST", `/vps/${vpsName}/stop`, undefined, user)
}

export async function startVPS(vpsName: string, user?: string) {
  return requestWithLogging("POST", `/vps/${vpsName}/start`, undefined, user)
}

export async function restartServer(serverName: string, user?: string) {
  return requestWithLogging("POST", `/dedicated/server/${serverName}/reboot`, undefined, user)
}

export async function getVPSDetails(vpsName: string, user?: string) {
  return requestWithLogging("GET", `/vps/${vpsName}`, undefined, user)
}

export async function getServerDetails(serverName: string, user?: string) {
  return requestWithLogging("GET", `/dedicated/server/${serverName}`, undefined, user)
}
