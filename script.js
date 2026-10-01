/* =========================================
   POCKETSMART AI
   JAVASCRIPT
========================================= */


/* =========================================
   AUTH ELEMENTS
========================================= */

const authPage =
    document.getElementById("authPage");

const app =
    document.getElementById("app");

const loginBox =
    document.getElementById("loginBox");

const registerBox =
    document.getElementById("registerBox");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const logoutBtn =
    document.getElementById("logoutBtn");



/* =========================================
   AUTH SCREEN SWITCH
========================================= */

showRegister.addEventListener(
    "click",
    function () {

        loginBox.classList.add("hidden");

        registerBox.classList.remove("hidden");

    }
);


showLogin.addEventListener(
    "click",
    function () {

        registerBox.classList.add("hidden");

        loginBox.classList.remove("hidden");

    }
);



/* =========================================
   INITIAL LOGIN CHECK
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const loggedIn =
            localStorage.getItem(
                "pocketsmartLoggedIn"
            );

        if (loggedIn === "true") {

            showApplication();

        } else {

            showAuthentication();

        }


        loadHistory();

    }
);



/* =========================================
   REGISTER
========================================= */

registerForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("registerName")
                .value
                .trim();


        const email =
            document
                .getElementById("registerEmail")
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .getElementById("registerPassword")
                .value;


        const message =
            document.getElementById(
                "registerMessage"
            );


        if (
            name === "" ||
            email === "" ||
            password === ""
        ) {

            message.textContent =
                "Please fill all fields.";

            return;

        }


        if (password.length < 4) {

            message.textContent =
                "Password must contain at least 4 characters.";

            return;

        }


        const existingUser =
            JSON.parse(
                localStorage.getItem(
                    "pocketsmartUser"
                )
            );


        if (
            existingUser &&
            existingUser.email === email
        ) {

            message.textContent =
                "This email is already registered.";

            return;

        }


        const user = {

            name: name,

            email: email,

            password: password

        };


        localStorage.setItem(
            "pocketsmartUser",
            JSON.stringify(user)
        );


        message.style.color = "#15945a";

        message.textContent =
            "Account created successfully. Please login.";


        registerForm.reset();


        setTimeout(
            function () {

                registerBox.classList.add("hidden");

                loginBox.classList.remove("hidden");

                message.textContent = "";

            },
            1200
        );

    }
);



/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .getElementById("loginPassword")
                .value;


        const message =
            document.getElementById(
                "loginMessage"
            );


        const user =
            JSON.parse(
                localStorage.getItem(
                    "pocketsmartUser"
                )
            );


        if (!user) {

            message.textContent =
                "No account found. Please create an account first.";

            return;

        }


        if (
            user.email !== email ||
            user.password !== password
        ) {

            message.textContent =
                "Incorrect email or password.";

            return;

        }


        localStorage.setItem(
            "pocketsmartLoggedIn",
            "true"
        );


        loginForm.reset();

        message.textContent = "";


        showApplication();

    }
);



/* =========================================
   SHOW APPLICATION
========================================= */

function showApplication() {

    authPage.classList.add("hidden");

    app.classList.remove("hidden");

    window.scrollTo(
        {
            top: 0,
            behavior: "smooth"
        }
    );

}



/* =========================================
   SHOW AUTHENTICATION
========================================= */

function showAuthentication() {

    authPage.classList.remove("hidden");

    app.classList.add("hidden");

}



/* =========================================
   LOGOUT
========================================= */

logoutBtn.addEventListener(
    "click",
    function (event) {

        event.preventDefault();


        localStorage.removeItem(
            "pocketsmartLoggedIn"
        );


        showAuthentication();


        window.scrollTo(
            {
                top: 0,
                behavior: "smooth"
            }
        );

    }
);



/* =========================================
   PLANNER DATA
========================================= */

const plannerData = {

    "Home Interior": {

        icon: "🏠",

        description:
            "Furniture, lighting, storage and décor plans based on your budget.",

        plans: [

            {
                name: "Essential Interior",

                minimum: 10000,

                ratio: 0.45,

                badge: "STARTER",

                description:
                    "A simple setup for essential home improvements.",

                features: [
                    "Basic furniture",
                    "Simple lighting",
                    "Storage solutions"
                ]
            },


            {
                name: "Smart Home",

                minimum: 30000,

                ratio: 0.62,

                badge: "POPULAR",

                description:
                    "A balanced interior plan with modern design elements.",

                features: [
                    "Modern furniture",
                    "LED lighting",
                    "Wall décor"
                ]
            },


            {
                name: "Premium Interior",

                minimum: 60000,

                ratio: 0.78,

                badge: "PREMIUM",

                description:
                    "A premium setup for enhanced comfort and style.",

                features: [
                    "Premium furniture",
                    "Designer lighting",
                    "Decorative upgrades"
                ]
            },


            {
                name: "Luxury Interior",

                minimum: 100000,

                ratio: 0.88,

                badge: "LUXURY",

                description:
                    "A complete luxury interior plan for larger budgets.",

                features: [
                    "Luxury furniture",
                    "Designer décor",
                    "Advanced lighting"
                ]
            }

        ]

    },


    "Party": {

        icon: "🎉",

        description:
            "Catering, venue, decoration and entertainment plans based on your budget.",

        plans: [

            {
                name: "Simple Party",

                minimum: 5000,

                ratio: 0.45,

                badge: "STARTER",

                description:
                    "A simple celebration for a small group.",

                features: [
                    "Basic catering",
                    "Simple decoration",
                    "Music setup"
                ]
            },


            {
                name: "Family Celebration",

                minimum: 15000,

                ratio: 0.62,

                badge: "POPULAR",

                description:
                    "A balanced party plan for family and friends.",

                features: [
                    "Better catering",
                    "Venue decoration",
                    "Entertainment"
                ]
            },


            {
                name: "Grand Celebration",

                minimum: 30000,

                ratio: 0.78,

                badge: "PREMIUM",

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

                minimum: 60000,

                ratio: 0.90,

                badge: "LUXURY",

                description:
                    "A complete premium event planning option.",

                features: [
                    "Luxury catering",
                    "Premium venue",
                    "Professional decoration"
                ]
            }

        ]

    },


    "Jewelry": {

        icon: "💎",

        description:
            "Jewelry plans based on occasion, style and available budget.",

        plans: [

            {
                name: "Elegant Basics",

                minimum: 5000,

                ratio: 0.45,

                badge: "STARTER",

                description:
                    "Simple and elegant jewelry choices.",

                features: [
                    "Simple accessories",
                    "Minimal designs",
                    "Basic outfit matching"
                ]
            },


            {
                name: "Classic Collection",

                minimum: 15000,

                ratio: 0.62,

                badge: "POPULAR",

                description:
                    "Classic jewelry choices for special occasions.",

                features: [
                    "Classic designs",
                    "Occasion matching",
                    "Style suggestions"
                ]
            },


            {
                name: "Premium Jewelry",

                minimum: 40000,

                ratio: 0.78,

                badge: "PREMIUM",

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

                minimum: 80000,

                ratio: 0.90,

                badge: "LUXURY",

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
   PLANNER ELEMENTS
========================================= */

const plannerSection =
    document.getElementById(
        "plannerSection"
    );


const plannerTitle =
    document.getElementById(
        "plannerTitle"
    );


const plannerDescription =
    document.getElementById(
        "plannerDescription"
    );


const budgetInput =
    document.getElementById(
        "budgetInput"
    );


const generateBtn =
    document.getElementById(
        "generateBtn"
    );


const plansContainer =
    document.getElementById(
        "plansContainer"
    );


const budgetSummary =
    document.getElementById(
        "budgetSummary"
    );


const summaryBudget =
    document.getElementById(
        "summaryBudget"
    );


const summaryPlans =
    document.getElementById(
        "summaryPlans"
    );


const summaryBalance =
    document.getElementById(
        "summaryBalance"
    );


const backToDashboard =
    document.getElementById(
        "backToDashboard"
    );


let currentPlanner = "";



/* =========================================
   OPEN PLANNER
========================================= */

document
    .querySelectorAll(".planner-card")
    .forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    const planner =
                        card.dataset.planner;

                    openPlanner(planner);

                }
            );

        }
    );



function openPlanner(planner) {

    currentPlanner = planner;


    const data =
        plannerData[planner];


    plannerTitle.textContent =
        planner;


    plannerDescription.textContent =
        data.description;


    plannerSection.classList.remove(
        "hidden"
    );


    budgetSummary.classList.add(
        "hidden"
    );


    plansContainer.innerHTML = "";


    budgetInput.value = "";


    plannerSection.scrollIntoView(
        {
            behavior: "smooth"
        }
    );

}



/* =========================================
   BACK
========================================= */

backToDashboard.addEventListener(
    "click",
    function () {

        plannerSection.classList.add(
            "hidden"
        );


        document
            .getElementById("dashboard")
            .scrollIntoView(
                {
                    behavior: "smooth"
                }
            );

    }
);



/* =========================================
   GENERATE PLANS
========================================= */

generateBtn.addEventListener(
    "click",
    generatePlans
);



function generatePlans() {

    const budget =
        Number(
            budgetInput.value
        );


    if (!budget || budget < 1000) {

        alert(
            "Please enter a budget of at least ₹1,000."
        );

        budgetInput.focus();

        return;

    }


    const data =
        plannerData[currentPlanner];


    const availablePlans =
        data.plans.filter(
            function (plan) {

                return budget >= plan.minimum;

            }
        );


    budgetSummary.classList.remove(
        "hidden"
    );


    summaryBudget.textContent =
        currency(budget);


    summaryPlans.textContent =
        availablePlans.length;


    plansContainer.innerHTML = "";


    if (availablePlans.length === 0) {

        summaryBalance.textContent =
            currency(budget);


        plansContainer.innerHTML = `

            <div class="no-plan">

                <h3>
                    No suitable plan for this budget yet.
                </h3>

                <p>
                    Increase your budget to
                    ${currency(data.plans[0].minimum)}
                    or more to see recommendations.
                </p>

            </div>

        `;

        return;

    }


    /*
       The plan with the highest
       calculated cost is used for
       the summary balance.
    */

    let highestCost = 0;


    availablePlans.forEach(
        function (plan) {

            const cost =
                Math.round(
                    budget * plan.ratio
                );


            if (cost > highestCost) {

                highestCost = cost;

            }

        }
    );


    summaryBalance.textContent =
        currency(
            Math.max(
                0,
                budget - highestCost
            )
        );



    /* CREATE PLAN CARDS */

    availablePlans.forEach(
        function (plan, index) {

            const estimatedCost =
                Math.round(
                    budget * plan.ratio
                );


            const balance =
                budget - estimatedCost;


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "plan-card";


            if (index === 1) {

                card.classList.add(
                    "featured"
                );

            }


            card.innerHTML = `

                <div class="plan-header">

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
                    ${currency(estimatedCost)}
                </div>


                <ul class="plan-features">

                    ${plan.features
                        .map(
                            function (feature) {

                                return `
                                    <li>
                                        ✓ ${feature}
                                    </li>
                                `;

                            }
                        )
                        .join("")}


                    <li>
                        ✓ Balance:
                        ${currency(balance)}
                    </li>

                </ul>


                <button
                    class="plan-select"
                    data-name="${plan.name}"
                    data-cost="${estimatedCost}"
                    data-balance="${balance}"
                >
                    Select Plan
                </button>

            `;


            plansContainer.appendChild(
                card
            );

        }
    );


    /*
       Add select events
    */

    document
        .querySelectorAll(".plan-select")
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        selectPlan(
                            button.dataset.name,
                            Number(
                                button.dataset.cost
                            ),
                            Number(
                                button.dataset.balance
                            )
                        );

                    }
                );

            }
        );


    saveHistory(
        currentPlanner,
        budget,
        availablePlans.length
    );


    plansContainer.scrollIntoView(
        {
            behavior: "smooth",
            block: "start"
        }
    );

}



/* =========================================
   SELECT PLAN
========================================= */

function selectPlan(
    name,
    cost,
    balance
) {

    alert(
        "Plan Selected!\n\n" +
        name +
        "\n\n" +
        "Estimated Cost: " +
        currency(cost) +
        "\n" +
        "Remaining Balance: " +
        currency(balance)
    );

}



/* =========================================
   CURRENCY
========================================= */

function currency(amount) {

    return "₹" +
        Number(amount).toLocaleString(
            "en-IN"
        );

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

        date:
            new Date()
                .toLocaleDateString(
                    "en-IN"
                )

    });


    const latest =
        history.slice(0, 6);


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

    const container =
        document.getElementById(
            "historyContainer"
        );


    if (!history.length) {

        container.innerHTML = `

            <div class="empty-history">

                <div class="history-icon">
                    🗂️
                </div>

                <div>

                    <strong>
                        No plans generated yet
                    </strong>

                    <p>
                        Your generated plans
                        will appear here.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML =
        history
            .map(
                function (item) {

                    return `

                        <div class="history-item">

                            <div>

                                <strong>
                                    ${item.planner}
                                </strong>

                                <p>
                                    Budget:
                                    ${currency(item.budget)}
                                    •
                                    ${item.count}
                                    plans generated
                                </p>

                            </div>

                            <small>
                                ${item.date}
                            </small>

                        </div>

                    `;

                }
            )
            .join("");

}
