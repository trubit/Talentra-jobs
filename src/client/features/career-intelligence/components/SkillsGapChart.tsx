import { Paper, Box, Typography, Stack, Chip } from '@mui/material';
import PsychologicalIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { SkillsAnalysisResult } from '../types/careerIntelligence.types';

interface SkillsGapChartProps {
  skills: SkillsAnalysisResult;
}

export function SkillsGapChart({ skills }: SkillsGapChartProps) {
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
          <PsychologicalIcon color="primary" />
          <Typography variant="h6" fontWeight={800}>
            Skills Gap & Industry Trends
          </Typography>
        </Stack>
        <Chip label={`${skills.skillGapPercentage}% Gap`} color="warning" size="small" sx={{ fontWeight: 700 }} />
      </Box>

      <Stack spacing={2.5}>
        <Box>
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            Validated Core Competencies
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {skills.existingSkills.map((skill) => (
              <Chip key={skill} label={skill} color="primary" size="small" />
            ))}
          </Stack>
        </Box>

        <Box>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <TrendingUpIcon fontSize="small" color="secondary" />
            <Typography variant="subtitle2" fontWeight={700}>
              High Demand Trending Skills
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {skills.trendingSkills.map((skill) => (
              <Chip key={skill} label={skill} color="secondary" size="small" variant="outlined" sx={{ fontWeight: 600 }} />
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            Transferable Soft & Leadership Skills
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {skills.transferableSkills.map((skill) => (
              <Chip key={skill} label={skill} size="small" sx={{ bgcolor: 'action.hover', fontWeight: 600 }} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
