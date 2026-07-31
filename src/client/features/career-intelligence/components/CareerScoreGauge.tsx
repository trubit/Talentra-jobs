import { Paper, Box, Typography, Stack, LinearProgress, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { CareerScoreBreakdown } from '../types/careerIntelligence.types';

interface CareerScoreGaugeProps {
  score: CareerScoreBreakdown;
}

export function CareerScoreGauge({ score }: CareerScoreGaugeProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3.5,
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)',
        color: '#FFFFFF',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ p: 1, borderRadius: '12px', bgcolor: 'rgba(255, 255, 255, 0.15)' }}>
            <AutoAwesomeIcon sx={{ color: '#F59E0B' }} />
          </Box>
          <Typography variant="h6" fontWeight={800}>
            AI Career Readiness Score
          </Typography>
        </Stack>
        <Chip
          icon={<TrendingUpIcon style={{ color: '#10B981' }} />}
          label={`Top ${100 - score.percentileRank}% Percentile`}
          sx={{ bgcolor: 'rgba(16, 185, 129, 0.2)', color: '#10B981', fontWeight: 700 }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 3 }}>
        <Typography variant="h2" fontWeight={900} letterSpacing="-1px">
          {score.overallScore}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.7 }}>
          / 100
        </Typography>
      </Box>

      <Stack spacing={2}>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ opacity: 0.85, fontWeight: 600 }}>
              Resume Quality & Formatting
            </Typography>
            <Typography variant="caption" fontWeight={700}>
              {score.resumeScore}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={score.resumeScore} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255, 255, 255, 0.2)', '& .MuiLinearProgress-bar': { bgcolor: '#10B981' } }} />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ opacity: 0.85, fontWeight: 600 }}>
              Skills & Tech Stack Alignment
            </Typography>
            <Typography variant="caption" fontWeight={700}>
              {score.skillsScore}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={score.skillsScore} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255, 255, 255, 0.2)', '& .MuiLinearProgress-bar': { bgcolor: '#3B82F6' } }} />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ opacity: 0.85, fontWeight: 600 }}>
              Portfolio & Project Showcase
            </Typography>
            <Typography variant="caption" fontWeight={700}>
              {score.portfolioScore}%
            </Typography>
          </Box>
          <LinearProgress variant="determinate" value={score.portfolioScore} sx={{ height: 6, borderRadius: 3, bgcolor: 'rgba(255, 255, 255, 0.2)', '& .MuiLinearProgress-bar': { bgcolor: '#8B5CF6' } }} />
        </Box>
      </Stack>
    </Paper>
  );
}
