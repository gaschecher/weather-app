import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ACCUWEATHER_API_KEY, ACCUWEATHER_BASE_URL } from '../consts';

@Injectable()
export class CompletionsService {

  async getCompletions(query: string) {
    const url = `${ACCUWEATHER_BASE_URL}/locations/v1/cities/autocomplete?apikey=${ACCUWEATHER_API_KEY}&q=${query}`;
    const response = await axios.get(url);
    const data = response.data;

    // Limit to the first 5 objects since it searchs every keyword across the GLOBE so "green"
    // can autocomplete to hundreds or thousands of addresses or cities globally before considering pagination logic
    const limitedData = data.slice(0, 5);

    // Transform the array of objects payload from the source to something easier to work with
    // on the frontend.
    
    // original for a query of "green"
    // [
    //   {
    //     "Version": 1,
    //     "Key": "329822",
    //     "Type": "City",
    //     "Rank": 35,
    //     "LocalizedName": "Greensboro",
    //     "Country": {
    //       "ID": "US",
    //       "LocalizedName": "United States"
    //     },
    //     "AdministrativeArea": {
    //       "ID": "NC",
    //       "LocalizedName": "North Carolina"
    //     }
    //   },
    //   {
    //     "Version": 1,
    //     "Key": "329817",
    //     "Type": "City",
    //     "Rank": 45,
    //     "LocalizedName": "Greenville",
    //     "Country": {
    //       "ID": "US",
    //       "LocalizedName": "United States"
    //     },
    //     "AdministrativeArea": {
    //       "ID": "NC",
    //       "LocalizedName": "North Carolina"
    //     }
    //   },
    //   {
    //     "Version": 1,
    //     "Key": "3591939",
    //     "Type": "City",
    //     "Rank": 45,
    //     "LocalizedName": "Green Hills – Midtown",
    //     "Country": {
    //       "ID": "US",
    //       "LocalizedName": "United States"
    //     },
    //     "AdministrativeArea": {
    //       "ID": "TN",
    //       "LocalizedName": "Tennessee"
    //     }
    //   },
    // the modified form i pass to the frontend that just combines the relevant info
    // into something more human readable.

    // [
    //   {
    //     "name": "Greensboro, North Carolina, US"
    //   },
    //   {
    //     "name": "Greensborough, Victoria, AU"
    //   },
    //   {
    //     "name": "Greensburg, Indiana, US"
    //   },
    //   {
    //     "name": "Greensburg, Pennsylvania, US"
    //   },
    //   {
    //     "name": "Greenslopes, Queensland, AU"
    //   }
    // ]

    // I could have shipped the payload as is to the frontend and had the frontend transform it
    // depending on the app and the load the backend is under, this is a valid approach
    // but i decided against it here so my backend had some more logic in it than just
    // simple fetching data from accuweather and returning it.

    const transformedData = limitedData.map(item => ({
      name: `${item.LocalizedName}, ${item.AdministrativeArea.LocalizedName}, ${item.Country.ID}`
    }));

    return transformedData;
  }
}
