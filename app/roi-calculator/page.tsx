"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { CustomHeader, CustomSubtitle } from "@/components/CustomHeader";
import Button from "@/components/Buttons";
import Link from "next/link";

const steps = [
    {
        type: "slider",
        question: "What is your Monthly Loan Volume?",
        min: 0,
        max: 5000,
        unit: "Loans",
        options: []
    },
    {
        type: "slider",
        question: "What is your Average Loan Processing Time (Days)",
        min: 2,
        max: 20,
        unit: "Days",
        options: []
    },
    {
        type: "slider",
        question: "What is your Average Borrower Drop-Off Rate (%) ",
        min: 0,
        max: 50,
        unit: "%",
        options: []
    },
    {
        type: "slider",
        question: "Your Average Processing Cost per Loan ($) ",
        min: 50,
        max: 1000,
        unit: "$",
        options: []
    },
    {
        type: "cards",
        question: "What type of loans does your CU primarily process?",
        min: 2,
        max: 20,
        options: ["Auto Loan", "Personal Loan", "HELOC", "Mixed Portfolio"],
    },
    {
        type: "cards",
        question: "Do you have an existing LOS?",
        min: 2,
        max: 20,
        options: ["Yes, We have", "No, We don’t have"],
    }
];

interface ROIInputs {
    monthlyLoanVolume: number; // Step 1
    avgProcessingTime: number; // Step 2
    dropOffRate: number; // Step 3
    processingCostPerLoan: number; // Step 4
    loanType: string; // Step 5
    existingLOS: string; // Step 6
    monthlyRevenue: number; // Step 7
}

export default function StepperForm() {
    const [step, setStep] = useState(0);
    const [values, setValues] = useState<(number | string)[]>(steps.map((s) => s.type === "slider" ? s.min : ""));
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<any>({})
    const handleSliderChange = (value: any) => {
        setValues((prev) => {
            const newValues = [...prev];
            newValues[step] = value[0];
            return newValues;
        });
    };

    console.log({ values })

    const handleCardSelect = (option: string) => {
        setValues((prev) => {
            const newValues = [...prev];
            newValues[step] = option;
            return newValues;
        });
    };

    const handleSubmit = () => {
        const userInputs: ROIInputs = {
            monthlyLoanVolume: Number(values[0] ?? 0), // Ensure number
            avgProcessingTime: Number(values[1] ?? 0),
            dropOffRate: Number(values[2] ?? 0),
            processingCostPerLoan: Number(values[3] ?? 0),
            loanType: values[4] as string, // Strings don't need conversion
            existingLOS: values[5] as string,
            monthlyRevenue: Number(values[6] ?? 0),
        };

        const roiResults = calculateROI(userInputs);
        setShowResult(true);
        setResult({ ...roiResults })
    };



    const calculateROI = ({
        monthlyLoanVolume,
        avgProcessingTime,
        dropOffRate,
        processingCostPerLoan,
        loanType,
        monthlyRevenue
    }: ROIInputs) => {

        // Define loan-type-specific AI impacts
        const loanTypeImpacts: any = {
            "Auto Loan": { approvalTime: 0.85, dropOff: 0.30, costSavings: 0.45, conversion: 0.25 },
            "Personal Loan": { approvalTime: 0.80, dropOff: 0.30, costSavings: 0.45, conversion: 0.25 },
            "HELOC": { approvalTime: 0.65, dropOff: 0.20, costSavings: 0.30, conversion: 0.15 },
            "Mixed Portfolio": { approvalTime: 0.75, dropOff: 0.25, costSavings: 0.35, conversion: 0.20 }
        };

        const { approvalTime, dropOff, costSavings, conversion } = loanTypeImpacts[loanType] || loanTypeImpacts["Mixed Portfolio"];

        // **AI-Optimized Values**
        const improvedProcessingTime = avgProcessingTime * (1 - approvalTime);
        const improvedDropOffRate = dropOffRate * (1 - dropOff);
        const improvedProcessingCost = processingCostPerLoan * (1 - costSavings);
        const improvedMonthlyRevenue = monthlyRevenue * (1 + conversion);

        // **Savings Calculation**
        const processingCostSavings = (processingCostPerLoan - improvedProcessingCost) * monthlyLoanVolume * 12;
        const totalRevenueIncrease = improvedMonthlyRevenue - monthlyRevenue;
        const estimatedROI = totalRevenueIncrease + processingCostSavings;

        // **Approval Time Savings**
        const approvalTimeSaved = avgProcessingTime - improvedProcessingTime;
        console.log({ approvalTimeSaved, avgProcessingTime, improvedProcessingTime, monthlyLoanVolume })
        // **Annual Time Savings**
        const totalProcessingDaysSaved = approvalTimeSaved * monthlyLoanVolume * 12;

        return {
            estimatedSavings: "$" + processingCostSavings.toLocaleString(),
            borrowerConversionIncrease: (conversion * 100).toFixed(0) + "%",
            approvalTimeReduction: (approvalTime * 100).toFixed(0) + "%",
            totalProcessingDaysSaved: totalProcessingDaysSaved.toFixed(2),
            approvalTimeSaved: approvalTimeSaved.toFixed(2),
            estimatedROI: estimatedROI
        };
    };

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact", // Formats as 105K, 1M, etc.
            maximumFractionDigits: 0
        }).format(num);
    };


    return (
        <div className="flex flex-col justify-center items-center pt-36 md:pt-[200px] pb-32 overflow-hidden">
            <div className="md:container md:relative opacity-[30%] z-[-1]">
                <motion.div
                    className="absolute top-[40%] md:top-20 left-0 md:left-[296px] bg-gradient-to-tr from-[#66B3B0] to-[#149994] rounded-full w-1/2 aspect-square md:w-[861.73px] md:h-[239.68px] blur-[100px]"
                    animate={{
                        y: [0, -50, 50, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute  top-[40%] md:top-20 left-0 md:left-[20px] bg-gradient-to-tl from-[#1C8DEA] to-[#195BD7] rounded-full  w-1/2 aspect-square md:w-[796.91px] md:h-[280.03px] blur-[100px] -z-10"
                    animate={{
                        y: [0, -60, 60, 0],
                        rotate: [0, -15, 15, 0],
                        scale: [1, 1.07, 1],
                    }}
                    transition={{
                        duration: 4,
                        delay: 0.3,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-[40%]  md:top-56 left-0 bg-[#BE95FF] rounded-full md:w-[1226.24px] md:h-[239.68px] blur-[100px] z-[-1]   w-1/2 aspect-square"
                    animate={{
                        y: [0, -70, 70, 0],
                        rotate: [0, 20, -20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 5,
                        delay: 0.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                    }}
                />
            </div>
            <div className="max-w-7xl w-full px-6 lg:px-[48px]">
                <CustomHeader
                    text="Calculate Your Credit Union’s AI Savings Potential"
                    className="text-center lg:text-left"
                />
                <CustomSubtitle text="Here’s how Algebrik’s cloud-native, AI-powered LOS could transform your lending operations based on your data."
                    className="text-center lg:text-left mt-4" />
            </div>
            <div className="max-w-7xl w-full px-6 lg:px-[48px] mt-12">
                {!showResult ?
                    <div className="mt-2 lg:mt-0 bg-white shadow-2xl rounded-xl max-w-7xl w-full flex flex-col items-center bg-white/75 backdrop-blur-sm  px-4 lg:px-0">
                        {/* Progress Bar */}
                        <div className="flex justify-between my-8">
                            {steps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 flex-1 min-w-[46px] lg:min-w-[100px] mx-1 rounded-full transition-all duration-300 ${index <= step ? "bg-[#2A5FAC]" : "bg-gray-300"
                                        }`}
                                ></div>
                            ))}
                        </div>
                        <div className="w-full h-[1px] bg-[#D4E2ED] mb-8"></div>
                        {/* Question Header */}
                        <h2
                            className="text-lg text-center uppercase font-plus-jakarta text-[#95ACCC] font-bold  tracking-[16%]"
                        >
                            Question {step + 1}
                        </h2>
                        {/* Question Header */}
                        <motion.h2
                            key={step}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className=" font-plus-jakarta text-2xl text-center text-[#2A5FAC] font-bold mt-4"
                        >
                            {steps[step].question}
                        </motion.h2>

                        {/* Slider Input */}
                        <div className={`mt-11 w-full flex-wrap flex-col-reverse lg:flex-row lg:w-[65%] rounded-2xl lg:p-4 flex ${steps[step].type == "slider" && "drop-shadow-sm border border-[##E8E7E7] "}`}>
                            {steps[step].type === "slider" ? <>
                                <div className="flex-1 p-4 lg:pr-6">
                                    <SliderPrimitive.Root
                                        className="relative flex items-center w-full h-6"
                                        min={steps[step].min}
                                        max={steps[step].max}
                                        step={1}
                                        value={[values[step] as number]}
                                        onValueChange={handleSliderChange}
                                    >
                                        <div
                                            className="absolute flex justify-center items-center top-1/2 transform -translate-y-1/2 bg-blue-600 rounded-full w-6 h-6 z-10"
                                            style={{
                                                left: `${(((Number(values[step]) || 0) - steps[step].min) / (steps[step].max - steps[step].min)) * 100
                                                    }%`
                                            }}

                                        >
                                            <div
                                                className="transform bg-white rounded-full w-4 h-4 z-10 "
                                            >

                                            </div>
                                        </div>
                                        <SliderPrimitive.Track className="bg-gray-300 h-2 w-full relative rounded-full">
                                            <SliderPrimitive.Range className="absolute bg-blue-500 h-2 rounded-full" />
                                        </SliderPrimitive.Track>
                                        <SliderPrimitive.Thumb className="w-4 h-4 bg-gradient-to-r from-[#1C8DEA] to-[#195BD7] rounded-full shadow-md cursor-pointer focus:outline-none" />
                                    </SliderPrimitive.Root>
                                    <div className="flex justify-between mt-2 text-sm text-[#656565] font-plus-jakarta">
                                        <span className="">{steps[step].min} {steps[step].unit}</span>
                                        <span>{steps[step].max} {steps[step].unit}+</span>
                                    </div>
                                </div>
                                <div className="lg:pl-6 relative flex items-center lg:mb-0 p-4">
                                    <div className="hidden lg:block absolute h-[80%] bg-[#E8E7E7] w-[2px] left-0" />
                                    <div className="text-black w-full lg:w-[150px] bg-[#F6F6F6] p-4 rounded text-lg font-[600] font-plus-jakarta drop-shadow-sm">
                                        {values[step]} {steps[step].unit}
                                    </div>
                                </div>
                            </> : <div className={`flex flex-wrap gap-4 justify-center items-center w-full ${steps[step]?.options?.length == 2 ? "flex-col lg:flex-row" : "flex-row"}`}>
                                {steps[step]?.options.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleCardSelect(option)}
                                        className={`flex-1 lg:flex-none py-4 ${steps[step]?.options?.length == 2 ? "w-full lg:min-w-[156px] lg:w-max    " : "min-w-[156px]"} lg:p-6 rounded-lg border transition-all duration-300 text-lg font-bold font-plus-jakarta ${values[step] === option
                                            ? "bg-[#2A5FAC] border-[2px] border-[#61A1FF] text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-200 border border-[#E8E7E7]"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>}
                        </div>
                        <div className="lg:hidden mt-8 w-full h-[1px] bg-[#D4E2ED]"></div>
                        {step == steps.length - 1 ?
                            <div className="flex flex-row gap-[22px] w-full md:w-[300px] mt-4 md:mt-[66px]">
                                <Button
                                    text="Prev"
                                    isActive={true}
                                    disabled={step === 0}
                                    // onClick={() => alert("Please provide the redirection page")}
                                    onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                                    customClass="py-[10px] text-[14px] md:text-[16px] text-[#1A69DC] font-bold border border-[#1C8DEA] w-full md:w-auto"
                                    activeStyle="bg-white text-[#292929] font-bold"
                                />

                                <Button
                                    text={step === steps.length - 1 ? "Calculate" : "Next"}
                                    onClick={() => step === steps.length - 1 ? handleSubmit() : setStep((prev) => Math.min(prev + 1, steps.length - 1))}
                                    customClass="bg-gradient-to-r from-blue-400 to-blue-900 text-white font-bold py-[10px] text-[14px] md:text-[16px] font-bold hover:bg-blue-500 w-full md:w-auto"
                                    activeStyle="text-[#1A69DC] font-bold"

                                />
                            </div> :
                            <div className="flex flex-row gap-[22px] w-full md:w-[300px] mt-4 md:mt-[66px]">
                                <Button
                                    text="Prev"
                                    isActive={true}
                                    disabled={step === 0}
                                    // onClick={() => alert("Please provide the redirection page")}
                                    onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                                    customClass="bg-gradient-to-r from-blue-400 to-blue-900 text-white font-bold py-[10px] text-[14px] md:text-[16px] font-bold hover:bg-blue-500 w-full md:w-auto"
                                    activeStyle="text-[#1A69DC] font-bold"

                                />

                                <Button
                                    text={step === steps.length - 1 ? "Calculate" : "Next"}
                                    onClick={() => step === steps.length - 1 ? handleSubmit() : setStep((prev) => Math.min(prev + 1, steps.length - 1))}
                                    customClass="py-[10px] text-[14px] md:text-[16px] text-[#1A69DC] font-bold border border-[#1C8DEA] w-full md:w-auto"
                                    activeStyle="bg-white text-[#292929] font-bold"

                                />
                            </div>
                        }
                        <div className="w-full h-[1px] bg-[#D4E2ED] mt-4 lg:mt-[42px]" />
                        <div className=" text-[12px] text-[#999999] py-2 lg:px-6 text-left w-full">
                            *Our Loan ROI calculator offers estimated monthly instalments which are indicative and tentative and are based upon the details populated by the user.
                        </div>
                    </div>
                    : <div className=" bg-white shadow-2xl rounded-xl max-w-7xl w-full flex flex-col items-center bg-white/75 backdrop-blur-lg px-4 lg:px-0">
                        {/* Question Header */}
                        <h2
                            className="text-2xl text-center  font-plus-jakarta text-[#2A5FAC] font-bold m-6"
                        >
                            Results
                        </h2>

                        <div className={`mt-6 w-full lg:w-[50%] lg:flex-row flex-col gap-[32px]  rounded-2xl p-0 lg:p-4 flex ${steps[step].type == "slider" && "shadow-sm border border-[##E8E7E7] "}`}>
                            <div className="flex  p-4 lg:p-0 lg:justify-center py-[26px] items-center flex-row-reverse justify-between lg:flex-col border border-[#CBDCF4] rounded-[12px] flex-1">
                                <p className="text-[#2A5FAC] text-4xl font-plus-jakarta font-extrabold">{result.approvalTimeSaved} <span className="lg:hidden">Days</span></p>
                                <p className="text-[18px]  text-center text-[#424242]">Days Saved</p>
                            </div>
                            <div className="flex p-4 lg:justify-center items-center py-[26px]  flex-row-reverse justify-between lg:flex-col border border-[#CBDCF4] rounded-[12px] flex-1">
                                <p className="text-[#2A5FAC] text-4xl font-plus-jakarta font-extrabold">{formatCurrency(result.estimatedROI)}</p>
                                <p className="text-[18px] text-center text-[#424242]">Increase in Revenue</p>
                            </div>
                        </div>
                        <p className="text-[#292929] font-medium text-[16px] lg:w-[60%] text-center my-[32px]">{`With Algebrik AI, your CU could save ${result.estimatedSavings} per year,
while increasing borrower conversions by ${result.borrowerConversionIncrease} and cutting approval times by ${result.approvalTimeReduction}.`}</p>

                        <div className="flex flex-row gap-[22px] w-full md:w-[300px] md:mt-[66px]">
                            <Button
                                text="Re-Calculate"
                                isActive={true}
                                disabled={step === 0}
                                // onClick={() => alert("Please provide the redirection page")}
                                onClick={() => { setStep(0); setShowResult(false) }}
                                customClass="py-[10px] text-[14px] md:text-[16px] text-[#1A69DC] font-bold border border-[#1C8DEA] w-full md:w-auto"
                                activeStyle="bg-white text-[#292929] font-bold"
                            />

                            <Link
                                href="/contact/"
                                className="flex-1 flex justify-center items-center rounded-full bg-gradient-to-r from-blue-400 to-blue-900 text-white font-bold py-[10px] text-[14px] md:text-[16px] font-bold hover:bg-blue-500 w-full md:w-auto text-[#1A69DC] font-bold"

                            >Talk to Sales</Link>
                        </div>
                        <div className="w-full h-[1px] bg-[#D4E2ED] mt-[42px]" />
                        <div className=" text-[12px] text-[#999999] py-2 px-6 text-left w-full">
                            *Our Loan ROI calculator offers estimated monthly instalments which are indicative and tentative and are based upon the details populated by the user.
                        </div>
                    </div>}
            </div>
        </div>
    );
}
