"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchOrganizationDetails } from "@/features/organizationSlice";
import RecommendationModal from "./chart/RecommendationModal";
import { usePathname } from "next/navigation";
import { updateRecommendationDates } from "@/features/recommendationsSlice";
import { useTranslations } from "next-intl";

const RightSidePanel = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const pathname = usePathname();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language,
  );
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const dispatch = useDispatch();
  const t = useTranslations("messages.Home");

  const { organizationName, industryName, countryName, status } = useSelector(
    (state: RootState) => state.organization,
  );

  const recommendations = useSelector(
    (state: RootState) => state.recommendations.recommendations,
  );
  const selectedRecomandationID = useSelector(
    (state: RootState) => state.recommendations.selectedRecommendationId,
  );
  const context =
    pathname === `/${currentLanguage}/chart` ? "recommendation" : "userProfile";

  useEffect(() => {
    if (isVisible) {
      if (context === "userProfile" || !selectedRecomandationID) {
        const organizationId = userInfo?.["custom:organizationId"];
        dispatch(fetchOrganizationDetails({ organizationId, accessToken }));
      } else if (context === "recommendation") {
        recommendations.find((recommendation) => {
          if (recommendation.id === selectedRecomandationID) {
            setSelectedRecommendation(recommendation);
          }
        });
      }
    }
  }, [
    isVisible,
    dispatch,
    context,
    userInfo,
    accessToken,
    recommendations,
    selectedRecomandationID,
  ]);

  const handleRecommendationClick = () => {
    setIsModalOpen(true);
  };

  const handleSetDates = (start: string, end: string) => {
    setStartDate(new Date(start).toISOString());
    setEndDate(new Date(end).toISOString());
  };

  const handleSave = () => {
    const updatedRec = {
      ...selectedRecommendation,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    };

    dispatch(updateRecommendationDates(updatedRec));
    onClose();
  };

  const handlePanelClose = () => {
    setStartDate(null);
    setEndDate(null);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        } w-[90%] sm:w-[80%] md:w-[500px] lg:w-[600px] xl:w-[700px]`}
      >
        <button
          onClick={handlePanelClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
        >
          {t("rightSidePanel.close")}
        </button>
        <div className="p-6">
          {context === "userProfile" || !selectedRecomandationID ? (
            <>
              <h2 className="text-xl sm:text-2xl font-bold mb-6">
                {t("organization.profile")}
              </h2>
              {status === "loading" ? (
                <p className="text-gray-500">{t("rightSidePanel.loading")}</p>
              ) : (
                <div className="p-4">
                  <p className="mb-1">
                    <strong>{t("organization.name")}</strong> {organizationName}
                  </p>
                  <p className="mb-1">
                    <strong>{t("organization.industry")}</strong> {industryName}
                  </p>
                  <p>
                    <strong>{t("organization.country")}</strong> {countryName}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {selectedRecommendation && (
                <div className="flex flex-col h-screen overflow-y-auto">
                  <div className="flex justify-between items-center p-4">
                    <h2 className="sm:text-xs md:text-sm lg:text-lg xl:text-xl font-bold text-blue-600">
                      {t("recommendationDetail.detail")}
                    </h2>
                  </div>

                  <hr className="my-4 border-gray-300" />
                  {/* Scrollable Content */}
                  <div className="flex-grow p-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4">
                      {
                        selectedRecommendation.topicRecommendation
                          .recommendation
                      }
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-500 text-sm">
                          {t("recommendationDetail.capex")}
                        </p>
                        <p className="font-medium">
                          {selectedRecommendation.topicRecommendation.capex
                            ? t("recommendationDetail.yes")
                            : t("recommendationDetail.no")}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">
                          {t("recommendationDetail.opex")}
                        </p>
                        <p className="font-medium">
                          {selectedRecommendation.topicRecommendation.opex
                            ? t("recommendationDetail.yes")
                            : t("recommendationDetail.no")}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">
                          {t("recommendationDetail.size")}
                        </p>
                        <p className="font-medium">
                          {
                            selectedRecommendation.topicRecommendation
                              .initiativeSize
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm"></p>
                        {selectedRecommendation.startDate &&
                        selectedRecommendation.endDate ? (
                          <>
                            <p className="font-medium">
                              {new Date(
                                selectedRecommendation.startDate,
                              ).toLocaleDateString()}
                            </p>
                            <p className="font-medium">
                              {new Date(
                                selectedRecommendation.startDate,
                              ).toLocaleDateString()}
                            </p>
                          </>
                        ) : (
                          <button
                            onClick={handleRecommendationClick}
                            className="mt-2 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-lg shadow hover:from-green-500 hover:to-blue-600 transition-all"
                          >
                            {t("recommendationDetail.add")}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-2">
                        {t("recommendationDetail.description")}
                      </h4>
                      <p className="text-gray-600">
                        {selectedRecommendation.topicRecommendation.description}
                      </p>
                    </div>
                  </div>

                  <hr className="my-4 border-gray-300" />

                  {!selectedRecommendation.startDate &&
                    !selectedRecommendation.endDate && (
                      <div className="p-6 flex justify-end">
                        <button
                          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all"
                          onClick={handleSave}
                        >
                          {t("recommendationDetail.save")}
                        </button>
                      </div>
                    )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal for selecting dates */}
      {isModalOpen && (
        <RecommendationModal
          selectedRecommendation={selectedRecommendation}
          closeModal={() => setIsModalOpen(false)}
          setDates={handleSetDates}
        />
      )}
    </>
  );
};

export default RightSidePanel;
