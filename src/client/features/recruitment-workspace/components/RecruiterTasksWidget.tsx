import {
  Paper,
  Typography,
  Stack,
  Box,
  Button,
  Chip,
  IconButton,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useRecruiterTasks, useCreateRecruiterTask, useUpdateTaskStatus } from '../hooks/useRecruitmentWorkspace';

export function RecruiterTasksWidget() {
  const { data: tasks, isLoading } = useRecruiterTasks();
  const createTaskMutation = useCreateRecruiterTask();
  const updateStatusMutation = useUpdateTaskStatus();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>('MEDIUM');
  const [description, setDescription] = useState('');

  const handleCreateTask = async () => {
    if (!title.trim()) return;
    await createTaskMutation.mutateAsync({ title, priority, description });
    setTitle('');
    setDescription('');
    setDialogOpen(false);
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider', mb: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={800}>
          📋 Recruiter Action Tasks
        </Typography>
        <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
          New Task
        </Button>
      </Stack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={3}>
          <CircularProgress size={28} />
        </Box>
      ) : !tasks || tasks.length === 0 ? (
        <Typography variant="body2" color="text.secondary" py={2}>
          No pending tasks. Create recruiter tasks to organize candidate interviews, resume reviews, and background checks.
        </Typography>
      ) : (
        <Stack spacing={1.5}>
          {tasks.map((t) => (
            <Paper key={t._id} variant="outlined" sx={{ p: 2, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                  <Chip
                    label={t.priority}
                    size="small"
                    color={t.priority === 'URGENT' ? 'error' : t.priority === 'HIGH' ? 'warning' : 'primary'}
                    sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                  />
                  <Typography variant="subtitle2" fontWeight={700} sx={{ textDecoration: t.status === 'COMPLETED' ? 'line-through' : 'none' }}>
                    {t.title}
                  </Typography>
                </Stack>
                {t.description && (
                  <Typography variant="caption" color="text.secondary" display="block">
                    {t.description}
                  </Typography>
                )}
              </Box>
              <IconButton
                color={t.status === 'COMPLETED' ? 'success' : 'default'}
                onClick={() => updateStatusMutation.mutate({ id: t._id, status: t.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' })}
              >
                <CheckCircleIcon />
              </IconButton>
            </Paper>
          ))}
        </Stack>
      )}

      {/* New Task Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={800}>Create Recruiter Task</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Task Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Schedule technical interview for Senior React role"
            />
            <TextField
              select
              label="Priority"
              fullWidth
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT')}
            >
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
              <MenuItem value="URGENT">Urgent</MenuItem>
            </TextField>
            <TextField
              label="Description (Optional)"
              multiline
              rows={2}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateTask} disabled={!title.trim() || createTaskMutation.isPending}>
            {createTaskMutation.isPending ? 'Saving...' : 'Create Task'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
