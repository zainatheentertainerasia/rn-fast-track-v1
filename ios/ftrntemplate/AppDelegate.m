/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"


#import "AppboyReactUtils.h"
#import "AppboyKit.h"
#import "Appboy-iOS-SDK/AppboyKit.h"
//end
#import <React/RCTLinkingManager.h>
#import "ReactNativeConfig.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <UMCore/UMModuleRegistry.h>
#import <UMReactNativeAdapter/UMNativeModulesProxy.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>
#import <RNBranch/RNBranch.h>

@implementation AppDelegate

@synthesize window = _window;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSString *AppBoyKey = [ReactNativeConfig envFor:@"APP_BOY_API_KEY_IOS"];

  [Appboy startWithApiKey:AppBoyKey
            inApplication:application
        withLaunchOptions:launchOptions
        withAppboyOptions:@{ ABKInAppMessageControllerDelegateKey : self }];
  
    [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES]; // <-- add this
  
  // Register for user notifications
  if (floor(NSFoundationVersionNumber) > NSFoundationVersionNumber_iOS_9_x_Max) {
    UNUserNotificationCenter* center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;
    UNAuthorizationOptions options = UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
    if (@available(iOS 12.0, *)) {
      options = options | UNAuthorizationOptionProvisional;
    }
    [center requestAuthorizationWithOptions:(options)
                          completionHandler:^(BOOL granted, NSError *_Nullable error) {
                            NSLog(@"Permission granted.");
                            [[Appboy sharedInstance] pushAuthorizationFromUserNotificationCenter:granted];
                          }];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
  } else if (floor(NSFoundationVersionNumber) > NSFoundationVersionNumber_iOS_7_1) {
    UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeBadge | UIUserNotificationTypeAlert | UIUserNotificationTypeSound) categories:nil];
    [[UIApplication sharedApplication] registerForRemoteNotifications];
    [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  } else {
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:
     (UIRemoteNotificationTypeAlert |
      UIRemoteNotificationTypeBadge |
      UIRemoteNotificationTypeSound)];
  }

  [[AppboyReactUtils sharedInstance] populateInitialUrlFromLaunchOptions:launchOptions];
 // In-App Messaging
  [Appboy sharedInstance].inAppMessageController.delegate = self;

  self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"ftrntemplate" initialProperties:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

//  [super application:application didFinishLaunchingWithOptions:launchOptions];

  return YES;
}

- (void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
  [[Appboy sharedInstance] registerApplication:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
{
  NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge];
  // You can inject any extra modules that you would like here, more information at:
  // https://facebook.github.io/react-native/docs/native-modules-ios.html#dependency-injection
  return extraModules;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#ifdef DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
  [[Appboy sharedInstance] userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}

- (void) application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [[Appboy sharedInstance] registerApplication:application didReceiveRemoteNotification:userInfo];
}

- (void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSLog(@"didRegisterForRemoteNotificationsWithDeviceToken token appboy %@",deviceToken);
  [[Appboy sharedInstance] registerDeviceToken:deviceToken];
}


// Deep linking
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  NSLog(@"Calling RCTLinkingManager with url %@", url);
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

// Universal links
//- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
// restorationHandler:(void (^)(NSArray *_Nullable))restorationHandler
//{
//  return [RCTLinkingManager application:application
//                   continueUserActivity:userActivity
//                     restorationHandler:restorationHandler];
//}
// for branch
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
//    if ([RNBranch application:app openURL:url options:options])  {
//        // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
//    }
    return YES;
}

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
    return [RNBranch continueUserActivity:userActivity];
}
@end
