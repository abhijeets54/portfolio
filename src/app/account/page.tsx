'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCustomer } from '@/components/providers/CustomerProvider';
import Loader from '@/components/ui/loader';
import { Package, User, MapPin, CreditCard, LogOut } from 'lucide-react';

export default function AccountPage() {
  const { customer, isLoading, logout, isAuthenticated } = useCustomer();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect to sign-in if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!customer) {
    return null; // Will redirect to sign-in
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif text-3xl text-[#2c2c27] mb-2">My Account</h1>
        <p className="text-[#8a8778] mb-8">
          Welcome back, {customer.firstName} {customer.lastName}
        </p>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Manage your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#5c5c52]">First Name</h3>
                    <p className="text-[#2c2c27]">{customer.firstName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#5c5c52]">Last Name</h3>
                    <p className="text-[#2c2c27]">{customer.lastName}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#5c5c52]">Email</h3>
                  <p className="text-[#2c2c27]">{customer.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#5c5c52]">Phone</h3>
                  <p className="text-[#2c2c27]">{customer.phone || 'Not provided'}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Edit Profile</Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View and track your orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {customer.orders && customer.orders.edges.length > 0 ? (
                  <div className="space-y-6">
                    {customer.orders.edges.map((edge: any) => {
                      const order = edge.node;
                      return (
                        <div key={order.id} className="border border-[#e5e2d9] p-4 rounded-md">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-medium text-[#2c2c27]">Order #{order.orderNumber}</h3>
                              <p className="text-sm text-[#8a8778]">
                                Placed on {new Date(order.processedAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-[#2c2c27]">
                                ${order.totalPrice.amount} {order.totalPrice.currencyCode}
                              </p>
                              <span className={`text-xs px-2 py-1 rounded ${
                                order.fulfillmentStatus === 'FULFILLED' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.fulfillmentStatus || 'PROCESSING'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {order.lineItems.edges.map((lineEdge: any) => {
                              const item = lineEdge.node;
                              return (
                                <div key={item.title} className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-[#f4f3f0] relative">
                                    {item.variant?.image && (
                                      <img 
                                        src={item.variant.image.url} 
                                        alt={item.title}
                                        className="object-cover w-full h-full"
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-[#2c2c27]">{item.title}</p>
                                    <p className="text-xs text-[#8a8778]">
                                      Qty: {item.quantity} × ${item.variant?.price.amount}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-[#e5e2d9] flex justify-end">
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#8a8778] mb-4">You haven't placed any orders yet.</p>
                    <Button onClick={() => router.push('/collection')}>
                      Start Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>
                  Manage your shipping and billing addresses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {customer.addresses && customer.addresses.edges.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {customer.addresses.edges.map((edge: any) => {
                      const address = edge.node;
                      const isDefault = customer.defaultAddress && customer.defaultAddress.id === address.id;
                      
                      return (
                        <div 
                          key={address.id} 
                          className={`border p-4 rounded-md ${isDefault ? 'border-[#8a8778] bg-[#f8f8f5]' : 'border-[#e5e2d9]'}`}
                        >
                          {isDefault && (
                            <div className="mb-2 text-xs text-[#8a8778] font-medium">Default Address</div>
                          )}
                          <p className="font-medium text-[#2c2c27]">
                            {address.address1}
                          </p>
                          {address.address2 && (
                            <p className="text-[#2c2c27]">{address.address2}</p>
                          )}
                          <p className="text-[#2c2c27]">
                            {address.city}, {address.province} {address.zip}
                          </p>
                          <p className="text-[#2c2c27]">{address.country}</p>
                          {address.phone && (
                            <p className="text-[#5c5c52] mt-2">{address.phone}</p>
                          )}
                          
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            {!isDefault && (
                              <Button variant="outline" size="sm">Set as Default</Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#8a8778] mb-4">You don't have any saved addresses.</p>
                    <Button>Add Address</Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button>Add New Address</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-[#8a8778] mb-4">
                    Payment methods are securely managed through Shopify Checkout.
                  </p>
                  <p className="text-[#5c5c52]">
                    Your payment information is securely stored and processed by Shopify's payment system.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
} 