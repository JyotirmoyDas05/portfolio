"use server";

export interface BrowserCompatResult {
  version: string;
  status: "supported" | "partial" | "not-supported";
}

export async function getMdnCompatData(
  mdnUrl: string
): Promise<Record<string, BrowserCompatResult> | null> {
  try {
    const jsonUrl = `${mdnUrl.replace(/\/$/, "")}/index.json`;
    const response = await fetch(jsonUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch MDN data: ${response.statusText}`);
    }

    const data = (await response.json()) as {
      doc?: {
        baseline?: {
          status?: string; // "high" | "low" | false
          support?: Record<string, string>;
        };
        body?: Array<{
          type: string;
          value?: {
            query?: string;
            data?: Record<
              string,
              {
                __compat?: {
                  support?: Record<
                    string,
                    | {
                        version_added?: string | boolean;
                        partial_implementation?: boolean;
                        notes?: string | string[];
                        flags?: unknown[];
                      }
                    | Array<{
                        version_added?: string | boolean;
                        partial_implementation?: boolean;
                        notes?: string | string[];
                        flags?: unknown[];
                      }>
                  >;
                };
              }
            >;
          };
        }>;
      };
    };

    const baselineSupport = data.doc?.baseline?.support;

    // Try to get detailed support info from browser_compatibility block
    const compatBlock = data.doc?.body?.find(
      (block) => block.type === "browser_compatibility"
    );

    const bcdData = compatBlock?.value?.data;
    const browserIds = [
      "chrome",
      "firefox",
      "safari",
      "edge",
      "opera",
    ] as const;

    const result: Record<string, BrowserCompatResult> = {};

    for (const browserId of browserIds) {
      let version = baselineSupport?.[browserId] || "N/A";
      let status: "supported" | "partial" | "not-supported" = "supported";

      // Check BCD data for detailed support info
      if (bcdData) {
        // The BCD data structure has the feature key at the top level
        const featureKeys = Object.keys(bcdData);
        for (const key of featureKeys) {
          const compat = bcdData[key]?.__compat?.support?.[browserId];
          if (compat) {
            const supportData = Array.isArray(compat) ? compat[0] : compat;

            // Check for partial support indicators
            if (supportData.partial_implementation === true) {
              status = "partial";
            } else if (supportData.flags && supportData.flags.length > 0) {
              status = "partial";
            } else if (supportData.notes) {
              // Notes often indicate limitations
              const notes = Array.isArray(supportData.notes)
                ? supportData.notes.join(" ")
                : supportData.notes;
              if (
                notes.toLowerCase().includes("partial") ||
                notes.toLowerCase().includes("not support") ||
                notes.toLowerCase().includes("does not")
              ) {
                status = "partial";
              }
            }

            // Get version from BCD if not in baseline
            if (version === "N/A" && supportData.version_added) {
              version = String(supportData.version_added);
            }

            if (supportData.version_added === false) {
              status = "not-supported";
              version = "—";
            }
          }
        }
      }

      result[browserId] = { version, status };
    }

    return result;
  } catch (error) {
    console.error("Error fetching MDN compat data:", error);
    return null;
  }
}
