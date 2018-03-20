export class PluginCredentials {
  constructor(public accessToken: string,
              public refreshToken: string,
              public topicName: string,
              public proxyEndpoint?: string) {

  }
}
