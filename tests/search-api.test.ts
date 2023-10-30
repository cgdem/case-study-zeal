import { test, expect } from '@playwright/test';

test('Search content', async ({ request }) => {
    const response = await request.get('https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=furry+rabbit')
    const textResult = await response.text()
    console.log("text result: '" + textResult + "'");
    expect(textResult).toContain("Sesame Street")
  });