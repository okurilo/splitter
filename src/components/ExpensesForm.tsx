import React, { useState } from "react";
import { Expense, Participants, Project } from "../types";

function ExpensesForm({
  currentProject,
  onAddExpense,
}: {
  currentProject: Project;
  onAddExpense: (expense: Expense) => void;
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [selectedParticipants, setSelectedParticipants] =
    useState<Participants>([]);
  const [customizeParticipants, setCustomizeParticipants] = useState(false); // Добавляем состояние для управления кастомизацией участников

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddExpense({
      title,
      amount: parseFloat(amount),
      payer,
      participants: customizeParticipants
        ? selectedParticipants
        : currentProject.participants, // Проверяем, нужно ли использовать выбранных участников или всех участников проекта
    });
    setTitle("");
    setAmount("");
    setPayer("");
    setSelectedParticipants([]);
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
      {customizeParticipants && ( // Отображаем чекбокс для кастомизации участников, если он активирован
        <div>
          {currentProject.participants.map((participant, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedParticipants.includes(participant)}
                onChange={() => {
                  const newSelected = selectedParticipants.includes(participant)
                    ? selectedParticipants.filter((p) => p !== participant)
                    : [...selectedParticipants, participant];
                  setSelectedParticipants(newSelected);
                }}
              />
              {participant}
            </label>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setCustomizeParticipants(!customizeParticipants)}
      >
        Настроить участников
      </button>{" "}
      {/* Кнопка для активации/деактивации кастомизации участников */}
      <button type="submit">Добавить трату</button>
    </form>
  );
}

export default ExpensesForm;
