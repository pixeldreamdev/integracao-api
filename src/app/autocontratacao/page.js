'use client';

import React, { useState } from 'react';
import FormStep1 from './FormStep1';
import FormStep2 from './FormStep2';
import FormStep3 from './FormStep3';
import FormStep4 from './FormStep4';
import FormStep5 from './FormStep5';
import FormStep6 from './FormStep6';
import ProgressBar from '../components/ProgressBar';
import DevNavigation from '../components/DevNavigation';

export default function Autocontratacao() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Inicialize seus campos de formulário aqui
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    const props = { nextStep, prevStep, handleChange, values: formData };
    switch (step) {
      case 1:
        return <FormStep1 {...props} />;
      case 2:
        return <FormStep2 {...props} />;
      case 3:
        return <FormStep3 {...props} />;
      case 4:
        return <FormStep4 {...props} />;
      case 5:
        return <FormStep5 {...props} />;
      case 6:
        return <FormStep6 {...props} />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex flex-col items-center justify-center p-4">
      <div className="form-container">
        <h1 className="form-section-title">Simulação de Empréstimo</h1>
        <ProgressBar currentStep={step} totalSteps={6} />
        {renderStep()}
        <DevNavigation setStep={setStep} />
      </div>
    </main>
  );
}
