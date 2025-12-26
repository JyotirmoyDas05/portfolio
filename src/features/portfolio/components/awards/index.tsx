import { SmilePlus } from "lucide-react";

import { AWARDS, AWARDS_EMPTY_MESSAGE } from "../../data/awards";
import { Panel, PanelHeader, PanelTitle } from "../panel";

export function Awards() {
  // Show empty state if no awards
  if (AWARDS.length === 0) {
    return (
      <Panel id="awards">
        <PanelHeader>
          <PanelTitle>Honors & Awards</PanelTitle>
        </PanelHeader>

        <div className="flex items-center gap-3 py-4 pl-4 text-muted-foreground">
          <SmilePlus className="size-6 text-amber-500" />
          <span className="text-sm">{AWARDS_EMPTY_MESSAGE}</span>
        </div>
      </Panel>
    );
  }

  // This code won't run since AWARDS is empty, but kept for future use
  return null;
}
