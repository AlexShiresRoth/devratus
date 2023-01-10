export type TaskType = {
  task: string;
  urgency: string;
  order: number;
  description?: string;
  groupRef?: string;
  resourceRef?: string;
  _id: string;
  status?: "incomplete" | "completed" | "archived";
};
