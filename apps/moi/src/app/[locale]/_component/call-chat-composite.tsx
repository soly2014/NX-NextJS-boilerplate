'use client';

import {
  TeamsMeetingIdLocator,
  TeamsMeetingLinkLocator,
} from '@azure/communication-calling';
import {
  AzureCommunicationTokenCredential,
  CommunicationUserIdentifier,
} from '@azure/communication-common';
import {
  CallAndChatLocator,
  CallWithChatComposite,
  useAzureCommunicationCallWithChatAdapter,
  CallWithChatCompositeOptions,
} from '@azure/communication-react';
import { Theme, PartialTheme, Spinner, initializeIcons } from '@fluentui/react';
import { Button } from '@ui';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ReloadIcon, UploadIcon } from '@radix-ui/react-icons';

initializeIcons();

export type CallWithChatExampleProps = {
  // Props needed for the construction of the CallWithChatAdapter
  userId: CommunicationUserIdentifier;
  token: string;
  displayName: string;
  endpointUrl: string;
  /**
   * For CallWithChat you need to provide either a teams meeting locator or a CallAndChat locator
   * for the composite
   *
   * CallAndChatLocator: This locator is comprised of a groupId call locator and a chat thread
   * threadId for the session. See documentation on the {@link CallAndChatLocator} to see types of calls supported.
   * {callLocator: ..., threadId: ...}
   *
   * TeamsMeetingLinkLocator: this is a special locator comprised of a Teams meeting link
   * {meetingLink: ...}
   */
  locator: TeamsMeetingLinkLocator | CallAndChatLocator | TeamsMeetingIdLocator;

  // Props to customize the CallWithChatComposite experience
  fluentTheme?: PartialTheme | Theme;
  rtl?: boolean;
  compositeOptions?: CallWithChatCompositeOptions;
  callInvitationURL?: string;
  formFactor?: 'desktop' | 'mobile';
};

export const CallWithChatExperience = (
  props: CallWithChatExampleProps,
): JSX.Element => {
  // Construct a credential for the user with the token retrieved from your server. This credential
  // must be memoized to ensure useAzureCommunicationCallWithChatAdapter is not retriggered on every render pass.
  const credential = useMemo(
    () => new AzureCommunicationTokenCredential(props.token),
    [props.token],
  );

  // Create the adapter using a custom react hook provided in the @azure/communication-react package.
  // See https://aka.ms/acsstorybook?path=/docs/composite-adapters--page for more information on adapter construction and alternative constructors.
  const adapter = useAzureCommunicationCallWithChatAdapter({
    userId: props.userId,
    displayName: props.displayName,
    credential,
    locator: props.locator,
    endpoint: props.endpointUrl,
  });

  const [isDesktopChatOpen, setIsDesktopChatOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isFileUploadLoading, setIsFileUploadLoading] = useState(false);

  console.log(isDesktopChatOpen, 'isDesktopChatOpen');
  console.log(isMobileChatOpen, 'isMobileChatOpen');

  useEffect(() => {
    const checkChatVisibility = () => {
      // Select the chat container using data-ui-id
      const chatContainer: any = document.querySelector(
        '[role="heading"][aria-label="Chat"][aria-level="2"]',
      );
      const chatElement: any = document.querySelector('#sendbox');
      if (chatElement) {
        const isVisible =
          chatElement.offsetWidth > 0 && chatElement.offsetHeight > 0;
        setIsMobileChatOpen(isVisible);
      } else {
        setIsMobileChatOpen(false);
      }

      // Check if the element exists and is visible
      if (chatContainer) {
        const isVisible =
          chatContainer.offsetWidth > 0 && chatContainer.offsetHeight > 0;
        setIsDesktopChatOpen(isVisible);
      } else {
        setIsDesktopChatOpen(false);
      }
    };

    // Check visibility initially
    checkChatVisibility();

    // Optionally, set up an interval to check visibility periodically
    const interval = setInterval(checkChatVisibility, 500);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (adapter) {
      try {
        adapter.startCaptions({ spokenLanguage: 'en-us' });
        // adapter.setCaptionLanguage('en-us');
      } catch (error) {
        console.error('Error starting captions:', error);
      }

      adapter.on('captionsReceived', (e) => {
        console.log('Captions received:', e);
      });
    }
  }, [adapter]);

  // Create a ref to the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle file selection
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // Handle the selected file, e.g., upload it or display it
      console.log('Selected file:', file);
      setIsFileUploadLoading(true);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      setIsFileUploadLoading(false);
      handleMessageSend();
    }
    // Reset the file input value to allow re-upload of the same file
    event.target.value = '';
  };

  // The adapter is created asynchronously by the useAzureCommunicationCallWithChatAdapter hook.
  // Here we show a spinner until the adapter has finished constructing.
  if (!adapter) {
    return <Spinner label="Initializing..." />;
  }

  if (adapter) {
    // adapter.unmute();
    // adapter.startCamera();
  }

  const handleMessageSend = () => {
    adapter.sendMessage('This is The File Path Uploaded To Out Server');
  };

  adapter.onStateChange((state) => {
    // console.log(state.call?.captionsFeature);
  });

  return (
    <>
      <div className="relative">
        {isDesktopChatOpen || isMobileChatOpen ? (
          <>
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />

            {/* Custom upload button */}
            {isDesktopChatOpen && (
              <Button
                className="absolute right-12 top-3 z-[9999]"
                onClick={() => fileInputRef.current?.click()}
                variant={'secondary'}
                disabled={isFileUploadLoading}
              >
                {isFileUploadLoading ? (
                  <ReloadIcon className="animate-spin" />
                ) : (
                  <UploadIcon />
                )}
              </Button>
            )}
            {isMobileChatOpen && (
              <span
                className="absolute bottom-4 right-10 z-[9999]"
                onClick={() =>
                  !isFileUploadLoading && fileInputRef.current?.click()
                }
              >
                {isFileUploadLoading ? (
                  <ReloadIcon className="h-5 w-5 animate-spin" />
                ) : (
                  <UploadIcon className="h-5 w-5" />
                )}
              </span>
            )}
          </>
        ) : null}

        <CallWithChatComposite
          adapter={adapter}
          fluentTheme={props.fluentTheme}
          rtl={props.rtl}
          formFactor={props.formFactor}
          joinInvitationURL={props.callInvitationURL}
          options={props.compositeOptions}
          // locale={{
          //   strings: {
          //     callWithChat: {
          //       peopleButtonLabel: 'زر الأشخاص',
          //       selectedPeopleButtonLabel: 'زر الأشخاص (محدد)',
          //       peopleButtonTooltipOpenAriaLabel: 'فتح زر الأشخاص',
          //       peopleButtonTooltipCloseAriaLabel: 'إغلاق زر الأشخاص',
          //       peopleButtonTooltipOpen: 'افتح الأشخاص',
          //       peopleButtonTooltipClose: 'أغلق الأشخاص',
          //       chatButtonLabel: 'زر الدردشة',
          //       chatButtonTooltipOpen: 'افتح الدردشة',
          //       chatButtonTooltipClose: 'أغلق الدردشة',
          //       chatButtonTooltipClosedWithMessageCount:
          //         'إغلاق الدردشة (عدد الرسائل)',
          //       moreDrawerAudioDeviceMenuTitle: 'قائمة الأجهزة الصوتية',
          //       moreDrawerMicrophoneMenuTitle: 'قائمة الميكروفونات',
          //       moreDrawerSpeakerMenuTitle: 'قائمة السماعات',
          //       moreDrawerCaptionsMenuTitle: 'قائمة التسميات التوضيحية',
          //       moreDrawerSpokenLanguageMenuTitle: 'قائمة اللغات المحكية',
          //       moreDrawerCaptionLanguageMenuTitle: 'قائمة لغات التسميات التوضيحية',
          //       moreDrawerGalleryOptionsMenuTitle: 'قائمة خيارات المعرض',
          //       moreDrawerButtonLabel: 'زر المزيد',
          //       moreDrawerButtonTooltip: 'المزيد',
          //       peoplePaneTitle: 'قسم الأشخاص',
          //       peoplePaneSubTitle: 'فرعي قسم الأشخاص',
          //       chatPaneTitle: 'شاشة الدردشة',
          //       chatButtonNewMessageNotificationLabel: 'إشعار رسالة جديدة',
          //       pictureInPictureTileAriaLabel: 'صورة في صورة للبلاطة',
          //       removeMenuLabel: 'إزالة المشارك',
          //       copyInviteLinkButtonLabel: 'نسخ رابط الدعوة',
          //       copyInviteLinkButtonActionedLabel: 'تم نسخ رابط الدعوة',
          //       dismissSidePaneButtonLabel: 'إغلاق الشريط الجانبي',
          //       returnToCallButtonAriaDescription: 'وصف العودة إلى المكالمة',
          //       returnToCallButtonAriaLabel: 'زر العودة إلى المكالمة',
          //       copyInviteLinkActionedAriaLabel: 'تمت نسخ رابط الدعوة',
          //     },
          //     call: {
          //       configurationPageTitle: 'عنوان صفحة الإعداد',
          //       configurationPageCallDetails: 'تفاصيل المكالمة على صفحة الإعداد',
          //       startCallButtonLabel: 'بدء المكالمة',
          //       rejoinCallButtonLabel: 'إعادة الانضمام إلى المكالمة',
          //       defaultPlaceHolder: 'نص توضيحي افتراضي',
          //       cameraLabel: 'الكاميرا',
          //       noCamerasLabel: 'لا توجد كاميرات',
          //       soundLabel: 'الصوت',
          //       noMicrophonesLabel: 'لا توجد ميكروفونات',
          //       noSpeakersLabel: 'لا توجد سماعات',
          //       cameraPermissionDenied: 'تم رفض إذن الكاميرا',
          //       cameraTurnedOff: 'الكاميرا مغلقة',
          //       microphonePermissionDenied: 'تم رفض إذن الميكروفون',
          //       failedToJoinTeamsMeetingReasonAccessDeniedTitle:
          //         'تم رفض الوصول للاجتماع',
          //       failedToJoinTeamsMeetingReasonAccessDeniedMoreDetails:
          //         'تفاصيل إضافية حول رفض الوصول',
          //       failedToJoinCallDueToNoNetworkTitle:
          //         'فشل في الانضمام بسبب مشكلة في الشبكة',
          //       failedToJoinCallDueToNoNetworkMoreDetails:
          //         'تفاصيل إضافية حول مشكلة الشبكة',
          //       leavingCallTitle: 'مغادرة المكالمة',
          //       leftCallTitle: 'تم مغادرة المكالمة',
          //       leftCallMoreDetails: 'تفاصيل إضافية حول مغادرة المكالمة',
          //       removedFromCallTitle: 'تمت إزالتك من المكالمة',
          //       removedFromCallMoreDetails: 'تفاصيل إضافية حول إزالتك من المكالمة',
          //       lobbyScreenConnectingToCallTitle: 'جارٍ الاتصال بالمكالمة',
          //       lobbyScreenConnectingToCallMoreDetails:
          //         'تفاصيل إضافية حول الاتصال بالمكالمة',
          //       lobbyScreenWaitingToBeAdmittedTitle: 'بانتظار قبول الانضمام',
          //       lobbyScreenWaitingToBeAdmittedMoreDetails:
          //         'تفاصيل إضافية حول انتظار القبول',
          //       mutedMessage: 'المايكروفون مغلق',
          //       privacyPolicy: 'سياسة الخصوصية',
          //       learnMore: 'تعرف على المزيد',
          //       complianceBannerNowOnlyRecording: 'يتم تسجيل الاجتماع فقط',
          //       complianceBannerNowOnlyTranscription:
          //         'يتم تحويل الاجتماع إلى نص فقط',
          //       complianceBannerRecordingAndTranscriptionSaved:
          //         'تم حفظ التسجيل والنص',
          //       complianceBannerRecordingAndTranscriptionStarted:
          //         'بدأ التسجيل والنص',
          //       complianceBannerRecordingAndTranscriptionStopped:
          //         'تم إيقاف التسجيل والنص',
          //       complianceBannerRecordingSaving: 'يتم حفظ التسجيل',
          //       complianceBannerRecordingStarted: 'بدأ التسجيل',
          //       complianceBannerRecordingStopped: 'تم إيقاف التسجيل',
          //       complianceBannerTranscriptionConsent:
          //         'توافق على تحويل الاجتماع إلى نص',
          //       complianceBannerTranscriptionSaving: 'يتم حفظ النص',
          //       complianceBannerTranscriptionStarted: 'بدأ تحويل الاجتماع إلى نص',
          //       complianceBannerTranscriptionStopped:
          //         'تم إيقاف تحويل الاجتماع إلى نص',
          //       close: 'إغلاق',
          //       networkReconnectTitle: 'إعادة الاتصال بالشبكة',
          //       networkReconnectMoreDetails:
          //         'تفاصيل إضافية حول إعادة الاتصال بالشبكة',
          //       microphoneToggleInLobbyNotAllowed:
          //         'غير مسموح بتبديل الميكروفون في اللوبي',
          //       peoplePaneTitle: 'قسم الأشخاص',
          //       peoplePaneMoreButtonAriaLabel: 'زر المزيد في قسم الأشخاص',
          //       returnToCallButtonAriaLabel: 'زر العودة إلى المكالمة',
          //       returnToCallButtonAriaDescription: 'وصف زر العودة إلى المكالمة',
          //       peopleButtonLabel: 'زر الأشخاص',
          //       selectedPeopleButtonLabel: 'زر الأشخاص (محدد)',
          //       chatButtonLabel: 'زر الدردشة',
          //       dismissSidePaneButtonLabel: 'إغلاق الشريط الجانبي',
          //       startSpotlightMenuLabel: 'بدء تسليط الضوء',
          //       addSpotlightMenuLabel: 'إضافة تسليط الضوء',
          //       stopSpotlightMenuLabel: 'إيقاف تسليط الضوء',
          //       stopSpotlightOnSelfMenuLabel: 'إيقاف تسليط الضوء على الذات',
          //       spotlightLimitReachedMenuTitle: 'تم الوصول إلى حد تسليط الضوء',
          //       stopAllSpotlightMenuLabel: 'إيقاف جميع الأضواء',
          //       moreButtonCallingLabel: 'زر المزيد في المكالمة',
          //       copyInviteLinkActionedAriaLabel: 'تم نسخ رابط الدعوة',
          //       roomNotFoundTitle: 'الغرفة غير موجودة',
          //       roomNotFoundDetails: 'تفاصيل إضافية حول عدم العثور على الغرفة',
          //       roomNotValidTitle: 'الغرفة غير صالحة',
          //       roomNotValidDetails: 'تفاصيل إضافية حول عدم صلاحية الغرفة',
          //       inviteToRoomRemovedTitle: 'تم إلغاء دعوتك للغرفة',
          //       inviteToRoomRemovedDetails: 'تفاصيل إضافية حول إلغاء دعوتك',
          //       videoEffectsPaneTitle: 'تأثيرات الفيديو',
          //       videoEffectsPaneBackgroundSelectionTitle: 'اختيار الخلفية',
          //       configurationPageVideoEffectsButtonLabel: 'زر فتح التأثيرات',
          //       unableToStartVideoEffect: 'تعذر بدء تأثير الفيديو',
          //       blurBackgroundEffectButtonLabel: 'تأثير الخلفية الضبابية',
          //       blurBackgroundTooltip: 'نص توضيحي لتأثير الخلفية الضبابية',
          //       removeBackgroundEffectButtonLabel: 'إزالة تأثير الخلفية',
          //       removeBackgroundTooltip: 'نص توضيحي لإزالة تأثير الخلفية',
          //       cameraOffBackgroundEffectWarningText: 'تحذير: الكاميرا مغلقة',
          //       notInvitedToRoomTitle: 'غير مدعو إلى الغرفة',
          //       notInvitedToRoomDetails: 'تفاصيل إضافية حول عدم دعوتك للغرفة',
          //       outboundCallingNoticeString: 'مكالمة صادرة',
          //       participantJoinedNoticeString: 'انضمام مشارك',
          //       twoParticipantJoinedNoticeString: 'انضمام مشاركين',
          //       threeParticipantJoinedNoticeString: 'انضمام ثلاثة مشاركين',
          //       participantLeftNoticeString: 'مغادرة مشارك',
          //       twoParticipantLeftNoticeString: 'مغادرة مشاركين',
          //       threeParticipantLeftNoticeString: 'مغادرة ثلاثة مشاركين',
          //       unnamedParticipantString: 'مشارك غير مسمى',
          //       manyParticipantsJoined: 'انضمام العديد من المشاركين',
          //       manyParticipantsLeft: 'مغادرة العديد من المشاركين',
          //       manyUnnamedParticipantsJoined:
          //         'انضمام العديد من المشاركين غير المسمين',
          //       manyUnnamedParticipantsLeft:
          //         'مغادرة العديد من المشاركين غير المسمين',
          //       liveCaptionsLabel: 'تسميات توضيحية مباشرة',
          //       captionsSettingsLabel: 'إعدادات التسميات التوضيحية',
          //       startCaptionsButtonOnLabel: 'بدء التسميات التوضيحية',
          //       startCaptionsButtonOffLabel: 'إيقاف التسميات التوضيحية',
          //       startCaptionsButtonTooltipOnContent:
          //         'التسميات التوضيحية قيد التشغيل',
          //       startCaptionsButtonTooltipOffContent: 'التسميات التوضيحية متوقفة',
          //       captionsSettingsModalTitle: 'عنوان إعدادات التسميات التوضيحية',
          //       captionsSettingsSpokenLanguageDropdownLabel: 'لغة الكلام',
          //       captionsSettingsCaptionLanguageDropdownLabel:
          //         'لغة التسميات التوضيحية',
          //       captionsSettingsSpokenLanguageDropdownInfoText:
          //         'معلومات حول لغة الكلام',
          //       captionsSettingsCaptionLanguageDropdownInfoText:
          //         'معلومات حول لغة التسميات التوضيحية',
          //       captionsSettingsConfirmButtonLabel: 'تأكيد',
          //       captionsSettingsCancelButtonLabel: 'إلغاء',
          //       captionsSettingsModalAriaLabel: 'إعدادات التسميات التوضيحية',
          //       captionsSettingsCloseModalButtonAriaLabel:
          //         'زر إغلاق إعدادات التسميات التوضيحية',
          //       captionsBannerMoreButtonCallingLabel:
          //         'زر المزيد في شريط التسميات التوضيحية',
          //       captionsBannerMoreButtonTooltip:
          //         'نص توضيحي لزر المزيد في شريط التسميات التوضيحية',
          //       captionsBannerSpinnerText: 'جارٍ التحميل',
          //       transferPageTransferorText: 'المحيل',
          //       transferPageTransferTargetText: 'المستهدف',
          //       transferPageUnknownTransferorDisplayName: 'اسم المحيل غير معروف',
          //       transferPageUnknownTransferTargetDisplayName:
          //         'اسم المستهدف غير معروف',
          //       transferPageNoticeString: 'جارٍ التحويل',
          //       moreButtonGalleryControlLabel: 'التحكم في المعرض',
          //       moreButtonGalleryPositionToggleLabel: 'تبديل موضع المعرض',
          //       moreButtonGallerySpeakerLayoutLabel: 'تخطيط المتحدث',
          //       moreButtonGalleryDefaultLayoutLabel: 'تخطيط المعرض الافتراضي',
          //       moreButtonLargeGalleryDefaultLayoutLabel: 'تخطيط المعرض الكبير',
          //       moreButtonGalleryFloatingLocalLayoutLabel:
          //         'تخطيط الفيديو المحلي العائم',
          //       moreButtonGalleryFocusedContentLayoutLabel: 'تخطيط المحتوى المركّز',
          //       surveyTitle: 'استبيان',
          //       starSurveyHelperText: 'مساعدة في الاستبيان',
          //       starSurveyOneStarText: 'نجمة واحدة',
          //       starSurveyTwoStarText: 'نجمتان',
          //       starSurveyThreeStarText: 'ثلاث نجوم',
          //       starSurveyFourStarText: 'أربع نجوم',
          //       starSurveyFiveStarText: 'خمس نجوم',
          //       starRatingAriaLabel: 'تقييم النجوم',
          //       tagsSurveyQuestion: 'سؤال الاستبيان',
          //       tagsSurveyTextFieldDefaultText: 'نص الحقل الافتراضي',
          //       tagsSurveyHelperText: 'مساعدة في الاستبيان',
          //       surveyConfirmButtonLabel: 'تأكيد',
          //       surveySkipButtonLabel: 'تخطي',
          //       endOfSurveyText: 'شكرًا لك على إكمال الاستبيان',
          //       dismissModalAriaLabel: 'زر إغلاق',
          //       callRejectedTitle: 'تم رفض المكالمة',
          //       callRejectedMoreDetails: 'تفاصيل إضافية حول رفض المكالمة',
          //       callTimeoutTitle: 'انتهاء وقت المكالمة',
          //       callTimeoutBotTitle: 'انتهاء وقت المكالمة (بوت)',
          //       callTimeoutDetails: 'تفاصيل إضافية حول انتهاء وقت المكالمة',
          //       callTimeoutBotDetails:
          //         'تفاصيل إضافية حول انتهاء وقت المكالمة (بوت)',
          //       dtmfDialerButtonLabel: 'زر لوحة الاتصال',
          //       dtmfDialerButtonTooltipOn: 'نص توضيحي لزر لوحة الاتصال (تشغيل)',
          //       dtmfDialerButtonTooltipOff: 'نص توضيحي لزر لوحة الاتصال (إيقاف)',
          //       dtmfDialerMoreButtonLabelOn:
          //         'زر لوحة الاتصال في قائمة المزيد (تشغيل)',
          //       dtmfDialerMoreButtonLabelOff:
          //         'زر لوحة الاتصال في قائمة المزيد (إيقاف)',
          //       exitSpotlightButtonLabel: 'خروج من تسليط الضوء',
          //       exitSpotlightButtonTooltip: 'نص توضيحي لزر الخروج من تسليط الضوء',
          //       leaveConfirmButtonLabel: 'تأكيد المغادرة',
          //       endCallConfirmButtonLabel: 'تأكيد إنهاء المكالمة',
          //       hangUpCancelButtonLabel: 'إلغاء',
          //       leaveConfirmDialogTitle: 'تأكيد المغادرة',
          //       leaveConfirmDialogContent: 'محتوى تأكيد المغادرة',
          //       endCallConfirmDialogTitle: 'تأكيد إنهاء المكالمة',
          //       endCallConfirmDialogContent: 'محتوى تأكيد إنهاء المكالمة',
          //       invalidMeetingIdentifier: 'معرف الاجتماع غير صالح',
          //       pinParticipantMenuLabel: 'تثبيت المشارك',
          //       pinParticipantLimitReachedMenuLabel:
          //         'تم الوصول إلى حد تثبيت المشاركين',
          //       unpinParticipantMenuLabel: 'إلغاء تثبيت المشارك',
          //       unpinParticipantMenuItemAriaLabel: 'إلغاء تثبيت المشارك (آريا)',
          //       pinParticipantMenuItemAriaLabel: 'تثبيت المشارك (آريا)',
          //       phoneCallMoreButtonLabel: 'زر المزيد في المكالمات الهاتفية',
          //       surveyIssues: undefined,
          //       surveyIssuesHeadingStrings: undefined,
          //       spotlightPrompt: undefined,
          //     },
          //   },
          // }}
        />
      </div>
    </>
  );
};
