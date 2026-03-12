export interface Medication {
  id:          string;
  name:        string;
  dose:        string;
  frequency:   string;
  time:        string;
  colorClass:  string;
}

export interface Alarm {
  id:         string;
  medication: string;
  schedule:   string;
  detail:     string;
  tag:        string;
  chipClass:  string;
}

export interface VitalSign {
  icon:  string;
  value: string;
  label: string;
}

export interface ConsultHistory {
  date:  string;
  title: string;
  desc:  string;
}

export interface DayAdherence {
  day: string;
  pct: number;
  cls: string;
}
