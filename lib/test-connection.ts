// lib/test-connection.ts
import { prisma } from './prisma'

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Conexión exitosa a PostgreSQL')
    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Error de conexión:', error)
  }
}

testConnection()