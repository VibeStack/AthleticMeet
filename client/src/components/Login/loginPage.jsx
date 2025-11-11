import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Step1Credentials from "./Step1Credentials";
import Step2EmailOtp from "./Step2EmailOtp";

export default function LoginPage() {
  const methods = useForm({ mode: "onChange" });
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = (data) => {
    console.log("Login Successful:", data);
    window.location.href = "/portal"; // redirect to main portal
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        {step === 1 && <Step1Credentials nextStep={nextStep} />}
        {step === 2 && (
          <Step2EmailOtp
            prevStep={prevStep}
            onSubmit={methods.handleSubmit(onSubmit)}
          />
        )}
      </div>
    </FormProvider>
  );
}
