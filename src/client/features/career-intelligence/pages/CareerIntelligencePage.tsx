import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useCareerIntelligence } from '../hooks/useCareerIntelligence';
import { CareerScoreGauge } from '../components/CareerScoreGauge';
import { JobMatchCard } from '../components/JobMatchCard';
import { SkillsGapChart } from '../components/SkillsGapChart';
import { ProfileOptimizationWidget } from '../components/ProfileOptimizationWidget';
import { CareerRoadmapTimeline } from '../components/CareerRoadmapTimeline';
import { ProfileVisibilityControl } from '../components/ProfileVisibilityControl';
import { AppSpinner } from '../../../components/feedback/AppSpinner';
import { AppAlert } from '../../../components/feedback/AppAlert';
import { SEO } from '../../../components/seo/SEO';
import { useNavigate } from 'react-router-dom';

export function CareerIntelligencePage() {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch, updateVisibility, createRoadmap } = useCareerIntelligence();

  const [visibilityModalOpen, setVisibilityModalOpen] = useState(false);
  const [roadmapModalOpen, setRoadmapModalOpen] = useState(false);
  const [currentRoleInput, setCurrentRoleInput] = useState('');
  const [targetRoleInput, setTargetRoleInput] = useState('');

  if (isLoading) {
    return <AppSpinner fullPage label="Calculating AI Career Intelligence & Job Matching..." />;
  }

  if (error || !data) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <AppAlert severity="error">
          Failed to load AI Career Intelligence metrics. Please refresh.
        </AppAlert>
        <Button variant="outlined" onClick={() => refetch()} sx={{ mt: 2 }}>
          Retry Load
        </Button>
      </Container>
    );
  }

  const handleCreateRoadmapSubmit = async () => {
    if (!currentRoleInput.trim() || !targetRoleInput.trim()) return;
    await createRoadmap({ currentRole: currentRoleInput.trim(), targetRole: targetRoleInput.trim() });
    setCurrentRoleInput('');
    setTargetRoleInput('');
    setRoadmapModalOpen(false);
  };

  return (
    <>
      <SEO title="AI Career Intelligence & Job Matching | Talentra" description="Deterministic job matching, career score gauge, skills gap analysis, and profile optimization." />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Top Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h4" fontWeight={800} letterSpacing="-0.5px">
                AI Career Intelligence Hub
              </Typography>
              <AutoAwesomeIcon color="primary" />
            </Stack>
            <Typography color="text.secondary" variant="body1">
              Deterministic skill-to-job matching, readiness scoring, and career growth roadmap.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Tooltip title="Refresh AI Insights">
              <IconButton onClick={() => refetch()} color="inherit">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              onClick={() => setVisibilityModalOpen(true)}
              sx={{ borderRadius: '12px', fontWeight: 600 }}
            >
              Profile Visibility: {data.visibilitySettings.visibilityMode}
            </Button>
          </Stack>
        </Box>

        <Stack spacing={4}>
          {/* Main 2-Column Hero Grid: Score Gauge + Optimization Widget */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <CareerScoreGauge score={data.careerScore} />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <ProfileOptimizationWidget report={data.optimizationReport} />
            </Grid>
          </Grid>

          {/* AI Recommended High Job Matches */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={800}>
                  Highest Matching Openings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Based on skill matrix overlap, experience, and workplace preference
                </Typography>
              </Box>
              <Button variant="text" onClick={() => navigate('/jobs')}>
                View All Matching Jobs →
              </Button>
            </Box>

            <Grid container spacing={3}>
              {data.topJobMatches.slice(0, 2).map((match) => (
                <Grid key={match.jobId} size={{ xs: 12, md: 6 }}>
                  <JobMatchCard match={match} onApply={() => navigate(`/jobs/${match.jobId}`)} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Skills Gap Analysis & Roadmap Timeline */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <SkillsGapChart skills={data.skillsAnalysis} />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <CareerRoadmapTimeline
                roadmap={data.activeRoadmap}
                onCreateMilestone={() => setRoadmapModalOpen(true)}
              />
            </Grid>
          </Grid>
        </Stack>
      </Container>

      {/* Visibility Control Modal */}
      <ProfileVisibilityControl
        open={visibilityModalOpen}
        settings={data.visibilitySettings}
        onClose={() => setVisibilityModalOpen(false)}
        onSave={async (updated) => {
          await updateVisibility(updated);
        }}
      />

      {/* Create Roadmap Dialog */}
      <Dialog open={roadmapModalOpen} onClose={() => setRoadmapModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={800}>Create Career Growth Plan</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Current Position"
              placeholder="e.g., Senior Full Stack Engineer"
              value={currentRoleInput}
              onChange={(e) => setCurrentRoleInput(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Target Career Goal Role"
              placeholder="e.g., Principal Software Architect"
              value={targetRoleInput}
              onChange={(e) => setTargetRoleInput(e.target.value)}
              fullWidth
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setRoadmapModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateRoadmapSubmit} disabled={!currentRoleInput.trim() || !targetRoleInput.trim()}>
            Create Roadmap
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
