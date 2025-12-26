import { SmilePlus } from "lucide-react";

import {
  CERTIFICATIONS,
  CERTIFICATIONS_EMPTY_MESSAGE,
} from "../../data/certifications";
import { Panel, PanelHeader, PanelTitle } from "../panel";

export function Certifications() {
  // Show empty state if no certifications
  if (CERTIFICATIONS.length === 0) {
    return (
      <Panel id="certs">
        <PanelHeader>
          <PanelTitle>Certifications</PanelTitle>
        </PanelHeader>

        <div className="flex items-center gap-3 py-4 pl-4 text-muted-foreground">
          <SmilePlus className="size-6 text-amber-500" />
          <span className="text-sm">{CERTIFICATIONS_EMPTY_MESSAGE}</span>
        </div>
      </Panel>
    );
  }

  // This code won't run since CERTIFICATIONS is empty, but kept for future use
  return null;
}
