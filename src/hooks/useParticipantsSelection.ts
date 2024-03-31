import { useState } from "react";
import { Participants } from "../types";

export const useParticipantsSelection = (initialParticipants: Participants) => {
  const [selectedParticipants, setSelectedParticipants] =
    useState<Participants>(initialParticipants);

  const toggleParticipantSelection = (participant: string) => {
    setSelectedParticipants((current) =>
      current.includes(participant)
        ? current.filter((p) => p !== participant)
        : [...current, participant]
    );
  };

  return { selectedParticipants, toggleParticipantSelection };
};
