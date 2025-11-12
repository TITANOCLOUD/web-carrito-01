import { NextResponse } from "next/server"
import { getOVHCloudProjects, ovhClient } from "@/lib/ovh-client"

export async function GET() {
  try {
    const projects = await getOVHCloudProjects()

    // Get details for each project
    const projectDetails = await Promise.all(
      projects.map(async (projectId: string) => {
        try {
          const details = await ovhClient.requestPromised("GET", `/cloud/project/${projectId}`)
          return { id: projectId, ...details }
        } catch (error) {
          console.error(`[v0] Error fetching details for project ${projectId}:`, error)
          return { id: projectId, error: "Failed to fetch details" }
        }
      }),
    )

    return NextResponse.json({ success: true, projects: projectDetails })
  } catch (error: any) {
    console.error("[v0] OVH Cloud API Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch cloud projects" },
      { status: 500 },
    )
  }
}
