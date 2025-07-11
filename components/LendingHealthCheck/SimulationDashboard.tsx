"use client"
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Download, Calendar, TrendingUp, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { PopupButton } from '@typeform/embed-react';
import React, { useState } from "react";
import Contact from '../contacts';


interface SurveyData {
  losEfficiency: string;
  automationPercentage: string;
  systemDowntime: string;
  approvalTime: string;
  complianceChecks: string;
  scalability: string;
  volumeIncrease: string;
  processingCapacity: string;
  losIntegration: string;
  integrationAreas: string[];
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

  const [showContactModal, setShowContactModal] = useState(false);
  const [showPdfAlert, setShowPdfAlert] = useState(false); // for top button
  const [showBottomPdfAlert, setShowBottomPdfAlert] = useState(false); // for bottom button

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

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [formError, setFormError] = useState<string | null>(null);

  // HubSpot submission logic
  const HUBSPOT_PORTAL_ID = "47671281"; // TODO: Replace with your actual portal ID
  const HUBSPOT_FORM_GUID = "b4e3d63f-9ef1-4793-b688-c849f44778ea"; // TODO: Replace with your actual form GUID
  const HUBSPOT_ENDPOINT = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

  const submitToHubspot = async (form: { name: string; email: string }) => {
    // Map form and surveyData to HubSpot fields
    const payload = {
      "0-1/firstname": form.name.split(" ")[0] || "",
      "0-1/lastname": form.name.split(" ").slice(1).join(" ") || "",
      "0-1/email": form.email,
      "0-1/misc": "",
      "0-1/automation_level": surveyData.automationPercentage,
      "0-1/system_downtime": surveyData.systemDowntime,
      "0-1/loan_approval_time": surveyData.approvalTime,
      "0-1/real_time_compliance_checks": surveyData.complianceChecks,
      "0-1/system_scalability_quotient": surveyData.scalability,
      "0-1/loan_increase_projection": surveyData.volumeIncrease,
      "0-1/peak_loan_processing_capacity": surveyData.processingCapacity,
      "0-1/los_integration_status": surveyData.losIntegration,
      "0-1/integration_status": Array.isArray(surveyData.integrationAreas) ? surveyData.integrationAreas.join(", ") : "",
      // "hs_context": ... // Optionally add tracking context
    };
    try {
      await fetch(HUBSPOT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: Object.entries(payload).map(([name, value]) => ({ name, value })),
        }),
      });
    } catch (err) {
      // Optionally handle error (e.g., show a toast)
      console.error("HubSpot submission failed", err);
    }
  };

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setFormError("Please fill in both name and email.");
      return;
    }
    setIsUnlocked(true);
    setFormError(null);
    // Submit to HubSpot
    submitToHubspot(form);
  };

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
          <Button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-[#003366] bg-blue-100 hover:bg-blue-50 px-4 py-2 h-10"
            style={{ display: 'inline-flex' }}
            disabled={!isUnlocked}
            onClick={() => setShowPdfAlert(true)}
          >
            <Download className="w-4 h-4 mr-2" />
            Request PDF Report
          </Button>
        </div>

        {/* PDF Request Alert Banner */}
        {showPdfAlert && (
          <div className="mb-8 w-full flex items-center justify-between bg-yellow-100 border border-yellow-300 text-yellow-900 px-6 py-4 rounded-lg shadow ">
            <span className="font-medium">We have notified our team your request would be fulfilled in 24 to 48 hours</span>
            <button
              className="ml-4 text-yellow-900 hover:text-yellow-700 font-bold text-xl"
              onClick={() => setShowPdfAlert(false)}
              aria-label="Dismiss"
            >
              &times;
            </button>
          </div>
        )}

        {/* BLUR + FORM GATE START */}
        <div className="relative">
          {/* Blurred Content */}
          <div className={
            `transition-all duration-500 ${!isUnlocked ? 'blur-lg pointer-events-none select-none' : ''}`
          }>
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
          </div>

          {/* Overlay Form */}
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-start justify-center z-20 pt-32 lg:pt-52">
              <form
                className="bg-white bg-opacity-95 rounded-xl shadow-xl p-8 w-full max-w-md border border-blue-100 flex flex-col gap-4"
                onSubmit={handleUnlock}
              >
                <h2 className="text-2xl font-bold text-[#003366] mb-2 text-center">Access Your Results</h2>
                <p className="text-gray-600 text-center mb-4">Please enter your details to view the full results.</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black"
                  required
                />
                {formError && <div className="text-red-600 text-sm text-center">{formError}</div>}
                <button
                  type="submit"
                  className="bg-[#003366] text-white font-bold rounded px-4 py-2 mt-2 hover:bg-blue-800 transition"
                >
                  View Results
                </button>
              </form>
            </div>
          )}
        </div>
        {/* BLUR + FORM GATE END */}

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
                onClick={()=>setShowContactModal(true)}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Executive Demo
              </Button>
              {/* Bottom PDF Request Alert Banner */}
             
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 py-4"
                onClick={() => setShowBottomPdfAlert(true)}
              >
                <Download className="w-5 h-5 mr-2" />
                Request PDF Report
              </Button>
            </div>
            <div className="w-full flex justify-center">
             {showBottomPdfAlert && (
                <div className="mb-4 flex items-center justify-between bg-yellow-100 border border-yellow-300 text-yellow-900 px-6 py-4 rounded-lg shadow mt-10 w-max ">
                  <span className="font-medium">We have notified our team your request would be fulfilled in 24 to 48 hours</span>
                  <button
                    className="ml-4 text-yellow-900 hover:text-yellow-700 font-bold text-xl"
                    onClick={() => setShowBottomPdfAlert(false)}
                    aria-label="Dismiss"
                  >
                    &times;
                  </button>
                </div>
              )}
              </div>
          </CardContent>
        </Card>
      </div>
      <Contact open={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  );
};

export default SimulationDashboard;
