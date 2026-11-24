(function () {
	var script = document.currentScript;
	var orgId = (script && script.getAttribute("data-org")) || "local-org";
	var apiBase = (script && script.getAttribute("data-api")) || "";

	var button = document.createElement("button");
	button.setAttribute("aria-label", "Open help desk");
	button.innerText = "Help";
	button.style.cssText =
		"position:fixed;right:20px;bottom:20px;z-index:99999;background:#09275e;color:#fff;border:0;border-radius:0;padding:14px 20px;font-family:Inter,PlusJakartaSans,sans-serif;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;box-shadow:0 10px 30px rgba(9,39,94,.28);";

	var panel = document.createElement("div");
	panel.style.cssText =
		"display:none;position:fixed;right:20px;bottom:80px;z-index:99999;width:360px;max-width:calc(100vw - 32px);background:#fff;border:2px solid #09275e;border-radius:0;overflow:hidden;box-shadow:0 18px 40px rgba(9,39,94,.18);font-family:PlusJakartaSans,sans-serif;";
	panel.innerHTML =
		'<div style="background:#09275e;color:#fff;padding:14px 16px;"><div style="font-weight:700;">BlueInventory</div><div style="font-size:13px;opacity:.8;margin-top:2px;">Customer support</div></div>' +
		'<div id="bi-help-messages" style="height:280px;overflow:auto;padding:14px;background:#fff;"></div>' +
		'<form id="bi-help-form" style="display:flex;gap:8px;padding:12px;border-top:1px solid #e5e5e5;">' +
		'<input name="question" placeholder="Write your question" style="flex:1;border:1px solid #c8c8c8;border-radius:0;padding:10px 12px;" />' +
		'<button type="submit" style="background:#2563eb;color:#fff;border:0;border-radius:0;padding:0 14px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Send</button>' +
		"</form>";

	button.onclick = function () {
		panel.style.display = panel.style.display === "none" ? "block" : "none";
	};

	document.body.appendChild(button);
	document.body.appendChild(panel);

	var messages = panel.querySelector("#bi-help-messages");
	var form = panel.querySelector("#bi-help-form");
	var conversationId = "";

	function addMessage(role, text) {
		var wrap = document.createElement("div");
		wrap.style.cssText = "margin:0 0 12px;" + (role === "user" ? "text-align:right;" : "");
		var label = document.createElement("div");
		label.style.cssText =
			"font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;margin-bottom:4px;";
		label.textContent = role === "user" ? "You" : "Support";
		var bubble = document.createElement("div");
		bubble.style.cssText =
			"display:inline-block;padding:10px 12px;border-radius:0;max-width:90%;text-align:left;" +
			(role === "user"
				? "background:#09275e;color:#fff;"
				: "background:#f7f7f7;color:#111;");
		bubble.textContent = text;
		wrap.appendChild(label);
		wrap.appendChild(bubble);
		messages.appendChild(wrap);
		messages.scrollTop = messages.scrollHeight;
	}

	addMessage(
		"assistant",
		"Hello, this is BlueInventory support. Send a question and we will reply from our company records."
	);

	form.addEventListener("submit", function (event) {
		event.preventDefault();
		var input = form.querySelector("input");
		var question = (input.value || "").trim();
		if (!question) return;
		addMessage("user", question);
		input.value = "";

		fetch(apiBase + "/api/ai/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-organization-id": orgId,
			},
			body: JSON.stringify({question: question, conversationId: conversationId}),
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				if (data.conversationId) conversationId = data.conversationId;
				addMessage("assistant", data.answer || data.error || "A colleague will follow up shortly.");
			})
			.catch(function () {
				addMessage("assistant", "Support is unavailable just now. Please try again.");
			});
	});
})();
