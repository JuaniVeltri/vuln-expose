'use client';

interface StructuredDataProps {
  type: 'homepage' | 'vulnerability-page' | 'tutorial';
  title?: string;
  description?: string;
  vulnerabilityType?: string;
}

export default function StructuredData({ type, title, description, vulnerabilityType }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "VulnSite",
      "url": "https://vulns-expose.jveltri.com.ar",
      "description": "Educational platform for web security testing and penetration testing training",
      "author": {
        "@type": "Person",
        "name": "Juan Veltri",
        "url": "https://jveltri.com.ar"
      },
      "publisher": {
        "@type": "Person",
        "name": "Juan Veltri"
      },
      "inLanguage": "en-US",
      "copyrightYear": "2024",
      "genre": "Educational Technology",
      "keywords": "web security, penetration testing, SQL injection, XSS, cybersecurity, ethical hacking"
    };

    if (type === 'homepage') {
      return {
        ...baseData,
        "@type": "WebSite",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://vulns-expose.jveltri.com.ar/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      };
    }

    if (type === 'vulnerability-page') {
      return {
        ...baseData,
        "@type": "WebPage",
        "name": title,
        "description": description,
        "about": {
          "@type": "Thing",
          "name": vulnerabilityType,
          "description": `Educational content about ${vulnerabilityType} vulnerabilities`
        },
        "educationalUse": "practice",
        "educationalLevel": "intermediate",
        "audience": {
          "@type": "EducationalAudience",
          "educationalRole": "student"
        }
      };
    }

    return baseData;
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  );
}