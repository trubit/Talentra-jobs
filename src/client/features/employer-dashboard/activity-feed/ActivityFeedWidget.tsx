import { Paper, Typography, Stack, Box, Avatar, CircularProgress } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { ActivityItem } from '../services/employerDashboardApi';

interface ActivityFeedWidgetProps {
  activities?: ActivityItem[];
  isLoading: boolean;
}

export function ActivityFeedWidget({ activities, isLoading }: ActivityFeedWidgetProps) {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider', height: '100%' }}>
      <Typography variant="h6" fontWeight={800} sx={{ mb: 2.5 }}>
        📢 Real-Time Recruitment Activity
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress size={32} />
        </Box>
      ) : !activities || activities.length === 0 ? (
        <Box textAlign="center" py={4}>
          <NotificationsActiveIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            No recruitment events recorded yet.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {activities.map((act) => (
            <Stack key={act._id} direction="row" spacing={2} alignItems="flex-start">
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
                ⚡
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight={700}>
                  {act.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {act.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                  {new Date(act.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
