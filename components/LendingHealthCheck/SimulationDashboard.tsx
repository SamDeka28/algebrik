"use client"
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Download, Calendar, TrendingUp, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { PopupButton } from '@typeform/embed-react';

interface SurveyData {
  losEfficiency: string;
  automationPercentage: string;
  systemDowntime: string;
  approvalTime: string;
  complianceChecks: string;
  scalability: string;
  volumeIncrease: string;
  processingCapacity: string;
}

interface StressResult {
  id: string;
  name: string;
  description: string;
  riskLevel: string;
  capacityUtilization: number;
  hasCapacityShortfall: boolean;
  adjustedCapacity: number;
  adjustedVolume: number;
  projectedVolume: number;
  impactType: string;
}

interface SimulationDashboardProps {
  surveyData: SurveyData;
  healthScore: number;
  stressResults: StressResult[];
  onBack: () => void;
}

const SimulationDashboard = ({ surveyData, healthScore, stressResults, onBack }: SimulationDashboardProps) => {
  const getScoreColor = (score: number) => {
    if (score > 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "High":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "Medium":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const hasHighRisk = stressResults.some(result => result.riskLevel === "High");
  const hasMediumRisk = stressResults.some(result => result.riskLevel === "Medium");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 py-48">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[#003366] hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          {/* Replace the Button with PopupButton for Typeform modal */}
          <PopupButton
            id="uL6UYz0p"
            size={50}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-[#003366] bg-blue-100 hover:bg-blue-50 px-4 py-2 h-10"
            style={{ display: 'inline-flex' }}
          >
            <Download className="w-4 h-4 mr-2" />
            Request PDF Report
          </PopupButton>
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#003366] mb-4">
            Advanced Stress Test Results
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive analysis of your lending stack resilience
          </p>
        </div>

        {/* Health Score Summary */}
        <Card className="border-2 border-[#003366] bg-gradient-to-r from-blue-50 to-white mb-8">
          <CardContent className="flex items-center justify-between p-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-[#003366] rounded-full flex items-center justify-center">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#003366] mb-2">
                  Lending Stack Health Score
                </h2>
                <div className={`text-4xl font-bold ${getScoreColor(healthScore)}`}>
                  {healthScore}/100
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                healthScore > 75 ? "bg-green-100 text-green-800" :
                healthScore >= 50 ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }`}>
                {healthScore > 75 ? "Excellent" : healthScore >= 50 ? "Moderate" : "Needs Improvement"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stress Test Results Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {stressResults.map((result) => (
            <Card key={result.id} className="border-2 border-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      result.riskLevel === "High" ? "bg-red-100" :
                      result.riskLevel === "Medium" ? "bg-yellow-100" : "bg-green-100"
                    }`}>
                      {getRiskIcon(result.riskLevel)}
                    </div>
                    <div>
                      <CardTitle className="text-[#003366]">{result.name}</CardTitle>
                      <p className="text-sm text-gray-600">{result.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(result.riskLevel)}`}>
                    {result.riskLevel} Risk
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {result.impactType !== "quality" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Adjusted Capacity</p>
                        <p className="text-lg font-bold text-[#003366]">
                          {Math.round(result.adjustedCapacity)}
                        </p>
                        <p className="text-xs text-gray-500">loans/day</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">
                          {result.impactType === "volume" ? "Surge Volume" : "Projected Volume"}
                        </p>
                        <p className="text-lg font-bold text-[#003366]">
                          {Math.round(result.adjustedVolume || result.projectedVolume)}
                        </p>
                        <p className="text-xs text-gray-500">loans/day</p>
                      </div>
                    </div>

                    {/* Interactive Capacity Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">Capacity Utilization</span>
                        <span className={`font-bold ${
                          result.capacityUtilization > 100 ? "text-red-600" :
                          result.capacityUtilization > 80 ? "text-yellow-600" : "text-green-600"
                        }`}>
                          {result.capacityUtilization}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
                        <div 
                          className={`h-6 rounded-full transition-all duration-1000 ${
                            result.capacityUtilization > 100 ? "bg-gradient-to-r from-red-500 to-red-600" :
                            result.capacityUtilization > 80 ? "bg-gradient-to-r from-yellow-500 to-yellow-600" : 
                            "bg-gradient-to-r from-green-500 to-green-600"
                          }`}
                          style={{ width: `${Math.min(result.capacityUtilization, 100)}%` }}
                        />
                        {result.capacityUtilization > 100 && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">OVERLOAD</span>
                          </div>
                        )}
                      </div>
                      {result.hasCapacityShortfall && (
                        <div className="flex items-center text-red-600 text-sm font-medium mt-2">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Critical: System overload detected
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                      <p className="text-yellow-800 font-medium">Credit Quality Impact</p>
                    </div>
                    <p className="text-yellow-700 text-sm mt-2">
                      Economic stress conditions may significantly impact borrower creditworthiness, 
                      increasing default rates and requiring enhanced risk assessment protocols.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Overall Assessment & Actions */}
        <Card className="border-2 border-[#003366] bg-gradient-to-r from-[#003366] to-[#002244] text-white">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              {hasHighRisk ? (
                <>
                  <AlertTriangle className="w-20 h-20 text-red-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-4">Critical Action Required</h3>
                  <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                    ⚠️ Your lending stack faces significant risks under stress conditions. Multiple scenarios 
                    show capacity shortfalls that could lead to system failures, processing delays, and 
                    operational disruptions during peak demand.
                  </p>
                </>
              ) : hasMediumRisk ? (
                <>
                  <AlertCircle className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-4">Optimization Recommended</h3>
                  <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                    🔍 Your lending stack shows moderate resilience but has areas for improvement. 
                    Strategic enhancements can strengthen your position against market volatility 
                    and regulatory changes.
                  </p>
                </>
              ) : (
                <>
                  <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-4">Well Positioned</h3>
                  <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                    ✅ Your current lending stack demonstrates strong resilience across multiple 
                    stress scenarios. Consider advanced AI and automation strategies to maintain 
                    your competitive edge.
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="bg-white text-[#003366] hover:bg-blue-50 font-bold px-8 py-4 text-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Executive Demo
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimulationDashboard;
