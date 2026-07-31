import { Paper, Box, Typography, LinearProgress, Button, Stack, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { ProfileCompletionBreakdown } from '../types/jobseekerDashboard.types';

interface ProfileCompletionCardProps {
  completion: ProfileCompletionBreakdown;
}

export function ProfileCompletionCard({ completion }: ProfileCompletionCardProps) {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={800}>
          Profile Completeness
        </Typography>
        <Chip
          label={`${completion.score}% Complete`}
          color={completion.score === 100 ? 'success' : completion.score >= 70 ? 'primary' : 'warning'}
          size="small"
          sx={{ fontWeight: 700 }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <LinearProgress
          variant="determinate"
          value={completion.score}
          sx={{
            height: 10,
            borderRadius: 5,
            bgcolor: 'action.hover',
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
            },
          }}
        />
      </Box>

      {completion.nextRecommendedAction && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: '12px',
            bgcolor: 'primary.50',
            border: '1px solid',
            borderColor: 'primary.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="caption" color="primary.main" fontWeight={700} display="block">
              RECOMMENDED ACTION
            </Typography>
            <Typography variant="subtitle2" fontWeight={700}>
              {completion.nextRecommendedAction.label}
            </Typography>
          </Box>
          <Button
            size="small"
            variant="contained"
            disableElevation
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(completion.nextRecommendedAction!.actionUrl)}
          >
            Update
          </Button>
        </Paper>
      )}

      <Stack spacing={1.5} sx={{ flexGrow: 1, overflowY: 'auto', maxH: 260 }}>
        {completion.items.map((item) => (
          <Box
            key={item.key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 0.75,
              px: 1,
              borderRadius: '8px',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              {item.completed ? (
                <CheckCircleIcon sx={{ fontSize: 18, color: 'success.main' }} />
              ) : (
                <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
              )}
              <Typography
                variant="body2"
                fontWeight={item.completed ? 600 : 500}
                color={item.completed ? 'text.primary' : 'text.secondary'}
              >
                {item.label}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>
              +{item.weight}%
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
