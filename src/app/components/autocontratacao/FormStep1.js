"use client";

import React, { useState } from "react";

const FormStep1 = ({ nextStep, handleChange, values }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular uma consulta
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    nextStep();
  };

  return (
    <div className="form-section fade-in">
      <h2 className="form-section-title">Consulta de Proposta</h2>
      <p className="text-text-light mb-6 text-center">
        Para iniciar sua simulação de empréstimo, por favor, informe seu CPF
        abaixo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-field">
          <label htmlFor="cpf" className="form-label">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={values.cpf || ""}
            onChange={(e) => handleChange("cpf", e.target.value)}
            className="form-input hover-lift"
            placeholder="000.000.000-00"
            required
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            title="Digite um CPF válido no formato: 000.000.000-00"
          />
          <p className="form-helper-text text-text-light text-sm mt-2">
            Digite apenas números ou use o formato: 000.000.000-00
          </p>
        </div>

        <div className="form-field">
          <button
            type="submit"
            className={`form-button form-button-primary w-full ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="ml-2">Consultando...</span>
              </>
            ) : (
              "Consultar Proposta"
            )}
          </button>
        </div>
      </form>

      <div className="warning-box mt-8">
        <p className="font-medium highlight-text">Importante:</p>
        <p className="text-sm mt-2">
          Certifique-se de fornecer um CPF válido para prosseguir com a
          simulação do empréstimo.
        </p>
      </div>
    </div>
  );
};

export default FormStep1;
