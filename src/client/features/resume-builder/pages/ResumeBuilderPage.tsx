import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Paper,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useResumeBuilder } from '../hooks/useResumeBuilder';
import { useResumeBuilderStore } from '../store/useResumeBuilderStore';
import { ResumeTemplateSelector } from '../components/ResumeTemplateSelector';
import { ResumeSectionEditor } from '../components/ResumeSectionEditor';
import { CoverLetterModal } from '../components/CoverLetterModal';
import { PortfolioShowcaseCard } from '../components/PortfolioShowcaseCard';
import { AppSpinner } from '../../../components/feedback/AppSpinner';
import { AppAlert } from '../../../components/feedback/AppAlert';
import { SEO } from '../../../components/seo/SEO';

export function ResumeBuilderPage() {
  const { data, isLoading, error, refetch, createResume, generateShareToken, createCoverLetter, createPortfolioProject } = useResumeBuilder();
  const { activeTab, setActiveTab, selectedTemplateId, setSelectedTemplateId } = useResumeBuilderStore();

  const [createResumeModalOpen, setCreateResumeModalOpen] = useState(false);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [coverLetterModalOpen, setCoverLetterModalOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [projTitle, setProjTitle] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projUrl, setProjUrl] = useState('');
  const [projTech, setProjTech] = useState('');

  const [sections, setSections] = useState([
    { id: 'sec_personal', type: 'PERSONAL_INFO' as const, title: 'Personal & Contact Info', content: {}, order: 1, isVisible: true },
    { id: 'sec_summary', type: 'SUMMARY' as const, title: 'Executive Summary', content: {}, order: 2, isVisible: true },
    { id: 'sec_experience', type: 'EXPERIENCE' as const, title: 'Work Experience', content: {}, order: 3, isVisible: true },
    { id: 'sec_skills', type: 'SKILLS' as const, title: 'Skills & Competencies', content: {}, order: 4, isVisible: true },
    { id: 'sec_education', type: 'EDUCATION' as const, title: 'Education & Certifications', content: {}, order: 5, isVisible: true },
  ]);

  if (isLoading) {
    return <AppSpinner fullPage label="Loading Resume Builder Workspace..." />;
  }

  if (error || !data) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <AppAlert severity="error">
          Failed to load resume builder payload. Please refresh.
        </AppAlert>
        <Button variant="outlined" onClick={() => refetch()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Container>
    );
  }

  const activeResume = data.resumes[0];

  const handleCreateResume = async () => {
    if (!newResumeTitle.trim()) return;
    await createResume({ title: newResumeTitle.trim(), templateId: selectedTemplateId });
    setNewResumeTitle('');
    setCreateResumeModalOpen(false);
  };

  const handleShareResume = async () => {
    if (!activeResume) return;
    const res = await generateShareToken(activeResume.id);
    setShareUrl(res.shareUrl);
    setShareDialogOpen(true);
  };

  const handleCreateProjectSubmit = async () => {
    if (!projTitle.trim() || !projDesc.trim()) return;
    await createPortfolioProject({
      title: projTitle.trim(),
      description: projDesc.trim(),
      projectUrl: projUrl.trim() || undefined,
      technologies: projTech ? projTech.split(',').map((t) => t.trim()) : ['React'],
    });
    setProjTitle('');
    setProjDesc('');
    setProjUrl('');
    setProjTech('');
    setCreateProjectModalOpen(false);
  };

  const toggleSectionVisibility = (secId: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === secId ? { ...s, isVisible: !s.isVisible } : s))
    );
  };

  return (
    <>
      <SEO title="Resume Builder & Portfolio Workspace | Talentra" description="Build multi-version resumes, custom cover letters, and professional portfolio projects." />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Top Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.5px">
              Resume Builder & Professional Branding
            </Typography>
            <Typography color="text.secondary" variant="body1">
              Craft ATS-optimized resumes, generate cover letter drafts, and feature portfolio projects.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Tooltip title="Refresh Data">
              <IconButton onClick={() => refetch()} color="inherit">
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Button variant="outlined" startIcon={<ShareIcon />} onClick={handleShareResume} sx={{ borderRadius: '12px', fontWeight: 600 }}>
              Share Link
            </Button>
            <Button variant="contained" startIcon={<PictureAsPdfIcon />} sx={{ borderRadius: '12px', fontWeight: 600 }}>
              Export PDF
            </Button>
          </Stack>
        </Box>

        {/* Tab Selection */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={activeTab} onChange={(_e, val) => setActiveTab(val)}>
            <Tab label={`Resumes (${data.resumes.length})`} value="RESUMES" sx={{ fontWeight: 700 }} />
            <Tab label={`Cover Letters (${data.coverLetters.length})`} value="COVER_LETTERS" sx={{ fontWeight: 700 }} />
            <Tab label={`Portfolio Showcase (${data.portfolioProjects.length})`} value="PORTFOLIO" sx={{ fontWeight: 700 }} />
          </Tabs>
        </Box>

        {/* TAB 1: RESUME BUILDER */}
        {activeTab === 'RESUMES' && (
          <Stack spacing={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={800}>
                Resume Versions & Active Template
              </Typography>
              <Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={() => setCreateResumeModalOpen(true)}>
                New Resume Version
              </Button>
            </Box>

            {/* Template Selector */}
            <ResumeTemplateSelector selectedId={selectedTemplateId} onSelect={setSelectedTemplateId} />

            {/* Section Manager & Live Preview Grid */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <ResumeSectionEditor sections={sections} onToggleVisibility={toggleSectionVisibility} />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: '#FAFAFA',
                    minHeight: 450,
                  }}
                >
                  <Box sx={{ borderBottom: '2px solid #3B82F6', pb: 2, mb: 3 }}>
                    <Typography variant="h5" fontWeight={800} color="primary">
                      {activeResume?.title || 'Senior Full Stack Engineer Resume'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Template: {selectedTemplateId} | Version {activeResume?.version || 1}
                    </Typography>
                  </Box>

                  <Stack spacing={2.5}>
                    {sections
                      .filter((s) => s.isVisible)
                      .map((sec) => (
                        <Box key={sec.id}>
                          <Typography variant="subtitle2" fontWeight={800} sx={{ textTransform: 'uppercase', color: 'text.secondary', letterSpacing: '0.5px' }}>
                            {sec.title}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {sec.type === 'SUMMARY'
                              ? 'Senior Full Stack Engineer with 5+ years building scalable web architectures.'
                              : sec.type === 'SKILLS'
                              ? 'TypeScript, React, Node.js, Express, MongoDB, Docker, Microservices'
                              : 'Detailed section metrics and content...'}
                          </Typography>
                        </Box>
                      ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Stack>
        )}

        {/* TAB 2: COVER LETTERS */}
        {activeTab === 'COVER_LETTERS' && (
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={800}>
                Cover Letter Templates & Drafts
              </Typography>
              <Button startIcon={<AddIcon />} variant="contained" size="small" onClick={() => setCoverLetterModalOpen(true)}>
                Create Cover Letter
              </Button>
            </Box>

            <Grid container spacing={3}>
              {data.coverLetters.map((cl) => (
                <Grid key={cl.id} size={{ xs: 12, md: 6 }}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight={800}>
                        {cl.title}
                      </Typography>
                      {cl.isDefault && <Chip label="Default Template" color="primary" size="small" sx={{ fontWeight: 700 }} />}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
                      {cl.content}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      Target: {cl.targetCompany || 'General'} ({cl.targetPosition || 'Position'})
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}

        {/* TAB 3: PORTFOLIO SHOWCASE */}
        {activeTab === 'PORTFOLIO' && (
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight={800}>
                Featured Portfolio Projects
              </Typography>
              <Button startIcon={<AddIcon />} variant="contained" size="small" onClick={() => setCreateProjectModalOpen(true)}>
                Add Portfolio Project
              </Button>
            </Box>

            <Grid container spacing={3}>
              {data.portfolioProjects.map((proj) => (
                <Grid key={proj.id} size={{ xs: 12, md: 4 }}>
                  <PortfolioShowcaseCard project={proj} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        )}
      </Container>

      {/* Cover Letter Modal */}
      <CoverLetterModal
        open={coverLetterModalOpen}
        onClose={() => setCoverLetterModalOpen(false)}
        onSave={async (letter) => {
          await createCoverLetter(letter);
        }}
      />

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={800}>Share Resume Access Link</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Anyone with this secure link can view your candidate resume profile.
          </Typography>
          <TextField value={shareUrl} fullWidth size="small" slotProps={{ input: { readOnly: true } }} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setShareDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={() => navigator.clipboard.writeText(shareUrl)}>
            Copy Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Resume Version Dialog */}
      <Dialog open={createResumeModalOpen} onClose={() => setCreateResumeModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={800}>Create Resume Version</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Resume Version Title"
            placeholder="e.g., Full Stack Engineer - Fintech Focus"
            value={newResumeTitle}
            onChange={(e) => setNewResumeTitle(e.target.value)}
            fullWidth
            sx={{ pt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCreateResumeModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateResume} disabled={!newResumeTitle.trim()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Portfolio Project Dialog */}
      <Dialog open={createProjectModalOpen} onClose={() => setCreateProjectModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={800}>Add Portfolio Project</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="Project Title" value={projTitle} onChange={(e) => setProjTitle(e.target.value)} fullWidth required />
            <TextField label="Short Description" value={projDesc} onChange={(e) => setProjDesc(e.target.value)} fullWidth multiline rows={2} required />
            <TextField label="Live Project / Demo URL" value={projUrl} onChange={(e) => setProjUrl(e.target.value)} fullWidth />
            <TextField label="Technologies (comma separated)" placeholder="React, TypeScript, Node.js" value={projTech} onChange={(e) => setProjTech(e.target.value)} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCreateProjectModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateProjectSubmit} disabled={!projTitle.trim() || !projDesc.trim()}>
            Save Project
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
