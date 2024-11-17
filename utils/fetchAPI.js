import { vtuUrl } from "../src/assets/urls";

/**
 *
 * @param {object} payload The data to include in the body of the request as payload.
 * @param {string} url The endpoint to make request on.
 */
export async function fetchFromMobileVTU(payload, url) {
  try {
    const response = await fetch(`${vtuUrl}${url}`, {
      method: "POST",
      headers: {
        "Api-Token": TEST_API_TOKEN,
        "Request-Id": Date.now().toString(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(payload),
      mode: "cors",
      credentials: "omit",
    });

    const data = await response.json();
    return {
      status: true,
      data,
    };
  } catch (err) {
    return { status: false, message: "Could not complete the request" };
  }
}
