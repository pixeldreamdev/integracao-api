'use client';
import React, { useState } from 'react';
import FormStep6SubStep1 from './substep/FormStep6SubStep1';
import FormStep6SubStep2 from './substep/FormStep6SubStep2';
import FormStep6SubStep3 from './substep/FormStep6SubStep3';
import FormStep6SubStep4 from './substep/FormStep6SubStep4';
import FormStep6SubStep5 from './substep/FormStep6SubStep5';
import FormStep6SubStep6 from './substep/FormStep6SubStep6';
import FormStep6SubStep7 from './substep/FormStep6SubStep7';
import DevSubStepNavigation from '../components/DevSubStepNavigation';

const FormStep6 = ({ prevStep, nextStep, handleChange, values }) => {
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const totalSubSteps = 7;

  const onNextSubStep = () => {
    if (currentSubStep < totalSubSteps) {
      setCurrentSubStep(currentSubStep + 1);
    }
  };

  const onPrevSubStep = () => {
    if (currentSubStep > 1) {
      setCurrentSubStep(currentSubStep - 1);
    } else {
      prevStep();
    }
  };

  const onFormSubmit = response => {
    // Aqui você pode lidar com a resposta da API
    console.log('Form submitted successfully:', response);
    // Navegar para uma página de confirmação ou próxima etapa
    nextStep();
  };

  const renderSubStep = () => {
    const subStepProps = {
      onPrevStep: onPrevSubStep,
      onNextStep: onNextSubStep,
      values,
      handleChange,
    };

    switch (currentSubStep) {
      case 1:
        return <FormStep6SubStep1 {...subStepProps} />;
      case 2:
        return <FormStep6SubStep2 {...subStepProps} />;
      case 3:
        return <FormStep6SubStep3 {...subStepProps} />;
      case 4:
        return <FormStep6SubStep4 {...subStepProps} />;
      case 5:
        return <FormStep6SubStep5 {...subStepProps} />;
      case 6:
        return <FormStep6SubStep6 {...subStepProps} />;
      case 7:
        return <FormStep6SubStep7 {...subStepProps} onFormSubmit={onFormSubmit} />;
      default:
        return <div>Subpasso não encontrado</div>;
    }
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Dados Adicionais</h2>
      <p className="text-text-light mb-6">
        Passo {currentSubStep} de {totalSubSteps}
      </p>

      {renderSubStep()}

      <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
        <p className="font-medium">Lembre-se:</p>
        <p className="text-sm">
          Você está no subpasso {currentSubStep} de {totalSubSteps}. Certifique-se de preencher
          todas as informações corretamente antes de prosseguir.
        </p>
      </div>

      <DevSubStepNavigation setCurrentSubStep={setCurrentSubStep} totalSubSteps={totalSubSteps} />
    </div>
  );
};

export default FormStep6;
