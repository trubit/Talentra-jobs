import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  TextField,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { ProfileVisibilitySettings } from '../types/careerIntelligence.types';

interface ProfileVisibilityControlProps {
  open: boolean;
  settings: ProfileVisibilitySettings;
  onClose: () => void;
  onSave: (updated: Partial<ProfileVisibilitySettings>) => Promise<void>;
}

export function ProfileVisibilityControl({
  open,
  settings,
  onClose,
  onSave,
}: ProfileVisibilityControlProps) {
  const [mode, setMode] = useState(settings.visibilityMode);
  const [recruiterMessages, setRecruiterMessages] = useState(settings.allowRecruiterMessages);
  const [hideEmployer, setHideEmployer] = useState(settings.hideCurrentEmployer);
  const [alias, setAlias] = useState(settings.anonymousAlias || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        visibilityMode: mode,
        allowRecruiterMessages: recruiterMessages,
        hideCurrentEmployer: hideEmployer,
        anonymousAlias: alias.trim() || undefined,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
      <DialogTitle fontWeight={800}>Recruiter & Profile Visibility Controls</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Candidate Profile Mode</FormLabel>
            <RadioGroup value={mode} onChange={(e) => setMode(e.target.value as ProfileVisibilitySettings['visibilityMode'])}>
              <FormControlLabel value="PUBLIC" control={<Radio />} label="Public (Visible to all verified employers and platform search)" />
              <FormControlLabel value="RECRUITER_ONLY" control={<Radio />} label="Recruiter Only (Only visible to verified hiring teams)" />
              <FormControlLabel value="ANONYMOUS" control={<Radio />} label="Anonymous Profile (Hide name and avatar until you accept inquiry)" />
              <FormControlLabel value="HIDDEN" control={<Radio />} label="Hidden / Private (Invisible to all search queries)" />
            </RadioGroup>
          </FormControl>

          {mode === 'ANONYMOUS' && (
            <TextField
              label="Anonymous Public Alias"
              placeholder="e.g., Senior Full Stack Engineer #918"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              fullWidth
            />
          )}

          <Stack spacing={1}>
            <FormControlLabel
              control={<Switch checked={recruiterMessages} onChange={(e) => setRecruiterMessages(e.target.checked)} />}
              label="Allow verified recruiters to send direct message inquiries"
            />
            <FormControlLabel
              control={<Switch checked={hideEmployer} onChange={(e) => setHideEmployer(e.target.checked)} />}
              label="Block current employer from discovering profile"
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} loading={saving}>
          Save Settings
        </Button>
      </DialogActions>
    </Dialog>
  );
}
