
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function EmailTemplates() {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Welcome Email', subject: 'Welcome to Our Service', body: 'Dear {{name}},\n\nWelcome to our service...' },
    { id: 2, name: 'Follow-up Email', subject: 'Following Up on Your Complaint', body: 'Dear {{name}},\n\nRegarding your complaint...' },
  ]);

  const handleSaveTemplate = () => {
    toast.success("Template saved successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Templates
        </CardTitle>
        <CardDescription>
          Manage your email templates for various communications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {templates.map((template) => (
          <div key={template.id} className="space-y-4 border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <Input 
                value={template.name} 
                className="font-medium w-[200px]" 
                placeholder="Template Name"
              />
              <Button onClick={handleSaveTemplate}>Save Template</Button>
            </div>
            <Input 
              value={template.subject} 
              placeholder="Email Subject" 
            />
            <Textarea 
              value={template.body}
              placeholder="Email Body"
              rows={6}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
