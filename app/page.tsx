"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  RefreshCw,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  Database,
  Users,
  Building,
  Mail,
  BarChart3,
} from "lucide-react"
import { SyncControls } from "./components/sync-controls"
import { ConfigurationPanel } from "./components/configuration-panel"
import { SyncLogs } from "./components/sync-logs"
import { SettingsPanel } from "./components/settings-panel"

export default function HubSpotSyncDashboard() {
  const [activeSync, setActiveSync] = useState(false)
  const [syncProgress, setSyncProgress] = useState(0)

  const syncStats = [
    { label: "Contacts", count: "12,543", status: "synced", icon: Users },
    { label: "Companies", count: "2,891", status: "synced", icon: Building },
    { label: "Deals", count: "1,247", status: "pending", icon: BarChart3 },
    { label: "Emails", count: "45,672", status: "error", icon: Mail },
  ]

  const recentSyncs = [
    { id: 1, type: "Full Sync", status: "completed", timestamp: "2 hours ago", duration: "45m" },
    { id: 2, type: "Incremental", status: "completed", timestamp: "6 hours ago", duration: "12m" },
    { id: 3, type: "Configuration", status: "failed", timestamp: "1 day ago", duration: "3m" },
    { id: 4, type: "Full Sync", status: "completed", timestamp: "2 days ago", duration: "52m" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">HubSpot Configuration Sync</h1>
                <p className="text-sm text-muted-foreground">Manage your HubSpot data synchronization</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={activeSync ? "default" : "secondary"}>{activeSync ? "Syncing" : "Idle"}</Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Status Alert */}
        {activeSync && (
          <Alert className="mb-6">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <AlertDescription>
              Synchronization in progress... {syncProgress}% complete
              <Progress value={syncProgress} className="mt-2" />
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {syncStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.count}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      {stat.status === "synced" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {stat.status === "pending" && <Clock className="w-4 h-4 text-yellow-500" />}
                      {stat.status === "error" && <XCircle className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="logs">Sync Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sync Controls */}
              <div className="lg:col-span-1">
                <SyncControls
                  activeSync={activeSync}
                  onToggleSync={() => setActiveSync(!activeSync)}
                  onProgressUpdate={setSyncProgress}
                />
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Sync Activity</CardTitle>
                    <CardDescription>Latest synchronization operations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentSyncs.map((sync) => (
                        <div key={sync.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                sync.status === "completed"
                                  ? "bg-green-500"
                                  : sync.status === "failed"
                                    ? "bg-red-500"
                                    : "bg-yellow-500"
                              }`}
                            />
                            <div>
                              <p className="font-medium">{sync.type}</p>
                              <p className="text-sm text-muted-foreground">{sync.timestamp}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                sync.status === "completed"
                                  ? "default"
                                  : sync.status === "failed"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {sync.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{sync.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="configuration">
            <ConfigurationPanel />
          </TabsContent>

          <TabsContent value="logs">
            <SyncLogs />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
