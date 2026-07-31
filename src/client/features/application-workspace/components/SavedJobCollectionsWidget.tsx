import { Paper, Box, Typography, Button, Avatar, Chip, Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import { SavedJobCollection } from '../types/applicationWorkspace.types';

interface SavedJobCollectionsWidgetProps {
  collections: SavedJobCollection[];
  onCreateCollection: () => void;
}

export function SavedJobCollectionsWidget({
  collections,
  onCreateCollection,
}: SavedJobCollectionsWidgetProps) {
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
            Saved Job Collections
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Organize bookmarked opportunities by role type or urgency
          </Typography>
        </Box>
        <Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={onCreateCollection}>
          New Collection
        </Button>
      </Box>

      <Grid container spacing={2}>
        {collections.map((col) => (
          <Grid key={col.id} size={{ xs: 12, sm: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '12px',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Avatar sx={{ bgcolor: `${col.color || '#3B82F6'}15`, color: col.color || '#3B82F6', width: 38, height: 38 }}>
                  <FolderIcon />
                </Avatar>
                <Chip label={`${col.jobCount} Jobs`} size="small" sx={{ fontWeight: 700 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight={700}>
                {col.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {col.description || 'Custom job collection'}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
