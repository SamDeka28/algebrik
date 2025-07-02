"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ArrowLeft, Download, Calendar, CheckCircle, AlertTriangle, TrendingDown, Mail, Phone } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface ResultsReportProps {
  surveyData: any;
  stressTestResults: any[];
  onBack: () => void;
}

const ResultsReport = ({ surveyData, stressTestResults, onBack }: ResultsReportProps) => {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [demoForm, setDemoForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  // Calculate overall health score
  const calculateHealthScore = () => {
    let score = 0;
    const weights = {
      loanVolume: 10,
      processingTime: 15,
      automationLevel: 20,
      riskManagement: 15,
      dataIntegration: 10,
      complianceTools: 10,
      customerExperience: 10,
      scalability: 5,
      reportingCapabilities: 3,
      securityMeasures: 2
    };

    Object.entries(surveyData).forEach(([key, value]) => {
      const weight = weights[key as keyof typeof weights] || 0;
      let itemScore = 0;

      switch (value) {
        case "excellent":
        case "fully_automated":
        case "expert":
        case "unified_platform":
        case "ai_compliance":
        case "ai_powered":
        case "unlimited":
        case "real_time_insights":
        case "enterprise_security":
        case "under_24h":
        case "over_1000":
          itemScore = weight;
          break;
        case "good":
        case "mostly_automated":
        case "advanced":
        case "well_integrated":
        case "automated_monitoring":
        case "high":
        case "advanced_analytics":
        case "advanced_security":
        case "1_3_days":
        case "500_1000":
          itemScore = weight * 0.8;
          break;
        case "average":
        case "partially_automated":
        case "intermediate":
        case "basic_integration":
        case "basic_tools":
        case "moderate":
        case "standard_reporting":
        case "standard_security":
        case "3_7_days":
        case "100_500":
          itemScore = weight * 0.5;
          break;
        default:
          itemScore = weight * 0.2;
      }
      score += itemScore;
    });

    // Factor in stress test results
    if (stressTestResults) {
      const avgStressScore = stressTestResults.reduce((sum, result) => sum + result.score, 0) / stressTestResults.length;
      score = (score + avgStressScore) / 2;
    }

    return Math.round(score);
  };

  const healthScore = calculateHealthScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-8 h-8 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
    return <TrendingDown className="w-8 h-8 text-red-600" />;
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    if (surveyData.automationLevel === "fully_manual" || surveyData.automationLevel === "partially_automated") {
      recommendations.push({
        priority: "High",
        area: "Process Automation",
        recommendation: "Implement automated underwriting and decision engines to reduce processing time and improve consistency."
      });
    }

    if (surveyData.dataIntegration === "siloed" || surveyData.dataIntegration === "basic_integration") {
      recommendations.push({
        priority: "High",
        area: "Data Integration",
        recommendation: "Consolidate data sources into a unified platform for better decision-making and reporting."
      });
    }

    if (surveyData.riskManagement === "basic" || surveyData.riskManagement === "intermediate") {
      recommendations.push({
        priority: "Medium",
        area: "Risk Management",
        recommendation: "Upgrade to AI-powered risk assessment tools for better predictive analytics."
      });
    }

    if (surveyData.scalability === "limited" || surveyData.scalability === "moderate") {
      recommendations.push({
        priority: "Medium",
        area: "Infrastructure",
        recommendation: "Invest in cloud-based scalable infrastructure to handle volume fluctuations."
      });
    }

    if (surveyData.securityMeasures === "basic_security" || surveyData.securityMeasures === "standard_security") {
      recommendations.push({
        priority: "High",
        area: "Security",
        recommendation: "Enhance security measures with enterprise-grade cybersecurity solutions."
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demo request submitted:", demoForm);
    toast({
      title: "Demo Request Submitted",
      description: "We'll contact you within 24 hours to schedule your personalized demo.",
    });
    setShowDemoForm(false);
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your comprehensive lending health report has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 py-48">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[#2A5FAC] hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Start New Assessment
          </Button>
          <div className="text-right">
            <h1 className="text-3xl font-bold text-[#2A5FAC]">Your Lending Health Report</h1>
            <p className="text-gray-600">Comprehensive analysis and recommendations</p>
          </div>
        </div>

        {/* Overall Health Score */}
        <Card className="mb-8 border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-white">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              {getScoreIcon(healthScore)}
            </div>
            <CardTitle className="text-4xl font-bold text-[#2A5FAC] mb-2">
              Overall Health Score
            </CardTitle>
            <div className={`text-6xl font-bold ${getScoreColor(healthScore)}`}>
              {healthScore}/100
            </div>
            <p className="text-lg text-gray-600 mt-2">
              {healthScore >= 80 ? "Excellent - Your lending stack is highly optimized" :
               healthScore >= 60 ? "Good - Some areas need improvement" :
               "Needs Attention - Significant improvements required"}
            </p>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Survey Results Breakdown */}
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-[#2A5FAC]">Assessment Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(surveyData).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className="text-sm text-gray-600 capitalize">
                      {typeof value === 'string' ? value.replace(/_/g, ' ') : String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stress Test Results */}
          <Card className="border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-[#2A5FAC]">Stress Test Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stressTestResults && stressTestResults.map((result, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-gray-900">{result.name}</h4>
                      <span className={`font-bold ${getScoreColor(result.score)}`}>
                        {result.score}/100
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Risk: {result.riskLevel}</span>
                      <span>Impact: {result.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mb-8 border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="text-[#2A5FAC]">Tailored Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-[#2A5FAC]">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{rec.area}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <p className="text-gray-700">{rec.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleDownloadReport}
            className="bg-[#2A5FAC] hover:bg-[#1e4a8c] text-white px-8 py-3"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Full Report
          </Button>
          <Button 
            onClick={() => setShowDemoForm(true)}
            variant="outline"
            className="border-[#2A5FAC] text-[#2A5FAC] hover:bg-blue-50 px-8 py-3"
            size="lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Expert Consultation
          </Button>
        </div>

        {/* Demo Scheduling Form */}
        {showDemoForm && (
          <Card className="mt-8 border-2 border-[#2A5FAC]">
            <CardHeader>
              <CardTitle className="text-[#2A5FAC]">Schedule Your Expert Consultation</CardTitle>
              <p className="text-gray-600">Get personalized insights from our lending technology experts</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={demoForm.name}
                      onChange={(e) => setDemoForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      className="border-gray-300 focus:border-[#2A5FAC]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={demoForm.email}
                      onChange={(e) => setDemoForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="border-gray-300 focus:border-[#2A5FAC]"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={demoForm.company}
                      onChange={(e) => setDemoForm(prev => ({ ...prev, company: e.target.value }))}
                      required
                      className="border-gray-300 focus:border-[#2A5FAC]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="border-gray-300 focus:border-[#2A5FAC]"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Additional Comments</Label>
                  <Textarea
                    id="message"
                    value={demoForm.message}
                    onChange={(e) => setDemoForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={3}
                    className="border-gray-300 focus:border-[#2A5FAC]"
                    placeholder="Tell us about your specific challenges or areas of interest..."
                  />
                </div>
                <div className="flex gap-4">
                  <Button 
                    type="submit"
                    className="bg-[#2A5FAC] hover:bg-[#1e4a8c] text-white"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Demo
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setShowDemoForm(false)}
                    className="border-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResultsReport;
