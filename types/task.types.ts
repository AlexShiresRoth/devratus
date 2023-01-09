export type TaskType = {
  task: string;
  urgency: string;
  order: number;
  taskDescription?: string;
  groupRef?: string;
  resourceRef?: string;
};
