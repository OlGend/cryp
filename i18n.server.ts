import i18n from 'i18next';

import en from '@/locales/en/translation.json';
import de from '@/locales/de/translation.json';
import fr from '@/locales/fr/translation.json';
import nl from '@/locales/nl/translation.json';
import it from '@/locales/it/translation.json';
import es from '@/locales/es/translation.json';
import pt from '@/locales/pt/translation.json';
import pl from '@/locales/pl/translation.json';
import no from '@/locales/no/translation.json';
import fi from '@/locales/fi/translation.json';
import se from '@/locales/se/translation.json';
import dk from '@/locales/dk/translation.json';
import hu from '@/locales/hu/translation.json';
import gr from '@/locales/gr/translation.json';
import cz from '@/locales/cz/translation.json';
import sk from '@/locales/sk/translation.json';
import bg from '@/locales/bg/translation.json';
import tr from '@/locales/tr/translation.json';

if (!i18n.isInitialized) {
  i18n.init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      fr: { translation: fr },
      nl: { translation: nl },
      it: { translation: it },
      es: { translation: es },
      pt: { translation: pt },
      pl: { translation: pl },
      no: { translation: no },
      fi: { translation: fi },
      se: { translation: se },
      dk: { translation: dk },
      hu: { translation: hu },
      gr: { translation: gr },
      cz: { translation: cz },
      sk: { translation: sk },
      bg: { translation: bg },
      tr: { translation: tr },
      au: { translation: en },
      ca: { translation: en },
      gb: { translation: en },
      nz: { translation: en },
      ie: { translation: en },
      us: { translation: en },
      all: { translation: en },
      at: { translation: de },
      ch: { translation: de },
      be: { translation: fr },
      br: { translation: pt },
      in: { translation: en },
      id: { translation: en },
      lk: { translation: en },
      za: { translation: en },
      qa: { translation: en },
      ae: { translation: en },
      sa: { translation: en },
      kz: { translation: en },
      uz: { translation: en },
      az: { translation: en },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}
export default i18n;
