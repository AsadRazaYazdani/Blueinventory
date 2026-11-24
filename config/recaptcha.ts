// Official Google reCAPTCHA v2 checkbox test key.
// Used when the project key is missing or not allowed on localhost.
// https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha.-what-should-i-do
const GOOGLE_TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_uX5KcdTh";

export const recaptchaSiteKey =
	process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || GOOGLE_TEST_SITE_KEY;
