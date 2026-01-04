#!/usr/bin/env node
/**
 * Test Basic Strapi Connection
 * Test if Strapi is running and accessible
 */

const axios = require('axios');

// Configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

console.log('🔍 Testing basic Strapi connection...');
console.log('📍 Strapi URL:', STRAPI_URL);

async function testBasicStrapi() {
  try {
    console.log('\n🔍 Testing Strapi health endpoint...');
    const healthResponse = await axios.get(`${STRAPI_URL}/_health`, {
      timeout: 5000
    });
    console.log('✅ Strapi health check passed:', healthResponse.status);

  } catch (error) {
    console.log('❌ Health check failed, trying admin endpoint...');
    
    try {
      const adminResponse = await axios.get(`${STRAPI_URL}/admin`, {
        timeout: 5000
      });
      console.log('✅ Strapi admin accessible:', adminResponse.status);
    } catch (adminError) {
      console.log('❌ Admin endpoint failed, trying API root...');
      
      try {
        const apiResponse = await axios.get(`${STRAPI_URL}/api`, {
          timeout: 5000
        });
        console.log('✅ Strapi API root accessible:', apiResponse.status);
        console.log('📊 Available endpoints:', Object.keys(apiResponse.data || {}));
      } catch (apiError) {
        console.error('❌ All endpoints failed:');
        console.error('   Health:', error.message);
        console.error('   Admin:', adminError.message);
        console.error('   API:', apiError.message);
        console.error('\n💡 Make sure Strapi is running on', STRAPI_URL);
      }
    }
  }
}

testBasicStrapi();
