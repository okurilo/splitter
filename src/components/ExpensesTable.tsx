import React from "react";
import { Expense } from "../types";

interface ExpensesTableProps {
  expenses: Expense[];
  handleDeleteExpense: (index: number) => void;
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  expenses,
  handleDeleteExpense,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Стоимость</th>
          <th>Оплатил</th>
          <th>Участники</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td>{expense.title}</td>
            <td>{expense.amount.toFixed(2)}</td>
            <td>{expense.payer}</td>
            <td>{expense.participants.join(", ")}</td>{" "}
            <td>
              {/* Обратите внимание, что теперь мы передаем index в качестве аргумента */}
              <button onClick={() => handleDeleteExpense(index)}>
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpensesTable;
