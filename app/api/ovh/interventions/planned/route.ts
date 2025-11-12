import { type NextRequest, NextResponse } from "next/server"
import ovh from "@/lib/ovh-client"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const serviceName = searchParams.get("serviceName")

    if (serviceName) {
      // Get planned interventions for specific server
      const interventions = await ovh.requestPromised("GET", `/dedicated/server/${serviceName}/plannedIntervention`)

      const interventionDetails = await Promise.all(
        interventions.map(async (interventionId: number) => {
          try {
            const details = await ovh.requestPromised(
              "GET",
              `/dedicated/server/${serviceName}/plannedIntervention/${interventionId}`,
            )
            return {
              id: interventionId,
              serviceName,
              type: "planned",
              ...details,
            }
          } catch (error) {
            console.error(`[v0] Error fetching planned intervention ${interventionId}:`, error)
            return null
          }
        }),
      )

      return NextResponse.json({
        success: true,
        interventions: interventionDetails.filter((i) => i !== null),
      })
    } else {
      // Get all servers and their planned interventions
      const servers = await ovh.requestPromised("GET", "/dedicated/server")

      const allInterventions = []

      for (const server of servers) {
        try {
          const interventions = await ovh.requestPromised("GET", `/dedicated/server/${server}/plannedIntervention`)

          for (const interventionId of interventions) {
            try {
              const details = await ovh.requestPromised(
                "GET",
                `/dedicated/server/${server}/plannedIntervention/${interventionId}`,
              )
              allInterventions.push({
                id: interventionId,
                serviceName: server,
                type: "planned",
                ...details,
              })
            } catch (error) {
              console.error(`[v0] Error fetching planned intervention ${interventionId} for ${server}:`, error)
            }
          }
        } catch (error) {
          console.error(`[v0] Error fetching planned interventions for server ${server}:`, error)
        }
      }

      return NextResponse.json({
        success: true,
        interventions: allInterventions,
      })
    }
  } catch (error) {
    console.error("[v0] Error fetching planned interventions:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch planned interventions" }, { status: 500 })
  }
}
