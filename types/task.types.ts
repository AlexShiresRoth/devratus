export type TaskType = {
  task: string;
  urgency: string;
  order: number;
  taskDescription?: string;
  groupRef?: string;
  resourceRef?: string;
  _id: string;
  status?: "tasked" | "completed" | "archived";
};
