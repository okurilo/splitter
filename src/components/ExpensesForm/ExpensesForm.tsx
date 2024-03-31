import React, { useState } from "react";
import { Expense, Project } from "../../types";
import { useParticipantsSelection } from "../../hooks/useParticipantsSelection";
import "./style.css";

interface ExpensesFormProps {
  currentProject: Project;
  onAddExpense: (expense: Expense) => void;
}

export const ExpensesForm: React.FC<ExpensesFormProps> = ({
  currentProject,
  onAddExpense,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [customizeParticipants, setCustomizeParticipants] = useState(false);

  const { selectedParticipants, toggleParticipantSelection } =
    useParticipantsSelection(currentProject.participants);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddExpense({
      title,
      amount: parseFloat(amount),
      payer,
      participants: customizeParticipants
        ? selectedParticipants
        : currentProject.participants,
    });
    // Reset form fields after submission
    setTitle("");
    setAmount("");
    setPayer("");
    setCustomizeParticipants(false); // Reset customization option
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Стоимость"
        required
      />
      <select value={payer} onChange={(e) => setPayer(e.target.value)} required>
        <option value="">Оплачено</option>
        {currentProject.participants.map((participant, index) => (
          <option key={index} value={participant}>
            {participant}
          </option>
        ))}
      </select>
      <div className="customise-block">
        <label>
          <input
            type="checkbox"
            checked={customizeParticipants}
            onChange={() => setCustomizeParticipants(!customizeParticipants)}
          />
          Настроить участников
        </label>
      </div>
      <div>
        {customizeParticipants &&
          currentProject.participants.map((participant, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedParticipants.includes(participant)}
                onChange={() => toggleParticipantSelection(participant)}
              />
              {participant}
            </label>
          ))}
      </div>
      <button type="submit">Добавить трату</button>
    </form>
  );
};
