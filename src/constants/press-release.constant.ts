export enum PRESS_RELEASE_TYPES {
  DEVELOPMENT = 'development',
  ANNOUNCEMENT = 'announcement',
  SOCIAL_VALUE_CREATION = 'socialValueCreation',
  PERFORMANCE = 'performance',
  AWARDS_AND_CERTIFICATIONS = 'awardsAndCertifications',
  BUSINESS_PLAINNING = 'businessPlanning',
  ORDERS = 'orders',
  PEOPLE_NEWS = 'peopleNews',
  FOUNDING = 'founding',
  POLICIES_AND_PROPOSALS = 'policiesAndProposals',
  NEW_PRODUCT_LAUNCH = 'newProductLaunch',
  RECRUITMENT = 'recruitment',
  RESEARCH = 'researchAndInvestigation',
  INVESTMENT_ACTIVITIES = 'investmentActivities',
  EVENT = 'event',
  PERSONNEL = 'personnel',
  MERGERS_AND_ACQUISITIONS = 'mergersAndAcquisitions',
  EXHIBITION_EVENT = 'exhibitionEvent',
  SALES_PROMOTION = 'salesPromotion',
  PARTNERSHIP = 'partnership'
}

export enum FormStatus {
  inprogress = 'inprogress',
  completed = 'completed'
}

export enum inputNames {
  //common
  quoteMessage = 'quoteMessage',
  companyName = 'companyName',
  distributionDate = 'distributionDate',
  representativeName = 'representativeName',

  //1.개발
  projectNameAndPurpose = 'projectNameAndPurpose',
  developmentScopeAndContent = 'developmentScopeAndContent',
  techniqueOrMethod = 'techniqueOrMethod',
  collaborationOrTeamIntroduction = 'collaborationOrTeamIntroduction',
  developmentResultsAndAchievements = 'developmentResultsAndAchievements',

  //2.공모
  contestTopicAndPurpose = 'contestTopicAndPurpose',
  hostingAndSponsoringOrganizations = 'hostingAndSponsoringOrganizations',
  participantBenefitInformation = 'participantBenefitInformation',
  contestEligibilityAndParticipationMethod = 'contestEligibilityAndParticipationMethod',
  screeningAndEvaluationCriteria = 'screeningAndEvaluationCriteria',

  //3.사회적 가치 창출
  projectIntroduction = 'projectIntroduction',
  participantsAndPartnerOrganizations = 'participantsAndPartnerOrganizations',
  settingSocialIssuesOrGoals = 'settingSocialIssuesOrGoals',
  activityContentAndResults = 'activityContentAndResults',
  sustainabilityAndFuturePlans = 'sustainabilityAndFuturePlans',

  //4.성과
  overviewAndSummary = 'sustainabilityAndFuturePlans',
  reasonsAndFactors = 'reasonsAndFactors',
  influenceAndEffect = 'influenceAndEffect',
  maintenanceAndDevelopmentDirection = 'maintenanceAndDevelopmentDirection',
  futureProspectsAndPlans = 'futureProspectsAndPlans',

  //5.수상 및 인증
  awardDetailsAndBackground = 'awardDetailsAndBackground',
  winnerInformationAndAchievements = 'winnerInformationAndAchievements',
  meaningAndValueOfAward = 'meaningAndValueOfAward',
  impactOfAwards = 'impactOfAwards',

  //6.사업기획
  businessIdeaAndOverview = 'businessIdeaAndOverview',
  marketResearchAndAnalysisResults = 'marketResearchAndAnalysisResults',
  goalsAndStrategies = 'goalsAndStrategies',
  findingBusinessModels = 'findingBusinessModels',
  riskManagementAndResponseStrategy = 'riskManagementAndResponseStrategy',

  //7.수주
  orderContract = 'orderContract',
  customerReceivedOrder = 'customerReceivedOrder',
  orderWinningStrategy = 'orderWinningStrategy',
  valueOfOrders = 'valueOfOrders',
  opportunitiesAndFutureProspects = 'opportunitiesAndFutureProspects',

  //8.인물동정
  backgroundAndCareer = 'backgroundAndCareer',
  personAchievements = 'personAchievements',
  participationAndInfluence = 'participationAndInfluence',
  valuesAndVision = 'valuesAndVision',
  socialActivitiesAndContributions = 'socialActivitiesAndContributions',

  //9.창립
  backgroundAndHistory = 'backgroundAndHistory',
  founderIntroduction = 'founderIntroduction',
  purposeAndVision = 'purposeAndVision',
  developmentAndGrowth = 'developmentAndGrowth',
  foundingCeremony = 'foundingCeremony',

  //10.정책 및 제안
  policyOverviewAndPurpose = 'policyOverviewAndPurpose',
  proposedPolicyContentAndKeyPoints = 'proposedPolicyContentAndKeyPoints',
  impactAndEffectAnalysis = 'impactAndEffectAnalysis',
  planAccordingToImplementationAndImplementation = 'planAccordingToImplementationAndImplementation',

  //11.신제품 출시
  productIntroductionAndFunctionDescription = 'productIntroductionAndFunctionDescription',
  differencesComparedToExistingProducts = 'differencesComparedToExistingProducts',
  productMarketEntryStrategyAndTargets = 'productMarketEntryStrategyAndTargets',
  productReleaseScheduleAndPricingInformation = 'productReleaseScheduleAndPricingInformation',
  productTestingOrReviewContent = 'productTestingOrReviewContent',

  //12.채용
  introductionAndBackgroundOfTheRecruitingCompany = 'introductionAndBackgroundOfTheRecruitingCompany',
  recruitmentJobAndRoleDescription = 'recruitmentJobAndRoleDescription',
  qualificationsAndPreferences = 'qualificationsAndPreferences',
  recruitmentProcessAndSchedule = 'recruitmentProcessAndSchedule',
  companyCultureAndValues = 'companyCultureAndValues',

  //13.연구조사
  researchTopicAndPurpose = 'researchTopicAndPurpose',
  researchMethodsAndProcesses = 'researchMethodsAndProcesses',
  summaryOfKeyFindings = 'summaryOfKeyFindings',
  whatTheFindingsMean = 'whatTheFindingsMean',
  researchTeamOrParticipantInformation = 'researchTeamOrParticipantInformation',

  //14.투자활동
  investmentDetailsAndScale = 'investmentDetailsAndScale',
  investorInformation = 'investorInformation',
  investmentPurposeAndExpectedEffects = 'investmentPurposeAndExpectedEffects',
  investmentUtilizationPlan = 'investmentUtilizationPlan',
  investmentFutureProspectsAndPlans = 'futureProspectsAndPlans',

  //15.이벤트
  eventNameAndSchedule = 'eventNameAndSchedule',
  evenPurposeAndMainContent = 'evenPurposeAndMainContent',
  whoCanParticipateAndHowToParticipate = 'whoCanParticipateAndHowToParticipate',
  eventLocationAndFormat = 'eventLocationAndFormat',
  introducingSpecialGuestsOrPrograms = 'introducingSpecialGuestsOrPrograms',

  //16.인사
  personnelAppointmentAndPersonnelBackground = 'personnelAppointmentAndPersonnelBackground',
  introductionToTheDutiesAndRolesOfPersonnelCandidates = 'introductionToTheDutiesAndRolesOfPersonnelCandidates',
  organizationalChanges = 'organizationalChanges',
  strategicIntentionOfPersonnelDecisions = 'strategicIntentionOfPersonnelDecisions',
  introductionAndCareerOfPersonnel = 'introductionAndCareerOfPersonnel',

  //17.인수합병
  introductionAndBackgrounOfTheMergedCompany = 'introductionAndBackgrounOfTheMergedCompany',
  purposeAndExpectedEffectsOfMerger = 'purposeAndExpectedEffectsOfMerger',
  mergerProcessAndSchedule = 'mergerProcessAndSchedule',
  organizationalChangesAndImpactsResultingFromTheMerger = 'organizationalChangesAndImpactsResultingFromTheMerger',
  postMergerOutlookAndPlans = 'postMergerOutlookAndPlans',

  //18.전시행사
  introductionToExhibitionEventNameAndSchedule = 'introductionToExhibitionEventNameAndSchedule',
  exhibitionThemeAndPurpose = 'exhibitionThemeAndPurpose',
  introductionToParticipatingCompaniesAndParticipants = 'introductionToParticipatingCompaniesAndParticipants',
  exhibitionEventScheduleAndProgramInformation = 'exhibitionEventScheduleAndProgramInformation',
  elementsThatHighlightTopicality = 'elementsThatHighlightTopicality',

  //19.판촉활동
  purposeAndPeriodOfPromotionalActivities = 'purposeAndPeriodOfPromotionalActivities',
  discountBenefitsAndEventDetails = 'discountBenefitsAndEventDetails',
  introductionToTargetProductsOrServices = 'introductionToTargetProductsOrServices',
  informationOnHowToParticipateAndTheBenefitsOfParticipation = 'informationOnHowToParticipateAndTheBenefitsOfParticipation',
  introductionToPreviousPromotionalActivities = 'introductionToPreviousPromotionalActivities',

  //20.파트너십
  partnershipPurposeAndBenefits = 'partnershipPurposeAndBenefits',
  partnerIntroductionAndRoles = 'partnerIntroductionAndRoles',
  collaborativeProjectOrPlanDescription = 'collaborativeProjectOrPlanDescription',
  cooperationMethodsAndExpectedResults = 'cooperationMethodsAndExpectedResults',
  introductionToPastAchievementsAndSuccessStories = 'introductionToPastAchievementsAndSuccessStories'
}
