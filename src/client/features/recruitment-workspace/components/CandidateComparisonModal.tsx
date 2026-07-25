import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Paper,
  Typography,
  Stack,
  Avatar,
  Chip,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CandidateComparisonModalProps {
  open: boolean;
  onClose: () => void;
  candidates: Array<{
    _id: string;
    status: string;
    applicant?: {
      firstName?: string;
      lastName?: string;
      email?: string;
      avatarUrl?: string;
      headline?: string;
      location?: string;
      skills?: string[];
    };
    job?: { title?: string };
  }>;
}

export function CandidateComparisonModal({ open, onClose, candidates }: CandidateComparisonModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2.5, fontWeight: 800, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight={800}>
          👥 Side-by-Side Candidate Comparison ({candidates.length} Selected)
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {candidates.map((cand) => {
            const applicant = cand.applicant;
            return (
              <Grid size={{ xs: 12, md: 12 / Math.min(candidates.length, 3) }} key={cand._id}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider', height: '100%' }}>
                  <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 3 }}>
                    <Avatar src={applicant?.avatarUrl} sx={{ width: 64, height: 64, fontSize: '1.5rem', bgcolor: 'primary.main' }}>
                      {applicant?.firstName?.[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        {applicant?.firstName} {applicant?.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {applicant?.headline || 'Candidate Professional'}
                      </Typography>
                    </Box>
                    <Chip label={cand.status} color="primary" size="small" sx={{ fontWeight: 800 }} />
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={700} display="block">
                        Applied Position:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {cand.job?.title || 'Job Position'}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={700} display="block">
                        Contact Info:
                      </Typography>
                      <Typography variant="body2">{applicant?.email}</Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={700} display="block">
                        Top Skills:
                      </Typography>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} sx={{ mt: 0.5 }}>
                        {applicant?.skills && applicant.skills.length > 0 ? (
                          applicant.skills.slice(0, 5).map((skill, idx) => (
                            <Chip key={idx} label={skill} size="small" variant="outlined" />
                          ))
                        ) : (
                          <Typography variant="caption" color="text.secondary">
                            General Candidate Profile
                          </Typography>
                        )}
                      </Stack>
                    </Box>

                    <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'action.hover' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CheckCircleIcon color="success" fontSize="small" />
                        <Typography variant="caption" fontWeight={700}>
                          Vetted Candidate Profile
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
