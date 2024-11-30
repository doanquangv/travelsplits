// client/travelsplits/src/models/ExpenseModel.ts

export interface TotalBudget {
    title: string;
    amount: number;
    addedBy: string;
    addedAt: string; // ISO string
  }
  
  export interface ActualExpense {
    // _id: string;
    name: string;
    amount: number;
    category: string;
    date: string; // ISO string
  }
  
  export interface Expense {
    eventId: string;
    totalBudget: TotalBudget;
    actualExpenses: ActualExpense[];
  }
  