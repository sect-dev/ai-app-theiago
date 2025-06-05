"use client"

import * as amplitude from '@amplitude/analytics-browser';
import { autocapturePlugin } from '@amplitude/plugin-autocapture-browser';
import { useEffect } from 'react';


export default function AmplitudeAnalytics() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) {
      amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, {
        autocapture: {
          elementInteractions: true
        }
      });
    }
  }, []);

  return null;
}