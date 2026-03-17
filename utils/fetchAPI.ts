import { vtuUrl, baseUrl, TEST_API_TOKEN } from "../src/assets/urls";

/**
 * Make an authenticated API request with JWT token
 * @param {string} endpoint The API endpoint path
 * @param {object} options Fetch options
 * @returns {Promise<object>} Response data
 */
export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem("wix_token");

  if (!token) {
    return { status: false, message: "No authentication token found" };
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
      mode: "cors",
    });

    if (response.status === 401 || response.status === 403) {
      // Token is invalid or expired
      localStorage.removeItem("wix_token");
      localStorage.removeItem("wix_user");
      window.location.href = "/login";
      return { status: false, message: "Unauthorized" };
    }

    const data = await response.json();
    return { status: response.ok, data, statusCode: response.status };
  } catch (err) {
    console.error("Fetch error:", err);
    return { status: false, message: "Could not complete the request" };
  }
}

/**
 * Make a request to external VTU service
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
