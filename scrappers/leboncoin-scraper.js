// import { ScrapflyClient, ScrapeConfig } from "scrapfly-sdk";
import { parse } from "node-html-parser";

const url =
  process.argv[2] ||
  "https://media.makeameme.org/created/did-i-forget-5a31aa.jpg";

const jsScenario = [
  {
    click: {
      selector: "button.mt-lg.text-body-1-link.font-semi-bold.underline",
    },
    wait_for_navigation: {
      timeout: 1000,
    },
    click: {
      selector: "text-left.text-body-1-link.font-bold.underline",
    },
    wait_for_navigation: {
      timeout: 1000,
    },
  },
];

const leboncoinScraper = async (url) => {
  const client = new ScrapflyClient({
    key: import.meta.env.VITE_SCRAPING_ENABLED
      ? import.meta.env.VITE_SCRAPFLY_API_KEY
      : null,
  });

  let scrape_result = await client.scrape(
    new ScrapeConfig({
      url,
      render_js: true,
      asp: true,
      js_scenario: jsScenario,
    })
  );

  // console.log(scrape_result.result.log_url);
  // console.log(scrape_result.result.content);

  const content = scrape_result.result.content;
  const formattedData = formatData(content);

  return formattedData;
};

const formatData = (pageContent) => {
  const root = parse(pageContent);

  const location = root.querySelector("div[data-qa-id='adview_location_map']")?.firstChild?.childNodes[1]?.firstChild?.firstChild?.text;
  const description = root.querySelector(
    'div[data-qa-id="adview_description_container"]'
  ).firstChild?.text;

  console.log(location, description);

  return {
    location,
    description,
  };
};

export default leboncoinScraper;
