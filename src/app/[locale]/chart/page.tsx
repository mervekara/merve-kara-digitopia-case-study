'use client'

import GanttChart from '@/components/chart/GanttChart';
import ImpactRuns from '@/components/chart/ImpactRuns';
import withAuth from '@/hoc/withAuth';
import React, { useState, useEffect } from 'react';

const ChartScreen = () => {
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
        setIsPanelMinimized(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen p-4 sm:p-6 lg:p-8">
      <div className={`transition-all ${isPanelMinimized && isDesktop ? 'w-full lg:w-1/6' : 'w-full lg:w-2/5'} mb-4 lg:mb-0`}>
        <ImpactRuns setIsPanelMinimized={setIsPanelMinimized} isPanelMinimized={isPanelMinimized && isDesktop} />
      </div>
      <div className={`transition-all ${isPanelMinimized && isDesktop ? 'w-full lg:w-5/6' : 'w-full lg:w-3/5'}`}>
        <GanttChart />
      </div>
    </div>
  );
};

export default withAuth(ChartScreen);
