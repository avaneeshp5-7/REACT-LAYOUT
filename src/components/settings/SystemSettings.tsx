
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

export function SystemSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure system-wide settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-muted-foreground">
              Enable dark mode interface
            </p>
          </div>
          <Switch />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Automatic Logout</p>
            <p className="text-sm text-muted-foreground">
              Log out after 30 minutes of inactivity
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Data Management</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-muted-foreground mb-2">
                Export customer and complaint data in CSV format
              </p>
              <Button variant="outline">Export Database</Button>
            </div>
            
            <div>
              <p className="font-medium">System Logs</p>
              <p className="text-sm text-muted-foreground mb-2">
                Download system logs for troubleshooting
              </p>
              <Button variant="outline">Download Logs</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4 text-destructive">Danger Zone</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium">Clear Cache</p>
              <p className="text-sm text-muted-foreground mb-2">
                Clear the application cache
              </p>
              <Button variant="outline">Clear Cache</Button>
            </div>
            
            <div>
              <p className="font-medium">Reset All Settings</p>
              <p className="text-sm text-muted-foreground mb-2">
                Reset all settings to default values
              </p>
              <Button variant="destructive">Reset Settings</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
