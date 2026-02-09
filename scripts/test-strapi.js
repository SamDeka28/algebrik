#!/usr/bin/env node
/**
 * Test Strapi Connection
 * Simple script to test if Strapi is accessible
 */

const axios = require('axios');

// Configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

console.log('🔍 Testing Strapi connection...');
console.log('📍 Strapi URL:', STRAPI_URL);
console.log('🔑 API Token:', STRAPI_TOKEN ? '✅ Set' : '❌ Not set');

async function testStrapi() {
  try {
    console.log('\n🔍 Testing basic Strapi connection...');
    const response = await axios.get(`${STRAPI_URL}/api/blogs`, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
      timeout: 5000
    });

    console.log('✅ Strapi is accessible!');
    console.log('📊 Response status:', response.status);
    console.log('📊 Blogs found:', response.data?.data?.length || 0);
    
    if (response.data?.data?.length > 0) {
      console.log('📋 Available blog slugs:');
      response.data.data.forEach((blog, index) => {
        console.log(`  ${index + 1}. ${blog.slug}`);
      });
    }

  } catch (error) {
    console.error('❌ Strapi connection failed:');
    console.error('   Error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('   💡 Make sure Strapi is running on', STRAPI_URL);
    } else if (error.response?.status === 401) {
      console.error('   💡 Check your API token');
    } else if (error.response?.status === 404) {
      console.error('   💡 Make sure the blogs content type exists in Strapi');
    }
  }
}

testStrapi();
