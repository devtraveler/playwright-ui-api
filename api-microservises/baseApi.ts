import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApi {
  
  protected requestContext: APIRequestContext;
  
  constructor(requestContext: APIRequestContext) {

    this.requestContext = requestContext;
  }

  // Helper method for making a GET request
  async get(endpoint: string):  Promise<APIResponse> {
    const response = await this.requestContext.get(endpoint);
    return response;
  }

  // Common method to validate response status
  async validateResponse(response: APIResponse) {
    if (!response.ok()) {
      throw new Error(`API request failed with status: ${response.status()}`);
    }
    return await response.json();
  }
}
