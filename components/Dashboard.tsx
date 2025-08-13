import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Eye, TrendingUp, DollarSign, Cloud, Users, Building2 } from 'lucide-react';
import { ValueStream, Product, ProductHorizon } from '../types';
import { mockValueStreams, mockProductManagers } from '../data/mockData';
import { ValueStreamCard } from './ValueStreamCard';
import { ProductDetailView } from './ProductDetailView';

export function Dashboard() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<'executive' | 'detailed'>('executive');

  const totalProducts = mockValueStreams.reduce((acc, vs) => acc + vs.products.length, 0);
  const totalBenefit = mockValueStreams.reduce((acc, vs) => acc + vs.totalBenefit, 0);
  const totalCloudCosts = mockValueStreams.reduce((acc, vs) => acc + vs.totalCloudCosts, 0);

  // Calculate horizon distribution
  const horizonDistribution = mockValueStreams
    .flatMap(vs => vs.products)
    .reduce((acc, product) => {
      acc[product.horizon] = (acc[product.horizon] || 0) + 1;
      return acc;
    }, {} as Record<ProductHorizon, number>);

  const horizons: ProductHorizon[] = ['Idea', 'Evaluation', 'Emerging', 'Investing', 'Extracting', 'Retiring'];

  if (selectedProduct) {
    return (
      <ProductDetailView 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Vodafone Header */}
      <div className="vodafone-header-bg p-6 mb-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 vodafone-gradient rounded-lg flex items-center justify-center vodafone-shadow">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    Product Portfolio 
                    <span className="vodafone-brand-text ml-2">Dashboard</span>
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Executive overview of value streams and product portfolio
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant={viewMode === 'executive' ? 'default' : 'outline'}
                onClick={() => setViewMode('executive')}
                className="font-medium"
              >
                <Eye className="mr-2 h-4 w-4" />
                Executive View
              </Button>
              <Button
                variant={viewMode === 'detailed' ? 'default' : 'outline'}
                onClick={() => setViewMode('detailed')}
                className="font-medium"
              >
                <Users className="mr-2 h-4 w-4" />
                Detailed View
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Key Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 border-l-primary hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Total Products</CardTitle>
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {mockValueStreams.length} value streams
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 border-l-primary hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">Portfolio Benefit</CardTitle>
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold vodafone-brand-text">${(totalBenefit / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground mt-1">
                Estimated annual benefit
              </p>
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
              <div className="text-2xl font-bold text-gray-900">${(totalCloudCosts / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground mt-1">
                Monthly cloud spend
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 border-l-primary hover:shadow-lg transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-gray-700">ROI</CardTitle>
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold vodafone-brand-text">
                {Math.round((totalBenefit / (totalCloudCosts * 12)) * 100) / 100}x
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Annual benefit to cost ratio
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Horizon Distribution */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-red-50 rounded-t-lg">
            <CardTitle className="text-lg font-semibold">Product Horizon Distribution</CardTitle>
            <CardDescription className="text-sm">
              Distribution of products across different development horizons
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {horizons.map((horizon) => {
                const count = horizonDistribution[horizon] || 0;
                const percentage = totalProducts > 0 ? (count / totalProducts) * 100 : 0;
                
                return (
                  <div key={horizon} className="flex items-center space-x-4">
                    <div className="w-24 text-sm font-medium text-gray-700">{horizon}</div>
                    <div className="flex-1">
                      <Progress value={percentage} className="h-3" />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium min-w-[120px] text-right">
                      {count} products ({Math.round(percentage)}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Value Streams */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50 p-1 rounded-lg">
            <TabsTrigger value="overview" className="font-medium">Overview</TabsTrigger>
            {mockValueStreams.map((vs) => (
              <TabsTrigger key={vs.id} value={vs.id} className="font-medium">
                {vs.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {mockValueStreams.map((valueStream) => (
                <ValueStreamCard
                  key={valueStream.id}
                  valueStream={valueStream}
                  productManager={mockProductManagers.find(pm => pm.id === valueStream.productManagerId)}
                  onProductSelect={setSelectedProduct}
                />
              ))}
            </div>
          </TabsContent>

          {mockValueStreams.map((valueStream) => (
            <TabsContent key={valueStream.id} value={valueStream.id} className="mt-6">
              <ValueStreamCard
                valueStream={valueStream}
                productManager={mockProductManagers.find(pm => pm.id === valueStream.productManagerId)}
                onProductSelect={setSelectedProduct}
                detailed={true}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}