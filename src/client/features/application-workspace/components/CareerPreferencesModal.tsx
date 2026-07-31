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
  Box,
} from '@mui/material';
import { useState } from 'react';
import { CareerPreferences } from '../types/applicationWorkspace.types';

interface CareerPreferencesModalProps {
  open: boolean;
  preferences: CareerPreferences;
  onClose: () => void;
  onSave: (updated: Partial<CareerPreferences>) => Promise<void>;
}

export function CareerPreferencesModal({
  open,
  preferences,
  onClose,
  onSave,
}: CareerPreferencesModalProps) {
  const [empType, setEmpType] = useState(preferences.preferredEmploymentType);
  const [workMode, setWorkMode] = useState(preferences.preferredWorkMode);
  const [relocation, setRelocation] = useState(preferences.openToRelocation);
  const [visaSponsorship, setVisaSponsorship] = useState(preferences.requiresVisaSponsorship);
  const [minSalary, setMinSalary] = useState(preferences.preferredSalaryRange?.min || 90000);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        preferredEmploymentType: empType,
        preferredWorkMode: workMode,
        openToRelocation: relocation,
        requiresVisaSponsorship: visaSponsorship,
        preferredSalaryRange: {
          min: Number(minSalary),
          currency: 'USD',
        },
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
      <DialogTitle fontWeight={800}>Career & Workplace Preferences</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Preferred Work Setting</FormLabel>
            <RadioGroup row value={workMode} onChange={(e) => setWorkMode(e.target.value as CareerPreferences['preferredWorkMode'])}>
              <FormControlLabel value="REMOTE" control={<Radio />} label="Remote" />
              <FormControlLabel value="HYBRID" control={<Radio />} label="Hybrid" />
              <FormControlLabel value="ON_SITE" control={<Radio />} label="On-Site" />
              <FormControlLabel value="ANY" control={<Radio />} label="Flexible / Any" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Employment Type</FormLabel>
            <RadioGroup row value={empType} onChange={(e) => setEmpType(e.target.value as CareerPreferences['preferredEmploymentType'])}>
              <FormControlLabel value="FULL_TIME" control={<Radio />} label="Full Time" />
              <FormControlLabel value="CONTRACT" control={<Radio />} label="Contract" />
              <FormControlLabel value="PART_TIME" control={<Radio />} label="Part Time" />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Minimum Expected Salary ($ / year)"
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(Number(e.target.value))}
            fullWidth
          />

          <Box>
            <FormControlLabel
              control={<Switch checked={relocation} onChange={(e) => setRelocation(e.target.checked)} />}
              label="Open to Relocation"
            />
            <FormControlLabel
              control={<Switch checked={visaSponsorship} onChange={(e) => setVisaSponsorship(e.target.checked)} />}
              label="Requires Visa Sponsorship"
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave} loading={saving}>
          Save Preferences
        </Button>
      </DialogActions>
    </Dialog>
  );
}
