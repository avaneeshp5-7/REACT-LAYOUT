
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import EmailTemplates from '@/components/settings/EmailTemplates';
import LeadCapture from '@/components/settings/LeadCapture';
import { ApiSettings } from '@/components/settings/ApiSettings';
import { SystemSettings } from '@/components/settings/SystemSettings';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="emailTemplates">Email Templates</TabsTrigger>
          <TabsTrigger value="leads">Lead Capture</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="emailTemplates">
          <EmailTemplates />
        </TabsContent>
        
        <TabsContent value="leads">
          <LeadCapture />
        </TabsContent>
        
        <TabsContent value="api">
          <ApiSettings />
        </TabsContent>
        
        <TabsContent value="system">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
