// components/Register/RegisterPage.jsx
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Step1AccountForm from "./Step1AccountForm";
import Step2EmailOtp from "./Step2EmailOtp";
import Step3PersonalDetails from "./Step3PersonalDetails";
import Step4Success from "./Step4Success";

export default function RegisterPage() {
  const methods = useForm({ mode: "onChange" });
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = (data) => {
    console.log("Final Registration Data:", data);
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      {step < 4 ? (
        <div className="p-4 sm:p-8 h-screen w-screen flex justify-center items-center">
          {step === 1 && <Step1AccountForm nextStep={nextStep} />}
          {step === 2 && <Step2EmailOtp nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && (
            <Step3PersonalDetails
              nextStep={nextStep}
              prevStep={prevStep}
              onSubmit={methods.handleSubmit(onSubmit)}
            />
          )}
        </div>
      ) : (
        <Step4Success />
      )}
    </FormProvider>
  );
}
