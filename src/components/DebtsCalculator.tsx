import React from "react";
import { Expense, Participants } from "../types";

const DebtsCalculator: React.FC<{
  expenses: Expense[];
  participants: Participants;
}> = ({ expenses, participants }) => {
  const calculateDebts = () => {
    let balances: Record<string, number> = participants.reduce(
      (acc, cur) => ({ ...acc, [cur]: 0 }),
      {}
    );

    expenses.forEach((expense) => {
      const share = expense.amount / expense.participants.length;
      expense.participants.forEach((participant) => {
        balances[participant] -= share;
      });
      balances[expense.payer] += expense.amount;
    });

    console.log("Balances:", balances); // Выводим баланс каждого участника для отладки

    Object.keys(balances).forEach((participant) => {
      if (balances[participant] === 0) {
        delete balances[participant];
      }
    });

    // Сортируем балансы по абсолютному значению баланса
    const sortedBalances = Object.entries(balances).sort(
      ([, balanceA], [, balanceB]) => Math.abs(balanceA) - Math.abs(balanceB)
    );

    // Преобразуем отсортированный массив обратно в объект
    const sortedBalancesObject = sortedBalances.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {} as Record<string, number>
    );

    // Возвращаем отсортированный объект балансов
    return sortedBalancesObject;
  };

  const balances = calculateDebts();

  return (
    <div>
      <h3>Debts</h3>
      <ul>
        {Object.keys(balances).map((participant, index) => (
          <li key={index}>
            {participant}: {balances[participant].toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebtsCalculator;
