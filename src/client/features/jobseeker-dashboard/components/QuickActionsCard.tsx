import { Paper, Typography, Grid, Box, Button, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';
import { QuickActionItem } from '../types/jobseekerDashboard.types';

interface QuickActionsCardProps {
  actions: QuickActionItem[];
}

export function QuickActionsCard({ actions }: QuickActionsCardProps) {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <SearchIcon color="primary" />;
      case 'Person':
        return <PersonIcon color="secondary" />;
      case 'Assignment':
        return <AssignmentIcon color="info" />;
      case 'Bookmark':
        return <BookmarkIcon color="warning" />;
      default:
        return <SearchIcon color="primary" />;
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
      }}
    >
      <Typography variant="h6" fontWeight={800} sx={{ mb: 2.5 }}>
        Quick Actions & Career Tools
      </Typography>

      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid key={action.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate(action.actionUrl)}
              sx={{
                p: 2.5,
                borderRadius: '14px',
                borderColor: 'divider',
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                bgcolor: 'background.paper',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1.5 }}>
                {getIcon(action.icon)}
                {action.badge && (
                  <Chip label={action.badge} size="small" color="primary" sx={{ height: 20, fontSize: '0.65rem' }} />
                )}
              </Box>
              <Typography variant="subtitle2" fontWeight={700} color="text.primary" sx={{ mb: 0.5 }}>
                {action.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'none' }}>
                {action.description}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
