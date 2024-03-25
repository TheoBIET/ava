export interface Locale {
  label: string;
  key: string;
  iconUrl: string;
}

export enum LocaleKeys {
  FR = "fr-FR",
  EN = "en-US"
}

export const locales: Locale[] = [
  {
    label: "Français",
    key: LocaleKeys.FR,
    iconUrl: "https://www.countryflags.io/fr/flat/64.png",
  },
  {
    label: "English",
    key: LocaleKeys.EN,
    iconUrl: "https://www.countryflags.io/us/flat/64.png",
  }
];