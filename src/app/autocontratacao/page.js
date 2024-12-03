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
    cpf: '',
    nome: '',
    dataNascimento: '',
    telefone: '',
    cidadeId: '',
    cep: '',
    bairro: '',
    logradouro: '',
    ocupacaoId: '',
    propostaId: null,
    // Adicione outros campos conforme necessário
  });

  const nextStep = () => {
    setStep(prev => {
      const newStep = Math.min(prev + 1, 6);
      console.log(`Avançando para o step ${newStep}`);
      return newStep;
    });
  };

  const prevStep = () => {
    setStep(prev => {
      const newStep = Math.max(prev - 1, 1);
      console.log(`Voltando para o step ${newStep}`);
      return newStep;
    });
  };

  const handleChange = (name, value) => {
    console.log(`Atualizando campo "${name}" com valor:`, value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    const commonProps = {
      nextStep,
      prevStep,
      handleChange,
      values: formData,
      setValues: setFormData,
      setStep,
    };

    console.log(`Renderizando step ${step}`);

    switch (step) {
      case 1:
        return <FormStep1 {...commonProps} />;
      case 2:
        return <FormStep2 {...commonProps} />;
      case 3:
        return <FormStep3 {...commonProps} />;
      case 4:
        return <FormStep4 {...commonProps} />;
      case 5:
        return <FormStep5 {...commonProps} />;
      case 6:
        return <FormStep6 {...commonProps} />;
      default:
        console.error(`Step inválido: ${step}`);
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
