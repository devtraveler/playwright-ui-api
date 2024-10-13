import { test, expect, request } from '@playwright/test';
import { BaseApi } from '../api-microservises/baseApi';


export class GeoService extends BaseApi{
    
    public baseURL = 'https://service.verivox.de/';
    public cityEndpoint = 'geo/latest/cities/';

    constructor(requestContext: any) {
        super(requestContext);
      }

    async getCitiesByPostode(postCode: string){

        const endpoint = '${this.baseURL}${this.cityEndpoint}${postCode}';
        const response = await this.get(endpoint);
        return await this.validateResponse(response);
   
    }

    async verifyBerlinIsOnlyOneCity(postCode: string){

        const responseData = await this.getCitiesByPostode(postCode);
    
        // Verify that the response is an array
        expect(Array.isArray(responseData)).toBe(true);
    
        // Verify that the length is 1 and the city is 'Berlin'
        expect(responseData.length).toBe(1);
        expect(responseData[0].Name).toBe('Berlin');
   
    }

    async verifyGeoServiceAlwaysReturnsAList(postCode: string){

        const responseData = await this.getCitiesByPostode(postCode);

        // Verify that the response is an array
        expect(Array.isArray(responseData)).toBe(true);

   
    }

    async verifyReturnsMultipleCitiesForSpecifiedCode(postCode: string){

        const responseData = await this.getCitiesByPostode(postCode);
    
        // Verify that multiple cities are returned
         expect(responseData.length).toBeGreaterThan(1);
   
    }


  }