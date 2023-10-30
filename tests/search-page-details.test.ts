import { test, expect } from '@playwright/test';


test('Search page source', async ({ request }) => {
    const response = await request.get('https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=furry+rabbit')
    const textResult = await response.text()
    let isNewerThanOldDate = false;
    const searchPage = "Sesame Street";

    if (textResult.includes(searchPage)) {
        const sesameStreetDetailsResponse = await request.get('https://api.wikimedia.org/core/v1/wikipedia/en/page/Sesame_Street')
        const pageDetails = await sesameStreetDetailsResponse.text()
        const jsonRepresentation = JSON.parse(pageDetails);
        const timestampRepresentation = jsonRepresentation['latest']['timestamp'];
        console.log("timestamp: " + timestampRepresentation);
        isNewerThanOldDate = new Date(timestampRepresentation) > new Date("2023-08-17")
    }  
    
    expect(isNewerThanOldDate).toBe(true);
});