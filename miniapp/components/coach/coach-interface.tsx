"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import CoachChat from "./coach-chat"
import ImpactDashboard from "./impact-dashboard"
import ProgressTracker from "./progress-tracker"
import SuggestedActions from "./suggested-actions"
import { Leaf, Activity, TrendingUp, LogOut } from "lucide-react"

interface CoachInterfaceProps {
  userProfile: any
}

export default function CoachInterface({ userProfile }: CoachInterfaceProps) {
  const [suggestionsSeed] = useState(Math.random())

  const suggestedActions = [
    {
      id: "s1",
      title: "Bring reusable bags shopping",
      description: "Use your own bags instead of getting new plastic ones",
      category: "food" as const,
      difficulty: "easy" as const,
      impact: "~0.5kg waste saved",
      estimatedTime: "5 mins",
    },
    {
      id: "s2",
      title: "Reduce energy consumption",
      description: `Optimize energy use based on your living situation (${userProfile.housingType})`,
      category: "energy" as const,
      difficulty: userProfile.housingType === "Rent" ? "easy" : "medium",
      impact: "~1kg CO₂ saved",
      estimatedTime: "30 mins",
    },
    {
      id: "s3",
      title: "Use active transportation",
      description: `Try walking or biking for short trips using available options`,
      category: "transport" as const,
      difficulty: "medium" as const,
      impact: "~3kg CO₂ saved",
      estimatedTime: "varies",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-lg">EcoGuide AI</h1>
              <p className="text-xs text-muted-foreground">Your Sustainability Coach</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">{userProfile.location}</span>
            <Button variant="outline" size="sm" className="text-foreground border-border hover:bg-muted bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="coach" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="coach" className="flex gap-2">
              <Leaf className="w-4 h-4" />
              <span className="hidden sm:inline">Coach</span>
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Actions</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Impact</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coach" className="space-y-4">
            <CoachChat userProfile={userProfile} />
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            <SuggestedActions actions={suggestedActions} />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-4">
            <ImpactDashboard userProfile={userProfile} />
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <ProgressTracker userProfile={userProfile} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
