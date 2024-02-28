import React from "react";
import { Expense, Participants } from "../types";

interface DebtsTableProps {
  expenses: Expense[];
  participants: Participants;
}

const DebtsTable: React.FC<DebtsTableProps> = ({ expenses, participants }) => {
  // Функция для расчета долгов между участниками
  const calculateDebts = () => {
    let balances: Record<string, number> = participants.reduce(
      (acc, participant) => ({ ...acc, [participant]: 0 }),
      {}
    );

    expenses.forEach((expense) => {
      const amountPerParticipant = expense.amount / expense.participants.length;
      expense.participants.forEach((participant) => {
        balances[participant] -= amountPerParticipant;
      });
      balances[expense.payer] += expense.amount;
    });

    // Перевод балансов в долги
    const debts: { from: string; to: string; amount: number }[] = [];
    participants.forEach((participant) => {
      if (balances[participant] < 0) {
        for (const [payer, amount] of Object.entries(balances)) {
          if (amount > 0 && balances[participant] < 0) {
            let debtAmount = Math.min(-balances[participant], amount);
            debts.push({ from: participant, to: payer, amount: debtAmount });
            balances[participant] += debtAmount;
            balances[payer] -= debtAmount;
          }
        }
      }
    });

    return debts;
  };

  const debts = calculateDebts();

  return (
    <div>
      <h3>Задолженность</h3>
      <table>
        <thead>
          <tr>
            <th>Кто должен</th>
            <th>Кому должен</th>
            <th>Сколько должен</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt, index) => (
            <tr key={index}>
              <td>{debt.from}</td>
              <td>{debt.to}</td>
              <td>{debt.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DebtsTable;
