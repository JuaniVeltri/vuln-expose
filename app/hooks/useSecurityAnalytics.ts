'use client';

import { useCallback, useEffect } from 'react';

export interface SecurityEvent {
  type: 'vulnerability_test' | 'payload_execution' | 'authentication_bypass' | 'data_extraction' | 'xss_injection' | 'page_visit';
  category: 'SQL Injection' | 'XSS' | 'Authentication' | 'General';
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

export function useSecurityAnalytics() {

  const trackEvent = useCallback((event: SecurityEvent) => {
    // Track with Vercel Analytics
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', event.action, {
        category: event.category,
        type: event.type,
        label: event.label,
        value: event.value,
        ...event.metadata,
        timestamp: new Date().toISOString(),
        url: window.location.pathname,
        user_agent: navigator.userAgent,
        referrer: document.referrer
      });
    }

    // Enhanced logging for development
    if (process.env.NODE_ENV === 'development') {
      console.group('🔐 Security Analytics Event');
      console.log('📊 Type:', event.type);
      console.log('🎯 Category:', event.category);
      console.log('⚡ Action:', event.action);
      console.log('🏷️ Label:', event.label);
      console.log('📈 Value:', event.value);
      console.log('📋 Metadata:', event.metadata);
      console.groupEnd();
    }
  }, []);

  // Pre-configured tracking functions for common security events
  const trackSQLInjection = useCallback((payload: string, success: boolean, endpoint: string) => {
    trackEvent({
      type: 'vulnerability_test',
      category: 'SQL Injection',
      action: 'sql_injection_attempt',
      label: success ? 'successful' : 'failed',
      value: payload.length,
      metadata: {
        payload_snippet: payload.substring(0, 100),
        payload_type: detectSQLInjectionType(payload),
        endpoint,
        success,
        payload_length: payload.length
      }
    });
  }, [trackEvent]);

  const trackXSSInjection = useCallback((payload: string, xssType: 'stored' | 'reflected' | 'dom', field: string) => {
    trackEvent({
      type: 'xss_injection',
      category: 'XSS',
      action: 'xss_payload_injection',
      label: xssType,
      value: payload.length,
      metadata: {
        payload_snippet: payload.substring(0, 100),
        xss_type: xssType,
        target_field: field,
        payload_length: payload.length,
        contains_script: payload.includes('<script>'),
        contains_onerror: payload.includes('onerror'),
        contains_onload: payload.includes('onload')
      }
    });
  }, [trackEvent]);

  const trackAuthenticationBypass = useCallback((method: string, success: boolean, username: string) => {
    trackEvent({
      type: 'authentication_bypass',
      category: 'Authentication',
      action: 'login_bypass_attempt',
      label: success ? 'successful' : 'failed',
      value: success ? 1 : 0,
      metadata: {
        bypass_method: method,
        success,
        username_attempted: username.substring(0, 20), // Limit for privacy
        is_sql_injection: method.includes('SQL'),
        attempt_time: new Date().toISOString()
      }
    });
  }, [trackEvent]);

  const trackVulnerabilityPageVisit = useCallback((vulnerabilityType: string, pageSpecific?: string) => {
    trackEvent({
      type: 'page_visit',
      category: vulnerabilityType.includes('SQL') ? 'SQL Injection' :
                vulnerabilityType.includes('XSS') ? 'XSS' : 'General',
      action: 'vulnerability_page_visit',
      label: vulnerabilityType,
      metadata: {
        vulnerability_type: vulnerabilityType,
        page_specific: pageSpecific,
        session_start: performance.now(),
        screen_resolution: `${screen.width}x${screen.height}`,
        color_depth: screen.colorDepth
      }
    });
  }, [trackEvent]);

  const trackPayloadExecution = useCallback((payload: string, executionTime: number, result: 'success' | 'blocked' | 'error') => {
    trackEvent({
      type: 'payload_execution',
      category: payload.includes('<script>') || payload.includes('onerror') ? 'XSS' : 'SQL Injection',
      action: 'payload_execution',
      label: result,
      value: executionTime,
      metadata: {
        execution_time_ms: executionTime,
        payload_hash: simpleHash(payload),
        result,
        payload_length: payload.length,
        browser: navigator.userAgent.split(' ')[0]
      }
    });
  }, [trackEvent]);

  // Auto-track page performance
  useEffect(() => {
    const handleLoad = () => {
      // Track page load performance
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        trackEvent({
          type: 'page_visit',
          category: 'General',
          action: 'page_performance',
          label: 'load_complete',
          value: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
          metadata: {
            dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
            first_byte: Math.round(navigation.responseStart - navigation.requestStart),
            dns_lookup: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
            tcp_connect: Math.round(navigation.connectEnd - navigation.connectStart),
            page_load_time: Math.round(navigation.loadEventEnd - navigation.fetchStart)
          }
        });
      }
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, [trackEvent]);

  return {
    trackEvent,
    trackSQLInjection,
    trackXSSInjection,
    trackAuthenticationBypass,
    trackVulnerabilityPageVisit,
    trackPayloadExecution
  };
}

// Helper functions
function detectSQLInjectionType(payload: string): string {
  const lower = payload.toLowerCase();

  if (lower.includes('union') && lower.includes('select')) return 'union_based';
  if (lower.includes('or') && lower.includes('1=1')) return 'boolean_based';
  if (lower.includes('sleep(') || lower.includes('waitfor')) return 'time_based';
  if (lower.includes('extractvalue') || lower.includes('updatexml')) return 'error_based';
  if (lower.includes('substring') || lower.includes('substr')) return 'blind';
  if (lower.includes("' or '")) return 'quote_based';
  if (lower.includes('--') || lower.includes('#')) return 'comment_injection';

  return 'basic';
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

// Extend window type for TypeScript
declare global {
  interface Window {
    va?: (event: string, name: string, properties?: Record<string, any>) => void;
  }
}