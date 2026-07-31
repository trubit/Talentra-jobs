import { Paper, Box, Typography, Stack, Button, Chip } from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProfileOptimizationReport } from '../types/careerIntelligence.types';
import { useNavigate } from 'react-router-dom';

interface ProfileOptimizationWidgetProps {
  report: ProfileOptimizationReport;
}

export function ProfileOptimizationWidget({ report }: ProfileOptimizationWidgetProps) {
  const navigate = useNavigate();

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <SpeedIcon color="primary" />
          <Typography variant="h6" fontWeight={800}>
            Profile Optimization Recommendations
          </Typography>
        </Stack>
        <Chip label={`${report.completenessScore}% Complete`} color="success" size="small" sx={{ fontWeight: 700 }} />
      </Box>

      <Stack spacing={2}>
        {report.recommendations.map((rec) => (
          <Paper
            key={rec.id}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '12px',
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ pr: 2 }}>
              <Typography variant="subtitle2" fontWeight={800}>
                {rec.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {rec.description}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate(rec.actionUrl)}
              sx={{ whiteSpace: 'nowrap', borderRadius: '10px' }}
            >
              Action
            </Button>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}
