"use client"

import { useState } from "react"
import OnboardingFlow from "@/components/onboarding/onboarding-flow"
import CoachInterface from "@/components/coach/coach-interface"

type AppState = "onboarding" | "coach"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("onboarding")
  const [userProfile, setUserProfile] = useState<any>(null)

  const handleOnboardingComplete = (profile: any) => {
    setUserProfile(profile)
    setAppState("coach")
  }

  return (
    <main className="min-h-screen bg-background">
      {appState === "onboarding" ? (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      ) : (
        <CoachInterface userProfile={userProfile} />
      )}
    </main>
  )
}
