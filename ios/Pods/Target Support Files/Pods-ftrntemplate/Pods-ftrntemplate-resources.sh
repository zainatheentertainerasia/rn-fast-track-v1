#!/bin/sh
set -e
set -u
set -o pipefail

function on_error {
  echo "$(realpath -mq "${0}"):$1: error: Unexpected failure"
}
trap 'on_error $LINENO' ERR

if [ -z ${UNLOCALIZED_RESOURCES_FOLDER_PATH+x} ]; then
  # If UNLOCALIZED_RESOURCES_FOLDER_PATH is not set, then there's nowhere for us to copy
  # resources to, so exit 0 (signalling the script phase was successful).
  exit 0
fi

mkdir -p "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"

RESOURCES_TO_COPY=${PODS_ROOT}/resources-to-copy-${TARGETNAME}.txt
> "$RESOURCES_TO_COPY"

XCASSET_FILES=()

# This protects against multiple targets copying the same framework dependency at the same time. The solution
# was originally proposed here: https://lists.samba.org/archive/rsync/2008-February/020158.html
RSYNC_PROTECT_TMP_FILES=(--filter "P .*.??????")

case "${TARGETED_DEVICE_FAMILY:-}" in
  1,2)
    TARGET_DEVICE_ARGS="--target-device ipad --target-device iphone"
    ;;
  1)
    TARGET_DEVICE_ARGS="--target-device iphone"
    ;;
  2)
    TARGET_DEVICE_ARGS="--target-device ipad"
    ;;
  3)
    TARGET_DEVICE_ARGS="--target-device tv"
    ;;
  4)
    TARGET_DEVICE_ARGS="--target-device watch"
    ;;
  *)
    TARGET_DEVICE_ARGS="--target-device mac"
    ;;
esac

install_resource()
{
  if [[ "$1" = /* ]] ; then
    RESOURCE_PATH="$1"
  else
    RESOURCE_PATH="${PODS_ROOT}/$1"
  fi
  if [[ ! -e "$RESOURCE_PATH" ]] ; then
    cat << EOM
error: Resource "$RESOURCE_PATH" not found. Run 'pod install' to update the copy resources script.
EOM
    exit 1
  fi
  case $RESOURCE_PATH in
    *.storyboard)
      echo "ibtool --reference-external-strings-file --errors --warnings --notices --minimum-deployment-target ${!DEPLOYMENT_TARGET_SETTING_NAME} --output-format human-readable-text --compile ${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$RESOURCE_PATH\" .storyboard`.storyboardc $RESOURCE_PATH --sdk ${SDKROOT} ${TARGET_DEVICE_ARGS}" || true
      ibtool --reference-external-strings-file --errors --warnings --notices --minimum-deployment-target ${!DEPLOYMENT_TARGET_SETTING_NAME} --output-format human-readable-text --compile "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$RESOURCE_PATH\" .storyboard`.storyboardc" "$RESOURCE_PATH" --sdk "${SDKROOT}" ${TARGET_DEVICE_ARGS}
      ;;
    *.xib)
      echo "ibtool --reference-external-strings-file --errors --warnings --notices --minimum-deployment-target ${!DEPLOYMENT_TARGET_SETTING_NAME} --output-format human-readable-text --compile ${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$RESOURCE_PATH\" .xib`.nib $RESOURCE_PATH --sdk ${SDKROOT} ${TARGET_DEVICE_ARGS}" || true
      ibtool --reference-external-strings-file --errors --warnings --notices --minimum-deployment-target ${!DEPLOYMENT_TARGET_SETTING_NAME} --output-format human-readable-text --compile "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename \"$RESOURCE_PATH\" .xib`.nib" "$RESOURCE_PATH" --sdk "${SDKROOT}" ${TARGET_DEVICE_ARGS}
      ;;
    *.framework)
      echo "mkdir -p ${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}" || true
      mkdir -p "${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
      echo "rsync --delete -av "${RSYNC_PROTECT_TMP_FILES[@]}" $RESOURCE_PATH ${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}" || true
      rsync --delete -av "${RSYNC_PROTECT_TMP_FILES[@]}" "$RESOURCE_PATH" "${TARGET_BUILD_DIR}/${FRAMEWORKS_FOLDER_PATH}"
      ;;
    *.xcdatamodel)
      echo "xcrun momc \"$RESOURCE_PATH\" \"${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH"`.mom\"" || true
      xcrun momc "$RESOURCE_PATH" "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH" .xcdatamodel`.mom"
      ;;
    *.xcdatamodeld)
      echo "xcrun momc \"$RESOURCE_PATH\" \"${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH" .xcdatamodeld`.momd\"" || true
      xcrun momc "$RESOURCE_PATH" "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH" .xcdatamodeld`.momd"
      ;;
    *.xcmappingmodel)
      echo "xcrun mapc \"$RESOURCE_PATH\" \"${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH" .xcmappingmodel`.cdm\"" || true
      xcrun mapc "$RESOURCE_PATH" "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}/`basename "$RESOURCE_PATH" .xcmappingmodel`.cdm"
      ;;
    *.xcassets)
      ABSOLUTE_XCASSET_FILE="$RESOURCE_PATH"
      XCASSET_FILES+=("$ABSOLUTE_XCASSET_FILE")
      ;;
    *)
      echo "$RESOURCE_PATH" || true
      echo "$RESOURCE_PATH" >> "$RESOURCES_TO_COPY"
      ;;
  esac
}
if [[ "$CONFIGURATION" == "Debug" ]]; then
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ABKContentCardsStoryboard.storyboard"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ar.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/Base.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/cs.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/da.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/de.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/en.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es-419.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es-MX.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/et.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fi.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fil.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fr.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/he.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/hi.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/id.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/images/appboy_cc_icon_pinned.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/images/appboy_cc_icon_pinned@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/images/appboy_cc_icon_pinned@3x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/images/appboy_cc_noimage_lrg.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/images/appboy_cc_noimage_lrg@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/it.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ja.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/km.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ko.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/lo.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ms.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/my.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/nb.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/nl.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pl.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pt-PT.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pt.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ru.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/sv.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/th.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/uk.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/vi.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-Hans.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-Hant.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-HK.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-TW.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ar.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/Base.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/cs.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/da.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/de.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/en.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es-419.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es-MX.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/et.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fil.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fr.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/he.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/hi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/id.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/it.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ja.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/km.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ko.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/lo.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ms.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/my.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/nb.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/nl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pt-PT.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pt.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ru.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/sv.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/th.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/uk.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/vi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-Hans.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-Hant.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-HK.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-TW.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyKit/Appboy.bundle"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/ABKInAppMessageFullViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/ABKInAppMessageModalViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/ABKInAppMessageSlideupViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/arrow.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/arrow@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/arrow@3x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/com_appboy_inapp_close_icon.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/com_appboy_inapp_close_icon@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/com_appboy_inapp_close_icon@3x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/FontAwesome.otf"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ABKNewsFeedCardStoryboard.storyboard"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ar.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/Base.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/cs.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/da.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/de.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/en.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es-419.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es-MX.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/et.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fi.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fil.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fr.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/he.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/hi.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/id.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/Icons_Read.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/Icons_Read@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/Icons_Unread.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/Icons_Unread@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/img-noimage-lrg.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/img-noimage-lrg@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/it.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ja.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/km.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ko.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/lo.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ms.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/my.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/nb.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/nl.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pl.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pt-PT.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pt.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ru.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/sv.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/th.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/uk.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/vi.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-Hans.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-Hant.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-HK.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-TW.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ar.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/Base.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/cs.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/da.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/de.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/en.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es-419.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es-MX.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/et.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fil.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fr.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/he.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/hi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/id.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/it.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ja.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/km.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ko.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/lo.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ms.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/my.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/nb.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/nl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pt-PT.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pt.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ru.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/sv.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/th.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/uk.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/vi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-Hans.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-Hant.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-HK.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-TW.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh.lproj"
fi
if [[ "$CONFIGURATION" == "Release" ]]; then
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ABKContentCardsStoryboard.storyboard"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ar.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/Base.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/cs.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/da.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/de.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/en.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es-419.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es-MX.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/et.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fi.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fil.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fr.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/he.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/hi.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/id.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/images/appboy_cc_icon_pinned.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/images/appboy_cc_icon_pinned@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/images/appboy_cc_icon_pinned@3x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/images/appboy_cc_noimage_lrg.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/images/appboy_cc_noimage_lrg@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/it.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ja.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/km.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ko.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/lo.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ms.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/my.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/nb.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/nl.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pl.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pt-PT.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pt.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ru.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/sv.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/th.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/uk.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/vi.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-Hans.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-Hant.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-HK.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-TW.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh.lproj/AppboyContentCardsLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ar.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/Base.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/cs.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/da.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/de.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/en.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es-419.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es-MX.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/es.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/et.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fil.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/fr.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/he.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/hi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/id.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/it.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ja.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/km.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ko.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/lo.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ms.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/my.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/nb.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/nl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pt-PT.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/pt.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/ru.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/sv.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/th.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/uk.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/vi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-Hans.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-Hant.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-HK.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh-TW.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKContentCards/Resources/zh.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyKit/Appboy.bundle"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/ABKInAppMessageFullViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/ABKInAppMessageModalViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/ABKInAppMessageSlideupViewController.xib"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/arrow.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/arrow@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/arrow@3x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/com_appboy_inapp_close_icon.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/com_appboy_inapp_close_icon@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/com_appboy_inapp_close_icon@3x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKInAppMessage/Resources/FontAwesome.otf"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ABKNewsFeedCardStoryboard.storyboard"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ar.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/Base.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/cs.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/da.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/de.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/en.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es-419.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es-MX.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/et.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fi.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fil.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fr.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/he.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/hi.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/id.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/Icons_Read.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/Icons_Read@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/Icons_Unread.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/Icons_Unread@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/img-noimage-lrg.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/images/img-noimage-lrg@2x.png"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/it.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ja.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/km.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ko.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/lo.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ms.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/my.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/nb.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/nl.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pl.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pt-PT.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pt.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ru.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/sv.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/th.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/uk.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/vi.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-Hans.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-Hant.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-HK.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-TW.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh.lproj/AppboyFeedLocalizable.strings"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ar.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/Base.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/cs.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/da.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/de.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/en.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es-419.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es-MX.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/es.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/et.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fil.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/fr.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/he.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/hi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/id.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/it.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ja.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/km.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ko.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/lo.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ms.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/my.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/nb.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/nl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pl.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pt-PT.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/pt.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/ru.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/sv.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/th.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/uk.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/vi.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-Hans.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-Hant.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-HK.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh-TW.lproj"
  install_resource "${PODS_ROOT}/Appboy-iOS-SDK/AppboyUI/ABKNewsFeed/Resources/zh.lproj"
fi

mkdir -p "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
rsync -avr --copy-links --no-relative --exclude '*/.svn/*' --files-from="$RESOURCES_TO_COPY" / "${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
if [[ "${ACTION}" == "install" ]] && [[ "${SKIP_INSTALL}" == "NO" ]]; then
  mkdir -p "${INSTALL_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
  rsync -avr --copy-links --no-relative --exclude '*/.svn/*' --files-from="$RESOURCES_TO_COPY" / "${INSTALL_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
fi
rm -f "$RESOURCES_TO_COPY"

if [[ -n "${WRAPPER_EXTENSION}" ]] && [ "`xcrun --find actool`" ] && [ -n "${XCASSET_FILES:-}" ]
then
  # Find all other xcassets (this unfortunately includes those of path pods and other targets).
  OTHER_XCASSETS=$(find -L "$PWD" -iname "*.xcassets" -type d)
  while read line; do
    if [[ $line != "${PODS_ROOT}*" ]]; then
      XCASSET_FILES+=("$line")
    fi
  done <<<"$OTHER_XCASSETS"

  if [ -z ${ASSETCATALOG_COMPILER_APPICON_NAME+x} ]; then
    printf "%s\0" "${XCASSET_FILES[@]}" | xargs -0 xcrun actool --output-format human-readable-text --notices --warnings --platform "${PLATFORM_NAME}" --minimum-deployment-target "${!DEPLOYMENT_TARGET_SETTING_NAME}" ${TARGET_DEVICE_ARGS} --compress-pngs --compile "${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}"
  else
    printf "%s\0" "${XCASSET_FILES[@]}" | xargs -0 xcrun actool --output-format human-readable-text --notices --warnings --platform "${PLATFORM_NAME}" --minimum-deployment-target "${!DEPLOYMENT_TARGET_SETTING_NAME}" ${TARGET_DEVICE_ARGS} --compress-pngs --compile "${BUILT_PRODUCTS_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}" --app-icon "${ASSETCATALOG_COMPILER_APPICON_NAME}" --output-partial-info-plist "${TARGET_TEMP_DIR}/assetcatalog_generated_info_cocoapods.plist"
  fi
fi
