import { Paper, Box, Typography, Stack, Avatar } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import { RecentActivityItem } from '../types/jobseekerDashboard.types';

dayjs.extend(relativeTime);

interface RecentActivityTimelineProps {
  activities: RecentActivityItem[];
}

export function RecentActivityTimeline({ activities }: RecentActivityTimelineProps) {
  const getIcon = (type: RecentActivityItem['type']) => {
    switch (type) {
      case 'APPLICATION_SUBMITTED':
        return <AssignmentIcon fontSize="small" sx={{ color: 'primary.main' }} />;
      case 'JOB_SAVED':
        return <BookmarkIcon fontSize="small" sx={{ color: 'secondary.main' }} />;
      case 'RESUME_UPDATED':
        return <DescriptionIcon fontSize="small" sx={{ color: 'info.main' }} />;
      case 'PROFILE_UPDATED':
        return <PersonIcon fontSize="small" sx={{ color: 'success.main' }} />;
      case 'INTERVIEW_INVITATION':
      case 'STATUS_CHANGED':
        return <EventAvailableIcon fontSize="small" sx={{ color: 'warning.main' }} />;
      default:
        return <AssignmentIcon fontSize="small" />;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
      }}
    >
      <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>
        Recent Career Activity
      </Typography>

      {activities.length === 0 ? (
        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No recent activity recorded yet. Start exploring and applying to jobs!
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2.5}>
          {activities.map((item) => (
            <Stack key={item.id} direction="row" spacing={2} alignItems="flex-start">
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: 'action.hover',
                  flexShrink: 0,
                  mt: 0.25,
                }}
              >
                {getIcon(item.type)}
              </Avatar>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                  <Typography variant="subtitle2" fontWeight={700} noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0, ml: 1 }}>
                    {dayjs(item.timestamp).fromNow()}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
