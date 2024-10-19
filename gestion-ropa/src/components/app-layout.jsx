'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InventoryManagement from './inventory-management'
import SalesPage from './SalesPage'
import SalesManagement from './SalesManagement'

export default function AppLayout({ isAdmin = false, userId = 1 }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Sistema de Gestión y Ventas de Ropa</h1>
      <Tabs defaultValue="inventory">
        <TabsList>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="salesManagement">Gestión de Ventas</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
          <InventoryManagement  isAdmin={isAdmin} />
        </TabsContent>
        <TabsContent value="sales">
          <SalesPage />
        </TabsContent>
        <TabsContent value="salesManagement">
          <SalesManagement isAdmin={isAdmin} userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}