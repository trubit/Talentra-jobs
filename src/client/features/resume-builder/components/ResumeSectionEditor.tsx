import { Paper, Box, Typography, Stack, Chip, IconButton } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ResumeSection } from '../types/resumeBuilder.types';

interface ResumeSectionEditorProps {
  sections: ResumeSection[];
  onToggleVisibility: (sectionId: string) => void;
}

export function ResumeSectionEditor({ sections, onToggleVisibility }: ResumeSectionEditorProps) {
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
          <Typography variant="h6" fontWeight={800}>
            Resume Section Manager
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Drag to reorder sections or toggle visibility for specific application targets.
          </Typography>
        </Box>
        <Chip label={`${sections.filter((s) => s.isVisible).length} Active Sections`} color="primary" size="small" sx={{ fontWeight: 700 }} />
      </Box>

      <Stack spacing={1.5}>
        {sections.map((sec) => (
          <Paper
            key={sec.id}
            elevation={0}
            sx={{
              p: 2,
              borderRadius: '12px',
              border: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: sec.isVisible ? 1 : 0.6,
              bgcolor: 'background.paper',
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <DragHandleIcon sx={{ color: 'text.disabled', cursor: 'grab' }} />
              <Typography variant="subtitle2" fontWeight={700}>
                {sec.title}
              </Typography>
              <Chip label={sec.type} size="small" variant="outlined" sx={{ fontSize: '0.65rem' }} />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton size="small" onClick={() => onToggleVisibility(sec.id)}>
                {sec.isVisible ? <VisibilityIcon fontSize="small" color="primary" /> : <VisibilityOffIcon fontSize="small" color="disabled" />}
              </IconButton>
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
}
