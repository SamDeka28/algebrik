"use client"
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { ArrowLeft, Play, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

interface StressTestProps {
  surveyData: any;
  onComplete: (results: any) => void;
  onBack: () => void;
}

const StressTestSimulator = ({ surveyData, onComplete, onBack }: StressTestProps) => {
  const [currentTest, setCurrentTest] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testResults, setTestResults] = useState<any[]>([]);

  const stressTests = [
    {
      name: "Economic Downturn Simulation",
      description: "Testing system resilience during economic stress with increased default rates",
      duration: 3000,
      scenarios: ["Unemployment rises to 12%", "GDP contracts by 5%", "Default rates increase by 300%"]
    },
    {
      name: "Volume Surge Test",
      description: "Simulating 500% increase in loan applications over peak periods",
      duration: 2500,
      scenarios: ["Peak application volume", "System load testing", "Response time analysis"]
    },
    {
      name: "Regulatory Change Impact",
      description: "Testing adaptation to new compliance requirements and reporting standards",
      duration: 2000,
      scenarios: ["New KYC requirements", "Enhanced reporting standards", "Data privacy regulations"]
    },
    {
      name: "Data Source Failure",
      description: "Simulating critical data source failures and backup system activation",
      duration: 2200,
      scenarios: ["Primary credit bureau down", "Bank connectivity issues", "Internal system failures"]
    },
    {
      name: "Cybersecurity Incident",
      description: "Testing security protocols and incident response procedures",
      duration: 2800,
      scenarios: ["Attempted data breach", "DDoS attack simulation", "System lockdown procedures"]
    }
  ];

  const runStressTest = async (testIndex: number) => {
    setIsRunning(true);
    setProgress(0);
    
    const test = stressTests[testIndex];
    const startTime = Date.now();
    
    // Simulate test progress
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / test.duration) * 100, 100);
      setProgress(newProgress);
    }, 50);

    // Wait for test duration
    await new Promise(resolve => setTimeout(resolve, test.duration));
    
    clearInterval(interval);
    setProgress(100);
    
    // Generate test result based on survey data
    const result = generateTestResult(test, surveyData);
    setTestResults(prev => [...prev, result]);
    
    setIsRunning(false);
    
    if (testIndex < stressTests.length - 1) {
      setTimeout(() => {
        setCurrentTest(testIndex + 1);
        setProgress(0);
      }, 1000);
    } else {
      // All tests complete
      setTimeout(() => {
        onComplete(testResults.concat([result]));
      }, 1500);
    }
  };

  const generateTestResult = (test: any, survey: any) => {
    // Calculate performance based on survey responses
    let performanceScore = 0;
    let riskLevel = "Low";
    let impact = "Minimal";
    
    // Factor in automation level
    switch (survey.automationLevel) {
      case "fully_automated":
        performanceScore += 30;
        break;
      case "mostly_automated":
        performanceScore += 20;
        break;
      case "partially_automated":
        performanceScore += 10;
        break;
      default:
        performanceScore += 0;
    }
    
    // Factor in scalability
    switch (survey.scalability) {
      case "unlimited":
        performanceScore += 25;
        break;
      case "high":
        performanceScore += 20;
        break;
      case "moderate":
        performanceScore += 10;
        break;
      default:
        performanceScore += 0;
    }
    
    // Factor in security measures
    switch (survey.securityMeasures) {
      case "enterprise_security":
        performanceScore += 25;
        break;
      case "advanced_security":
        performanceScore += 20;
        break;
      case "standard_security":
        performanceScore += 10;
        break;
      default:
        performanceScore += 0;
    }
    
    // Add some randomness for realism
    performanceScore += Math.random() * 20;
    
    // Determine risk level and impact
    if (performanceScore > 70) {
      riskLevel = "Low";
      impact = "Minimal";
    } else if (performanceScore > 50) {
      riskLevel = "Medium";
      impact = "Moderate";
    } else {
      riskLevel = "High";
      impact = "Significant";
    }
    
    return {
      name: test.name,
      score: Math.round(performanceScore),
      riskLevel,
      impact,
      recommendations: generateRecommendations(test.name, performanceScore)
    };
  };

  const generateRecommendations = (testName: string, score: number) => {
    const recommendations: string[] = [];
    
    if (score < 50) {
      recommendations.push("Immediate infrastructure upgrade required");
      recommendations.push("Implement redundancy and failover systems");
    }
    
    if (testName.includes("Economic")) {
      recommendations.push("Enhance risk modeling capabilities");
      recommendations.push("Diversify lending portfolio");
    }
    
    if (testName.includes("Volume")) {
      recommendations.push("Implement auto-scaling infrastructure");
      recommendations.push("Optimize application processing pipelines");
    }
    
    if (testName.includes("Regulatory")) {
      recommendations.push("Invest in compliance automation tools");
      recommendations.push("Establish regulatory change management process");
    }
    
    return recommendations.length > 0 ? recommendations : ["System performing well under current conditions"];
  };

  const startTests = () => {
    runStressTest(0);
  };

  const overallProgress = ((currentTest + (isRunning ? progress / 100 : 0)) / stressTests.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 py-48">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[#2A5FAC] hover:bg-blue-50"
            disabled={isRunning}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Survey
          </Button>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-[#2A5FAC]">Stress Test Simulation</h1>
            <p className="text-gray-600">Testing your lending stack resilience</p>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8 border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center text-[#2A5FAC]">
              <Play className="w-5 h-5 mr-2" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="mb-2" />
            <p className="text-sm text-gray-600">
              {currentTest + 1} of {stressTests.length} tests {isRunning ? 'running' : 'completed'}
            </p>
          </CardContent>
        </Card>

        {/* Current Test */}
        {currentTest < stressTests.length && (
          <Card className="mb-8 border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="text-[#2A5FAC]">
                {stressTests[currentTest].name}
              </CardTitle>
              <p className="text-gray-600">{stressTests[currentTest].description}</p>
            </CardHeader>
            <CardContent>
              {!isRunning && currentTest === 0 && testResults.length === 0 ? (
                <div className="text-center py-8">
                  <Button 
                    onClick={startTests}
                    className="bg-[#2A5FAC] hover:bg-[#1e4a8c] text-white px-8 py-3"
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Stress Tests
                  </Button>
                </div>
              ) : (
                <>
                  <Progress value={progress} className="mb-4" />
                  <div className="space-y-2">
                    {stressTests[currentTest].scenarios.map((scenario, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          progress > (index + 1) * 33 ? 'bg-green-500' : 
                          progress > index * 33 ? 'bg-yellow-500' : 'bg-gray-300'
                        }`} />
                        <span className={progress > index * 33 ? 'text-gray-900' : 'text-gray-500'}>
                          {scenario}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Completed Tests Results */}
        {testResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#2A5FAC] mb-4">Test Results</h2>
            {testResults.map((result, index) => (
              <Card key={index} className="border-2 border-blue-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#2A5FAC]">{result.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-[#2A5FAC]">{result.score}/100</span>
                      {result.score > 70 ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : result.score > 50 ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Risk Level</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        result.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
                        result.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {result.riskLevel}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Impact</p>
                      <span className="text-sm text-gray-600">{result.impact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StressTestSimulator;
