import React, { useState } from 'react';
import { Download, Share2, FileText, Image, Link, Check, Copy, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './RoadmapExport.css';

const RoadmapExport = ({ roadmapData, currentView }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const generateShareableLink = () => {
    // In a real application, this would generate a unique link to share the roadmap
    const baseUrl = window.location.origin;
    const roadmapId = roadmapData.id;
    return `${baseUrl}/shared/${roadmapId}`;
  };

  const exportToPDF = async () => {
    try {
      setIsExporting(true);
      await generateTextPDF();
      setShowExportMenu(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  
  const generateTextPDF = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin;
    const lineHeight = 7;
    const titleLineHeight = 10;
    const sectionSpacing = 15;
    const topicSpacing = 8;
    
    // Helper function to check if we need a new page
    const checkNewPage = (additionalHeight = 0) => {
      if (yPosition + additionalHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };
    
    // Helper function to add text with word wrapping
    const addWrappedText = (text, fontSize, fontStyle = 'normal', leftMargin = 0) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      const lines = pdf.splitTextToSize(text, contentWidth - leftMargin);
      
      checkNewPage(lines.length * lineHeight);
      
      lines.forEach(line => {
        pdf.text(line, margin + leftMargin, yPosition);
        yPosition += lineHeight;
      });
      
      return lines.length;
    };
    
    // Title Page
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    const titleLines = pdf.splitTextToSize(roadmapData.title, contentWidth);
    
    titleLines.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += titleLineHeight;
    });
    yPosition += sectionSpacing;
    
    // Subtitle/Description
    addWrappedText(roadmapData.description, 12, 'normal');
    yPosition += sectionSpacing;
    
    // Learning Profile Section
    addWrappedText('Learning Profile', 16, 'bold');
    yPosition += 5;
    
    addWrappedText(`Level: ${roadmapData.userProfile.level}`, 11, 'normal');
    addWrappedText(`Domain: ${roadmapData.userProfile.domain}`, 11, 'normal');
    addWrappedText(`Time Commitment: ${roadmapData.userProfile.timeCommitment} hours per week`, 11, 'normal');
    addWrappedText(`Estimated Duration: ${roadmapData.estimatedDuration.weeks} weeks (${roadmapData.estimatedDuration.months} months)`, 11, 'normal');
    yPosition += sectionSpacing;
    
    // Course Overview
    addWrappedText('Course Overview', 16, 'bold');
    yPosition += 5;
    
    addWrappedText(`This roadmap consists of ${roadmapData.roadmap.phases.length} phases, each building upon the previous one to ensure comprehensive learning.`, 11, 'normal');
    yPosition += sectionSpacing;
    
    // Phases
    roadmapData.roadmap.phases.forEach((phase, phaseIndex) => {
      // Phase Header
      checkNewPage(60); // Reserve space for phase header and first topic
      
      addWrappedText(`Phase ${phaseIndex + 1}: ${phase.title}`, 14, 'bold');
      yPosition += 3;
      
      // Add a subtle line under phase title
      pdf.setDrawColor(150, 150, 150);
      pdf.line(margin, yPosition, margin + contentWidth, yPosition);
      yPosition += 8;
      
      addWrappedText(phase.description, 11, 'italic');
      yPosition += topicSpacing;
      
      // Topics in this phase
      phase.topics.forEach((topic, topicIndex) => {
        checkNewPage(40); // Reserve space for topic
        
        // Topic title
        addWrappedText(`${topicIndex + 1}. ${topic.title}`, 12, 'bold', 5);
        yPosition += 2;
        
        // Topic description
        addWrappedText(topic.description, 10, 'normal', 10);
        yPosition += 2;
        
        // Topic details
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Duration: ${topic.duration} • Difficulty: ${topic.difficulty} • Type: ${topic.type}`, margin + 10, yPosition);
        pdf.setTextColor(0, 0, 0); // Reset to black
        yPosition += lineHeight;
        
        // Resources if available
        if (roadmapData.resources && roadmapData.resources[topic.id] && roadmapData.resources[topic.id].length > 0) {
          yPosition += 2;
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Recommended Resources:', margin + 10, yPosition);
          yPosition += lineHeight;
          
          roadmapData.resources[topic.id].forEach(resource => {
            if (resource && resource.title) {
              checkNewPage(lineHeight);
              pdf.setFontSize(8);
              pdf.setFont('helvetica', 'normal');
              pdf.setTextColor(0, 0, 200); // Blue for links
              const resourceText = `• ${resource.title}`;
              const lines = pdf.splitTextToSize(resourceText, contentWidth - 15);
              lines.forEach(line => {
                pdf.text(line, margin + 15, yPosition);
                yPosition += 5;
              });
              pdf.setTextColor(0, 0, 0); // Reset to black
            }
          });
        }
        
        yPosition += topicSpacing;
      });
      
      yPosition += sectionSpacing;
    });
    
    // Footer on last page
    checkNewPage(30);
    yPosition += 10;
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(100, 100, 100);
    pdf.text('Generated by Flow Roadmap Generator', margin, yPosition);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yPosition + 6);
    
    // Add page numbers
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 20, pageHeight - 10);
    }
    
    pdf.save(`${roadmapData.title.replace(/\s+/g, '-')}-roadmap.pdf`);
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(roadmapData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${roadmapData.title.replace(/\s+/g, '-')}-roadmap.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const exportToMarkdown = () => {
    const content = generateMarkdownContent();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${roadmapData.title.replace(/\s+/g, '-')}-roadmap.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const copyToClipboard = async () => {
    try {
      const shareLink = generateShareableLink();
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out my learning roadmap: ${roadmapData.title}`);
    const body = encodeURIComponent(`I've created a personalized learning roadmap for ${roadmapData.userProfile.domain}!\n\nRoadmap: ${roadmapData.title}\nDuration: ${roadmapData.estimatedDuration.weeks} weeks\nTime commitment: ${roadmapData.userProfile.timeCommitment} hours/week\n\nView it here: ${generateShareableLink()}\n\nGenerated by Flow Roadmap Generator`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    setShowShareMenu(false);
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`Just created my personalized ${roadmapData.userProfile.domain} learning roadmap! 🚀 ${roadmapData.estimatedDuration.weeks} weeks to mastery. Check it out:`);
    const url = encodeURIComponent(generateShareableLink());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=learning,AI,roadmap`);
    setShowShareMenu(false);
  };

  const shareViaLinkedIn = () => {
    const url = encodeURIComponent(generateShareableLink());
    const title = encodeURIComponent(roadmapData.title);
    const summary = encodeURIComponent(`My personalized ${roadmapData.userProfile.domain} learning roadmap - ${roadmapData.estimatedDuration.weeks} weeks to mastery!`);
    window.open(`https://linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`);
    setShowShareMenu(false);
  };

  const generateTextContent = () => {
    let content = `${roadmapData.title}\n`;
    content += `${'='.repeat(roadmapData.title.length)}\n\n`;
    content += `${roadmapData.description}\n\n`;
    
    content += `LEARNING PROFILE\n`;
    content += `---------------\n`;
    content += `Level: ${roadmapData.userProfile.level}\n`;
    content += `Time Commitment: ${roadmapData.userProfile.timeCommitment} hours/week\n`;
    content += `Domain: ${roadmapData.userProfile.domain}\n`;
    content += `Estimated Duration: ${roadmapData.estimatedDuration.weeks} weeks (${roadmapData.estimatedDuration.months} months)\n\n`;
    
    roadmapData.roadmap.phases.forEach((phase, phaseIndex) => {
      content += `PHASE ${phaseIndex + 1}: ${phase.title.toUpperCase()}\n`;
      content += `${'-'.repeat(phase.title.length + 10)}\n`;
      content += `${phase.description}\n\n`;
      
      phase.topics.forEach((topic, topicIndex) => {
        content += `  ${topicIndex + 1}. ${topic.title}\n`;
        content += `     ${topic.description}\n`;
        content += `     Duration: ${topic.duration} | Difficulty: ${topic.difficulty} | Type: ${topic.type}\n\n`;
      });
      content += '\n';
    });
    
    return content;
  };

  const generateMarkdownContent = () => {
    let content = `# ${roadmapData.title}\n\n`;
    content += `${roadmapData.description}\n\n`;
    
    content += `## Learning Profile\n\n`;
    content += `- **Level:** ${roadmapData.userProfile.level}\n`;
    content += `- **Time Commitment:** ${roadmapData.userProfile.timeCommitment} hours/week\n`;
    content += `- **Domain:** ${roadmapData.userProfile.domain}\n`;
    content += `- **Estimated Duration:** ${roadmapData.estimatedDuration.weeks} weeks (${roadmapData.estimatedDuration.months} months)\n\n`;
    
    roadmapData.roadmap.phases.forEach((phase, phaseIndex) => {
      content += `## Phase ${phaseIndex + 1}: ${phase.title}\n\n`;
      content += `${phase.description}\n\n`;
      
      phase.topics.forEach((topic, topicIndex) => {
        content += `### ${topicIndex + 1}. ${topic.title}\n\n`;
        content += `${topic.description}\n\n`;
        content += `- **Duration:** ${topic.duration}\n`;
        content += `- **Difficulty:** ${topic.difficulty}\n`;
        content += `- **Type:** ${topic.type}\n\n`;
        
        if (roadmapData.resources[topic.id]) {
          content += `**Recommended Resources:**\n`;
          roadmapData.resources[topic.id].forEach(resource => {
            if (resource) {
              content += `- [${resource.title}](${resource.url})\n`;
            }
          });
          content += '\n';
        }
      });
    });
    
    content += `---\n\n`;
    content += `*Generated by Flow Roadmap Generator*\n`;
    
    return content;
  };

  return (
    <div className="roadmap-export">
      <div className="export-actions">
        {/* Show prominent PDF export button when in PDF view */}
        {currentView === 'pdf' && (
          <button 
            className="pdf-export-button"
            onClick={exportToPDF}
            disabled={isExporting}
          >
            <FileDown className="icon" />
            {isExporting ? 'Generating PDF...' : 'Export PDF'}
          </button>
        )}
        
        <div className="export-dropdown">
          <button 
            className="export-button"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            <Download className="icon" />
            Export
          </button>
          
          {showExportMenu && (
            <div className="dropdown-menu">
              <button onClick={exportToMarkdown} className="dropdown-item">
                <FileText className="icon" />
                Markdown (.md)
              </button>
              <button onClick={exportToPDF} className="dropdown-item">
                <FileDown className="icon" />
                Export as PDF
              </button>
              <button onClick={exportToJSON} className="dropdown-item">
                <FileText className="icon" />
                JSON Data (.json)
              </button>
            </div>
          )}
        </div>

        <div className="share-dropdown">
          <button 
            className="share-button"
            onClick={() => setShowShareMenu(!showShareMenu)}
          >
            <Share2 className="icon" />
            Share
          </button>
          
          {showShareMenu && (
            <div className="dropdown-menu">
              <button onClick={copyToClipboard} className="dropdown-item">
                {copied ? <Check className="icon" /> : <Copy className="icon" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button onClick={shareViaEmail} className="dropdown-item">
                <FileText className="icon" />
                Email
              </button>
              <button onClick={shareViaTwitter} className="dropdown-item">
                <Share2 className="icon" />
                Twitter
              </button>
              <button onClick={shareViaLinkedIn} className="dropdown-item">
                <Share2 className="icon" />
                LinkedIn
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapExport;