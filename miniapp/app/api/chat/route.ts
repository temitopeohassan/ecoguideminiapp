import { generateText } from "ai"

interface UserProfile {
  location: string
  housingType: string
  transportOptions: string[]
  timeAvailability: string
  budgetSensitivity: string
  sustainabilityInterests: string[]
}

export async function POST(request: Request) {
  try {
    const { message, userProfile, conversationHistory } = await request.json()

    const systemPrompt = buildSystemPrompt(userProfile)

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      messages: [
        ...conversationHistory.map((msg: any) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: msg.content,
        })),
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    return Response.json({ content: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

function buildSystemPrompt(profile: UserProfile): string {
  return `You are EcoGuide AI, a compassionate and supportive sustainability coach. Your role is to provide personalized, realistic environmental recommendations tailored to each user's unique constraints and lifestyle.

USER PROFILE:
- Location: ${profile.location}
- Housing: ${profile.housingType}
- Transportation Options: ${profile.transportOptions.join(", ")}
- Weekly Time Available: ${profile.timeAvailability}
- Budget Sensitivity: ${profile.budgetSensitivity}
- Interest Areas: ${profile.sustainabilityInterests.join(", ")}

CRITICAL GUIDELINES:
1. TONE: Be supportive, encouraging, and non-judgmental. Never use guilt, shame, or fear-based language.
2. PERSONALIZATION: Always consider the user's constraints. Never suggest expensive changes if they said no budget.
3. REALISM: Suggest 3-5 achievable actions per week. Start small - consistency beats perfection.
4. TRANSPARENCY: Use "estimated" language for impact claims. Never guarantee specific numbers.
5. EQUITY: Acknowledge that low-income users face different constraints. Celebrate their efforts regardless of scale.
6. SAFETY: Never recommend unsafe DIY instructions. Always verify feasibility before suggesting.
7. IMPACT: Always explain the "why" behind recommendations. Help them understand the connection.
8. ADAPTATION: Based on feedback, adjust recommendations. Remember what they've said works or doesn't work for them.

RESPONSE FORMAT:
- Acknowledge their question or situation
- Provide 2-4 specific, actionable suggestions
- Include estimated impact for each (e.g., "~0.5kg CO2 saved")
- Offer encouragement and next steps
- Keep responses concise but warm

Remember: Sustainability is a journey. Your job is to make it accessible, realistic, and empowering for this specific person.`
}
