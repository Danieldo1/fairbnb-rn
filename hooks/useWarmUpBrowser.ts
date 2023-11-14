import React from "react";
import * as WebBrowser from "expo-web-browser";

// For andriod for login in usage
export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};