
export interface TimerState {
  startTime: Date;
  endTime: Date;
  timeLeft: number; // seconds
}

export interface TimeDisplayProps {
  label: string;
  time: string;
  isActive?: boolean;
}
