
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";

export default function LeadCapture() {
  const handleSave = () => {
    toast.success("Lead capture settings saved");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Lead Capture
        </CardTitle>
        <CardDescription>
          Configure lead capture form settings and integrations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-medium">Enable Lead Form</div>
            <div className="text-sm text-muted-foreground">
              Display lead capture form on website
            </div>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Form Redirect URL</label>
          <Input 
            placeholder="https://example.com/thank-you" 
            defaultValue="https://yourdomain.com/thank-you"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Webhook URL</label>
          <Input 
            placeholder="https://api.example.com/webhook" 
          />
        </div>

        <Button onClick={handleSave}>Save Settings</Button>
      </CardContent>
    </Card>
  );
}
