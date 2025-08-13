import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  ArrowLeft, 
  Calendar, 
  AlertTriangle, 
  Users, 
  TrendingUp, 
  Cloud,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Building2
} from 'lucide-react';
import { Product, Risk } from '../types';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetailView({ product, onBack }: ProductDetailViewProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'At Risk':
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'Not Started':
        return <XCircle className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getRiskSeverityColor = (severity: Risk['severity']) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'High':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRaciColor = (role: string) => {
    switch (role) {
      case 'Responsible':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Accountable':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Consulted':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Informed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Vodafone Header */}
      <div className="vodafone-header-bg p-6 mb-8">
        <div className="mx-auto max-w-6xl">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 hover:bg-white hover:shadow-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 vodafone-gradient rounded-lg flex items-center justify-center vodafone-shadow">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                  <Badge variant="secondary" className="font-medium">{product.horizon}</Badge>
                </div>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Key Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 border-l-primary hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Estimated Benefit</CardTitle>
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold vodafone-brand-text">${(product.estimatedBenefit / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground mt-1">Annual value</p>
            </CardContent>
          </Card>

          <Card className="border-0 border-l-primary hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Cloud Costs</CardTitle>
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Cloud className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">${(product.cloudCosts / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground mt-1">Monthly spend</p>
            </CardContent>
          </Card>

          <Card className="border-0 border-l-primary hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Milestones</CardTitle>
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{product.milestones.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {product.milestones.filter(m => m.status === 'Completed').length} completed
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 border-l-primary hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Risks</CardTitle>
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{product.risks.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {product.risks.filter(r => r.severity === 'High' || r.severity === 'Critical').length} high/critical
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50 p-1 rounded-lg">
            <TabsTrigger value="roadmap" className="font-medium">Roadmap</TabsTrigger>
            <TabsTrigger value="risks" className="font-medium">Risks</TabsTrigger>
            <TabsTrigger value="stakeholders" className="font-medium">Stakeholders</TabsTrigger>
            <TabsTrigger value="raci" className="font-medium">RACI Matrix</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-4 mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-white to-blue-50 rounded-t-lg">
                <CardTitle className="text-lg font-semibold">Key Milestones</CardTitle>
                <CardDescription>
                  Important milestones and their current status
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {product.milestones.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No milestones defined yet
                  </p>
                ) : (
                  <div className="space-y-6">
                    {product.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border-0 border-l-blue-500">
                        <div className="mt-0.5">
                          {getStatusIcon(milestone.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                            <Badge 
                              variant="secondary"
                              className={
                                milestone.status === 'Completed' 
                                  ? 'bg-green-50 text-green-700 border-green-200'
                                  : milestone.status === 'At Risk'
                                  ? 'bg-red-50 text-red-700 border-red-200'
                                  : milestone.status === 'In Progress'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-gray-50 text-gray-700 border-gray-200'
                              }
                            >
                              {milestone.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {milestone.description}
                          </p>
                          <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                            <span className="font-medium">Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                            <span className="font-medium">Owner: {milestone.owner}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="space-y-4 mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-white to-orange-50 rounded-t-lg">
                <CardTitle className="text-lg font-semibold">Risk Management</CardTitle>
                <CardDescription>
                  Identified risks and mitigation strategies
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {product.risks.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No risks identified
                  </p>
                ) : (
                  <div className="space-y-6">
                    {product.risks.map((risk) => (
                      <div key={risk.id} className="border-0 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{risk.title}</h4>
                          <div className="flex space-x-2">
                            <Badge className={`${getRiskSeverityColor(risk.severity)} font-medium`}>
                              {risk.severity}
                            </Badge>
                            <Badge variant="outline" className="font-medium">
                              {risk.probability} Probability
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {risk.description}
                        </p>
                        <div className="bg-white rounded-lg p-3 border-0 border-l-orange-500">
                          <p className="text-sm">
                            <strong className="text-gray-700">Mitigation:</strong> {risk.mitigation}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2 font-medium">
                            Owner: {risk.owner}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stakeholders" className="space-y-4 mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-white to-green-50 rounded-t-lg">
                <CardTitle className="text-lg font-semibold">Stakeholder Overview</CardTitle>
                <CardDescription>
                  Key stakeholders and their involvement
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {product.stakeholders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No stakeholders defined
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {product.stakeholders.map((stakeholder) => (
                      <Card key={stakeholder.id} className="border-0 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900">{stakeholder.name}</h4>
                            <Badge className={`${getRaciColor(stakeholder.raciRole)} font-medium`}>
                              {stakeholder.raciRole}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 font-medium">
                            {stakeholder.role}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stakeholder.email}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="raci" className="space-y-4 mt-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-white to-purple-50 rounded-t-lg">
                <CardTitle className="text-lg font-semibold">RACI Matrix</CardTitle>
                <CardDescription>
                  Responsibility assignment matrix for key activities
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {product.stakeholders.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No RACI matrix defined
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Stakeholder</TableHead>
                        <TableHead className="font-semibold">Role</TableHead>
                        <TableHead className="font-semibold">RACI Role</TableHead>
                        <TableHead className="font-semibold">Contact</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.stakeholders.map((stakeholder) => (
                        <TableRow key={stakeholder.id}>
                          <TableCell className="font-medium">{stakeholder.name}</TableCell>
                          <TableCell>{stakeholder.role}</TableCell>
                          <TableCell>
                            <Badge className={`${getRaciColor(stakeholder.raciRole)} font-medium`}>
                              {stakeholder.raciRole}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {stakeholder.email}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-white to-gray-50 rounded-t-lg">
                <CardTitle className="text-lg font-semibold">RACI Legend</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Badge className="bg-blue-100 text-blue-700 font-bold">R</Badge>
                    <span className="text-sm font-medium">Responsible - Does the work</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Badge className="bg-purple-100 text-purple-700 font-bold">A</Badge>
                    <span className="text-sm font-medium">Accountable - Signs off</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Badge className="bg-green-100 text-green-700 font-bold">C</Badge>
                    <span className="text-sm font-medium">Consulted - Provides input</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Badge className="bg-gray-100 text-gray-700 font-bold">I</Badge>
                    <span className="text-sm font-medium">Informed - Kept in the loop</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}