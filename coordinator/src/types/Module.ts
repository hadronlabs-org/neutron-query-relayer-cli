export interface ManagerModule {
  run(): Promise<void>;
  onFactoryConnected(): Promise<void>;
  get config(): any;
}
