export interface IBudgetItem {
    text: string;
    sum: number;
    date: string;
    category: string;
    type: 'income' | 'expense';
}
