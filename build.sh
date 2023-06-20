git checkout develop && git pull \
  && sudo networksetup -setnetworkserviceenabled Wi-Fi off \
  && cd ios \
  && fastlane beta \
  && cd .. \
  && sudo networksetup -setnetworkserviceenabled Wi-Fi on
