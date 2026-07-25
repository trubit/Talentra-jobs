import { Paper, Typography, Stack, Box, Avatar, TextField, Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { useCandidateNotes, useCreateCandidateNote } from '../hooks/useRecruitmentWorkspace';

interface TeamNotesThreadProps {
  applicationId: string;
}

export function TeamNotesThread({ applicationId }: TeamNotesThreadProps) {
  const { data: notes, isLoading } = useCandidateNotes(applicationId);
  const createNoteMutation = useCreateCandidateNote();

  const [content, setContent] = useState('');

  const handleSend = async () => {
    if (!content.trim()) return;
    await createNoteMutation.mutateAsync({ applicationId, content });
    setContent('');
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid', borderColor: 'divider', mb: 3 }}>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <LockIcon fontSize="small" color="action" />
        <Typography variant="h6" fontWeight={800}>
          🔒 Private Team Discussions & Internal Candidate Notes
        </Typography>
      </Stack>

      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
        Internal employer team notes are private and never visible to the applicant.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          multiline
          rows={3}
          fullWidth
          placeholder="Add an internal evaluation note or tag team members..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 1.5 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SendIcon />}
          onClick={handleSend}
          disabled={!content.trim() || createNoteMutation.isPending}
        >
          {createNoteMutation.isPending ? 'Posting...' : 'Post Private Note'}
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={3}>
          <CircularProgress size={28} />
        </Box>
      ) : !notes || notes.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No team notes recorded yet for this candidate.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {notes.map((note) => (
            <Paper key={note._id} variant="outlined" sx={{ p: 2, borderRadius: '12px', bgcolor: 'action.hover' }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <Avatar src={note.author?.avatarUrl} sx={{ width: 32, height: 32 }}>
                  {note.author?.firstName?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {note.author?.firstName} {note.author?.lastName} ({note.author?.role})
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(note.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {note.content}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
