import React from "react";
import { Expense, Participants } from "../../types";
import "./DebtsCalculator.css";

export const DebtsCalculator: React.FC<{
  expenses: Expense[];
  participants: Participants;
}> = ({ expenses, participants }) => {
  // **Calculate participant total expenses and consumed amounts:**
  let participantTotalExpenses: Record<string, number> = participants.reduce(
    (acc, cur) => ({ ...acc, [cur]: 0 }),
    {}
  );

  let participantConsumed: Record<string, number> = participants.reduce(
    (acc, cur) => ({ ...acc, [cur]: 0 }),
    {}
  );
  const calculateDebts = () => {
    let balances: Record<string, number> = participants.reduce(
      (acc, cur) => ({ ...acc, [cur]: 0 }),
      {}
    );

    expenses.forEach((expense) => {
      const share = expense.amount / expense.participants.length;
      expense.participants.forEach((participant) => {
        balances[participant] -= share;
        participantConsumed[participant] += share;
      });
      participantTotalExpenses[expense.payer] += expense.amount;
      balances[expense.payer] += expense.amount;
    });

    console.log("Balances:", balances); // Debug output

    Object.keys(balances).forEach((participant) => {
      if (balances[participant] === 0) {
        delete balances[participant];
      }
    });

    // **Sort balances by absolute value:**
    const sortedBalances = Object.entries(balances).sort(
      ([, balanceA], [, balanceB]) => Math.abs(balanceA) - Math.abs(balanceB)
    );

    // **Convert sorted balances back to object:**
    const sortedBalancesObject = sortedBalances.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {} as Record<string, number>
    );

    return sortedBalancesObject;
  };

  const balances = calculateDebts();

  return (
    <div className="debts-calculator">
      <h3>Баланс</h3>
      <div className="participants-list">
        {Object.keys(balances).map((participant, index) => (
          <div key={index} className="participant-card">
            <h4 className="participant-name">{participant}</h4>
            <div className="balance-container">
              <span className="balance-label">Баланс:</span>
              <span className="balance-value">
                {balances[participant].toFixed(2)}
              </span>
            </div>
            <div className="details-container">
              <div className="detail-item">
                <span className="detail-label">Потратил своих денег:</span>
                <span className="detail-value">
                  {participantTotalExpenses[participant].toFixed(2)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Участвовал в тратах:</span>
                <span className="detail-value">
                  {participantConsumed[participant].toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
