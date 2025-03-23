"use client";

import React from 'react';

interface ResumeButtonProps {
  text?: string;
  className?: string;
  href: string;
}

export function ResumeButton({ text = "Resume", className = "", href }: ResumeButtonProps) {
  return (
    <div className={`resume-button-wrapper ${className}`}>
      <a href={href} download className="resume-button" data-text={text}>
        <span className="actual-text">&nbsp;{text}&nbsp;</span>
        <span aria-hidden="true" className="hover-text">&nbsp;{text}&nbsp;</span>
      </a>
    </div>
  );
} 