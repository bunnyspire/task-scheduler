import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import nodeCron from 'node-cron';

type Task = {
  id: string;
  type: 'one-time' | 'recurring';
  time: string;
  cron?: string;
  executedAt?: string;
};

let tasks: Task[] = [];
let executedTasks: Task[] = [];

const router = Router();

router.post('/', (req, res) => {
  const { type, time, cron } = req.body;
  const newTask: Task = { id: uuidv4(), type, time, cron };

  tasks.push(newTask);

  if (type === 'one-time') {
    setTimeout(() => executeTask(newTask), new Date(time).getTime() - Date.now());
  } else if (type === 'recurring' && cron) {
    nodeCron.schedule(cron, () => executeTask(newTask));
  }

  res.status(200).send(newTask);
});

router.get('/', (req, res) => {
  res.send(tasks);
});

router.get('/executed', (req, res) => {
  res.send(executedTasks);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  res.status(200).send();
});

const executeTask = (task: Task) => {
  task.executedAt = new Date().toISOString();
  executedTasks.push(task);
  tasks = tasks.filter(t => t.id !== task.id);
  console.log(`Executed task: ${task.id}`);
};

export default router;
