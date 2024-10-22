import { useState } from 'react';
import '../assets/styles/stylesCalculation.css';

function CalculationPage() {
    const [kitValue, setKitValue] = useState('');
    const [paymentType, setPaymentType] = useState(''); // Campo para o tipo de pagamento
    const [numInstallments, setNumInstallments] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [residualValue, setResidualValue] = useState(null);
    const [errors, setErrors] = useState({
        kitValue: '',
        paymentType: '', // Adicionar erro para tipo de pagamento
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

    const handlePaymentTypeChange = (e) => {
        const selectedType = e.target.value;
        setPaymentType(selectedType);

        // Limpar os valores calculados e o campo de parcelas ao trocar entre as opções
        setMonthlyPayment(null);
        setResidualValue(null);
        setNumInstallments('');
    };

    const validateFields = () => {
        let valid = true;
        const newErrors = { kitValue: '', paymentType: '', numInstallments: '' };

        if (!kitValue) {
            newErrors.kitValue = 'Por favor, insira o valor do kit.';
            valid = false;
        }

        if (!paymentType) {
            newErrors.paymentType = 'Por favor, selecione o tipo de pagamento.'; // Validação para o tipo de pagamento
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
        if (!validateFields()) return;

        const P = parseFloat(kitValue.replace(/\D/g, '')) / 100;
        const n = parseInt(numInstallments, 10); // Número de parcelas
        let r = 0;

        if (paymentType === 'Comodato') {
            r = 3 / 100; // Taxa de 3% para Comodato
        } else if (paymentType === 'Cartão') {
            r = 1 / 100; // Taxa de 1% para Cartão
        }

        const PMT = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        if (paymentType === 'Comodato') {
            const years = n / 12;
            const residualPercentage = Math.max(0, 1 - years * 0.1);
            const residualValueCalculated = P * residualPercentage;
            setResidualValue(formatCurrency(residualValueCalculated.toFixed(2)));
        }

        setMonthlyPayment(formatCurrency(PMT.toFixed(2)));
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

                    <label className="label">Tipo de Pagamento</label>
                    <select value={paymentType} onChange={handlePaymentTypeChange} className="input" required>
                        <option value="">Selecione o tipo de pagamento</option>
                        <option value="Comodato">Comodato</option>
                        <option value="Cartão">Cartão</option>
                    </select>
                    {errors.paymentType && <p className="error">{errors.paymentType}</p>} {/* Mensagem de erro */}

                    <label className="label">Número de Parcelas</label>
                    {paymentType === 'Cartão' ? (
                        <select
                            value={numInstallments}
                            onChange={(e) => setNumInstallments(e.target.value)}
                            className="input"
                            required
                        >
                            <option value="">Selecione o número de parcelas</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            placeholder="Digite o número de parcelas"
                            value={numInstallments}
                            onChange={(e) => setNumInstallments(e.target.value)}
                            className="input"
                            required
                        />
                    )}
                    {errors.numInstallments && <p className="error">{errors.numInstallments}</p>}

                    <div className="buttonContainer">
                        <button className="buttonCE" onClick={calculateFixedInstallment}>
                            CALCULAR
                        </button>
                    </div>

                    {monthlyPayment && (
                        <div className="resultContainer">
                            <h2 className="resultTitle">Valor da Parcela:</h2>
                            {monthlyPayment}
                            {paymentType === 'Comodato' && (
                                <>
                                    <h2 className="resultTitle">Valor Residual do Comodato:</h2>
                                    {residualValue}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CalculationPage;
