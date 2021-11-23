import { useEffect } from "react";
import { useHistory } from "react-router";

import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
	const { sendRequest, status } = useHttp(addQuote);

	const history = useHistory();

	useEffect(() => {
		if (status === "completed") {
			history.push("/quotes");
		}
	}, [status, history]);

	const addQuoteHandler = (quoteData) => {
		sendRequest(quoteData);
	};

	return <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;

/*
push() -> allows users to navigate away by clicking on the back btn, adds a new page on the stack of pages
replace() -> replaces the current page with new one, no going back
*/
