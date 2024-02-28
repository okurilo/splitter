import React from "react";
import { Expense } from "../types";

interface ExpensesTableProps {
  expenses: Expense[];
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount</th>
          <th>Payer</th>
          <th>Participants</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td>{expense.title}</td>
            <td>{expense.amount.toFixed(2)}</td>
            <td>{expense.payer}</td>
            <td>{expense.participants.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpensesTable;
