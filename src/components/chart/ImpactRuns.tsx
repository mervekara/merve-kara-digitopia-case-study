'use client';

import { clearSelectedRecommendationId, setImpactRunId, setRecommendations, setSelectedRecommendationId } from '@/features/recommendationsSlice';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RightSidePanel from '../RightSidePanel';
import { useTranslations } from 'next-intl';

interface ImpactRunsProps {
  setIsPanelMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  isPanelMinimized: boolean;
}

const ImpactRuns: React.FC<ImpactRunsProps> = ({ setIsPanelMinimized, isPanelMinimized }) => {
  const t = useTranslations("messages.Home");
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const recommendations = useSelector((state: RootState) => state.recommendations.recommendations);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  console.log(accessToken);

  useEffect(() => {
    const fetchImpactRuns = async () => {
      try {
        const response = await fetch('/impactRuns', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const data = await response.json();
        const impactRun = data[0];
        dispatch(setImpactRunId(impactRun.id));

        const recommendationsResponse = await fetch(`/impactrun/${impactRun.id}/recommendations`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });
        const recommendationsData = await recommendationsResponse.json();
        dispatch(setRecommendations(recommendationsData));
      } catch (error) {
        console.error('Error fetching impact runs or recommendations:', error);
      }
    };

    fetchImpactRuns();
  }, [dispatch, accessToken]);

  const getColorByRecommendationType = (type: string) => {
    switch (type) {
      case 'SYSTEM':
        return 'bg-blue-500';
      case 'BIG_BET':
        return 'bg-red-500';
      case 'PROJECT':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleRecommendationClick = (rec: any) => {
    dispatch(setSelectedRecommendationId(rec.id));
    setIsPanelOpen(true)
  };

  const close = () => {
    console.log("close");
    dispatch(clearSelectedRecommendationId());
    setIsPanelOpen(false)
  }

  return (
    <div className="flex flex-col items-center p-4">
      {/* Recommendations Panel */}
      <div className={`transition-all duration-300 ${isPanelMinimized ? 'w-40' : 'sm:w-2/3 md:w-full lg:w-full xl:w-full w-full'} bg-white rounded-lg shadow-lg`}>
        <div className={`p-4 border-b flex ${isPanelMinimized ? 'justify-between' : 'justify-between'} items-center`}>
          <h2 className={`${isPanelMinimized ? 'truncate' : 'block'} font-semibold text-lg`}>
          {t('chart.recommendations')}
          </h2>
          <button onClick={() => setIsPanelMinimized(!isPanelMinimized)} className="text-gray-500 hover:text-gray-800">
            {isPanelMinimized ? '→' : '←'}
          </button>
        </div>

        {/* Expanded Panel */}
        {!isPanelMinimized && (
          <div className="p-4">
            <ul className="space-y-3">
              {recommendations.map((rec: any) => (
                <li
                  key={rec.id}
                  onClick={() => handleRecommendationClick(rec)}
                  className="sm:flex sm:justify-between sm:items-center md:flex md:justify-between md:items-center lg:flex lg:justify-between lg:items-center xl:flex xl:justify-between xl:items-center cursor-pointer p-2 border-b hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <div className={`${getColorByRecommendationType(rec.topicRecommendation.recommendationType)} w-3 h-12 rounded-lg mr-2`}></div>
                    <span className="font-semibold truncate">{rec.topicRecommendation.recommendation}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {rec.topicRecommendation.recommendationType === 'BIG_BET' ? `${t('chart.bigBet')}` : `${t('chart.project')}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Minimized Panel (Partial Text Visible) */}
        {isPanelMinimized && (
          <div className="p-2">
            <ul className="space-y-3">
              {recommendations.map((rec: any) => (
                <li key={rec.id} className="flex items-center cursor-pointer p-2">
                  <div className="flex items-center">
                    <div className={`${getColorByRecommendationType(rec.topicRecommendation.recommendationType)} w-3 h-12 rounded-lg mr-2`}></div>
                    {/* Show part of the text */}
                    <span className="text-xs text-gray-700 truncate w-24">{rec.topicRecommendation.recommendation}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <RightSidePanel
        isVisible={isPanelOpen}
        onClose={close} 
      />
    </div>
  );
};

export default ImpactRuns;
