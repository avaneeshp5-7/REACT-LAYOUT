
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newComplaint: true,
    statusChange: true,
    dailySummary: false,
  });
  
  const handleChange = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Configure how you want to be notified</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch
            checked={settings.emailNotifications}
            onCheckedChange={() => handleChange('emailNotifications')}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">SMS Notifications</p>
            <p className="text-sm text-muted-foreground">
              Receive notifications via SMS
            </p>
          </div>
          <Switch
            checked={settings.smsNotifications}
            onCheckedChange={() => handleChange('smsNotifications')}
          />
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Notification Events</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Complaint</p>
                <p className="text-sm text-muted-foreground">
                  When a new complaint is filed
                </p>
              </div>
              <Switch
                checked={settings.newComplaint}
                onCheckedChange={() => handleChange('newComplaint')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Complaint Status Change</p>
                <p className="text-sm text-muted-foreground">
                  When a complaint's status is updated
                </p>
              </div>
              <Switch
                checked={settings.statusChange}
                onCheckedChange={() => handleChange('statusChange')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Daily Summary</p>
                <p className="text-sm text-muted-foreground">
                  Receive a daily summary of activities
                </p>
              </div>
              <Switch
                checked={settings.dailySummary}
                onCheckedChange={() => handleChange('dailySummary')}
              />
            </div>
          </div>
        </div>
        
        <Button className="bg-nh-green hover:bg-nh-green-dark">
          Save Notification Settings
        </Button>
      </CardContent>
    </Card>
  );
}
