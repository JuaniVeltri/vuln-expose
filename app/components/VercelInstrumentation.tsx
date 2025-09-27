'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useEffect } from 'react';

interface VercelInstrumentationProps {
  debug?: boolean;
  sampleRate?: number;
  framework?: string;
}

export default function VercelInstrumentation({
  debug = false,
  sampleRate = 1,
  framework = 'nextjs'
}: VercelInstrumentationProps) {

  useEffect(() => {
    // Log instrumentation setup in development
    if (process.env.NODE_ENV === 'development' && debug) {
      console.log('🔍 Vercel Analytics & Speed Insights initialized');
      console.log('📊 Sample Rate:', sampleRate);
      console.log('🎯 Framework:', framework);
      console.log('🌐 Environment:', process.env.NODE_ENV);
    }
  }, [debug, sampleRate, framework]);

  // Enhanced event tracking for security testing platform
  useEffect(() => {
    // Track page views with custom properties
    if (typeof window !== 'undefined') {
      const trackPageView = () => {
        // Custom tracking for vulnerability pages
        const path = window.location.pathname;
        let pageType = 'general';

        if (path.includes('/sqli/')) {
          pageType = 'sql-injection';
        } else if (path.includes('/xss/')) {
          pageType = 'cross-site-scripting';
        } else if (path.includes('/api/')) {
          pageType = 'api-endpoint';
        }

        // Send custom event to Analytics (if available)
        if (window.va) {
          window.va('track', 'page_view', {
            page_type: pageType,
            vulnerability_category: path.includes('/sqli/') ? 'SQL Injection' :
                                   path.includes('/xss/') ? 'XSS' : 'General',
            timestamp: new Date().toISOString()
          });
        }
      };

      // Track initial page load
      trackPageView();

      // Track navigation changes (for SPA behavior)
      let currentPath = window.location.pathname;
      const observer = new MutationObserver(() => {
        if (window.location.pathname !== currentPath) {
          currentPath = window.location.pathname;
          trackPageView();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <Analytics
        debug={debug}
        beforeSend={(event) => {
          // Filter out sensitive data from analytics
          if (event.url?.includes('/api/')) {
            return null; // Don't track API calls directly
          }
          return event;
        }}
      />
      <SpeedInsights
        sampleRate={sampleRate}
        debug={debug}
        beforeSend={(event) => {
          // Add custom data to Speed Insights
          return {
            ...event,
            custom: {
              vulnerability_platform: true,
              page_category: window.location.pathname.includes('/sqli/') ? 'sql-injection' :
                           window.location.pathname.includes('/xss/') ? 'xss' : 'general',
              timestamp: Date.now()
            }
          };
        }}
      />
    </>
  );
}

// Extend window type for TypeScript
declare global {
  interface Window {
    va?: (event: string, name: string, properties?: Record<string, any>) => void;
  }
}