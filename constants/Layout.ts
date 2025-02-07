import { Platform, StatusBar } from 'react-native';

const HEADER_CONTAINER_HEIGHT = 60;
const SEARCH_BAR_HEIGHT = 60;
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 0;

export default {
  headerHeight: HEADER_CONTAINER_HEIGHT + SEARCH_BAR_HEIGHT,
  statusBarHeight: STATUS_BAR_HEIGHT,
  // Custom header total height (approximate, includes safe area on iOS)
  customHeaderOffset: 70,
};
