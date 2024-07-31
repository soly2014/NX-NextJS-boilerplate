'use client';
import { initializeIcons, registerIcons, Stack } from '@fluentui/react';
import React from 'react';
import { CallingComponents } from './CallingComponents';
import { ChatComponents } from './ChatComponents';
import { DEFAULT_COMPONENT_ICONS } from '@azure/communication-react';

function UIComponents(): JSX.Element {
  const stackStyle = {
    root: {
      width: '100%',
    },
  };

  initializeIcons();
  registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

  return (
    <Stack horizontal horizontalAlign="space-evenly" styles={stackStyle}>
      <CallingComponents />
      <ChatComponents />
    </Stack>
  );
}

export default UIComponents;
