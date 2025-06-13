"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Database, Key, Filter, Save, TestTube } from "lucide-react"

export function ConfigurationPanel() {
  const [apiKey, setApiKey] = useState("")
  const [portalId, setPortalId] = useState("")
  const [syncEnabled, setSyncEnabled] = useState(true)

  const objectTypes = [
    { name: "Contacts", enabled: true, lastSync: "2 hours ago" },
    { name: "Companies", enabled: true, lastSync: "2 hours ago" },
    { name: "Deals", enabled: false, lastSync: "Never" },
    { name: "Tickets", enabled: true, lastSync: "1 day ago" },
    { name: "Products", enabled: false, lastSync: "Never" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            HubSpot Configuration
          </CardTitle>
          <CardDescription>Configure your HubSpot API connection and sync settings</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="connection" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="objects">Objects</TabsTrigger>
          <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
          <TabsTrigger value="filters">Filters</TabsTrigger>
        </TabsList>

        <TabsContent value="connection">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Connection
              </CardTitle>
              <CardDescription>Configure your HubSpot API credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="portal-id">Portal ID</Label>
                  <Input
                    id="portal-id"
                    placeholder="Enter your HubSpot Portal ID"
                    value={portalId}
                    onChange={(e) => setPortalId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your HubSpot API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="sync-enabled" checked={syncEnabled} onCheckedChange={setSyncEnabled} />
                <Label htmlFor="sync-enabled">Enable automatic synchronization</Label>
              </div>

              <div className="flex gap-2">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
                <Button variant="outline">
                  <TestTube className="w-4 h-4 mr-2" />
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objects">
          <Card>
            <CardHeader>
              <CardTitle>Object Synchronization</CardTitle>
              <CardDescription>Configure which HubSpot objects to synchronize</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {objectTypes.map((object, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Switch checked={object.enabled} />
                      <div>
                        <p className="font-medium">{object.name}</p>
                        <p className="text-sm text-muted-foreground">Last sync: {object.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={object.enabled ? "default" : "secondary"}>
                        {object.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping">
          <Card>
            <CardHeader>
              <CardTitle>Field Mapping</CardTitle>
              <CardDescription>Map HubSpot fields to your local database fields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>HubSpot Field</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select HubSpot field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="firstname">First Name</SelectItem>
                        <SelectItem value="lastname">Last Name</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Local Field</Label>
                    <Input placeholder="Enter local field name" />
                  </div>
                  <div className="flex items-end">
                    <Button>Add Mapping</Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Current Mappings</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>firstname → first_name</span>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>lastname → last_name</span>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>email → email_address</span>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filters">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Sync Filters
              </CardTitle>
              <CardDescription>Configure filters to control which data gets synchronized</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date-filter">Date Range Filter</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="custom-filter">Custom Filter Query</Label>
                <Textarea
                  id="custom-filter"
                  placeholder="Enter custom HubSpot filter query..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="exclude-deleted" />
                <Label htmlFor="exclude-deleted">Exclude deleted records</Label>
              </div>

              <Button>Apply Filters</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
