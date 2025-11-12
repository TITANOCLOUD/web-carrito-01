import { type NextRequest, NextResponse } from "next/server"
import ovh from "@/lib/ovh-client"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const serviceName = searchParams.get("serviceName")

    if (serviceName) {
      // Get interventions for specific server
      const interventions = await ovh.requestPromised("GET", `/dedicated/server/${serviceName}/intervention`)

      // Get details for each intervention
      const interventionDetails = await Promise.all(
        interventions.map(async (interventionId: number) => {
          try {
            const details = await ovh.requestPromised(
              "GET",
              `/dedicated/server/${serviceName}/intervention/${interventionId}`,
            )
            return {
              id: interventionId,
              serviceName,
              ...details,
            }
          } catch (error) {
            console.error(`[v0] Error fetching intervention ${interventionId}:`, error)
            return null
          }
        }),
      )

      return NextResponse.json({
        success: true,
        interventions: interventionDetails.filter((i) => i !== null),
      })
    } else {
      // Get all servers and their interventions
      const servers = await ovh.requestPromised("GET", "/dedicated/server")

      const allInterventions = []

      for (const server of servers) {
        try {
          const interventions = await ovh.requestPromised("GET", `/dedicated/server/${server}/intervention`)

          for (const interventionId of interventions) {
            try {
              const details = await ovh.requestPromised(
                "GET",
                `/dedicated/server/${server}/intervention/${interventionId}`,
              )
              allInterventions.push({
                id: interventionId,
                serviceName: server,
                ...details,
              })
            } catch (error) {
              console.error(`[v0] Error fetching intervention ${interventionId} for ${server}:`, error)
            }
          }
        } catch (error) {
          console.error(`[v0] Error fetching interventions for server ${server}:`, error)
        }
      }

      return NextResponse.json({
        success: true,
        interventions: allInterventions,
      })
    }
  } catch (error) {
    console.error("[v0] Error fetching interventions:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch interventions" }, { status: 500 })
  }
}
