/* =========================
   POCKETSMART AI
========================= */


const modal = document.getElementById("plannerModal");

const modalTitle = document.getElementById("modalTitle");

const modalIcon = document.getElementById("modalIcon");

const budgetInput = document.getElementById("budget");

const result = document.getElementById("result");


/* =========================
   OPEN PLANNER
========================= */

function openPlanner(type) {

    modal.classList.add("show");

    modalTitle.textContent = type;

    budgetInput.value = "";

    result.innerHTML = "";

    if (type === "Home Interior") {

        modalIcon.textContent = "🏠";

    }

    else if (type === "Party") {

        modalIcon.textContent = "🎉";

    }

    else if (type === "Jewelry") {

        modalIcon.textContent = "💎";

    }

}


/* =========================
   CLOSE PLANNER
========================= */

function closePlanner() {

    modal.classList.remove("show");

}


/* =========================
   GENERATE PLAN
========================= */

function generatePlan() {

    const budget = Number(budgetInput.value);

    const type = modalTitle.textContent;


    if (!budget || budget <= 0) {

        result.innerHTML = `
            ⚠️ Please enter a valid budget.
        `;

        return;
    }


    let plan = "";


    if (type === "Home Interior") {

        const furniture = Math.round(budget * 0.40);

        const lighting = Math.round(budget * 0.20);

        const storage = Math.round(budget * 0.20);

        const decor = Math.round(budget * 0.20);


        plan = `
            <strong>🤖 AI Starting Plan</strong><br><br>

            🛋️ Furniture: ₹${furniture.toLocaleString()}<br>

            💡 Lighting: ₹${lighting.toLocaleString()}<br>

            🗄️ Storage: ₹${storage.toLocaleString()}<br>

            🎨 Décor: ₹${decor.toLocaleString()}
        `;

    }


    else if (type === "Party") {

        const food = Math.round(budget * 0.40);

        const venue = Math.round(budget * 0.25);

        const decoration = Math.round(budget * 0.20);

        const misc = Math.round(budget * 0.15);


        plan = `
            <strong>🤖 AI Starting Plan</strong><br><br>

            🍽️ Catering: ₹${food.toLocaleString()}<br>

            🏛️ Venue: ₹${venue.toLocaleString()}<br>

            🎈 Decoration: ₹${decoration.toLocaleString()}<br>

            📦 Miscellaneous: ₹${misc.toLocaleString()}
        `;

    }


    else if (type === "Jewelry") {

        const jewelry = Math.round(budget * 0.70);

        const matching = Math.round(budget * 0.15);

        const reserve = Math.round(budget * 0.15);


        plan = `
            <strong>🤖 AI Starting Plan</strong><br><br>

            💎 Jewelry: ₹${jewelry.toLocaleString()}<br>

            👗 Outfit Matching: ₹${matching.toLocaleString()}<br>

            💰 Reserve: ₹${reserve.toLocaleString()}
        `;

    }


    result.innerHTML = plan;

}


/* =========================
   LOGOUT
========================= */

function logout() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");


    if (confirmLogout) {

        alert("You have been logged out.");

    }

}


/* =========================
   CLOSE MODAL OUTSIDE
========================= */

window.addEventListener("click", function(event) {

    if (event.target === modal) {

        closePlanner();

    }

});


/* =========================
   ESC KEY
========================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closePlanner();

    }

});
