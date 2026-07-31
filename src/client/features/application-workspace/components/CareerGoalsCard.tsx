import { Paper, Box, Typography, Stack, Chip } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { CareerGoals } from '../types/applicationWorkspace.types';

interface CareerGoalsCardProps {
  goals: CareerGoals;
}

export function CareerGoalsCard({ goals }: CareerGoalsCardProps) {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <FlagIcon color="primary" />
          <Typography variant="h6" fontWeight={800}>
            Career Target & Growth Goals
          </Typography>
        </Stack>
      </Box>

      <Stack spacing={2.5}>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" sx={{ textTransform: 'uppercase', mb: 0.5 }}>
            Short-Term Focus
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {goals.shortTermGoal}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" sx={{ textTransform: 'uppercase', mb: 0.5 }}>
            Long-Term Vision
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {goals.longTermGoal}
          </Typography>
        </Box>

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <SchoolIcon fontSize="small" color="secondary" />
            <Typography variant="subtitle2" fontWeight={700}>
              Skills To Master
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {goals.skillsToAcquire.map((skill) => (
              <Chip key={skill} label={skill} size="small" variant="outlined" color="primary" />
            ))}
          </Stack>
        </Box>

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <WorkspacePremiumIcon fontSize="small" color="warning" />
            <Typography variant="subtitle2" fontWeight={700}>
              Target Certifications
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {goals.targetCertifications.map((cert) => (
              <Chip key={cert} label={cert} size="small" color="warning" sx={{ fontWeight: 600 }} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
