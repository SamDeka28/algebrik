"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, TrendingUp, Shield, Calendar } from "lucide-react";
import LendingHealthSurvey from "./LendingHealthSurvey";

const Index = () => {
  const [showSurvey, setShowSurvey] = useState(false);

  if (showSurvey) {
    return <LendingHealthSurvey onBack={() => setShowSurvey(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-32 text-black">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Lending Stack Health Check
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Evaluate your lending technology stack's performance, identify vulnerabilities, 
            and get actionable insights to optimize your lending operations.
          </p>
          <Button 
            onClick={() => setShowSurvey(true)}
            className="bg-[#2A5FAC] hover:bg-[#1e4a8c] text-white px-8 py-3 text-lg"
          >
            Start Health Check
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 border-blue-100 hover:border-[#2A5FAC] transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-[#2A5FAC] rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-[#2A5FAC]">Comprehensive Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Detailed evaluation of your lending processes, technology infrastructure, 
                and operational efficiency across all key areas.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 hover:border-[#2A5FAC] transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-[#2A5FAC] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-[#2A5FAC]">Stress Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Simulate various market conditions and scenarios to identify potential 
                vulnerabilities and stress points in your lending stack.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 hover:border-[#2A5FAC] transition-colors">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-[#2A5FAC] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-[#2A5FAC]">Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get tailored insights and actionable recommendations to improve your 
                lending operations and schedule a demo with our experts.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What You'll Get
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#2A5FAC] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Health Score</h3>
                  <p className="text-gray-600">Comprehensive scoring across key lending metrics</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#2A5FAC] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Risk Assessment</h3>
                  <p className="text-gray-600">Identification of potential vulnerabilities and risks</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#2A5FAC] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Performance Benchmarks</h3>
                  <p className="text-gray-600">Compare your metrics against industry standards</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#2A5FAC] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Stress Test Results</h3>
                  <p className="text-gray-600">Scenario-based testing and impact analysis</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#2A5FAC] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Actionable Insights</h3>
                  <p className="text-gray-600">Specific recommendations for improvement</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#2A5FAC] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Consultation</h3>
                  <p className="text-gray-600">Schedule a demo with our lending technology experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
