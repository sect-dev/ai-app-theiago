"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { autocapturePlugin } from "@amplitude/plugin-autocapture-browser";
import { useEffect } from "react";
import { setFirebaseToken } from "../../lib/amplitude";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export default function AmplitudeAnalytics() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) {
      amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, {
        autocapture: {
          elementInteractions: true,
        },
      });

      setFirebaseToken();

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          await setFirebaseToken();
        }
      });

      return () => unsubscribe();
    }
  }, []);

  return null;
}
