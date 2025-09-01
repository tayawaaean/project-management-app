'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Upload,
  Moon,
  Sun,
  Smartphone,
  Key
} from 'lucide-react'
import { mockUsers } from '@/lib/mockData'

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false)
  const [isPasswordConfirmModalOpen, setIsPasswordConfirmModalOpen] = useState(false)
  const currentUser = mockUsers[0] // Sarah Johnson

  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: 'Product Manager with 5+ years of experience in agile development and team leadership.',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskUpdates: true,
    projectUpdates: false,
    teamMentions: true,
    weeklyDigest: true
  })

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and profile details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback className="text-lg">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Change Avatar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[400px]">
                          <DialogHeader>
                            <DialogTitle>Change Avatar</DialogTitle>
                            <DialogDescription>
                              Upload a new profile picture.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div className="flex items-center justify-center">
                              <Avatar className="h-24 w-24">
                                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                <AvatarFallback className="text-lg">
                                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="avatar-upload">Select Image</Label>
                              <Input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                              />
                              <p className="text-xs text-muted-foreground">
                                JPG, GIF or PNG. Max size: 1MB
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload from URL
                              </Button>
                              <Button variant="outline" className="flex-1">
                                Remove
                              </Button>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAvatarModalOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => setIsAvatarModalOpen(false)}>
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <p className="text-sm text-muted-foreground">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Fields */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({...notifications, emailNotifications: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Task Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when tasks are assigned or updated
                        </p>
                      </div>
                      <Switch
                        checked={notifications.taskUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({...notifications, taskUpdates: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Project Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about project progress
                        </p>
                      </div>
                      <Switch
                        checked={notifications.projectUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({...notifications, projectUpdates: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Team Mentions</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when someone mentions you
                        </p>
                      </div>
                      <Switch
                        checked={notifications.teamMentions}
                        onCheckedChange={(checked) =>
                          setNotifications({...notifications, teamMentions: checked})
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Digest</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive a weekly summary of your activity
                        </p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) =>
                          setNotifications({...notifications, weeklyDigest: checked})
                        }
                      />
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize the look and feel of your dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Toggle between light and dark themes
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sun className="h-4 w-4" />
                        <Switch
                          checked={isDarkMode}
                          onCheckedChange={setIsDarkMode}
                        />
                        <Moon className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Theme Color</Label>
                      <div className="flex space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer border-2 border-blue-500" />
                        <div className="w-8 h-8 bg-green-500 rounded-full cursor-pointer" />
                        <div className="w-8 h-8 bg-purple-500 rounded-full cursor-pointer" />
                        <div className="w-8 h-8 bg-orange-500 rounded-full cursor-pointer" />
                        <div className="w-8 h-8 bg-pink-500 rounded-full cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Save className="mr-2 h-4 w-4" />
                    Apply Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account.
                    </p>
                    <Dialog open={isTwoFactorModalOpen} onOpenChange={setIsTwoFactorModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Smartphone className="mr-2 h-4 w-4" />
                          Enable 2FA
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
                          <DialogDescription>
                            Add an extra layer of security to your account by enabling 2FA.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                          <div className="space-y-4">
                            <h4 className="font-medium">Step 1: Install an Authenticator App</h4>
                            <p className="text-sm text-muted-foreground">
                              Download and install an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator on your phone.
                            </p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Download Google Authenticator
                              </Button>
                              <Button variant="outline" size="sm">
                                Download Authy
                              </Button>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h4 className="font-medium">Step 2: Scan QR Code</h4>
                            <p className="text-sm text-muted-foreground">
                              Open your authenticator app and scan this QR code to add your account.
                            </p>
                            <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg">
                              <div className="text-center">
                                <Key className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                                <p className="text-sm text-muted-foreground">QR Code will be generated</p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-4">
                            <h4 className="font-medium">Step 3: Enter Verification Code</h4>
                            <p className="text-sm text-muted-foreground">
                              Enter the 6-digit code from your authenticator app to verify and enable 2FA.
                            </p>
                            <div className="flex gap-2">
                              <Input
                                placeholder="000000"
                                maxLength={6}
                                className="text-center text-lg tracking-widest"
                              />
                              <Button>Verify</Button>
                            </div>
                          </div>
                        </div>

                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsTwoFactorModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button disabled>
                            Enable 2FA
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Dialog open={isPasswordConfirmModalOpen} onOpenChange={setIsPasswordConfirmModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                        <Save className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px]">
                      <DialogHeader>
                        <DialogTitle>Confirm Password Change</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to update your password? You'll need to log in again with the new password.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="py-4">
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password-input">Type "CONFIRM" to proceed</Label>
                          <Input
                            id="confirm-password-input"
                            placeholder="CONFIRM"
                            className="text-center"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                          This action will log you out of all devices and require you to sign in again.
                        </p>
                      </div>

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPasswordConfirmModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => setIsPasswordConfirmModalOpen(false)}
                          disabled
                        >
                          Update Password
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
