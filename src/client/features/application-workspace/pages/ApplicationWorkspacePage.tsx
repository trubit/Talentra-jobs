import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Paper,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useApplicationWorkspace } from '../hooks/useApplicationWorkspace';
import { CareerGoalsCard } from '../components/CareerGoalsCard';
import { SavedJobCollectionsWidget } from '../components/SavedJobCollectionsWidget';
import { CareerPreferencesModal } from '../components/CareerPreferencesModal';
import { AppSpinner } from '../../../components/feedback/AppSpinner';
import { AppAlert } from '../../../components/feedback/AppAlert';
import { SEO } from '../../../components/seo/SEO';
import { useNavigate } from 'react-router-dom';

export function ApplicationWorkspacePage() {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch, createCollection, updatePreferences } =
    useApplicationWorkspace();

  const [prefModalOpen, setPrefModalOpen] = useState(false);
  const [createColModalOpen, setCreateColModalOpen] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');

  if (isLoading) {
    return <AppSpinner fullPage label="Loading Application Workspace..." />;
  }

  if (error || !data) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <AppAlert severity="error">
          Failed to load application workspace. Please try again.
        </AppAlert>
        <Button variant="outlined" onClick={() => refetch()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Container>
    );
  }

  const handleCreateCollectionSubmit = async () => {
    if (!newColName.trim()) return;
    await createCollection({ name: newColName.trim(), description: newColDesc.trim() });
    setNewColName('');
    setNewColDesc('');
    setCreateColModalOpen(false);
  };

  return (
    <>
      <SEO title="Application Workspace | Talentra" description="Manage submitted applications, saved job collections, and career goals." />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.5px">
              Job Application Workspace
            </Typography>
            <Typography color="text.secondary" variant="body1">
              Track submitted applications, monitor real-time ATS status, and organize career goals.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <IconButton onClick={() => refetch()} color="inherit">
              <RefreshIcon />
            </IconButton>
            <Button
              variant="outlined"
              startIcon={<TuneIcon />}
              onClick={() => setPrefModalOpen(true)}
              sx={{ borderRadius: '12px', fontWeight: 600 }}
            >
              Career Preferences
            </Button>
          </Stack>
        </Box>

        <Stack spacing={4}>
          {/* Main 2-Column Section */}
          <Grid container spacing={3}>
            {/* Left Column: Submitted Applications Table */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight={800}>
                    Active & Recent Applications ({data.applications.length})
                  </Typography>
                  <Button variant="text" size="small" onClick={() => navigate('/applications/me')}>
                    View All Timeline →
                  </Button>
                </Box>

                {data.applications.length === 0 ? (
                  <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography color="text.secondary">No job applications submitted yet.</Typography>
                    <Button variant="contained" onClick={() => navigate('/jobs')} sx={{ mt: 2 }}>
                      Explore Open Jobs
                    </Button>
                  </Box>
                ) : (
                  <Table sx={{ minWidth: 600 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Company & Position</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Applied Date</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.applications.slice(0, 5).map((app) => (
                        <TableRow key={app.id} hover>
                          <TableCell>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                              <Avatar src={app.companyLogoUrl} sx={{ width: 36, height: 36, fontWeight: 700 }}>
                                {app.companyName.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="subtitle2" fontWeight={700}>
                                  {app.jobTitle}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {app.companyName}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={app.status.replace(/_/g, ' ')}
                              size="small"
                              color={
                                app.status.includes('OFFER')
                                  ? 'success'
                                  : app.status.includes('SHORTLISTED') || app.status.includes('INTERVIEW')
                                  ? 'primary'
                                  : app.status.includes('REJECTED') || app.status.includes('WITHDRAWN')
                                  ? 'error'
                                  : 'info'
                              }
                              sx={{ fontWeight: 700, fontSize: '0.7rem' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(app.appliedAt).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small" onClick={() => navigate(`/applications/me`)}>
                              <ArrowForwardIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Paper>
            </Grid>

            {/* Right Column: Career Goals Card */}
            <Grid size={{ xs: 12, md: 4 }}>
              <CareerGoalsCard goals={data.careerGoals} />
            </Grid>
          </Grid>

          {/* Saved Jobs Collections */}
          <SavedJobCollectionsWidget
            collections={data.collections}
            onCreateCollection={() => setCreateColModalOpen(true)}
          />
        </Stack>
      </Container>

      {/* Preferences Modal */}
      <CareerPreferencesModal
        open={prefModalOpen}
        preferences={data.careerPreferences}
        onClose={() => setPrefModalOpen(false)}
        onSave={async (updated) => {
          await updatePreferences(updated);
        }}
      />

      {/* Create Collection Dialog */}
      <Dialog open={createColModalOpen} onClose={() => setCreateColModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={800}>Create Saved Job Collection</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Collection Name"
              placeholder="e.g., Remote Tech Roles"
              value={newColName}
              onChange={(e) => setNewColName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Description (Optional)"
              placeholder="e.g., High priority applications"
              value={newColDesc}
              onChange={(e) => setNewColDesc(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCreateColModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateCollectionSubmit} disabled={!newColName.trim()}>
            Create Collection
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
