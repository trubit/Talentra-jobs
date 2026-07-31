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
  FormGroup,
  Checkbox,
  Switch,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { JobSeekerDashboardPreferences } from '../types/jobseekerDashboard.types';

interface DashboardPreferencesModalProps {
  open: boolean;
  preferences: JobSeekerDashboardPreferences;
  onClose: () => void;
  onSave: (updated: Partial<JobSeekerDashboardPreferences>) => Promise<void>;
}

export function DashboardPreferencesModal({
  open,
  preferences,
  onClose,
  onSave,
}: DashboardPreferencesModalProps) {
  const [layoutMode, setLayoutMode] = useState(preferences.layoutMode);
  const [visibleWidgets, setVisibleWidgets] = useState(preferences.visibleWidgets);
  const [emailAlerts, setEmailAlerts] = useState(preferences.emailAlertsEnabled);
  const [themePref, setThemePref] = useState(preferences.themePreference);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        layoutMode,
        visibleWidgets,
        emailAlertsEnabled: emailAlerts,
        themePreference: themePref,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
      <DialogTitle fontWeight={800}>Dashboard Workspace Preferences</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Layout Density</FormLabel>
            <RadioGroup
              row
              value={layoutMode}
              onChange={(e) => setLayoutMode(e.target.value as JobSeekerDashboardPreferences['layoutMode'])}
            >
              <FormControlLabel value="COMPACT" control={<Radio />} label="Compact" />
              <FormControlLabel value="COMFORTABLE" control={<Radio />} label="Comfortable" />
              <FormControlLabel value="SPACIOUS" control={<Radio />} label="Spacious" />
            </RadioGroup>
          </FormControl>

          <Divider />

          <FormControl>
            <FormLabel sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>Theme Mode Preference</FormLabel>
            <RadioGroup
              row
              value={themePref}
              onChange={(e) => setThemePref(e.target.value as JobSeekerDashboardPreferences['themePreference'])}
            >
              <FormControlLabel value="LIGHT" control={<Radio />} label="Light" />
              <FormControlLabel value="DARK" control={<Radio />} label="Dark" />
              <FormControlLabel value="SYSTEM" control={<Radio />} label="System Default" />
            </RadioGroup>
          </FormControl>

          <Divider />

          <div>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
              Visible Dashboard Widgets
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibleWidgets.summaryCards}
                    onChange={(e) => setVisibleWidgets({ ...visibleWidgets, summaryCards: e.target.checked })}
                  />
                }
                label="Summary KPI Cards"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibleWidgets.profileCompletion}
                    onChange={(e) => setVisibleWidgets({ ...visibleWidgets, profileCompletion: e.target.checked })}
                  />
                }
                label="Profile Completion Engine"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibleWidgets.recentActivity}
                    onChange={(e) => setVisibleWidgets({ ...visibleWidgets, recentActivity: e.target.checked })}
                  />
                }
                label="Recent Career Activity Timeline"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={visibleWidgets.savedJobs}
                    onChange={(e) => setVisibleWidgets({ ...visibleWidgets, savedJobs: e.target.checked })}
                  />
                }
                label="Saved Jobs Preview"
              />
            </FormGroup>
          </div>

          <Divider />

          <FormControlLabel
            control={<Switch checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} />}
            label="Enable Career & Application Email Digest Alerts"
          />
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
