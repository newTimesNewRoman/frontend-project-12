import { combineReducers } from '@reduxjs/toolkit';

import channels, {
  actions as channelsActions,
  channelsSelectors,
  defaultChannelId,
} from './channels';
import messages, {
  actions as messagesActions,
  messagesSelectors,
} from './messages';
import modals, {
  actions as modalsActions,
  modalsSelectors,
} from './modals';

const actions = {
  ...channelsActions,
  ...messagesActions,
  ...modalsActions,
};

const selectors = {
  channelsSelectors,
  messagesSelectors,
  modalsSelectors,
};

export { actions, defaultChannelId, selectors };

export default combineReducers({
  channels,
  messages,
  modals,
});
