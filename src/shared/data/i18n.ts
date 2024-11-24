import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const lang = navigator.language

const finalLang = lang == 'be' || lang == 'ua' || lang == 'kz' ? 'ru' : 'en'

const resources = {
  en: {
    translation: {
      header: {
        input: {
          placeholder: 'Search...',
        },
      },
      main: {
        filter: {
          all: 'All',
          new: 'Only new',
        },
        preview: 'Please type product name',
        error: 'Error, please try again!',
      },
    },
  },
  ru: {
    translation: {
      header: {
        input: {
          placeholder: 'Поиск...',
        },
      },
      main: {
        filter: {
          all: 'Все',
          new: 'Только новые',
        },
        preview: 'Пожалуйста, введите имя продукта',
        error: 'Ошибка, попробуйте ещё раз!',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: lang,
  fallbackLng: finalLang,
  interpolation: {
    escapeValue: false,
  },
})

console.log(i18n.language)

export default i18n
