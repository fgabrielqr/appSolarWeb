import { useState } from 'react';
import '../assets/styles/stylesCalculation.css';

function CalculationPage() {
    const [kitValue, setKitValue] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [numInstallments, setNumInstallments] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [residualValue, setResidualValue] = useState(null);
    const [errors, setErrors] = useState({
        kitValue: '',
        interestRate: '',
        numInstallments: '',
    });

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

    const validateFields = () => {
        let valid = true;
        const newErrors = { kitValue: '', interestRate: '', numInstallments: '' };

        if (!kitValue) {
            newErrors.kitValue = 'Por favor, insira o valor do kit.';
            valid = false;
        }

        if (!interestRate) {
            newErrors.interestRate = 'Por favor, insira a taxa de juros.';
            valid = false;
        }

        if (!numInstallments) {
            newErrors.numInstallments = 'Por favor, insira o número de parcelas.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const calculateFixedInstallment = () => {
        if (!validateFields()) return; // Se a validação falhar, a função não prossegue

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
                    {errors.kitValue && <p className="error">{errors.kitValue}</p>}

                    <label className="label">Taxa de Juros Mensal (%)</label>
                    <input
                        type="text"
                        placeholder="Digite a taxa de juros. Ex: 2.05"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="input"
                        required
                    />
                    {errors.interestRate && <p className="error">{errors.interestRate}</p>}

                    <label className="label">Número de Parcelas</label>
                    <input
                        type="text"
                        placeholder="Digite o número de parcelas"
                        value={numInstallments}
                        onChange={(e) => setNumInstallments(e.target.value)}
                        className="input"
                        required
                    />
                    {errors.numInstallments && <p className="error">{errors.numInstallments}</p>}

                    <div className="buttonContainer">
                        <button
                            className="buttonCE"
                            onClick={calculateFixedInstallment}
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
