"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Droplet, Wind, Leaf, Zap } from "lucide-react"

interface ImpactDashboardProps {
  userProfile: any
}

const mockImpactData = [
  { week: "Week 1", co2: 2.5, water: 15, waste: 3.2 },
  { week: "Week 2", co2: 2.3, water: 14, waste: 2.8 },
  { week: "Week 3", co2: 2.1, water: 12, waste: 2.5 },
  { week: "Week 4", co2: 1.9, water: 11, waste: 2.1 },
]

export default function ImpactDashboard({ userProfile }: ImpactDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Wind className="w-4 h-4 text-primary" />
              CO₂ Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">8.8 kg</div>
            <p className="text-xs text-muted-foreground mt-1">~1 tree planted worth</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Droplet className="w-4 h-4 text-accent" />
              Water Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">52 liters</div>
            <p className="text-xs text-muted-foreground mt-1">~4 baths worth</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Leaf className="w-4 h-4 text-secondary" />
              Waste Reduced
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">10.6 kg</div>
            <p className="text-xs text-muted-foreground mt-1">From landfill</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Streak Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground mt-1">Keep it going! 🔥</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Impact Over Time</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your estimated environmental impact reduction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockImpactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Legend />
              <Line type="monotone" dataKey="co2" stroke="var(--color-primary)" name="CO₂ (kg)" strokeWidth={2} />
              <Line type="monotone" dataKey="water" stroke="var(--color-accent)" name="Water (L)" strokeWidth={2} />
              <Line type="monotone" dataKey="waste" stroke="var(--color-secondary)" name="Waste (kg)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-border/50 bg-muted/20">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>📊 About these estimates:</strong> These numbers are based on your reported actions and estimated
            averages. They're meant to inspire and track progress, not provide scientific certainty. Real impact varies
            based on many factors.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
