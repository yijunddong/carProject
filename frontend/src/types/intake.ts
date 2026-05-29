export type IntakeStatus = "waiting" | "done";

export interface Intake {
  id: string;
  plate_number: string;
  vehicle_model: string;
  status: IntakeStatus;
  registered_at: string;
  completed_at?: string | null;
}

export type IntakeEventType = "intake.created" | "intake.done";

export interface IntakeEvent {
  type: IntakeEventType;
  payload: Intake | Partial<Intake> & { id: string };
}
