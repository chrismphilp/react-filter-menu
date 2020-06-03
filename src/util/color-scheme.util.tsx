import { ColorScheme, Theme } from '../model/ColorScheme.model';

const colorScheme: ColorScheme[] = [
    {
      primary: '#f5f6f2',
      secondary: '#f1f1f1',
      tertiary: '#777',
      button: '#f5f6h6',
      hover: '#555',
      primaryTextColor: '#f1f1f1',
      secondaryTextColor: '#161632',
    },
    {
      primary: '#D7DBDD',
      secondary: '#f1f1f1',
      tertiary: '#EEE',
      button: '#BDC3C7',
      hover: '#999',
      primaryTextColor: '#2E4053',
      secondaryTextColor: '#273746',
    },
  ],
  fetchColorScheme = (scheme: Theme) => {
    switch (scheme) {
      case 'dark':
        return colorScheme[0];
      default:
        return colorScheme[1];
    }
  };

export default fetchColorScheme;
