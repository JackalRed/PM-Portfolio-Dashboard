import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Eye, TrendingUp, DollarSign, Cloud, AlertTriangle, User } from 'lucide-react';
import { ValueStream, ProductManager, Product, ProductHorizon } from '../types';

interface ValueStreamCardProps {
  valueStream: ValueStream;
  productManager?: ProductManager;
  onProductSelect: (product: Product) => void;
  detailed?: boolean;
}

export function ValueStreamCard({ 
  valueStream, 
  productManager, 
  onProductSelect, 
  detailed = false 
}: ValueStreamCardProps) {
  const horizonColors: Record<ProductHorizon, string> = {
    'Idea': 'bg-blue-50 text-blue-700 border-blue-200',
    'Evaluation': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'Emerging': 'bg-green-50 text-green-700 border-green-200',
    'Investing': 'bg-purple-50 text-purple-700 border-purple-200',
    'Extracting': 'bg-orange-50 text-orange-700 border-orange-200',
    'Retiring': 'bg-gray-50 text-gray-700 border-gray-200'
  };

  const horizonDistribution = valueStream.products.reduce((acc, product) => {
    acc[product.horizon] = (acc[product.horizon] || 0) + 1;
    return acc;
  }, {} as Record<ProductHorizon, number>);

  const atRiskProducts = valueStream.products.filter(p => 
    p.risks.some(r => r.severity === 'High' || r.severity === 'Critical') ||
    p.milestones.some(m => m.status === 'At Risk')
  ).length;

  if (detailed) {
    return (
      <div className="space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-white to-red-50 rounded-t-lg border-0 border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">{valueStream.name}</CardTitle>
                <CardDescription className="text-sm mt-1">{valueStream.description}</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <Badge variant="secondary" className="font-medium">
                  {productManager?.name || 'Unassigned'}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Total Benefit</p>
                  <p className="text-lg font-bold text-green-700">${(valueStream.totalBenefit / 1000000).toFixed(1)}M</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Cloud className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Cloud Costs</p>
                  <p className="text-lg font-bold text-purple-700">${(valueStream.totalCloudCosts / 1000).toFixed(0)}K/mo</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">At Risk</p>
                  <p className="text-lg font-bold text-orange-700">{atRiskProducts} products</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {valueStream.products.map((product) => (
            <Card key={product.id} className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-primary border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-base font-semibold text-gray-900">{product.name}</CardTitle>
                  <Badge className={horizonColors[product.horizon]} variant="secondary">
                    {product.horizon}
                  </Badge>
                </div>
                <CardDescription className="text-xs text-gray-600">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Benefit</span>
                    <span className="font-semibold text-green-600">${(product.estimatedBenefit / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Cloud Cost</span>
                    <span className="font-semibold text-purple-600">${(product.cloudCosts / 1000).toFixed(0)}K</span>
                  </div>
                  {product.risks.length > 0 && (
                    <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded">
                      <AlertTriangle className="h-3 w-3 text-orange-500" />
                      <span className="text-xs text-orange-600 font-medium">
                        {product.risks.length} risk{product.risks.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  <Button 
                    size="sm" 
                    className="w-full mt-4 font-medium vodafone-shadow"
                    onClick={() => onProductSelect(product)}
                  >
                    <Eye className="mr-2 h-3 w-3" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-lg border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-white to-gray-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{valueStream.name}</CardTitle>
            <CardDescription className="text-sm mt-1">{valueStream.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <Badge variant="secondary" className="font-medium">
              {productManager?.name || 'Unassigned'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Products</p>
              <p className="text-2xl font-bold text-blue-700">{valueStream.products.length}</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Total Benefit</p>
              <p className="text-2xl font-bold vodafone-brand-text">${(valueStream.totalBenefit / 1000000).toFixed(1)}M</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Cloud Costs</p>
              <p className="text-2xl font-bold text-purple-700">${(valueStream.totalCloudCosts / 1000).toFixed(0)}K</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">At Risk</p>
              <p className="text-2xl font-bold text-orange-700">{atRiskProducts}</p>
            </div>
          </div>

          {/* Horizon Distribution */}
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-700">Horizon Distribution</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(horizonDistribution).map(([horizon, count]) => (
                <Badge 
                  key={horizon} 
                  variant="secondary"
                  className={`${horizonColors[horizon as ProductHorizon]} font-medium`}
                >
                  {horizon}: {count}
                </Badge>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-700">Top Products by Benefit</p>
            <div className="space-y-2">
              {valueStream.products
                .sort((a, b) => b.estimatedBenefit - a.estimatedBenefit)
                .slice(0, 3)
                .map((product) => (
                  <div 
                    key={product.id}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                    onClick={() => onProductSelect(product)}
                  >
                    <div className="flex items-center space-x-3">
                      <Badge 
                        className={`${horizonColors[product.horizon]} text-xs`}
                        variant="secondary"
                      >
                        {product.horizon[0]}
                      </Badge>
                      <span className="text-sm font-medium text-gray-700">{product.name}</span>
                    </div>
                    <span className="text-xs font-semibold vodafone-brand-text">
                      ${(product.estimatedBenefit / 1000000).toFixed(1)}M
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}