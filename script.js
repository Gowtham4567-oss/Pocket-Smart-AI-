/* =========================================
   POCKETSMART AI
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const loginPage =
    document.getElementById("loginPage");

const app =
    document.getElementById("app");

const loginForm =
    document.getElementById("loginForm");

const logoutBtn =
    document.getElementById("logoutBtn");

const plannerSection =
    document.getElementById("plannerSection");

const plannerTitle =
    document.getElementById("plannerTitle");

const plannerDescription =
    document.getElementById("plannerDescription");

const budgetInput =
    document.getElementById("budgetInput");

const generateBtn =
    document.getElementById("generateBtn");

const plansContainer =
    document.getElementById("plansContainer");

const budgetInfo =
    document.getElementById("budgetInfo");

const budgetAmount =
    document.getElementById("budgetAmount");

const planCount =
    document.getElementById("planCount");

const balanceAmount =
    document.getElementById("balanceAmount");

const backBtn =
    document.getElementById("backBtn");

const historyContainer =
    document.getElementById("historyContainer");


let currentPlanner = "";



/* =========================================
   CHECK LOGIN
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loggedIn =
        localStorage.getItem("pocketsmartLoggedIn");

    if (loggedIn === "true") {

        showApp();

    } else {

        showLogin();

    }

    loadHistory();

});



/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("loginName").value.trim();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value.trim();


    if (
        name === "" ||
        email === "" ||
        password === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    /*
        Store login state.
        This is frontend demo authentication.
    */

    localStorage.setItem(
        "pocketsmartLoggedIn",
        "true"
    );


    localStorage.setItem(
        "pocketsmartUser",
        name
    );


    showApp();

});



/* =========================================
   SHOW APP
========================================= */

function showApp() {

    loginPage.classList.add("hidden");

    app.classList.remove("hidden");

    window.scrollTo(0, 0);

}



/* =========================================
   SHOW LOGIN
========================================= */

function showLogin() {

    loginPage.classList.remove("hidden");

    app.classList.add("hidden");

}



/* =========================================
   LOGOUT
========================================= */

logoutBtn.addEventListener("click", function (event) {

    event.preventDefault();


    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    localStorage.removeItem(
        "pocketsmartLoggedIn"
    );


    localStorage.removeItem(
        "pocketsmartUser"
    );


    showLogin();


    window.scrollTo(0, 0);

});



/* =========================================
   PLANNER DATA
========================================= */

const plannerData = {

    "Home Interior": {

        description:
            "Choose a budget and generate smart interior plans.",

        icon: "🏠",

        plans: [

            {
                name: "Basic Interior",
                min: 10000,
                percentage: 0.45,
                badge: "Starter",
                description:
                    "Essential improvements for a simple and comfortable home.",
                features: [
                    "Basic furniture",
                    "Simple lighting",
                    "Storage solutions"
                ]
            },

            {
                name: "Smart Home",
                min: 30000,
                percentage: 0.65,
                badge: "Popular",
                description:
                    "A balanced interior plan with better furniture and décor.",
                features: [
                    "Modern furniture",
                    "LED lighting",
                    "Wall décor"
                ]
            },

            {
                name: "Premium Interior",
                min: 60000,
                percentage: 0.82,
                badge: "Premium",
                description:
                    "A premium interior setup with enhanced design and comfort.",
                features: [
                    "Premium furniture",
                    "Designer lighting",
                    "Luxury décor"
                ]
            },

            {
                name: "Luxury Interior",
                min: 100000,
                percentage: 0.92,
                badge: "Luxury",
                description:
                    "Complete luxury interior planning for larger budgets.",
                features: [
                    "Luxury furniture",
                    "Designer décor",
                    "Advanced lighting"
                ]
            }

        ]

    },


    "Party": {

        description:
            "Create a smart party plan based on your available budget.",

        icon: "🎉",

        plans: [

            {
                name: "Simple Party",
                min: 5000,
                percentage: 0.50,
                badge: "Starter",
                description:
                    "A simple and enjoyable party plan for a small gathering.",
                features: [
                    "Basic catering",
                    "Simple decoration",
                    "Music setup"
                ]
            },

            {
                name: "Family Party",
                min: 15000,
                percentage: 0.65,
                badge: "Popular",
                description:
                    "A balanced party setup for family and friends.",
                features: [
                    "Better catering",
                    "Venue decoration",
                    "Entertainment"
                ]
            },

            {
                name: "Grand Celebration",
                min: 30000,
                percentage: 0.80,
                badge: "Premium",
                description:
                    "A larger celebration with premium arrangements.",
                features: [
                    "Premium catering",
                    "Theme decoration",
                    "Event entertainment"
                ]
            },

            {
                name: "Luxury Event",
                min: 60000,
                percentage: 0.92,
                badge: "Luxury",
                description:
                    "A complete luxury event experience.",
                features: [
                    "Luxury catering",
                    "Premium venue",
                    "Professional decoration"
                ]
            }

        ]

    },


    "Jewelry": {

        description:
            "Find jewelry planning options according to your budget.",

        icon: "💎",

        plans: [

            {
                name: "Elegant Basics",
                min: 5000,
                percentage: 0.45,
                badge: "Starter",
                description:
                    "Simple and elegant jewelry choices for everyday occasions.",
                features: [
                    "Simple accessories",
                    "Minimal design",
                    "Outfit matching"
                ]
            },

            {
                name: "Classic Collection",
                min: 15000,
                percentage: 0.65,
                badge: "Popular",
                description:
                    "A balanced jewelry plan for special occasions.",
                features: [
                    "Classic designs",
                    "Occasion matching",
                    "Style suggestions"
                ]
            },

            {
                name: "Premium Jewelry",
                min: 40000,
                percentage: 0.82,
                badge: "Premium",
                description:
                    "Premium jewelry planning with enhanced style options.",
                features: [
                    "Premium designs",
                    "Outfit matching",
                    "Occasion styling"
                ]
            },

            {
                name: "Luxury Collection",
                min: 80000,
                percentage: 0.92,
                badge: "Luxury",
                description:
                    "Luxury jewelry planning for larger budgets.",
                features: [
                    "Luxury collection",
                    "Premium styling",
                    "Complete matching"
                ]
            }

        ]

    }

};



/* =========================================
   OPEN PLANNER
========================================= */

document.querySelectorAll(".card").forEach(function (card) {

    card.addEventListener("click", function () {

        const planner =
            card.getAttribute("data-planner");

        openPlanner(planner);

    });

});



function openPlanner(planner) {

    currentPlanner = planner;


    const data =
        plannerData[planner];


    plannerTitle.textContent =
        planner;


    plannerDescription.textContent =
        data.description;


    plannerSection.classList.remove("hidden");


    budgetInfo.classList.add("hidden");


    plansContainer.innerHTML = "";


    budgetInput.value = "";


    plannerSection.scrollIntoView({
        behavior: "smooth"
    });

}



/* =========================================
   BACK BUTTON
========================================= */

backBtn.addEventListener("click", function () {

    plannerSection.classList.add("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});



/* =========================================
   GENERATE PLANS
========================================= */

generateBtn.addEventListener(
    "click",
    generatePlans
);



function generatePlans() {

    const budget =
        Number(budgetInput.value);


    if (!budget || budget < 1000) {

        alert(
            "Please enter a budget of at least ₹1,000."
        );

        budgetInput.focus();

        return;
    }


    const data =
        plannerData[currentPlanner];


    /*
        Show more plans as budget increases.
    */

    const availablePlans =
        data.plans.filter(function (plan) {

            return budget >= plan.min;

        });


    /*
        Always show at least the first
        affordable plan.
    */

    if (availablePlans.length === 0) {

        plansContainer.innerHTML = `
            <div class="no-plans">
                <h3>No plan available for this budget.</h3>
                <p>
                    Try increasing your budget to
                    ₹${data.plans[0].min.toLocaleString()} or more.
                </p>
            </div>
        `;

        budgetInfo.classList.remove("hidden");

        budgetAmount.textContent =
            formatCurrency(budget);

        planCount.textContent = "0";

        balanceAmount.textContent =
            formatCurrency(budget);

        return;
    }


    /* Show budget information */

    budgetInfo.classList.remove("hidden");


    budgetAmount.textContent =
        formatCurrency(budget);


    planCount.textContent =
        availablePlans.length;


    /*
        Calculate maximum balance from
        cheapest generated plan.
    */

    const highestPlanCost =
        Math.max(
            ...availablePlans.map(function (plan) {

                return Math.round(
                    budget * plan.percentage
                );

            })
        );


    const maximumBalance =
        budget - highestPlanCost;


    balanceAmount.textContent =
        formatCurrency(
            Math.max(0, maximumBalance)
        );


    /*
        Create cards
    */

    plansContainer.innerHTML = "";


    availablePlans.forEach(function (plan, index) {

        const estimatedCost =
            Math.round(
                budget * plan.percentage
            );


        const balance =
            budget - estimatedCost;


        const card =
            document.createElement("div");


        card.className =
            "plan-card";


        if (index === 1) {

            card.classList.add("featured");

        }


        card.innerHTML = `

            <div class="plan-top">

                <span class="plan-icon">
                    ${data.icon}
                </span>

                <span class="plan-badge">
                    ${plan.badge}
                </span>

            </div>


            <h3>
                ${plan.name}
            </h3>


            <p class="plan-description">
                ${plan.description}
            </p>


            <div class="plan-price">
                ${formatCurrency(estimatedCost)}
            </div>


            <ul class="plan-list">

                ${plan.features.map(function (feature) {

                    return `
                        <li>✓ ${feature}</li>
                    `;

                }).join("")}

                <li>
                    ✓ Estimated Balance:
                    ${formatCurrency(balance)}
                </li>

            </ul>


            <button
                class="select-plan"
                onclick="selectPlan(
                    '${plan.name}',
                    ${estimatedCost},
                    ${balance}
                )"
            >
                Select This Plan
            </button>

        `;


        plansContainer.appendChild(card);

    });


    saveHistory(
        currentPlanner,
        budget,
        availablePlans.length
    );


    plansContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}



/* =========================================
   SELECT PLAN
========================================= */

function selectPlan(
    planName,
    cost,
    balance
) {

    alert(
        "Plan Selected!\n\n" +
        planName +
        "\n\n" +
        "Estimated Cost: " +
        formatCurrency(cost) +
        "\n" +
        "Remaining Balance: " +
        formatCurrency(balance)
    );

}



/* =========================================
   FORMAT CURRENCY
========================================= */

function formatCurrency(amount) {

    return "₹" +
        Number(amount).toLocaleString("en-IN");

}



/* =========================================
   HISTORY
========================================= */

function saveHistory(
    planner,
    budget,
    count
) {

    const history =
        JSON.parse(
            localStorage.getItem(
                "pocketsmartHistory"
            )
        ) || [];


    history.unshift({

        planner: planner,

        budget: budget,

        count: count,

        date: new Date().toLocaleDateString("en-IN")

    });


    /*
        Keep latest 5 records
    */

    const latest =
        history.slice(0, 5);


    localStorage.setItem(
        "pocketsmartHistory",
        JSON.stringify(latest)
    );


    displayHistory(latest);

}



/* =========================================
   LOAD HISTORY
========================================= */

function loadHistory() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "pocketsmartHistory"
            )
        ) || [];


    displayHistory(history);

}



/* =========================================
   DISPLAY HISTORY
========================================= */

function displayHistory(history) {

    if (history.length === 0) {

        historyContainer.innerHTML = `

            <div class="history-empty">

                <span>🗂️</span>

                <div>

                    <strong>
                        No plans generated yet
                    </strong>

                    <p>
                        Your generated plans will
                        appear here.
                    </p>

                </div>

            </div>

        `;

        return;
    }


    historyContainer.innerHTML =
        history.map(function (item) {

            return `

                <div class="history-item">

                    <div>

                        <strong>
                            ${item.planner}
                        </strong>

                        <p>
                            Budget:
                            ${formatCurrency(item.budget)}
                            • ${item.count} plans generated
                        </p>

                    </div>

                    <small>
                        ${item.date}
                    </small>

                </div>

            `;

        }).join("");

}
