"use client"
import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { CheckCircle } from "lucide-react";

interface StressSimulationProps {
  onComplete: () => void;
  onBack: () => void;
}

const StressSimulation = ({ onComplete }: StressSimulationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const simulationSteps = [
    "Initiating real-time risk scenario modeling...",
    "Simulating 50% surge in loan applications...",
    "Analyzing fraudulent loan attempt impact...",
    "Calculating regulatory compliance overhead...",
    "Evaluating borrower credit risk under economic downturn...",
    "Estimating technical system outages impact...",
    "Aggregating results and generating insights..."
  ];

  useEffect(() => {
    const stepDuration = 1000; // 1 second per step
    const totalDuration = 7000; // 7 seconds total

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (totalDuration / 100));
        return Math.min(newProgress, 100);
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < simulationSteps.length - 1) {
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
    <div className="min-h-screen bg-gradient-to-br from-[#003366] to-[#001122] flex items-center justify-center p-4 py-48">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo/Brand */}
        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/5e1ca36a-922a-4d14-a12c-4af46ff517a6.png" 
              alt="Algebrik Logo" 
              className="h-20 w-auto object-contain"
              style={{ maxHeight: '80px' }}
            />
          </div>
          <h1 className="text-2xl font-bold text-white">Algebrik Advanced Stress Testing</h1>
        </div>

        {/* Simulation Steps */}
        <div className="space-y-6 mb-12">
          {simulationSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                index <= currentStep
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                index < currentStep
                  ? 'bg-green-500'
                  : index === currentStep
                  ? 'bg-blue-400 animate-pulse'
                  : 'bg-white/20'
              }`}>
                {index < currentStep ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className={`text-left transition-all duration-500 ${
                index <= currentStep ? 'opacity-100' : 'opacity-40'
              }`}>
                <p className="font-medium">{step}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="flex justify-between text-white/80 text-sm">
            <span>Simulation Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-white/20"
          />
        </div>

        {/* Status Message */}
        <div className="mt-8">
          <p className="text-white/80">
            Running comprehensive stress tests on your lending infrastructure...
          </p>
        </div>
      </div>
    </div>
  );
};

export default StressSimulation;
