
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export function ApiSettings() {
  const [apiForm, setApiForm] = useState({
    apiKey: 'NH-API-xxxxxxxxxxxxxxxxxxxxxxxx',
    brsEndpoint: 'https://api.brs.nonghyup.com/v1',
  });
  
  const handleApiFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApiForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleApiSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('API settings updated successfully');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Configure the BRS API integration settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleApiSettingsSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                name="apiKey"
                value={apiForm.apiKey}
                onChange={handleApiFormChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brsEndpoint">BRS API Endpoint</Label>
              <Input
                id="brsEndpoint"
                name="brsEndpoint"
                value={apiForm.brsEndpoint}
                onChange={handleApiFormChange}
              />
            </div>
            
            <div className="pt-2 flex flex-col space-y-2">
              <Button type="button" variant="outline" className="w-full">
                Test Connection
              </Button>
              <Button type="submit" className="bg-nh-green hover:bg-nh-green-dark w-full">
                Save API Settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Synchronization</CardTitle>
          <CardDescription>Configure data sync between CRM and BRS</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-Sync Customer Data</p>
              <p className="text-sm text-muted-foreground">
                Automatically sync customer data from BRS
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sync Business Ratings</p>
              <p className="text-sm text-muted-foreground">
                Import business ratings from BRS
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Complaints to BRS</p>
              <p className="text-sm text-muted-foreground">
                Send complaint data to BRS system
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="pt-2">
            <Button className="bg-nh-green hover:bg-nh-green-dark">
              Run Manual Sync Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
