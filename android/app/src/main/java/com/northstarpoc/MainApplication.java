package com.northstarpoc;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.ashideas.rnrangeslider.RangeSliderPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
// import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
// import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
            // new RNFirebasePackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage()
=======
            new RangeSliderPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            // new RNFirebaseMessagingPackage(),
            // new RNFirebaseNotificationsPackage()
>>>>>>> 0182bb3691af38998fde4b85a852472ba52053a0
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
