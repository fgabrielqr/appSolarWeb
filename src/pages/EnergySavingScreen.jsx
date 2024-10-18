/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { contractDiscountTable } from '../services/EconomyData';
import '../assets/styles/stylesCalculation.css';

function EnergySavingScreen() {
  const [kWhPerMonth, setKWhPerMonth] = useState('');
  const [months, setMonths] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [finalValue, setFinalValue] = useState(null);
  const [savings, setSavings] = useState(null);
  const [errors, setErrors] = useState({
    kWhPerMonth: '',
    months: '',
  });

  // Define o fator diretamente como uma constante
  const factor = 0.97;

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = { kWhPerMonth: '', months: '' };

    if (!kWhPerMonth) {
      newErrors.kWhPerMonth = 'Por favor, insira o valor de kWh/mês.';
      valid = false;
    }

    if (!months) {
      newErrors.months = 'Por favor, insira o número de meses.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const calculateDiscount = () => {
    if (!validateFields()) return; // Se a validação falhar, a função não prossegue

    const kWh = parseInt(kWhPerMonth, 10);
    const contractDuration = parseInt(months, 10);

    if (isNaN(kWh) || isNaN(contractDuration)) {
      setDiscountPercentage('Valores inválidos');
      setFinalValue(null);
      setSavings(null);
      return;
    }

    let selectedDiscount = null;

    if (contractDuration <= 12) {
      selectedDiscount = contractDiscountTable[12];
    } else if (contractDuration <= 24) {
      selectedDiscount = contractDiscountTable[24];
    } else {
      selectedDiscount = contractDiscountTable[36];
    }

    const discountRange = selectedDiscount.ranges.find(
      (range) => kWh >= range.min && kWh <= range.max
    );

    if (discountRange) {
      setDiscountPercentage(discountRange.discount);

      const initialValue = kWh * factor; // Usa o fator pré-definido
      const discountedValue = initialValue * (1 - discountRange.discount / 100);
      const savingsValue = initialValue - discountedValue;

      setFinalValue(formatCurrency(discountedValue));
      setSavings(formatCurrency(savingsValue));
    } else {
      setDiscountPercentage('Fora da faixa de desconto');
      setFinalValue(null);
      setSavings(null);
    }
  };

  return (
    <div className="background">
      <div className="overlay">
        <div className="cards">
          <h1 className="title">Cálculo Economia de Energia</h1>

          <label className="label">kWh/mês</label>
          <input
            type="number"
            placeholder="Digite a quantidade de kWh/mês"
            value={kWhPerMonth}
            onChange={(e) => setKWhPerMonth(e.target.value)}
            className="input"
          />
          {errors.kWhPerMonth && <p className="error">{errors.kWhPerMonth}</p>}

          <label className="label">Número de Meses</label>
          <input
            type="number"
            placeholder="Digite o número de meses"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="input"
          />
          {errors.months && <p className="error">{errors.months}</p>}

          <div className="buttonContainer">
            <button
              className="buttonCE"
              onClick={calculateDiscount}
            >
              CALCULAR
            </button>
          </div>

          {discountPercentage && (
            <div className="resultContainer">
              <h2 className="resultTitle">Porcentagem de Desconto:</h2>
              {discountPercentage}%
              <h2 className="resultTitle">Economia:</h2>
              {savings}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnergySavingScreen;
