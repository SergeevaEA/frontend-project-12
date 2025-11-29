/* eslint-disable functional/no-expression-statement */

import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './App.jsx';
import resources from './locales/index.js';
import { Provider } from 'react-redux'
import store from './slices/index.js'
import newChannelSubscribe from './api/newChannelSubscribe.js'
import newMessagesSubscribe from './api/newMessagesSubscribe.js'
import removeChannelSubscribe from './api/removeChannelSubscribe.js'
import renameChannelSubscribe from './api/renameChannelSubscribe.js'

const init = async () => {
  const i18n = i18next.createInstance();

    await i18n
      .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

    // вызов подписок
    newChannelSubscribe()
    newMessagesSubscribe()
    removeChannelSubscribe()
    renameChannelSubscribe()

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  );
};

export default init;