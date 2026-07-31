import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useState } from 'react';

interface CoverLetterModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (letter: { title: string; content: string; targetCompany?: string; targetPosition?: string; isDefault?: boolean }) => Promise<void>;
}

export function CoverLetterModal({ open, onClose, onSave }: CoverLetterModalProps) {
  const [title, setTitle] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [targetPosition, setTargetPosition] = useState('');
  const [content, setContent] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        targetCompany: targetCompany.trim() || undefined,
        targetPosition: targetPosition.trim() || undefined,
        content: content.trim(),
        isDefault,
      });
      setTitle('');
      setTargetCompany('');
      setTargetPosition('');
      setContent('');
      setIsDefault(false);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
      <DialogTitle fontWeight={800}>Create Custom Cover Letter</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          <TextField
            label="Cover Letter Title"
            placeholder="e.g., Senior Full Stack Role - TechCorp"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Target Company (Optional)"
              placeholder="e.g., TechCorp Inc"
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
              fullWidth
            />
            <TextField
              label="Target Position (Optional)"
              placeholder="e.g., Senior Full Stack Engineer"
              value={targetPosition}
              onChange={(e) => setTargetPosition(e.target.value)}
              fullWidth
            />
          </Stack>

          <TextField
            label="Cover Letter Body / Statement"
            placeholder="Dear Hiring Manager..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            rows={8}
            required
          />

          <FormControlLabel
            control={<Checkbox checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />}
            label="Set as default cover letter template"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} loading={saving} disabled={!title.trim() || !content.trim()}>
          Save Cover Letter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
