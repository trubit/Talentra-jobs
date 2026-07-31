import { Paper, Box, Typography, Stack, Chip, Button, Avatar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { JobMatchBreakdown } from '../types/careerIntelligence.types';

interface JobMatchCardProps {
  match: JobMatchBreakdown;
  onApply: (jobId: string) => void;
}

export function JobMatchCard({ match, onApply }: JobMatchCardProps) {
  const isHighMatch = match.matchPercentage >= 85;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '16px',
        border: '1px solid',
        borderColor: isHighMatch ? 'primary.main' : 'divider',
        bgcolor: 'background.paper',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={match.companyLogoUrl} sx={{ width: 44, height: 44, fontWeight: 800 }}>
            {match.companyName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={800}>
              {match.jobTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {match.companyName} • {match.location || 'Remote'}
            </Typography>
          </Box>
        </Stack>

        <Chip
          label={`${match.matchPercentage}% AI Match`}
          color={isHighMatch ? 'success' : 'primary'}
          sx={{ fontWeight: 800, fontSize: '0.8rem' }}
        />
      </Box>

      <Stack spacing={1.5} sx={{ mb: 2.5 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" sx={{ mb: 0.5 }}>
            Matching Skills
          </Typography>
          <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ gap: 0.75 }}>
            {match.matchingSkills.map((skill) => (
              <Chip key={skill} icon={<CheckCircleIcon style={{ fontSize: 14 }} />} label={skill} size="small" color="success" variant="outlined" />
            ))}
          </Stack>
        </Box>

        {match.missingSkills.length > 0 && (
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={700} display="block" sx={{ mb: 0.5 }}>
              Recommended Skill Upgrades
            </Typography>
            <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ gap: 0.75 }}>
              {match.missingSkills.map((skill) => (
                <Chip key={skill} icon={<WarningIcon style={{ fontSize: 14 }} />} label={skill} size="small" color="warning" variant="outlined" />
              ))}
            </Stack>
          </Box>
        )}
      </Stack>

      <Button variant="contained" fullWidth onClick={() => onApply(match.jobId)}>
        Apply Now with 1-Click Resume
      </Button>
    </Paper>
  );
}
