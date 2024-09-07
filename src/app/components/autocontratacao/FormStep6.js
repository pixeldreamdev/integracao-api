"use client";
import React, { useState } from "react";
import FormStep6SubStep1 from "./substep/FormStep6SubStep1";
// Importe os outros subpassos quando estiverem prontos
// import FormStep6SubStep2 from './substep/FormStep6SubStep2';
// ...até FormStep6SubStep8
import Button from "../Button";
import ProgressBar from "../ProgressBar";

const FormStep6 = ({ prevStep, nextStep, handleChange, values }) => {
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const totalSubSteps = 8;

  const onSubmit = (data) => {
    if (currentSubStep < totalSubSteps) {
      setCurrentSubStep(currentSubStep + 1);
    } else {
      Object.entries(data).forEach(([key, value]) => handleChange(key, value));
      nextStep();
    }
  };

  const handlePrevStep = () => {
    if (currentSubStep > 1) {
      setCurrentSubStep(currentSubStep - 1);
    } else {
      prevStep();
    }
  };

  const renderSubStep = () => {
    switch (currentSubStep) {
      case 1:
        return (
          <FormStep6SubStep1
            onNextStep={() => setCurrentSubStep(2)}
            values={values}
            handleChange={handleChange}
          />
        );
      // Adicione casos para os outros subpassos quando estiverem prontos
      // case 2:
      //   return <FormStep6SubStep2 ... />;
      // ...
      default:
        return <div>Subpasso não encontrado</div>;
    }
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Dados Adicionais (Etapa 6)</h2>
      <p className="text-text-light mb-6">
        Esta etapa é dividida em {totalSubSteps} subpassos. Por favor, preencha
        cuidadosamente todas as informações solicitadas.
      </p>

      <div className="mb-6">
        <ProgressBar current={currentSubStep} total={totalSubSteps} />
        <p className="text-center text-sm text-gray-600 mt-2">
          Subpasso {currentSubStep} de {totalSubSteps}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        {renderSubStep()}
      </div>

      <div className="flex justify-between mt-8">
        <Button
          onClick={handlePrevStep}
          className="form-button form-button-secondary"
        >
          {currentSubStep === 1 ? "Voltar para Etapa 5" : "Anterior"}
        </Button>
        <Button
          onClick={() => onSubmit(values)}
          className="form-button form-button-primary"
        >
          {currentSubStep === totalSubSteps ? "Finalizar" : "Próximo"}
        </Button>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
        <p className="font-medium">Lembre-se:</p>
        <p className="text-sm">
          Você pode navegar entre os subpassos usando os botões acima.
          Certifique-se de preencher todas as informações corretamente antes de
          prosseguir.
        </p>
      </div>
    </div>
  );
};

export default FormStep6;
