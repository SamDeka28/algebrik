#!/usr/bin/env node
/**
 * Test Blog Fetch
 * Test if we can fetch blogs from Strapi like BlogCarousel does
 */

const axios = require('axios');

// Configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

console.log('🔍 Testing blog fetch like BlogCarousel...');
console.log('📍 Strapi URL:', STRAPI_URL);
console.log('🔑 API Token:', STRAPI_TOKEN ? '✅ Set' : '❌ Not set');

async function testBlogFetch() {
  try {
    console.log('\n🔍 Testing blogs fetch (like BlogCarousel)...');
    
    // Test the exact same call that BlogCarousel makes
    const response = await axios.get(`${STRAPI_URL}/api/blogs`, {
      params: {
        populate: '*'
      },
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
      timeout: 5000
    });

    console.log('✅ Blogs fetch successful!');
    console.log('📊 Response status:', response.status);
    console.log('📊 Blogs found:', response.data?.data?.length || 0);
    
    if (response.data?.data?.length > 0) {
      console.log('📋 Available blog slugs:');
      response.data.data.forEach((blog, index) => {
        console.log(`  ${index + 1}. ${blog.slug || 'No slug'}`);
      });
      
      console.log('\n📝 First blog details:');
      const firstBlog = response.data.data[0];
      console.log('  Title:', firstBlog.title || 'No title');
      console.log('  Slug:', firstBlog.slug || 'No slug');
      console.log('  Status:', firstBlog.status || 'No status');
    }

  } catch (error) {
    console.error('❌ Blog fetch failed:');
    console.error('   Error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('   💡 Make sure Strapi is running on', STRAPI_URL);
    } else if (error.response?.status === 401) {
      console.error('   💡 Check your API token');
    } else if (error.response?.status === 403) {
      console.error('   💡 Check Strapi permissions for blogs content type');
    } else if (error.response?.status === 404) {
      console.error('   💡 Make sure the blogs content type exists in Strapi');
    }
    
    console.error('   📊 Response data:', error.response?.data);
  }
}

testBlogFetch();
