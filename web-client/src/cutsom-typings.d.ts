// Extra variables that live on Global that will be replaced by webpack DefinePlugin
declare const GOOGLE_CLIENT_ID: string;

interface GlobalEnvironment {
  GOOGLE_CLIENT_ID;
}
