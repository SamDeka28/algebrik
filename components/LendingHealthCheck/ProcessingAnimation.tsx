"use client"
import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { TrendingUp, Calculator, CheckCircle } from "lucide-react";

interface ProcessingAnimationProps {
  onComplete: () => void;
}

const ProcessingAnimation = ({ onComplete }: ProcessingAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const processingSteps = [
    "Analyzing your lending system efficiency...",
    "Evaluating automation levels...",
    "Assessing system reliability metrics...",
    "Calculating processing speed scores...",
    "Reviewing compliance integration...",
    "Measuring scalability factors...",
    "Generating your health score..."
  ];

  useEffect(() => {
    const stepDuration = 400; // 400ms per step
    const totalDuration = 2800; // 2.8 seconds total

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalDuration / 100));
        return Math.min(newProgress, 100);
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stepDuration);

    const completeTimer = setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      onComplete();
    }, totalDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4 py-48">
      <div className="max-w-2xl mx-auto text-center">
        {/* Processing Icon */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#003366] rounded-full flex items-center justify-center animate-pulse">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#003366] mb-2">Calculating Your Health Score</h1>
          <p className="text-gray-600">Analyzing your lending stack performance...</p>
        </div>

        {/* Processing Steps */}
        <div className="space-y-4 mb-8">
          {processingSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-300 ${
                index <= currentStep
                  ? 'bg-blue-50 border border-blue-200'
                  : 'bg-gray-50 border border-gray-200 opacity-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                index < currentStep
                  ? 'bg-green-500'
                  : index === currentStep
                  ? 'bg-[#003366] animate-pulse'
                  : 'bg-gray-300'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : index === currentStep ? (
                  <Calculator className="w-4 h-4 text-white" />
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className={`text-left transition-all duration-300 ${
                index <= currentStep ? 'text-[#003366]' : 'text-gray-400'
              }`}>
                <p className="font-medium">{step}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="flex justify-between text-[#003366] text-sm font-medium">
            <span>Processing</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-blue-100"
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingAnimation;
