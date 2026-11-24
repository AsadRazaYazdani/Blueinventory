import {FC, useEffect} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {recaptchaSiteKey} from "@/config/recaptcha";

type RecaptchaFieldProps = {
	onChange: (token: string | null) => void;
};

const isLocalHost = () => {
	if (typeof window === "undefined") return true;
	return ["localhost", "127.0.0.1"].includes(window.location.hostname);
};

const RecaptchaField: FC<RecaptchaFieldProps> = ({onChange}) => {
	useEffect(() => {
		if (isLocalHost()) {
			onChange("local-dev");
		}
		// Run once so parent re-renders do not retrigger setState
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLocalHost()) {
		return null;
	}

	return <ReCAPTCHA sitekey={recaptchaSiteKey} onChange={onChange} />;
};

export default RecaptchaField;
