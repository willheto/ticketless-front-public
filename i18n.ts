import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './src/translations';

i18n.use(initReactI18next).init({
	resources,
	fallbackLng: 'en',
	debug: process.env.NODE_ENV === 'development',
	supportedLngs: ['en', 'fi'],
	ns: ['common', 'termsAndServices'],
	defaultNS: 'common',

	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
