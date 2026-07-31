import { Paper, Box, Typography, Stack, Chip, Button } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddIcon from '@mui/icons-material/Add';
import { CareerRoadmapPlan } from '../types/careerIntelligence.types';

interface CareerRoadmapTimelineProps {
  roadmap: CareerRoadmapPlan;
  onCreateMilestone: () => void;
}

export function CareerRoadmapTimeline({ roadmap, onCreateMilestone }: CareerRoadmapTimelineProps) {
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
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <TimelineIcon color="primary" />
            <Typography variant="h6" fontWeight={800}>
              Career Growth & Target Roadmap
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {roadmap.currentRole} → {roadmap.targetRole}
          </Typography>
        </Box>
        <Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={onCreateMilestone}>
          New Target Milestone
        </Button>
      </Box>

      <Stack spacing={2.5}>
        {roadmap.milestones.map((step) => (
          <Paper
            key={step.id}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '14px',
              border: '1px solid',
              borderColor: step.completed ? 'success.main' : 'divider',
              bgcolor: step.completed ? 'success.50' : 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                {step.completed ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon color="disabled" />}
                <Typography variant="subtitle1" fontWeight={800}>
                  {step.title}
                </Typography>
              </Stack>
              <Chip label={step.timeframe} size="small" sx={{ fontWeight: 700 }} />
            </Box>

            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1, pl: 4 }}>
              {step.requiredSkills.map((sk) => (
                <Chip key={sk} label={sk} size="small" variant="outlined" color="primary" />
              ))}
              {step.targetCertifications.map((cert) => (
                <Chip key={cert} label={cert} size="small" color="warning" />
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}
