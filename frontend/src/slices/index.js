import { combineReducers } from '@reduxjs/toolkit';

import channels, {
  actions as channelsActions,
  selectors as channelsSelectors,
  defaultChannelId,
} from './channels';
import messages, {
  actions as messagesActions,
  selectors as messagesSelectors,
} from './messages';
import modals, { actions as modalsActions } from './modals';

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalsActions,
};

const selectors = {
  channelsSelectors,
  messagesSelectors,
};

export { actions, defaultChannelId, selectors };

export default combineReducers({
  channels,
  messages,
  modals,
});
