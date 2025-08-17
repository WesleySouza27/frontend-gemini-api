import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    sidebar: string;
    text: string;
    accent: string;
    messageUser: string;
    messageBot: string;
    messageBotText: string;
    inputBg: string;
    inputText: string;
  }
}