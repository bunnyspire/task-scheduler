import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchTasks, fetchExecutedTasks, addTask, deleteTask, Task } from './store/tasksSlice';
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, executedTasks, loading, error } = useSelector((state: RootState) => state.tasks);

  const [taskType, setTaskType] = useState<'one-time' | 'recurring'>('one-time');
  const [time, setTime] = useState('');
  const [cron, setCron] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchExecutedTasks());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Partial<Task> = { type: taskType, time };
    if (taskType === 'recurring') {
      newTask.cron = cron;
    }
    dispatch(addTask(newTask));
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Typography component="h1" variant="h4" align="center" gutterBottom>
        Task Scheduler
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={taskType} onChange={(e) => setTaskType(e.target.value as 'one-time' | 'recurring')}>
                <MenuItem value="one-time">One-Time</MenuItem>
                <MenuItem value="recurring">Recurring</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Time"
              type="datetime-local"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          {taskType === 'recurring' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cron"
                value={cron}
                onChange={(e) => setCron(e.target.value)}
                required
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Schedule Task
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography component="h2" variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>
        Scheduled Tasks
      </Typography>
      {loading && <Typography align="center">Loading...</Typography>}
      {error && <Typography align="center" color="error">Error: {error}</Typography>}
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary={`${task.type} - ${task.time}`}
              secondary={task.cron ? `Cron: ${task.cron}` : null}
            />
          </ListItem>
        ))}
      </List>
      <Typography component="h2" variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>
        Executed Tasks
      </Typography>
      <List>
        {executedTasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={`${task.type} - Executed At: ${task.executedAt}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
