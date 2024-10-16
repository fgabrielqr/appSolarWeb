import { useState } from 'react';
import '../assets/styles/stylesCalculation.css'; // Importando seu arquivo CSS

function CalculationPage() {
    const [kitValue, setKitValue] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [numInstallments, setNumInstallments] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [residualValue, setResidualValue] = useState(null);

    const formatCurrency = (value) => {
        const cleanValue = value.replace(/\D/g, ''); // Remove tudo que não for número
        const formattedValue = (Number(cleanValue) / 100).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
        return formattedValue;
    };

    const handleKitValueChange = (e) => {
        const value = e.target.value;
        const formattedValue = formatCurrency(value);
        setKitValue(formattedValue);
    };

    const calculateFixedInstallment = () => {
        const P = parseFloat(kitValue.replace(/\D/g, '')) / 100; // Remove a máscara e converte para número
        const r = parseFloat(interestRate) / 100; // Converte a taxa de juros
        const n = parseInt(numInstallments, 10); // Número de parcelas

        if (isNaN(P) || isNaN(r) || isNaN(n)) {
            setMonthlyPayment("Valores inválidos");
            setResidualValue(null);
            return;
        }

        const PMT = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        const years = n / 12; // Número de anos
        const residualPercentage = Math.max(0, 1 - years * 0.1); // Redução de 10% por ano, até um mínimo de 0%
        const residualValueCalculated = P * residualPercentage; // Valor do kit reduzido

        setMonthlyPayment(formatCurrency(PMT.toFixed(2)));
        setResidualValue(formatCurrency(residualValueCalculated.toFixed(2)));
    };

    // Verifica se todos os campos estão preenchidos
    const isFormValid = kitValue && interestRate && numInstallments;

    return (
        <div className="background">
            <div className="overlay">
                <div className="cards">
                    <h1 className="title">Cálculo Projeto Solar</h1>

                    <label className="label">Valor do Kit</label>
                    <input
                        type="text"
                        placeholder="Digite o valor do kit"
                        value={kitValue}
                        onChange={handleKitValueChange}
                        className="input"
                        required
                    />

                    <label className="label">Taxa de Juros Mensal (%)</label>
                    <input
                        type="text"
                        placeholder="Digite a taxa de juros. Ex: 2.05"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="input"
                        required
                    />

                    <label className="label">Número de Parcelas</label>
                    <input
                        type="text"
                        placeholder="Digite o número de parcelas"
                        value={numInstallments}
                        onChange={(e) => setNumInstallments(e.target.value)}
                        className="input"
                        required
                    />
                    <div className="buttonContainer">
                        <button
                            className="buttonCE"
                            onClick={calculateFixedInstallment}
                            disabled={!isFormValid} // Desabilita o botão se os campos não estiverem preenchidos
                        >
                            CALCULAR
                        </button>
                    </div>
                    {monthlyPayment && (
                        <div className="resultContainer">
                            <h2 className="resultTitle">Valor da Parcela:</h2>
                            {monthlyPayment}
                            <h2 className="resultTitle">Valor Residual do Comodato:</h2>
                            {residualValue}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CalculationPage;
