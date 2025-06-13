"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Clock, Database, Mail, Slack, Webhook, Save, RotateCcw } from "lucide-react"

export function SettingsPanel() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [slackNotifications, setSlackNotifications] = useState(false)
  const [syncFrequency, setSyncFrequency] = useState("hourly")
  const [retryAttempts, setRetryAttempts] = useState("3")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Application Settings
          </CardTitle>
          <CardDescription>Configure your HubSpot sync application preferences</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Sync Schedule
              </CardTitle>
              <CardDescription>Configure automatic synchronization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sync-frequency">Sync Frequency</Label>
                  <Select value={syncFrequency} onValueChange={setSyncFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="15min">Every 15 minutes</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retry-attempts">Retry Attempts</Label>
                  <Select value={retryAttempts} onValueChange={setRetryAttempts}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 attempt</SelectItem>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-sync" defaultChecked />
                  <Label htmlFor="auto-sync">Enable automatic synchronization</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sync-on-startup" />
                  <Label htmlFor="sync-on-startup">Sync on application startup</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="pause-on-error" defaultChecked />
                  <Label htmlFor="pause-on-error">Pause sync on consecutive errors</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Configure how you want to be notified about sync events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive email alerts for sync events</p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Slack className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Slack Notifications</p>
                        <p className="text-sm text-muted-foreground">Send alerts to Slack channel</p>
                      </div>
                    </div>
                    <Switch checked={slackNotifications} onCheckedChange={setSlackNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Webhook className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Webhook Notifications</p>
                        <p className="text-sm text-muted-foreground">Send HTTP webhooks for events</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>

                {emailNotifications && (
                  <div className="border rounded-lg p-4 space-y-3">
                    <h4 className="font-medium">Email Settings</h4>
                    <div className="space-y-2">
                      <Label htmlFor="email-address">Notification Email</Label>
                      <Input id="email-address" type="email" placeholder="admin@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Notify On</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="notify-success" />
                          <Label htmlFor="notify-success">Successful syncs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="notify-errors" defaultChecked />
                          <Label htmlFor="notify-errors">Sync errors</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="notify-warnings" />
                          <Label htmlFor="notify-warnings">Warnings</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage security and access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="encrypt-data" defaultChecked />
                  <Label htmlFor="encrypt-data">Encrypt data at rest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="audit-logs" defaultChecked />
                  <Label htmlFor="audit-logs">Enable audit logging</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="ip-whitelist" />
                  <Label htmlFor="ip-whitelist">Enable IP whitelisting</Label>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium">API Key Management</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Current API Key</p>
                    <p className="text-xs text-muted-foreground">Last rotated: 30 days ago</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
                <Button variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Rotate API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>Advanced configuration options for power users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batch-size">Batch Size</Label>
                  <Input id="batch-size" type="number" placeholder="100" defaultValue="100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                  <Input id="timeout" type="number" placeholder="30" defaultValue="30" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="debug-mode" />
                  <Label htmlFor="debug-mode">Enable debug mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="verbose-logging" />
                  <Label htmlFor="verbose-logging">Verbose logging</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="performance-metrics" />
                  <Label htmlFor="performance-metrics">Collect performance metrics</Label>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-destructive">Danger Zone</h4>
                <p className="text-sm text-muted-foreground">
                  These actions cannot be undone. Please proceed with caution.
                </p>
                <div className="space-y-2">
                  <Button variant="destructive" size="sm">
                    Reset All Settings
                  </Button>
                  <Button variant="destructive" size="sm">
                    Clear All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  )
}
