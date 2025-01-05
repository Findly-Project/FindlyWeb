import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const lang = navigator.language

const ruLangs = ['be', 'ua', 'kz', 'ru']

export const finalLang = ruLangs.includes(lang) ? 'ru' : 'en'

const resources = {
  en: {
    translation: {
      header: {
        input: {
          placeholder: 'Search...',
        },
      },
      main: {
        settings: {
          new: 'Only new',
          price: 'Filter by price',
          name: 'Filter by name',
          max_size: 'Max size',
          lang: { text: 'Site language', btn: 'Change to' },
        },
        preview: 'Please enter product name',
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
        settings: {
          new: 'Только новые',
          price: 'Сортировать по цене',
          name: 'Сортировать по имени',
          max_size: 'Максимальное кол-во',
          lang: { text: 'Язык сайта', btn: 'Изменить на' },
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

export default i18n
