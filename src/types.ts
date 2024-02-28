// Project тип представляет информацию о проекте
export type Project = {
  projectName: string; // Название проекта
  participants: string[]; // Массив участников проекта
  expenses: Expense[]; // Массив расходов проекта
};

// Expense тип представляет информацию о расходе
export type Expense = {
  title: string; // Название расхода
  amount: number; // Сумма расхода
  payer: string; // Участник, который оплатил расход
  participants: string[]; // Массив участников, покрывающих расход
  shares?: Record<string, number>;
};

// Participants тип представляет массив участников проекта
export type Participants = string[];
