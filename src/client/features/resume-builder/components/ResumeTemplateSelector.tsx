import { Grid, Paper, Box, Typography, Chip, Radio } from '@mui/material';

interface TemplateOption {
  id: string;
  name: string;
  tag: string;
  description: string;
  color: string;
}

const TEMPLATES: TemplateOption[] = [
  { id: 'PROFESSIONAL', name: 'Professional Classic', tag: 'Popular', description: 'Clean two-column layout ideal for corporate & enterprise roles.', color: '#3B82F6' },
  { id: 'MODERN', name: 'Modern Minimalist', tag: 'Sleek', description: 'Contemporary single-column layout with vibrant accents.', color: '#10B981' },
  { id: 'EXECUTIVE', name: 'Executive Leadership', tag: 'Senior', description: 'Formal executive design emphasizing leadership achievements.', color: '#8B5CF6' },
  { id: 'TECHNICAL', name: 'Technical / Developer', tag: 'Dev Stack', description: 'Optimized for engineering stacks, projects & code repositories.', color: '#F59E0B' },
];

interface ResumeTemplateSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ResumeTemplateSelector({ selectedId, onSelect }: ResumeTemplateSelectorProps) {
  return (
    <Grid container spacing={2}>
      {TEMPLATES.map((tmpl) => {
        const isSelected = selectedId === tmpl.id;
        return (
          <Grid key={tmpl.id} size={{ xs: 12, sm: 6 }}>
            <Paper
              elevation={0}
              onClick={() => onSelect(tmpl.id)}
              sx={{
                p: 2.5,
                borderRadius: '14px',
                border: '2px solid',
                borderColor: isSelected ? tmpl.color : 'divider',
                cursor: 'pointer',
                bgcolor: isSelected ? `${tmpl.color}08` : 'background.paper',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: tmpl.color,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Radio checked={isSelected} size="small" sx={{ color: tmpl.color, '&.Mui-checked': { color: tmpl.color } }} />
                  <Typography variant="subtitle1" fontWeight={800}>
                    {tmpl.name}
                  </Typography>
                </Box>
                <Chip label={tmpl.tag} size="small" sx={{ bgcolor: `${tmpl.color}15`, color: tmpl.color, fontWeight: 700 }} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {tmpl.description}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
