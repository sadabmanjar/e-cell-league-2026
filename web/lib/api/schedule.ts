import { fetchClient } from "./client";

export interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  competitionId?: string;
  roundId?: string;
  date: string;
  startTime: string;
  endTime: string;
  venue?: string;
  status: "UPCOMING" | "LIVE" | "COMPLETED" | "CANCELLED";
  competition?: { id: string; name: string };
  round?: { id: string; name: string };
}

export const scheduleApi = {
  getAll: () => fetchClient<ScheduleEvent[]>("/schedule"),
  getById: (id: string) => fetchClient<ScheduleEvent>(`/schedule/${id}`),
};
