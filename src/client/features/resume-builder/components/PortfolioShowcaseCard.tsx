import { Paper, Box, Typography, Stack, Chip, Button } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';
import StarIcon from '@mui/icons-material/Star';
import { PortfolioProject } from '../types/resumeBuilder.types';

interface PortfolioShowcaseCardProps {
  project: PortfolioProject;
}

export function PortfolioShowcaseCard({ project }: PortfolioShowcaseCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            {project.featured && <StarIcon sx={{ color: '#F59E0B' }} fontSize="small" />}
            <Typography variant="subtitle1" fontWeight={800}>
              {project.title}
            </Typography>
          </Stack>
          <Chip label={project.category} size="small" variant="outlined" />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {project.description}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1, mb: 2 }}>
          {project.technologies.map((tech) => (
            <Chip key={tech} label={tech} size="small" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />
          ))}
        </Stack>
      </Box>

      <Stack direction="row" spacing={1.5} sx={{ pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        {project.projectUrl && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<LaunchIcon />}
            component="a"
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </Button>
        )}
        {project.repositoryUrl && (
          <Button
            size="small"
            variant="text"
            startIcon={<CodeIcon />}
            component="a"
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Code Repository
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
