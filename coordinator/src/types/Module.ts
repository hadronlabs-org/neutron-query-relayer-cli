export interface ManagerModule {
  run(): Promise<void>;
  get config(): any;
}
