"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, ArrowRight, TrendingUp, AlertTriangle } from "lucide-react";
import StressSimulation from "./StressSimulation";
import SimulationDashboard from "./SimulationDashboard";
import ProcessingAnimation from "./ProcessingAnimation";

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

interface LendingHealthSurveyProps {
  onBack: () => void;
}

interface StressScenario {
  id: string;
  name: string;
  description: string;
  impactType: 'capacity' | 'quality' | 'volume';
  multiplier: number;
  capacityReduction?: number;
  volumeMultiplier?: number;
}

const LendingHealthSurvey = ({ onBack }: LendingHealthSurveyProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    losEfficiency: "",
    automationPercentage: "",
    systemDowntime: "",
    approvalTime: "",
    complianceChecks: "",
    scalability: "",
    volumeIncrease: "",
    processingCapacity: "",
    losIntegration: "",
    integrationAreas: []
  });
  const [showProcessing, setShowProcessing] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showAdvancedSimulation, setShowAdvancedSimulation] = useState(false);
  const [showFinalDashboard, setShowFinalDashboard] = useState(false);

  const questions = [
    {
      id: "losEfficiency",
      title: "How would you rate your current Loan Origination System (LOS) efficiency?",
      type: "scale",
      scale: { min: 1, max: 10, label: "Scale 1-10" }
    },
    {
      id: "automationPercentage",
      title: "What percentage of your loan origination process is automated?",
      type: "select",
      options: [
        { value: "0-25", label: "0-25%" },
        { value: "26-50", label: "26-50%" },
        { value: "51-75", label: "51-75%" },
        { value: "76-100", label: "76-100%" }
      ]
    },
    {
      id: "systemDowntime",
      title: "How often do you experience system downtimes?",
      type: "select",
      options: [
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "rarely", label: "Rarely" }
      ]
    },
    {
      id: "approvalTime",
      title: "What is your current loan approval time?",
      type: "select",
      options: [
        { value: "less_than_24h", label: "Less than 24 hours" },
        { value: "1-3_days", label: "1-3 days" },
        { value: "more_than_3_days", label: "More than 3 days" }
      ]
    },
    {
      id: "complianceChecks",
      title: "Do you have real-time compliance checks integrated?",
      type: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" }
      ]
    },
    {
      id: "scalability",
      title: "How scalable is your current system to handle increased loan volumes?",
      type: "scale",
      scale: { min: 1, max: 10, label: "Scale 1-10" }
    },
    {
      id: "volumeIncrease",
      title: "What is your projected loan volume increase over the next 12 months?",
      type: "percentage",
      placeholder: "Enter percentage (e.g., 25)"
    },
    {
      id: "processingCapacity",
      title: "What is your current system's peak loan processing capacity (loans per day)?",
      type: "number",
      placeholder: "Enter number of loans per day"
    },
    {
      id: "losIntegration",
      title: "How well is your current LOS integrated across key systems (e.g., core banking, bureaus, fraud, e-sign)?",
      type: "radio",
      options: [
        { value: "A", label: "Fully integrated with all major systems (bureaus, core, fraud, e-sign, income, indirect auto, etc.)" },
        { value: "B", label: "Some systems integrated, some manual processes still exist" },
        { value: "C", label: "Mostly disconnected or ad-hoc integrations" }
      ]
    }
  ];

  const integrationAreasOptions = [
    { value: "core_banking", label: "Core banking systems (e.g., JH, Fiserv, Corelation)" },
    { value: "credit_bureaus", label: "Credit bureaus (Equifax, Experian, TransUnion)" },
    { value: "fraud_identity", label: "Fraud & identity platforms (SentiLink, Socure, LexisNexis)" },
    { value: "income_data", label: "Consumer income/permissioned data (Plaid, Spinwheel, Conductiv)" },
    { value: "indirect_auto", label: "Indirect auto networks (RouteOne, AppOne, etc.)" },
    { value: "insurance", label: "Insurance, GAP, warranty (TruStage, SWBC, Allied, Frost)" },
    { value: "esign_docs", label: "eSign & docs (DocuSign, eDOC)" },
    { value: "compliance", label: "Compliance/calculators (Carleton, JD Power)" }
  ];

  const stressScenarios: StressScenario[] = [
    {
      id: "surge",
      name: "Application Surge",
      description: "Sudden 50% surge in loan applications",
      impactType: "volume",
      multiplier: 1.5,
      volumeMultiplier: 1.5
    },
    {
      id: "fraud",
      name: "Fraud Increase",
      description: "30% increase in fraudulent loan attempts",
      impactType: "capacity",
      multiplier: 0.8,
      capacityReduction: 20
    },
    {
      id: "compliance",
      name: "Regulatory Changes",
      description: "New compliance requirements affecting processing",
      impactType: "capacity",
      multiplier: 0.85,
      capacityReduction: 15
    },
    {
      id: "economic",
      name: "Economic Downturn",
      description: "Economic conditions affecting borrower credit quality",
      impactType: "quality",
      multiplier: 1.0
    },
    {
      id: "outage",
      name: "System Outages",
      description: "Technical failures causing processing delays",
      impactType: "capacity",
      multiplier: 0.75,
      capacityReduction: 25
    }
  ];

  const calculateHealthScore = (): number => {
    const efficiencyScore = surveyData.losEfficiency ? 
      (parseInt(surveyData.losEfficiency) / 10) * 10 : 0;

    let automationScore = 0;
    switch (surveyData.automationPercentage) {
      case "0-25": automationScore = 2.5; break;
      case "26-50": automationScore = 5; break;
      case "51-75": automationScore = 7.5; break;
      case "76-100": automationScore = 10; break;
    }

    let reliabilityScore = 0;
    switch (surveyData.systemDowntime) {
      case "daily": reliabilityScore = 0; break;
      case "weekly": reliabilityScore = 2.5; break;
      case "monthly": reliabilityScore = 5; break;
      case "rarely": reliabilityScore = 10; break;
    }

    let processingScore = 0;
    switch (surveyData.approvalTime) {
      case "less_than_24h": processingScore = 10; break;
      case "1-3_days": processingScore = 6.7; break;
      case "more_than_3_days": processingScore = 3.3; break;
    }

    const complianceScore = surveyData.complianceChecks === "yes" ? 10 : 0;
    const scalabilityScore = surveyData.scalability ? 
      (parseInt(surveyData.scalability) / 10) * 10 : 0;

    // Integration Score
    let integrationScore = 0;
    switch (surveyData.losIntegration) {
      case "A": integrationScore = 10; break;
      case "B": integrationScore = 5; break;
      case "C": integrationScore = 0; break;
    }

    // Updated weights to accommodate 15% for Integration while maintaining 100% total
    const weightedTotal = 
      (efficiencyScore * 0.085) +    // Reduced from 0.10 to 0.085
      (automationScore * 0.1275) +   // Reduced from 0.15 to 0.1275
      (reliabilityScore * 0.085) +   // Reduced from 0.10 to 0.085
      (processingScore * 0.085) +    // Reduced from 0.10 to 0.085
      (complianceScore * 0.1275) +   // Reduced from 0.15 to 0.1275
      (scalabilityScore * 0.2125) +  // Reduced from 0.25 to 0.2125
      (integrationScore * 0.15);     // New 15% weight for Integration

    return Math.round(weightedTotal * 10);
  };

  const shouldShowIntegrationWarning = (): boolean => {
    return !surveyData.integrationAreas.includes("core_banking") || 
           !surveyData.integrationAreas.includes("credit_bureaus");
  };

  const calculateStressScenarios = () => {
    const baseCapacity = parseInt(surveyData.processingCapacity) || 0;
    const scalabilityScore = parseInt(surveyData.scalability) || 1;
    const growthPercentage = parseInt(surveyData.volumeIncrease) || 0;

    const effectiveCapacity = baseCapacity * (scalabilityScore / 10);
    const projectedVolume = baseCapacity * (1 + growthPercentage / 100);

    // Calculate Integration Score for conditional logic
    let integrationScore = 0;
    switch (surveyData.losIntegration) {
      case "A": integrationScore = 10; break;
      case "B": integrationScore = 5; break;
      case "C": integrationScore = 0; break;
    }

    // Check if specific integration areas are selected
    const hasFraudIntegration = surveyData.integrationAreas.includes("fraud_identity");
    const hasComplianceIntegration = surveyData.integrationAreas.includes("compliance");

    return stressScenarios.map(scenario => {
      let adjustedCapacity = effectiveCapacity;
      let adjustedVolume = projectedVolume;
      let riskLevel = "Low";
      let hasCapacityShortfall = false;

      switch (scenario.impactType) {
        case "volume":
          adjustedVolume = projectedVolume * (scenario.volumeMultiplier || 1);
          hasCapacityShortfall = adjustedVolume > adjustedCapacity;
          break;
        case "capacity":
          // Apply conditional logic for fraud and compliance scenarios
          if (scenario.id === "fraud") {
            // Only apply 20% reduction if Integration Score < 5 AND no fraud integration
            if (integrationScore < 5 && !hasFraudIntegration) {
              adjustedCapacity = effectiveCapacity * scenario.multiplier;
            } else {
              // No capacity reduction if well integrated
              adjustedCapacity = effectiveCapacity;
            }
          } else if (scenario.id === "compliance") {
            // Only apply 15% reduction if Integration Score < 5 AND no compliance integration
            if (integrationScore < 5 && !hasComplianceIntegration) {
              adjustedCapacity = effectiveCapacity * scenario.multiplier;
            } else {
              // No capacity reduction if well integrated
              adjustedCapacity = effectiveCapacity;
            }
          } else {
            // For other capacity scenarios, apply normal logic
            adjustedCapacity = effectiveCapacity * scenario.multiplier;
          }
          hasCapacityShortfall = projectedVolume > adjustedCapacity;
          break;
        case "quality":
          riskLevel = "Medium";
          break;
      }

      if (hasCapacityShortfall) {
        riskLevel = "High";
      } else if (scenario.impactType === "quality") {
        riskLevel = "Medium";
      }

      return {
        ...scenario,
        baseCapacity,
        effectiveCapacity,
        projectedVolume,
        adjustedCapacity,
        adjustedVolume,
        riskLevel,
        hasCapacityShortfall,
        capacityUtilization: scenario.impactType === "capacity" ? 
          Math.round((projectedVolume / adjustedCapacity) * 100) : 
          Math.round((adjustedVolume / adjustedCapacity) * 100)
      };
    });
  };

  const getScoreColor = (score: number) => {
    if (score > 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number) => {
    if (score > 75) return "Excellent! Your lending stack is well-optimized with clear paths for further enhancement.";
    if (score >= 50) return "Moderate risk detected. There are significant opportunities to improve your lending operations.";
    return "Urgent action required! Your lending stack needs immediate attention to remain competitive.";
  };

  const getRolePainPointMessages = (healthScore: number): string[] => {
    const messages: string[] = [];
    
    // Check Q1 (LOS Efficiency) - raw score 5 or less
    const losEfficiencyRaw = parseInt(surveyData.losEfficiency) || 0;
    if (losEfficiencyRaw <= 5) {
      messages.push("Loan officers may be spending 40% more time on redundant tasks.");
    }
    
    // Check Q4 (Loan Approval Time) - "More than 3 days"
    if (surveyData.approvalTime === "more_than_3_days") {
      messages.push("Delayed approval time increases borrower dropout rates by 27%.");
    }
    
    return messages;
  };

  const handleAnswerChange = (value: string) => {
    const currentQuestion = questions[currentStep];
    setSurveyData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleIntegrationAreaChange = (value: string, checked: boolean) => {
    setSurveyData(prev => ({
      ...prev,
      integrationAreas: checked 
        ? [...prev.integrationAreas, value]
        : prev.integrationAreas.filter(area => area !== value)
    }));
  };

  const handleNext = () => {
    // If on LOS Integration question and answer is selected, show multi-select
    if (currentStep === 8 && surveyData.losIntegration && !showIntegrationMultiSelect()) {
      // Stay on current step but show multi-select
      return;
    }
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowProcessing(true);
    }
  };

  const showIntegrationMultiSelect = (): boolean => {
    return currentStep === 8 && surveyData.losIntegration !== "";
  };

  const handleProcessingComplete = () => {
    setShowProcessing(false);
    setShowScore(true);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleViewAdvancedResults = () => {
    setShowScore(false);
    setShowAdvancedSimulation(true);
  };

  const handleSimulationComplete = () => {
    setShowAdvancedSimulation(false);
    setShowFinalDashboard(true);
  };

  // Show final dashboard
  if (showFinalDashboard) {
    return (
      <SimulationDashboard 
        surveyData={surveyData}
        healthScore={calculateHealthScore()}
        stressResults={calculateStressScenarios()}
        onBack={onBack}
      />
    );
  }

  // Show advanced simulation
  if (showAdvancedSimulation) {
    return (
      <StressSimulation 
        onComplete={handleSimulationComplete}
        onBack={() => setShowAdvancedSimulation(false)}
      />
    );
  }

  // Show processing animation
  if (showProcessing) {
    return (
      <ProcessingAnimation onComplete={handleProcessingComplete} />
    );
  }

  // Show health score screen
  if (showScore) {
    const healthScore = calculateHealthScore();
    const painPointMessages = getRolePainPointMessages(healthScore);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 py-48">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-[#003366] hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Health Score Card */}
          <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-white">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-[#003366] mb-2">
                Your Lending Stack Health Score
              </CardTitle>
              <div className={`text-6xl font-bold ${getScoreColor(healthScore)} mb-4`}>
                {healthScore}/100
              </div>
              <p className="text-lg text-gray-600">
                {getScoreMessage(healthScore)}
              </p>
              
              {/* Industry Benchmarking Message */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-[#003366] font-medium">
                  Your score of {healthScore} places you in the top 30% of mid-sized credit unions surveyed this year.
                </p>
              </div>

              {/* Role-Based Pain Point Messages */}
              {painPointMessages.length > 0 && (
                <div className="mt-4 space-y-3">
                  {painPointMessages.map((message, index) => (
                    <div key={index} className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-amber-800 font-medium">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center">
                <Button 
                  onClick={handleViewAdvancedResults}
                  className="bg-[#003366] hover:bg-[#002244] text-white px-8 py-3"
                  size="lg"
                >
                  View Advanced Stress Test Results
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show survey questions
  const currentQuestion = questions[currentStep];
  const currentAnswer = surveyData[currentQuestion.id as keyof SurveyData];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case "scale":
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">{currentQuestion.scale?.label}</div>
            <RadioGroup value={currentAnswer as string} onValueChange={handleAnswerChange}>
              <div className="flex justify-between">
                {Array.from({ length: currentQuestion.scale?.max || 10 }, (_, i) => i + 1).map((num) => (
                  <div key={num} className="flex flex-col items-center space-y-2">
                    <RadioGroupItem value={num.toString()} id={num.toString()} />
                    <Label htmlFor={num.toString()} className="text-sm font-medium">
                      {num}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        );

      case "select":
        return (
          <Select value={currentAnswer as string} onValueChange={handleAnswerChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "radio":
        return (
          <RadioGroup value={currentAnswer as string} onValueChange={handleAnswerChange}>
            {currentQuestion.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "percentage":
        return (
          <div className="space-y-2">
            <Input
              type="number"
              placeholder={currentQuestion.placeholder}
              value={currentAnswer as string}
              onChange={(e) => handleAnswerChange(e.target.value)}
              min="0"
              max="1000"
              className="w-full"
            />
            <div className="text-sm text-gray-500">Enter as percentage (e.g., 25 for 25%)</div>
          </div>
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={currentQuestion.placeholder}
            value={currentAnswer as string}
            onChange={(e) => handleAnswerChange(e.target.value)}
            min="0"
            className="w-full"
          />
        );

      default:
        return null;
    }
  };

  const renderIntegrationMultiSelect = () => {
    return (
      <div className="space-y-4">
        <div className="text-lg font-medium text-[#003366] mb-4">
          Let's break down your integration stack health by function. Which of these areas are currently integrated into your lending system?
        </div>
        <div className="space-y-3">
          {integrationAreasOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
              <Checkbox
                id={option.value}
                checked={surveyData.integrationAreas.includes(option.value)}
                onCheckedChange={(checked:any) => handleIntegrationAreaChange(option.value, checked as boolean)}
              />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        
        {/* Warning Message */}
        {surveyData.integrationAreas.length > 0 && shouldShowIntegrationWarning() && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-medium">
                  ⚠️ Disconnected from core banking or credit bureaus? This is a major friction point during underwriting and decisioning. Consider a connected LOS like Algebrik that offers native integrations across the board.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const canProceedToNext = () => {
    if (currentStep === 8) {
      // For LOS integration question, need both the main answer and at least one integration area selected
      return surveyData.losIntegration && surveyData.integrationAreas.length > 0;
    }
    return !!currentAnswer;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 py-48 text-black">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-[#003366] hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#003366] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="text-xl text-[#003366]">
              {currentQuestion.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderQuestionInput()}
            
            {/* Show integration multi-select if on question 9 and answer is selected */}
            {showIntegrationMultiSelect() && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                {renderIntegrationMultiSelect()}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="border-[#003366] text-[#003366] hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!canProceedToNext()}
            className="bg-[#003366] hover:bg-[#002244] text-white"
          >
            {currentStep === questions.length - 1 ? 'Calculate Score' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LendingHealthSurvey;
