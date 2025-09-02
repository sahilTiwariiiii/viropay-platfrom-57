
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Medal, Share2, Mail, Link as LinkIcon, Download, Users, Clock, PieChart, Award, TrendingUp, HelpCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const ViropayExtensionTab = () => {
  // Mock data for the extension usage statistics
  const stats = {
    totalEmployees: 250,
    activeUsers: 175,
    adoptionRate: 70, // percentage
    averageUsage: 8.2, // average times used per week
  };

  // Calculate adoption status
  const getAdoptionStatus = () => {
    if (stats.adoptionRate >= 70) return { label: "High", color: "bg-green-500" };
    if (stats.adoptionRate >= 40) return { label: "Medium", color: "bg-amber-500" };
    return { label: "Low", color: "bg-red-500" };
  };

  const adoptionStatus = getAdoptionStatus();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Viropay Extension</h2>
          <p className="text-muted-foreground mt-1">Monitor adoption and usage of the Viropay browser extension across your organization</p>
        </div>
        <Button className="bg-saas-blue hover:bg-saas-blue/90">
          <Download className="h-4 w-4 mr-2" />
          Download Extension
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Adoption Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.adoptionRate}%</div>
              <Badge className={`${adoptionStatus.color} text-white`}>{adoptionStatus.label}</Badge>
            </div>
            <Progress value={stats.adoptionRate} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {stats.activeUsers} of {stats.totalEmployees} employees use the extension
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Weekly Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <div className="text-2xl font-bold">{stats.averageUsage} times</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Per active user
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">Finance</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              87% adoption rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Extension Benefits */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Benefits of High Adoption</CardTitle>
          <CardDescription>Why your company should aim for maximum extension usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-card">
              <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-medium">Increased Efficiency</h3>
              <p className="text-sm text-muted-foreground mt-2">Save up to 12 hours per employee each month on payment processing</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-card">
              <PieChart className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-medium">Better Analytics</h3>
              <p className="text-sm text-muted-foreground mt-2">Gain insights into spending patterns and optimize company expenses</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg bg-card">
              <Medal className="h-8 w-8 text-amber-500 mb-2" />
              <h3 className="font-medium">Compliance</h3>
              <p className="text-sm text-muted-foreground mt-2">Ensure all payments follow company policies and approval workflows</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Improvement Tips */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Adoption Improvement Tips</CardTitle>
          <CardDescription>Ways to increase extension usage across your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Email Campaign</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Send regular reminders highlighting benefits and time savings of using the extension.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2 text-xs">
                    <Mail className="h-3.5 w-3.5" />
                    Share via Email
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-green-100">
                  <LinkIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Direct Link Sharing</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share the extension link via company chat platforms and intranet for easy access.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2 text-xs">
                    <Share2 className="h-3.5 w-3.5" />
                    Copy Install Link
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-amber-100">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Department Champions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Assign extension champions in each department to help promote usage and provide support.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2 text-xs">
                    <Users className="h-3.5 w-3.5" />
                    View Champions
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-purple-100">
                  <HelpCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Training Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule regular training workshops to demonstrate the extension's features and benefits.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2 text-xs">
                    <HelpCircle className="h-3.5 w-3.5" />
                    Schedule Training
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViropayExtensionTab;
