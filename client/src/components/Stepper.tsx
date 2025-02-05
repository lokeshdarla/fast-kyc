'use client'
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Updated interface to match the provided Stepper type
export interface Stepper {
  step_id: number;
  step_label: string;
  step_file_detail: string;
  description: string;
  completed: boolean;
}

export const StepperComponent = ({
  steps,
  currentStepId,
  onStepChange
}: {
  steps: Stepper[];
  currentStepId: number;
  onStepChange: (stepId: number) => void;
}) => {
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.step_id === currentStepId;
          const isCompleted = step.completed;

          return (
            <div
              key={step.step_id}
              className="relative flex flex-col items-center flex-1"
              onClick={() => onStepChange(step.step_id)}
            >
              {/* Connector line */}
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-4 left-1/2 w-full h-[2px] -translate-y-1/2",
                    isCompleted ? "bg-black" : "bg-gray-200"
                  )}
                />
              )}

              {/* Step circle */}
              <div
                className={cn(
                  "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2",
                  "transition-all duration-200 cursor-pointer hover:scale-105",
                  isActive && "border-black bg-black text-white",
                  isCompleted && "border-black bg-black",
                  !isActive && !isCompleted && "border-gray-300 bg-white"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isActive ? "text-white" : "text-gray-500"
                    )}
                  >
                    {step.step_id}
                  </span>
                )}
              </div>

              {/* Step label */}
              <span
                className={cn(
                  "mt-2 text-sm font-medium select-none",
                  isActive ? "text-black" : "text-gray-500"
                )}
              >
                {step.step_label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};


