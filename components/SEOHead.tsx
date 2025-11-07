import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

const SEOHead = ({ 
  title = "Collation.AI - Agentic AI Bots for Wealth Management Data Automation | RIA Data Warehouse Solutions",
  description = "Collation.AI solves data headaches for Wealth Managers, RIAs, and Family Offices with Agentic AI Bots. Automate financial data aggregation, create centralized data warehouses, and achieve audit-ready data.",
  keywords = "Agentic AI, AI Bots, Wealth Management, RIA, Registered Investment Advisor, Family Office, Data Warehouse, Financial Data Aggregation, Data Automation, Portfolio Management, Asset Management, Data Reconciliation, Audit-Ready Data, Financial Data Integration, Multi-Custodian, Data Silos, Compliance, Performance Reporting, Data Analytics, AI Agents, Workflow Automation",
  canonical
}: SEOHeadProps) => {
  const location = useLocation();
  const currentUrl = canonical || `https://www.collation.ai${location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', currentUrl, true);
    
    // Twitter
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:url', currentUrl);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;
  }, [title, description, keywords, currentUrl]);

  return null;
};

export default SEOHead;
