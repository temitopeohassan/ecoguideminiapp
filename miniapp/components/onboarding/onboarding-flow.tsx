"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Home, Zap, MapPin, DollarSign, Heart } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: (profile: any) => void
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    location: "",
    housingType: "",
    transportOptions: [],
    timeAvailability: "",
    budgetSensitivity: "",
    sustainabilityInterests: [],
  })

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1)
    } else {
      onComplete(profile)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const updateProfile = (key: string, value: any) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  const progressPercent = (step / 6) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">Welcome to EcoGuide AI</h1>
            <span className="text-sm text-muted-foreground">Step {step} of 6</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-foreground">{getStepTitle(step)}</CardTitle>
            <CardDescription className="text-base text-muted-foreground">{getStepDescription(step)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && <LocationStep profile={profile} updateProfile={updateProfile} />}
            {step === 2 && <HousingStep profile={profile} updateProfile={updateProfile} />}
            {step === 3 && <TransportStep profile={profile} updateProfile={updateProfile} />}
            {step === 4 && <TimeStep profile={profile} updateProfile={updateProfile} />}
            {step === 5 && <BudgetStep profile={profile} updateProfile={updateProfile} />}
            {step === 6 && <InterestsStep profile={profile} updateProfile={updateProfile} />}

            {/* Navigation */}
            <div className="flex gap-3 pt-6 justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
                className="text-foreground border-border hover:bg-muted bg-transparent"
              >
                Previous
              </Button>
              <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {step === 6 ? "Get Started" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust Message */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          We keep your data private and never sell your information. Your profile helps us provide personalized
          recommendations.
        </p>
      </div>
    </div>
  )
}

function LocationStep({ profile, updateProfile }: any) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-start mb-4">
        <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
        <p className="text-sm text-foreground">This helps us understand local sustainability options.</p>
      </div>
      <input
        type="text"
        placeholder="Enter your city or region..."
        value={profile.location}
        onChange={(e) => updateProfile("location", e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  )
}

function HousingStep({ profile, updateProfile }: any) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-start mb-4">
        <Home className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
        <p className="text-sm text-foreground">Your housing situation affects sustainability options.</p>
      </div>
      <div className="grid gap-3">
        {["Rent", "Own"].map((type) => (
          <button
            key={type}
            onClick={() => updateProfile("housingType", type)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              profile.housingType === type
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="font-medium text-foreground">{type}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {type === "Rent" ? "Limited control over major changes" : "Full control over improvements"}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function TransportStep({ profile, updateProfile }: any) {
  const options = ["Car", "Public Transit", "Bike", "Walking"]

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-start mb-4">
        <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
        <p className="text-sm text-foreground">Select all transportation options available to you.</p>
      </div>
      <div className="grid gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              const newOptions = profile.transportOptions.includes(option)
                ? profile.transportOptions.filter((o: string) => o !== option)
                : [...profile.transportOptions, option]
              updateProfile("transportOptions", newOptions)
            }}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              profile.transportOptions.includes(option)
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="font-medium text-foreground">{option}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function TimeStep({ profile, updateProfile }: any) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-start mb-4">
        <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
        <p className="text-sm text-foreground">How much time can you realistically dedicate weekly?</p>
      </div>
      <div className="grid gap-3">
        {["Less than 1 hour", "1-3 hours", "3-5 hours", "More than 5 hours"].map((time) => (
          <button
            key={time}
            onClick={() => updateProfile("timeAvailability", time)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              profile.timeAvailability === time
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="font-medium text-foreground">{time}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function BudgetStep({ profile, updateProfile }: any) {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-start mb-4">
        <DollarSign className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
        <p className="text-sm text-foreground">Budget constraints help us suggest realistic actions.</p>
      </div>
      <div className="grid gap-3">
        {[
          "No budget for new spending",
          "Small budget ($10-50/mo)",
          "Moderate budget ($50-200/mo)",
          "Flexible budget",
        ].map((budget) => (
          <button
            key={budget}
            onClick={() => updateProfile("budgetSensitivity", budget)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              profile.budgetSensitivity === budget
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="font-medium text-foreground">{budget}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function InterestsStep({ profile, updateProfile }: any) {
  const interests = ["Food & Waste", "Energy", "Water", "Transportation", "Community"]

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-start mb-4">
        <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
        <p className="text-sm text-foreground">What areas interest you most? (Select at least one)</p>
      </div>
      <div className="grid gap-3">
        {interests.map((interest) => (
          <button
            key={interest}
            onClick={() => {
              const newInterests = profile.sustainabilityInterests.includes(interest)
                ? profile.sustainabilityInterests.filter((i: string) => i !== interest)
                : [...profile.sustainabilityInterests, interest]
              updateProfile("sustainabilityInterests", newInterests)
            }}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              profile.sustainabilityInterests.includes(interest)
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="font-medium text-foreground">{interest}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function getStepTitle(step: number): string {
  const titles = [
    "Where do you live?",
    "What's your housing situation?",
    "How do you get around?",
    "How much time can you dedicate?",
    "What's your budget?",
    "What interests you?",
  ]
  return titles[step - 1]
}

function getStepDescription(step: number): string {
  const descriptions = [
    "Help us understand your location and local context",
    "This affects what sustainability options are available to you",
    "Transportation is a major area for environmental impact",
    "We want to suggest realistic, achievable actions",
    "Cost matters—sustainability should be equitable",
    "Focus on areas that matter most to you",
  ]
  return descriptions[step - 1]
}
